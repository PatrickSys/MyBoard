import type { WidgetManifest } from '@myboard/sdk';
import {
  collectWidgetConnectOrigins,
  collectWidgetScriptOrigins,
  generateReportOnlyCsp,
} from '../src/lib/widget-csp';

const manifests: WidgetManifest[] = [
  {
    id: 'notes',
    title: 'Notes',
    tag: 'mb-notes',
    url: '/widgets/mb-notes.js',
    version: '1.0.0',
    permissions: ['events'],
  },
  {
    id: 'remote-one',
    title: 'Remote One',
    tag: 'mb-remote-one',
    url: 'https://widgets.example.com/one.js',
    version: '1.0.0',
    permissions: ['events', 'network'],
  },
  {
    id: 'remote-two',
    title: 'Remote Two',
    tag: 'mb-remote-two',
    url: 'https://widgets.example.com/two.js',
    version: '1.0.0',
    permissions: ['storage'],
  },
  {
    id: 'remote-three',
    title: 'Remote Three',
    tag: 'mb-remote-three',
    url: 'https://api.widgets.example.net/widget.js',
    version: '1.0.0',
    permissions: ['network'],
  },
];

describe('widget-csp', () => {
  it('collects and deduplicates script origins from absolute URLs', () => {
    expect(collectWidgetScriptOrigins(manifests)).toEqual([
      'https://api.widgets.example.net',
      'https://widgets.example.com',
    ]);
  });

  it('collects connect origins only for widgets with network permission', () => {
    expect(collectWidgetConnectOrigins(manifests)).toEqual([
      'https://api.widgets.example.net',
      'https://widgets.example.com',
    ]);
  });

  it('creates report-only csp with expected directives', () => {
    const csp = generateReportOnlyCsp(manifests, '/api/security/custom-report');
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain(
      "script-src 'self' https://api.widgets.example.net https://widgets.example.com"
    );
    expect(csp).toContain(
      "connect-src 'self' https://api.widgets.example.net https://widgets.example.com"
    );
    expect(csp).toContain('report-uri /api/security/custom-report');
  });
});

