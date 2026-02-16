import { useState, useEffect, useMemo } from 'react';
import {
  type WidgetCatalogResponse,
  type WidgetInstallRecord,
} from '@myboard/sdk';
import { FEATURE_FLAGS } from '../config/feature-flags';
import { WIDGET_CATALOG } from '../config/widget-catalog';
import { fetchWidgetCatalog } from '../lib/widget-catalog';
import { widgetInstallStore } from '../lib/widget-install-store';

/**
 * Hook to manage the widget catalog and installed widgets state.
 * 
 * Responsibilities:
 * - Fetches the remote catalog (if enabled)
 * - Subscribes to the local installation store
 * - Merges catalog data with installation records
 * - Filters active widgets based on enabled state
 */
export function useWidgetCatalog() {
  const [catalog, setCatalog] = useState<WidgetCatalogResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [installedRecords, setInstalledRecords] = useState<WidgetInstallRecord[]>([]);

  // Load catalog and subscribe to store updates
  useEffect(() => {
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    const loadCatalog = async () => {
      const nextCatalog = FEATURE_FLAGS.marketplaceEnabled
        ? await fetchWidgetCatalog().catch((err: Error) => {
            if (!cancelled) setError(err.message);
            return WIDGET_CATALOG;
          })
        : WIDGET_CATALOG;

      if (cancelled) return;
      
      setCatalog(nextCatalog);
      
      // Initialize store with defaults from catalog
      widgetInstallStore.seedDefaults(nextCatalog);
      
      // Initial read
      setInstalledRecords(widgetInstallStore.getAll());
      
      // Subscribe to future changes
      unsubscribe = widgetInstallStore.subscribe((records) => {
        if (!cancelled) setInstalledRecords([...records]);
      });
    };

    loadCatalog().catch((err: Error) => {
      if (!cancelled) {
        setError(err.message);
        setCatalog(WIDGET_CATALOG);
      }
    });

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  const catalogData = catalog ?? WIDGET_CATALOG;

  // Optimized lookups
  const manifestMap = useMemo(
    () => new Map(catalogData.widgets.map((w) => [w.id, w] as const)),
    [catalogData]
  );

  const installedById = useMemo(
    () => new Map(installedRecords.map((r) => [r.widgetId, r] as const)),
    [installedRecords]
  );

  // Computed list of widgets that should be displayed
  const activeWidgets = useMemo(() => {
    const defaults = catalogData.widgets.filter((w) => w.defaultInstalled);
    
    if (!FEATURE_FLAGS.runtimeInstallEnabled) return defaults;
    if (installedRecords.length === 0) return defaults;

    return catalogData.widgets.filter((widget) => {
      const record = installedById.get(widget.id);
      return Boolean(record?.enabled);
    });
  }, [catalogData, installedById, installedRecords.length]);

  return {
    catalog: catalogData,
    error,
    installedRecords,
    manifestMap,
    installedById,
    activeWidgets,
    setError,
  };
}
