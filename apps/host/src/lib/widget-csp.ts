import type { WidgetManifest } from '@myboard/sdk';

function parseOrigin(url: string): string | null {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return null;
  }

  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

function dedupeAndSort(values: ReadonlyArray<string>): string[] {
  return Array.from(new Set(values)).sort((left, right) => left.localeCompare(right));
}

export function collectWidgetScriptOrigins(
  manifests: ReadonlyArray<WidgetManifest>
): ReadonlyArray<string> {
  const origins: string[] = [];
  for (const manifest of manifests) {
    const origin = parseOrigin(manifest.url);
    if (origin) origins.push(origin);
  }
  return dedupeAndSort(origins);
}

export function collectWidgetConnectOrigins(
  manifests: ReadonlyArray<WidgetManifest>
): ReadonlyArray<string> {
  const origins: string[] = [];
  for (const manifest of manifests) {
    if (!manifest.permissions.includes('network')) continue;
    const origin = parseOrigin(manifest.url);
    if (origin) origins.push(origin);
  }
  return dedupeAndSort(origins);
}

export function generateReportOnlyCsp(
  manifests: ReadonlyArray<WidgetManifest>,
  reportEndpoint = '/api/security/csp-report'
): string {
  const scriptOrigins = collectWidgetScriptOrigins(manifests);
  const connectOrigins = collectWidgetConnectOrigins(manifests);
  const scriptSources = ["'self'", ...scriptOrigins].join(' ');
  const connectSources = ["'self'", ...connectOrigins].join(' ');

  const directives = [
    "default-src 'self'",
    `script-src ${scriptSources}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    `connect-src ${connectSources}`,
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
    `report-uri ${reportEndpoint}`,
  ];

  return directives.join('; ');
}

