import type {
  WidgetAutomationActionDefinition,
  WidgetManifest,
  WidgetPermission,
} from '@myboard/sdk';
import { FEATURE_FLAGS } from '../config/feature-flags';
import { TRUSTED_WIDGET_ORIGINS } from '../config/widget-catalog';
import { validateManifest } from './widget-catalog';

export type PolicyDecision =
  | { allowed: true }
  | { allowed: false; code: string; reason: string };

function parseUrl(url: string): URL | null {
  try {
    return new URL(url, window.location.origin);
  } catch {
    return null;
  }
}

function isTrustedOrigin(url: string): boolean {
  if (url.startsWith('/')) return true;
  const parsed = parseUrl(url);
  if (!parsed) return false;
  return TRUSTED_WIDGET_ORIGINS.includes(parsed.origin);
}

export function canInstall(manifest: WidgetManifest): PolicyDecision {
  const validation = validateManifest(manifest);
  if (!validation.ok) {
    return {
      allowed: false,
      code: 'CATALOG_SCHEMA_INVALID',
      reason: validation.errors.join(', '),
    };
  }

  if (!isTrustedOrigin(manifest.url)) {
    return {
      allowed: false,
      code: 'MANIFEST_UNTRUSTED_ORIGIN',
      reason: `URL ${manifest.url} is not in trusted origins`,
    };
  }

  return { allowed: true };
}

export function canLoad(manifest: WidgetManifest): PolicyDecision {
  const installDecision = canInstall(manifest);
  if (!installDecision.allowed) return installDecision;
  return { allowed: true };
}

export function canRequestCapability(
  manifest: WidgetManifest | undefined,
  permission: WidgetPermission
): PolicyDecision {
  if (!FEATURE_FLAGS.capabilityEnforcementEnabled) {
    return { allowed: true };
  }

  if (!manifest) {
    return {
      allowed: false,
      code: 'CAPABILITY_WIDGET_UNKNOWN',
      reason: 'Widget manifest not found',
    };
  }

  if (!manifest.permissions.includes(permission)) {
    return {
      allowed: false,
      code: 'CAPABILITY_NOT_DECLARED',
      reason: `${manifest.id} does not declare ${permission}`,
    };
  }

  if (permission === 'network' && !isTrustedOrigin(manifest.url)) {
    return {
      allowed: false,
      code: 'CAPABILITY_NETWORK_DENIED',
      reason: 'Network permission denied for untrusted origin',
    };
  }

  return { allowed: true };
}

export function canDispatchCommand(
  manifest: WidgetManifest | undefined,
  commandType: string
): PolicyDecision {
  if (!manifest) {
    return {
      allowed: false,
      code: 'COMMAND_WIDGET_UNKNOWN',
      reason: 'Widget manifest not found',
    };
  }

  const actions = manifest.automation?.actions ?? [];
  const match = actions.find((action) => action.key === commandType);
  if (!match) {
    return {
      allowed: false,
      code: 'COMMAND_ACTION_NOT_DECLARED',
      reason: `${manifest.id} does not declare action ${commandType}`,
    };
  }

  if (!isActionAllowed(manifest, match)) {
    return {
      allowed: false,
      code: 'COMMAND_ACTION_BLOCKED',
      reason: `${manifest.id} action ${commandType} blocked by policy`,
    };
  }

  return { allowed: true };
}

function isActionAllowed(
  manifest: WidgetManifest,
  action: WidgetAutomationActionDefinition
): boolean {
  const networkAction = action.key.startsWith('network.');
  if (networkAction && !manifest.permissions.includes('network')) {
    return false;
  }
  return true;
}

