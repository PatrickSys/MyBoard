import { validateCatalogResponse, validateManifest } from '../src/lib/widget-catalog';
import { WIDGET_CATALOG } from '../src/config/widget-catalog';

describe('widget-catalog validation', () => {
  it('accepts valid seeded catalog', () => {
    const result = validateCatalogResponse(WIDGET_CATALOG);
    expect(result.ok).toBe(true);
  });

  it('rejects manifest with bad tag and permission', () => {
    const result = validateManifest({
      id: 'x',
      title: 'Broken',
      tag: 'notvalid',
      url: '/widgets/broken.js',
      version: '1.0.0',
      permissions: ['root'],
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toContain('MANIFEST_INVALID_TAG');
      expect(result.errors).toContain('MANIFEST_INVALID_PERMISSION_VALUE');
    }
  });

  it('rejects manifest with invalid automation action schema', () => {
    const result = validateManifest({
      id: 'automator',
      title: 'Automator',
      tag: 'mb-automator',
      url: '/widgets/automator.js',
      version: '1.0.0',
      permissions: ['events'],
      automation: {
        events: [{ key: 'x', label: 'X' }],
        actions: [{ key: 'do.x', label: 'Do X', payloadFields: [{ key: 'count', type: 'integer' }] }],
      },
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toContain('MANIFEST_INVALID_AUTOMATION_PAYLOAD_FIELD');
    }
  });
});

