import type { WidgetManifest } from '@myboard/sdk';
import { canDispatchCommand, canInstall, canRequestCapability } from '../src/lib/widget-policy';

const manifest: WidgetManifest = {
  id: 'example',
  title: 'Example Widget',
  tag: 'mb-example',
  url: '/widgets/mb-example.js',
  version: '1.0.0',
  permissions: ['storage', 'events'],
  automation: {
    events: [{ key: 'event.created', label: 'Created' }],
    actions: [{ key: 'widget.create', label: 'Create' }],
  },
};

describe('widget-policy', () => {
  it('allows install for valid manifest', () => {
    expect(canInstall(manifest)).toEqual({ allowed: true });
  });

  it('denies install for untrusted absolute origin', () => {
    const decision = canInstall({
      ...manifest,
      url: 'https://untrusted.example.org/widget.js',
    });
    expect(decision.allowed).toBe(false);
    if (!decision.allowed) {
      expect(decision.code).toBe('MANIFEST_UNTRUSTED_ORIGIN');
    }
  });

  it('denies undeclared capability', () => {
    const decision = canRequestCapability(manifest, 'network');
    expect(decision.allowed).toBe(false);
    if (!decision.allowed) {
      expect(decision.code).toBe('CAPABILITY_NOT_DECLARED');
    }
  });

  it('allows declared command action', () => {
    expect(canDispatchCommand(manifest, 'widget.create')).toEqual({ allowed: true });
  });

  it('denies undeclared command action', () => {
    const decision = canDispatchCommand(manifest, 'widget.delete');
    expect(decision.allowed).toBe(false);
    if (!decision.allowed) {
      expect(decision.code).toBe('COMMAND_ACTION_NOT_DECLARED');
    }
  });

  it('blocks network command action when widget lacks network permission', () => {
    const networkActionManifest: WidgetManifest = {
      ...manifest,
      automation: {
        events: [{ key: 'event.created', label: 'Created' }],
        actions: [{ key: 'network.fetch', label: 'Fetch Data' }],
      },
    };

    const decision = canDispatchCommand(networkActionManifest, 'network.fetch');
    expect(decision.allowed).toBe(false);
    if (!decision.allowed) {
      expect(decision.code).toBe('COMMAND_ACTION_BLOCKED');
    }
  });
});

