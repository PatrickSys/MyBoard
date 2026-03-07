'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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
 * - Layout Layer: `useDashboardLayout` manages grid state.
 * - Automation Layer: `useAutomationRuntime` executes cross-widget wires.
 * - Presentation: Composes OS-level overlays (Studio, Monitor, Notifications).
 */
export default function GridDashboard() {
  // --- Local UI State ---
  const [isEditing, setIsEditing] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
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

  const { layout, handleLayoutChange, resetLayout } =
    useDashboardLayout(activeWidgets);

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
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [resetLayout]);

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
    return activeWidgets.map((widget) => ({
      widget,
      layout: map.get(widget.id),
    }));
  }, [activeWidgets, layout]);

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
  };

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
        onToggleTheme={() =>
          setTheme((p) => (p === 'light' ? 'dark' : 'light'))
        }
        onToggleEdit={() => setIsEditing((p) => !p)}
        onResetLayout={resetLayout}
        onOpenMarketplace={() => setIsMarketplaceOpen(true)}
        onOpenAutomation={() => setIsAutomationOpen(true)}
        onOpenMonitor={() => setIsMonitorOpen(true)}
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
            />
          </div>
        ))}
      </ResponsiveGridLayout>

      <WidgetMarketplace
        isOpen={isMarketplaceOpen}
        catalog={catalog}
        installedRecords={installedRecords}
        errorMessage={catalogError ?? undefined}
        onClose={() => setIsMarketplaceOpen(false)}
        onInstall={handleInstall}
        onUninstall={(id) => widgetInstallStore.uninstall(id)}
        onToggleEnabled={(id, enabled) =>
          widgetInstallStore.setEnabled(id, enabled)
        }
        onOpenSettings={(id) => setSettingsWidgetId(id)}
      />

      <WidgetSettingsPanel
        manifest={selectedManifest}
        initialSettings={selectedSettings as Record<string, unknown>}
        onClose={() => setSettingsWidgetId(null)}
        onSave={handleSaveSettings}
      />

      <AutomationStudio
        isOpen={isAutomationOpen}
        activeWidgets={activeWidgets}
        onClose={() => setIsAutomationOpen(false)}
      />

      <SystemMonitor
        isOpen={isMonitorOpen}
        activeWidgets={activeWidgets}
        onClose={() => setIsMonitorOpen(false)}
      />

      <NotificationHub />

      <DebugPanel />
    </main>
  );
}
