import type { WidgetCatalogResponse, WidgetInstallRecord, WidgetManifest } from '@myboard/sdk';
import { FEATURE_FLAGS } from '../config/feature-flags';
import { canInstall } from './widget-policy';

const STORAGE_KEY = 'myboard.widget-installs.v1';

type InstallStoreState = {
  records: WidgetInstallRecord[];
};

type Subscriber = (records: ReadonlyArray<WidgetInstallRecord>) => void;

class WidgetInstallStore {
  private records = new Map<string, WidgetInstallRecord>();
  private subscribers = new Set<Subscriber>();

  constructor() {
    this.load();
  }

  getAll(): WidgetInstallRecord[] {
    return Array.from(this.records.values());
  }

  get(widgetId: string): WidgetInstallRecord | undefined {
    return this.records.get(widgetId);
  }

  subscribe(subscriber: Subscriber): () => void {
    this.subscribers.add(subscriber);
    return () => this.subscribers.delete(subscriber);
  }

  seedDefaults(catalog: WidgetCatalogResponse): void {
    let changed = false;
    for (const manifest of catalog.widgets) {
      if (!manifest.defaultInstalled) continue;
      if (this.records.has(manifest.id)) continue;

      const now = new Date().toISOString();
      this.records.set(manifest.id, {
        widgetId: manifest.id,
        installedVersion: manifest.version,
        enabled: true,
        source: 'core',
        installedAt: now,
        updatedAt: now,
        settings: defaultSettings(manifest),
      });
      changed = true;
    }
    if (changed) this.persistAndNotify();
  }

  install(manifest: WidgetManifest): { ok: true } | { ok: false; code: string; reason: string } {
    if (!FEATURE_FLAGS.runtimeInstallEnabled) {
      this.emitEvent('widget-install-failed', {
        widgetId: manifest.id,
        code: 'RUNTIME_INSTALL_DISABLED',
      });
      return {
        ok: false,
        code: 'RUNTIME_INSTALL_DISABLED',
        reason: 'Runtime install is disabled by feature flag',
      };
    }

    const decision = canInstall(manifest);
    if (!decision.allowed) {
      this.emitEvent('widget-install-failed', {
        widgetId: manifest.id,
        code: decision.code,
        reason: decision.reason,
      });
      return { ok: false, code: decision.code, reason: decision.reason };
    }

    const existing = this.records.get(manifest.id);
    const now = new Date().toISOString();
    this.records.set(manifest.id, {
      widgetId: manifest.id,
      installedVersion: manifest.version,
      enabled: existing?.enabled ?? true,
      source: existing?.source ?? (manifest.defaultInstalled ? 'core' : 'catalog'),
      installedAt: existing?.installedAt ?? now,
      updatedAt: now,
      settings: existing?.settings ?? defaultSettings(manifest),
    });
    this.persistAndNotify();
    this.emitEvent(existing ? 'widget-updated' : 'widget-installed', {
      widgetId: manifest.id,
      version: manifest.version,
    });
    return { ok: true };
  }

  uninstall(widgetId: string): void {
    const record = this.records.get(widgetId);
    if (!record || record.source === 'core') return;
    this.records.delete(widgetId);
    this.persistAndNotify();
    this.emitEvent('widget-uninstalled', { widgetId });
  }

  setEnabled(widgetId: string, enabled: boolean): void {
    const record = this.records.get(widgetId);
    if (!record) return;
    this.records.set(widgetId, {
      ...record,
      enabled,
      updatedAt: new Date().toISOString(),
    });
    this.persistAndNotify();
  }

  updateSettings(widgetId: string, settings: Record<string, unknown>): void {
    const record = this.records.get(widgetId);
    if (!record) return;
    this.records.set(widgetId, {
      ...record,
      settings,
      updatedAt: new Date().toISOString(),
    });
    this.persistAndNotify();
  }

  __resetForTests(): void {
    this.records.clear();
    this.persistAndNotify();
  }

  private notify(): void {
    const nextRecords = this.getAll();
    for (const subscriber of this.subscribers) {
      subscriber(nextRecords);
    }
  }

  private persistAndNotify(): void {
    this.persist();
    this.notify();
  }

  private emitEvent(eventName: string, detail: Record<string, unknown>): void {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent(eventName, { detail }));
  }

  private persist(): void {
    try {
      const state: InstallStoreState = { records: this.getAll() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage errors in browser-restricted contexts
    }
  }

  private load(): void {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as InstallStoreState;
      for (const record of parsed.records ?? []) {
        if (!record?.widgetId) continue;
        this.records.set(record.widgetId, record);
      }
    } catch {
      this.records.clear();
    }
  }
}

function defaultSettings(manifest: WidgetManifest): Record<string, unknown> {
  const entries: [string, unknown][] = [];
  for (const field of manifest.settingsSchema?.fields ?? []) {
    entries.push([field.key, field.defaultValue ?? null]);
  }
  return Object.fromEntries(entries);
}

export const widgetInstallStore = new WidgetInstallStore();
