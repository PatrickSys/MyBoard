'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import type { WidgetManifest, WidgetPermission } from '@myboard/sdk';
import { eventBus, registerHostBridge } from '@myboard/sdk';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import SafeWidgetSlot from './SafeWidgetSlot';
import DebugPanel from './DebugPanel';
import WidgetMarketplace from './WidgetMarketplace';
import WidgetSettingsPanel from './WidgetSettingsPanel';
import DashboardHeader from './DashboardHeader';
import AutomationStudio from './AutomationStudio';
import SystemMonitor from './SystemMonitor';
import NotificationHub from './NotificationHub';

import { widgetInstallStore } from '../lib/widget-install-store';
import { canRequestCapability } from '../lib/widget-policy';
import {
  runtimeKernel,
  syncKernelManifests,
} from '../lib/runtime-kernel-singleton';
import { useWidgetCatalog } from '../hooks/useWidgetCatalog';
import { useDashboardLayout } from '../hooks/useDashboardLayout';
import { useAutomationRuntime } from '../hooks/useAutomationRuntime';
import { usePageStore } from '../hooks/usePageStore';

const ResponsiveGridLayout = WidthProvider(Responsive);

const GRID_BREAKPOINTS = { lg: 1200, md: 900, sm: 0 } as const;
const GRID_COLUMNS = { lg: 4, md: 2, sm: 1 } as const;

function serializeSettings(settings: Record<string, unknown> | undefined): string {
  return JSON.stringify(settings ?? {});
}

function manifestTrustedOrigin(url: string): string | undefined {
  if (!url.startsWith('http://') && !url.startsWith('https://'))
    return undefined;
  try {
    return new URL(url).origin;
  } catch {
    return undefined;
  }
}

/**
 * Main dashboard container (Phase 2: OS Shell).
 *
 * Architecture:
 * - Data Layer: `useWidgetCatalog` manages registry and active status.
 * - Page Layer: `usePageStore` manages multi-page state and persistence.
 * - Layout Layer: `useDashboardLayout` manages grid state per page.
 * - Automation Layer: `useAutomationRuntime` executes cross-widget wires.
 * - Presentation: Composes OS-level overlays (Studio, Monitor, Notifications).
 */
