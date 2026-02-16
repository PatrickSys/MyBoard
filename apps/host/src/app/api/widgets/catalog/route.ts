import { NextResponse } from 'next/server';
import { WIDGET_CATALOG } from '../../../../config/widget-catalog';
import { FEATURE_FLAGS } from '../../../../config/feature-flags';
import { validateCatalogResponse } from '../../../../lib/widget-catalog';
import { generateReportOnlyCsp } from '../../../../lib/widget-csp';

export async function GET() {
  const validation = validateCatalogResponse(WIDGET_CATALOG);
  if (!validation.ok) {
    return NextResponse.json(
      { error: 'CATALOG_SCHEMA_INVALID', details: validation.errors },
      { status: 500 }
    );
  }

  const response = NextResponse.json(WIDGET_CATALOG);
  if (FEATURE_FLAGS.cspReportOnlyEnabled) {
    response.headers.set(
      'Content-Security-Policy-Report-Only',
      generateReportOnlyCsp(WIDGET_CATALOG.widgets)
    );
  }
  return response;
}

