import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GridDashboard from '../src/components/GridDashboard';
import { eventBus, registerHostBridge } from '@myboard/sdk';
import { useWidgetCatalog } from '../src/hooks/useWidgetCatalog';
import { widgetInstallStore } from '../src/lib/widget-install-store';

jest.mock('react-grid-layout', () => ({
  Responsive: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  WidthProvider: (component: unknown) => component,
}));

jest.mock('@myboard/sdk', () => ({
  eventBus: {
    publish: jest.fn(),
  },
  registerHostBridge: jest.fn(),
}));

jest.mock('../src/hooks/useWidgetCatalog');
jest.mock('../src/hooks/useDashboardLayout', () => ({
  useDashboardLayout: () => ({
    layout: [{ i: 'notes', x: 0, y: 0, w: 2, h: 3, minH: 2, minW: 1 }],
    handleLayoutChange: jest.fn(),
    resetLayout: jest.fn(),
  }),
}));
jest.mock('../src/hooks/useAutomationRuntime', () => ({
  useAutomationRuntime: jest.fn(),
}));
jest.mock('../src/lib/runtime-kernel-singleton', () => ({
  runtimeKernel: { bridge: {} },
  syncKernelManifests: jest.fn(),
}));
jest.mock('../src/lib/widget-policy', () => ({
  canRequestCapability: jest.fn(() => ({ allowed: true })),
}));
jest.mock('../src/lib/widget-install-store', () => ({
  widgetInstallStore: {
    updateSettings: jest.fn(),
    install: jest.fn(() => ({ ok: true })),
    uninstall: jest.fn(),
    setEnabled: jest.fn(),
  },
}));
jest.mock('../src/components/SafeWidgetSlot', () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <div>{title}</div>,
}));
jest.mock('../src/components/DashboardHeader', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('../src/components/AutomationStudio', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('../src/components/Monitor', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('../src/components/NotificationHub', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('../src/components/WidgetMarketplace', () => ({
  __esModule: true,
  default: ({ onOpenSettings }: { onOpenSettings: (id: string) => void }) => (
    <button onClick={() => onOpenSettings('notes')} type="button">
      open-settings
    </button>
  ),
}));
jest.mock('../src/components/WidgetSettingsPanel', () => ({
  __esModule: true,
  default: ({
    manifest,
    onSave,
  }: {
    manifest: { id: string } | null;
    onSave: (settings: Record<string, unknown>) => void;
  }) =>
    manifest ? (
      <button
        onClick={() => onSave({ showArchived: true })}
        type="button"
      >
        save-settings
      </button>
    ) : null,
}));

type MockCatalogState = ReturnType<typeof createCatalogState>;

const mockUseWidgetCatalog = useWidgetCatalog as jest.MockedFunction<
  typeof useWidgetCatalog
>;
const mockPublish = eventBus.publish as jest.MockedFunction<
  typeof eventBus.publish
>;
const mockRegisterHostBridge = registerHostBridge as jest.MockedFunction<
  typeof registerHostBridge
>;
const mockUpdateSettings = widgetInstallStore.updateSettings as jest.Mock;

let currentCatalogState: MockCatalogState;

function createCatalogState(
  settings: Record<string, unknown> = { showArchived: false }
) {
  const manifest = {
    id: 'notes',
    title: 'Notes',
    tag: 'mb-notes',
    url: '/widgets/mb-notes.js',
    layoutDefaults: { x: 0, y: 0, w: 2, h: 3, minH: 2, minW: 1 },
  };
  const record = {
    widgetId: 'notes',
    enabled: true,
    settings,
  };

  return {
    catalog: { widgets: [manifest] },
    error: null,
    installedRecords: [record],
    activeWidgets: [manifest],
    manifestMap: new Map([[manifest.id, manifest]]),
    installedById: new Map([[record.widgetId, record]]),
    setError: jest.fn(),
  };
}

describe('GridDashboard settings hydration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    currentCatalogState = createCatalogState();
    mockUseWidgetCatalog.mockImplementation(() => currentCatalogState);
  });

  it('publishes canonical settings on mount but not again for unchanged snapshots', () => {
    const { rerender } = render(<GridDashboard />);

    expect(mockRegisterHostBridge).toHaveBeenCalledTimes(1);
    expect(mockPublish).toHaveBeenCalledTimes(1);
    expect(mockPublish).toHaveBeenCalledWith('host', 'settings-updated', {
      widgetId: 'notes',
      settings: { showArchived: false },
    });

    currentCatalogState = createCatalogState({ showArchived: false });
    rerender(<GridDashboard />);

    expect(mockRegisterHostBridge).toHaveBeenCalledTimes(2);
    expect(mockPublish).toHaveBeenCalledTimes(1);
  });

  it('does not double-publish after saving settings and receiving the store refresh', () => {
    const { rerender } = render(<GridDashboard />);

    fireEvent.click(screen.getByRole('button', { name: 'open-settings' }));

    mockPublish.mockClear();

    fireEvent.click(screen.getByRole('button', { name: 'save-settings' }));

    expect(mockUpdateSettings).toHaveBeenCalledWith('notes', {
      showArchived: true,
    });
    expect(mockPublish).toHaveBeenCalledTimes(1);
    expect(mockPublish).toHaveBeenCalledWith('host', 'settings-updated', {
      widgetId: 'notes',
      settings: { showArchived: true },
    });

    currentCatalogState = createCatalogState({ showArchived: true });
    rerender(<GridDashboard />);

    expect(mockPublish).toHaveBeenCalledTimes(1);
  });
});