export default function GridDashboard() {
  // --- Local UI State ---
  const [isEditing, setIsEditing] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [devMode, setDevMode] = useState(false);
  const [isMarketplaceOpen, setIsMarketplaceOpen] = useState(false);
  const [isAutomationOpen, setIsAutomationOpen] = useState(false);
  const [isMonitorOpen, setIsMonitorOpen] = useState(false);
  const [settingsWidgetId, setSettingsWidgetId] = useState<string | null>(null);
  const publishedSettingsRef = useRef(new Map<string, string>());

  // --- Data & Logic Hooks ---
  const {
    catalog,
    error: catalogError,
    installedRecords,
    activeWidgets,
    manifestMap,
    installedById,
    setError: setCatalogError,
  } = useWidgetCatalog();

  // --- Page Store ---
  const pageStore = usePageStore(installedRecords);
  const {
    pages,
    activePageId,
    activePage,
    setActivePage,
    createPage,
    renamePage,
    deletePage,
    addWidgetToPage,
    removeWidgetFromPage,
    updatePageLayout,
    resetPageLayout,
  } = pageStore;

  // Filter active widgets to those on the current page
  const pageWidgets = useMemo(() => {
    const pageWidgetIds = new Set(activePage.widgetIds);
    return activeWidgets.filter((w) => pageWidgetIds.has(w.id));
  }, [activeWidgets, activePage.widgetIds]);

  const currentPageWidgetIds = useMemo(
    () => new Set(activePage.widgetIds),
    [activePage.widgetIds]
  );

  const handlePageLayoutChange = useCallback(
    (layout: { i: string; x: number; y: number; w: number; h: number }[]) => {
      updatePageLayout(activePageId, layout);
    },
    [activePageId, updatePageLayout]
  );

  const handlePageResetLayout = useCallback(() => {
    resetPageLayout(activePageId, activeWidgets);
  }, [activePageId, activeWidgets, resetPageLayout]);

  const { layout, handleLayoutChange, resetLayout } = useDashboardLayout(
    pageWidgets,
    activePage.layout,
    activePageId,
    handlePageLayoutChange,
    handlePageResetLayout
  );

  // Initialize the automation execution engine
  useAutomationRuntime();

  useEffect(() => {
    syncKernelManifests(catalog?.widgets ?? []);
  }, [catalog]);

  // --- Side Effects ---

  // Persist theme
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('myboard.theme');
      if (savedTheme) setTheme(savedTheme as 'light' | 'dark');
    } catch {
      /* ignore */
    }
  }, []);

  // Persist devMode
  useEffect(() => {
    try {
      setDevMode(localStorage.getItem('myboard.devMode') === 'true');
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('myboard.devMode', String(devMode));
    } catch {
      /* ignore */
    }
  }, [devMode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('myboard.theme', theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true' ||
        target.closest('.slot__webc') !== null;

      if (isTyping) return;

      if (e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (e.key === 'E') {
          e.preventDefault();
          setIsEditing((p) => !p);
        }
        if (e.key === 'R') {
          e.preventDefault();
          resetLayout();
        }
        if (e.key === 'M') {
          e.preventDefault();
          setIsMarketplaceOpen((p) => !p);
        }
        if (e.key === 'A') {
          e.preventDefault();
          setIsAutomationOpen((p) => !p);
        }
        if (e.key === 'Escape') {
          e.preventDefault();
          setIsMonitorOpen((p) => !p);
        }
        if (e.key === 'D') {
          e.preventDefault();
          setDevMode((p) => !p);
        }
        // Page navigation: Shift+[ (previous) and Shift+] (next)
        if (e.key === '{') {
          e.preventDefault();
          const idx = pages.findIndex((p) => p.id === activePageId);
          if (idx > 0) setActivePage(pages[idx - 1].id);
        }
        if (e.key === '}') {
          e.preventDefault();
          const idx = pages.findIndex((p) => p.id === activePageId);
          if (idx < pages.length - 1) setActivePage(pages[idx + 1].id);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [resetLayout, pages, activePageId, setActivePage]);

  // Register Host Bridge and push canonical settings into mounted widgets.
  useEffect(() => {
    registerHostBridge({
      ...runtimeKernel.bridge,
      requestHostCapability: (
        permission: WidgetPermission,
        widgetId?: string
      ) => {
        if (!widgetId) return false;
        const manifest = manifestMap.get(widgetId);
        const decision = canRequestCapability(manifest, permission);
        return decision.allowed;
      },
      getWidgetSettings: <T,>(widgetId: string) =>
        installedById.get(widgetId)?.settings as T | undefined,
      setWidgetSettings: <T,>(widgetId: string, settings: T) =>
        widgetInstallStore.updateSettings(
          widgetId,
          settings as Record<string, unknown>
        ),
    });

    const nextPublishedSettings = new Map<string, string>();
    for (const [widgetId, record] of installedById.entries()) {
      const serializedSettings = serializeSettings(record.settings);
      nextPublishedSettings.set(widgetId, serializedSettings);

      if (publishedSettingsRef.current.get(widgetId) === serializedSettings) {
        continue;
      }

      eventBus.publish('host', 'settings-updated', {
        widgetId,
        settings: record.settings ?? {},
      });
    }

    publishedSettingsRef.current = nextPublishedSettings;
  }, [installedById, manifestMap]);

  // --- Computed Views ---

  const items = useMemo(() => {
    const map = new Map(layout.map((entry) => [entry.i, entry] as const));
    return pageWidgets.map((widget) => ({
      widget,
      layout: map.get(widget.id),
    }));
  }, [pageWidgets, layout]);

  const gridClassName = isEditing ? 'rgl rgl--editing' : 'rgl';

  const selectedManifest = settingsWidgetId
    ? manifestMap.get(settingsWidgetId) ?? null
    : null;
  const selectedSettings = settingsWidgetId
    ? installedById.get(settingsWidgetId)?.settings ?? {}
    : {};

  // --- Handlers ---

  const handleInstall = (manifest: WidgetManifest) => {
    const result = widgetInstallStore.install(manifest);
    if (!result.ok) {
      setCatalogError(`${result.code}: ${result.reason}`);
      return;
    }
    setCatalogError(null);
    // Auto-add newly installed widget to current page
    addWidgetToPage(activePageId, manifest.id);
  };

  const handleUninstall = (id: string) => {
    widgetInstallStore.uninstall(id);
    // Pruning from all pages is handled by usePageStore's installedRecords effect
  };

  const handleAddToPage = useCallback(
    (widgetId: string) => addWidgetToPage(activePageId, widgetId),
    [activePageId, addWidgetToPage]
  );

  const handleRemoveFromPage = useCallback(
    (widgetId: string) => removeWidgetFromPage(activePageId, widgetId),
    [activePageId, removeWidgetFromPage]
  );

  const handleSaveSettings = (settings: Record<string, unknown>) => {
    if (!settingsWidgetId) return;
    widgetInstallStore.updateSettings(settingsWidgetId, settings);
    publishedSettingsRef.current = new Map(publishedSettingsRef.current).set(
      settingsWidgetId,
      serializeSettings(settings)
    );
    eventBus.publish('host', 'settings-updated', {
      widgetId: settingsWidgetId,
      settings,
    });
  };

  return (
    <main className="wrap">
      <DashboardHeader
        theme={theme}
        isEditing={isEditing}
        devMode={devMode}
        pages={pages}
        activePageId={activePageId}
        onSelectPage={setActivePage}
        onCreatePage={createPage}
        onRenamePage={renamePage}
        onDeletePage={deletePage}
        onToggleTheme={() =>
          setTheme((p) => (p === 'light' ? 'dark' : 'light'))
        }
        onToggleEdit={() => setIsEditing((p) => !p)}
        onResetLayout={resetLayout}
        onOpenMarketplace={() => setIsMarketplaceOpen(true)}
        onOpenAutomation={() => setIsAutomationOpen(true)}
        onOpenMonitor={() => setIsMonitorOpen(true)}
        onToggleDevMode={() => setDevMode((p) => !p)}
      />

      <ResponsiveGridLayout
        className={gridClassName}
        breakpoints={GRID_BREAKPOINTS}
        cols={GRID_COLUMNS}
        rowHeight={100}
        isDraggable={isEditing && !isAutomationOpen}
        isResizable={isEditing && !isAutomationOpen}
        margin={[16, 16]}
        layouts={{ lg: layout, md: layout, sm: layout }}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".slot__hdr"
        compactType={null}
        preventCollision={false}
      >
        {items.map(({ widget, layout: itemLayout }) => (
          <div
            key={widget.id}
            className="grid-item"
            data-widget-id={widget.id}
            data-grid={{
              i: widget.id,
              x: itemLayout?.x ?? 0,
              y: itemLayout?.y ?? 0,
              w: itemLayout?.w ?? 2,
              h: itemLayout?.h ?? 3,
              minH: widget.layoutDefaults?.minH ?? 2,
              minW: widget.layoutDefaults?.minW ?? 1,
            }}
          >
            <SafeWidgetSlot
              id={widget.id}
              title={widget.title}
              tag={widget.tag}
              url={widget.url}
              integrity={widget.integrity}
              trustedOrigin={manifestTrustedOrigin(widget.url)}
              devMode={devMode}
            />
          </div>
        ))}
      </ResponsiveGridLayout>

      <WidgetMarketplace
        isOpen={isMarketplaceOpen}
        catalog={catalog}
        installedRecords={installedRecords}
        errorMessage={catalogError ?? undefined}
        currentPageWidgetIds={currentPageWidgetIds}
        onClose={() => setIsMarketplaceOpen(false)}
        onInstall={handleInstall}
        onUninstall={handleUninstall}
        onToggleEnabled={(id, enabled) =>
          widgetInstallStore.setEnabled(id, enabled)
        }
        onOpenSettings={(id) => setSettingsWidgetId(id)}
        onAddToPage={handleAddToPage}
        onRemoveFromPage={handleRemoveFromPage}
      />

      <WidgetSettingsPanel
        manifest={selectedManifest}
        initialSettings={selectedSettings as Record<string, unknown>}
        onClose={() => setSettingsWidgetId(null)}
        onSave={handleSaveSettings}
      />

      {devMode && (
        <AutomationStudio
          isOpen={isAutomationOpen}
          activeWidgets={activeWidgets}
          onClose={() => setIsAutomationOpen(false)}
        />
      )}

      {devMode && (
        <SystemMonitor
          isOpen={isMonitorOpen}
          activeWidgets={activeWidgets}
          onClose={() => setIsMonitorOpen(false)}
        />
      )}

      <NotificationHub />

      {devMode && <DebugPanel />}
    </main>
  );
}
