export type WidgetPermission = 'storage' | 'events' | 'network';

export interface WidgetLayoutDefaults {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  minH?: number;
  minW?: number;
}

export type WidgetSettingsFieldType = 'string' | 'number' | 'boolean' | 'select';

export interface WidgetSettingsField {
  key: string;
  label: string;
  type: WidgetSettingsFieldType;
  description?: string;
  defaultValue?: string | number | boolean;
  options?: ReadonlyArray<{ label: string; value: string }>;
  min?: number;
  max?: number;
}

export interface WidgetSettingsSchema {
  title?: string;
  fields: ReadonlyArray<WidgetSettingsField>;
}

export interface WidgetAutomationEventDefinition {
  key: string;
  label: string;
  description?: string;
}

export interface WidgetAutomationActionDefinition {
  key: string;
  label: string;
  description?: string;
  payloadFields?: ReadonlyArray<WidgetSettingsField>;
}

export interface WidgetAutomationSchema {
  events: ReadonlyArray<WidgetAutomationEventDefinition>;
  actions: ReadonlyArray<WidgetAutomationActionDefinition>;
}

export interface WidgetManifestCompat {
  minHostVersion?: string;
}

export interface WidgetManifest {
  id: string;
  title: string;
  description?: string;
  tag: string;
  url: string;
  version: string;
  integrity?: string;
  permissions: ReadonlyArray<WidgetPermission>;
  settingsSchema?: WidgetSettingsSchema;
  automation?: WidgetAutomationSchema;
  layoutDefaults?: WidgetLayoutDefaults;
  compat?: WidgetManifestCompat;
  defaultInstalled?: boolean;
}

export interface WidgetInstallRecord {
  widgetId: string;
  installedVersion: string;
  enabled: boolean;
  source: 'core' | 'catalog';
  settings?: Record<string, unknown>;
  installedAt: string;
  updatedAt: string;
}

export interface WidgetCatalogResponse {
  version: string;
  generatedAt: string;
  widgets: ReadonlyArray<WidgetManifest>;
}

