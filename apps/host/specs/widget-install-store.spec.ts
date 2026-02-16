import type { WidgetCatalogResponse, WidgetManifest } from '@myboard/sdk';
import { widgetInstallStore } from '../src/lib/widget-install-store';

const testManifest: WidgetManifest = {
  id: 'test-install',
  title: 'Install Test',
  tag: 'mb-install-test',
  url: '/widgets/mb-install-test.js',
  version: '1.0.0',
  permissions: ['storage'],
  defaultInstalled: false,
};

const testCatalog: WidgetCatalogResponse = {
  version: 'test',
  generatedAt: new Date().toISOString(),
  widgets: [
    {
      id: 'seeded-core',
      title: 'Seeded Core',
      tag: 'mb-seeded-core',
      url: '/widgets/mb-seeded-core.js',
      version: '1.0.0',
      permissions: ['storage'],
      defaultInstalled: true,
    },
  ],
};

describe('widget-install-store', () => {
  beforeEach(() => {
    localStorage.clear();
    widgetInstallStore.__resetForTests();
  });

  it('seeds default-installed widgets from catalog', () => {
    widgetInstallStore.seedDefaults(testCatalog);
    expect(widgetInstallStore.get('seeded-core')?.enabled).toBe(true);
  });

  it('installs and toggles widget', () => {
    const result = widgetInstallStore.install(testManifest);
    expect(result.ok).toBe(true);
    expect(widgetInstallStore.get('test-install')?.enabled).toBe(true);
    widgetInstallStore.setEnabled('test-install', false);
    expect(widgetInstallStore.get('test-install')?.enabled).toBe(false);
  });
});

