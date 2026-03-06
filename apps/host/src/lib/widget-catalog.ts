import type { WidgetCatalogResponse, WidgetManifest, WidgetPermission } from '@myboard/sdk';
import { TRUSTED_WIDGET_ORIGINS } from '../config/widget-catalog';

type ValidationOk = { ok: true; errors: [] };
type ValidationError = { ok: false; errors: string[] };
type ValidationResult = ValidationOk | ValidationError;

const VALID_PERMISSIONS: ReadonlyArray<WidgetPermission> = ['storage', 'events', 'network'];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isValidTag(tag: string): boolean {
  return /^[a-z][a-z0-9-]*-[a-z0-9-]+$/.test(tag);
}

function isValidVersion(version: string): boolean {
  return /^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?$/.test(version);
}

function hasValidFieldType(fieldType: unknown): boolean {
  return (
    fieldType === 'string' ||
    fieldType === 'number' ||
    fieldType === 'boolean' ||
    fieldType === 'select'
  );
}

function isTrustedUrl(url: string): boolean {
  if (url.startsWith('/')) return true;
  try {
    const parsed = new URL(url);
    return TRUSTED_WIDGET_ORIGINS.includes(parsed.origin);
  } catch {
    return false;
  }
}

export function validateManifest(manifest: unknown): ValidationResult {
  const errors: string[] = [];
  if (!isObject(manifest)) {
    return { ok: false, errors: ['MANIFEST_NOT_OBJECT'] };
  }

  const fields = ['id', 'title', 'tag', 'url', 'version', 'permissions'] as const;
  for (const field of fields) {
    if (!(field in manifest)) {
      errors.push(`MANIFEST_MISSING_${field.toUpperCase()}`);
    }
  }

  if (typeof manifest.id !== 'string' || manifest.id.length < 2) {
    errors.push('MANIFEST_INVALID_ID');
  }
  if (typeof manifest.title !== 'string' || manifest.title.length < 2) {
    errors.push('MANIFEST_INVALID_TITLE');
  }
  if (typeof manifest.tag !== 'string' || !isValidTag(manifest.tag)) {
    errors.push('MANIFEST_INVALID_TAG');
  }
  if (typeof manifest.url !== 'string' || !isTrustedUrl(manifest.url)) {
    errors.push('MANIFEST_UNTRUSTED_ORIGIN');
  }
  if (typeof manifest.version !== 'string' || !isValidVersion(manifest.version)) {
    errors.push('MANIFEST_INVALID_VERSION');
  }

  if (!Array.isArray(manifest.permissions)) {
    errors.push('MANIFEST_INVALID_PERMISSIONS');
  } else {
    for (const permission of manifest.permissions) {
      if (typeof permission !== 'string' || !VALID_PERMISSIONS.includes(permission as WidgetPermission)) {
        errors.push('MANIFEST_INVALID_PERMISSION_VALUE');
      }
    }
  }

  if ('settingsSchema' in manifest && manifest.settingsSchema !== undefined) {
    if (!isObject(manifest.settingsSchema) || !Array.isArray(manifest.settingsSchema.fields)) {
      errors.push('MANIFEST_INVALID_SETTINGS_SCHEMA');
    }
  }

  if ('automation' in manifest && manifest.automation !== undefined) {
    if (!isObject(manifest.automation)) {
      errors.push('MANIFEST_INVALID_AUTOMATION');
    } else {
      const events = manifest.automation.events;
      const actions = manifest.automation.actions;
      if (!Array.isArray(events) || !events.every((event) => isObject(event) && typeof event.key === 'string' && typeof event.label === 'string')) {
        errors.push('MANIFEST_INVALID_AUTOMATION_EVENTS');
      } else {
        const eventKeys = new Set<string>();
        for (const event of events) {
          if (eventKeys.has(event.key as string)) {
            errors.push('MANIFEST_DUPLICATE_AUTOMATION_EVENT');
            break;
          }
          eventKeys.add(event.key as string);
        }
      }
      if (!Array.isArray(actions)) {
        errors.push('MANIFEST_INVALID_AUTOMATION_ACTIONS');
      } else {
        const actionKeys = new Set<string>();
        for (const action of actions) {
          if (!isObject(action) || typeof action.key !== 'string' || typeof action.label !== 'string') {
            errors.push('MANIFEST_INVALID_AUTOMATION_ACTION');
            continue;
          }
          if (actionKeys.has(action.key)) {
            errors.push('MANIFEST_DUPLICATE_AUTOMATION_ACTION');
          }
          actionKeys.add(action.key);
          if (action.payloadFields !== undefined) {
            if (!Array.isArray(action.payloadFields)) {
              errors.push('MANIFEST_INVALID_AUTOMATION_PAYLOAD_FIELDS');
              continue;
            }
            for (const field of action.payloadFields) {
              if (!isObject(field) || typeof field.key !== 'string' || !hasValidFieldType(field.type)) {
                errors.push('MANIFEST_INVALID_AUTOMATION_PAYLOAD_FIELD');
              }
            }
          }
        }
      }
    }
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }
  return { ok: true, errors: [] };
}

export function validateCatalogResponse(catalog: unknown): ValidationResult {
  const errors: string[] = [];
  if (!isObject(catalog)) {
    return { ok: false, errors: ['CATALOG_NOT_OBJECT'] };
  }
  if (typeof catalog.version !== 'string' || catalog.version.length < 3) {
    errors.push('CATALOG_INVALID_VERSION');
  }
  if (typeof catalog.generatedAt !== 'string') {
    errors.push('CATALOG_INVALID_GENERATED_AT');
  }
  if (!Array.isArray(catalog.widgets)) {
    errors.push('CATALOG_INVALID_WIDGETS');
  } else {
    const ids = new Set<string>();
    for (const widget of catalog.widgets) {
      const result = validateManifest(widget);
      if (!result.ok) {
        errors.push(...result.errors);
      } else if (isObject(widget)) {
        const id = widget.id as string;
        if (ids.has(id)) errors.push(`CATALOG_DUPLICATE_WIDGET_ID:${id}`);
        ids.add(id);
      }
    }
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }
  return { ok: true, errors: [] };
}

export async function fetchWidgetCatalog(): Promise<WidgetCatalogResponse> {
  const response = await fetch('/api/widgets/catalog');
  if (!response.ok) {
    throw new Error(`CATALOG_FETCH_FAILED:${response.status}`);
  }
  const payload = (await response.json()) as WidgetCatalogResponse;
  const validation = validateCatalogResponse(payload);
  if (!validation.ok) {
    throw new Error(`CATALOG_SCHEMA_INVALID:${validation.errors.join(',')}`);
  }
  return payload;
}

export function findManifest(
  catalog: WidgetCatalogResponse,
  widgetId: string
): WidgetManifest | undefined {
  return catalog.widgets.find((widget) => widget.id === widgetId);
}

