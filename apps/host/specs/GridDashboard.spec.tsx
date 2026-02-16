import React from 'react';
import { render, screen, fireEvent, waitFor, act, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import GridDashboard from '../src/components/GridDashboard';
import { widgetInstallStore } from '../src/lib/widget-install-store';
import { fetchWidgetCatalog } from '../src/lib/widget-catalog';
import { WIDGET_CATALOG } from '../src/config/widget-catalog';
import * as widgetLoader from '../src/lib/widget-loader';

// Mock react-grid-layout
jest.mock('react-grid-layout', () => ({
  Responsive: ({ children }: any) => <div className="mock-rgl">{children}</div>,
  WidthProvider: (cmp: any) => cmp,
}));

// Mock necessary modules
jest.mock('../src/lib/widget-catalog');
jest.mock('../src/lib/widget-loader');
jest.mock('../src/lib/performance-tracker');

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    clear: () => { store = {}; },
    removeItem: (key: string) => { delete store[key]; },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('GridDashboard Integration', () => {
  const mockFetchCatalog = fetchWidgetCatalog as jest.MockedFunction<typeof fetchWidgetCatalog>;
  const mockEnsureLoaded = widgetLoader.ensureLoaded as jest.MockedFunction<typeof widgetLoader.ensureLoaded>;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    widgetInstallStore.__resetForTests();
    mockFetchCatalog.mockResolvedValue(WIDGET_CATALOG);
    mockEnsureLoaded.mockResolvedValue(undefined);
    window.confirm = jest.fn().mockReturnValue(true);
  });

  it('should render core widgets by default', async () => {
    render(<GridDashboard />);

    await waitFor(() => {
      expect(screen.getByText('Notes')).toBeInTheDocument();
      expect(screen.getByText('Pomodoro')).toBeInTheDocument();
      expect(screen.getByText('Productivity Insights')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should open marketplace and install a new widget', async () => {
    mockFetchCatalog.mockResolvedValueOnce({
      ...WIDGET_CATALOG,
      widgets: WIDGET_CATALOG.widgets.map((widget) =>
        widget.id === 'taskboard' ? { ...widget, defaultInstalled: false } : widget
      ),
    });

    render(<GridDashboard />);

    await waitFor(() => expect(screen.getByText('Marketplace')).toBeInTheDocument());
    expect(screen.queryByText('Task Board')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Marketplace'));
    expect(screen.getByText('Widget Marketplace')).toBeInTheDocument();

    const taskBoardArticle = await screen.findByLabelText(/Widget: Task Board/i);
    const installBtn = within(taskBoardArticle).getByRole('button', { name: 'Install' });
    
    await act(async () => {
      fireEvent.click(installBtn);
    });

    fireEvent.click(screen.getByText('Close'));

    await waitFor(() => {
      expect(screen.getByText('Task Board')).toBeInTheDocument();
    });
  });

  it('should open settings and update widget settings', async () => {
    render(<GridDashboard />);

    await waitFor(() => expect(screen.getByText('Marketplace')).toBeInTheDocument());
    fireEvent.click(screen.getByText('Marketplace'));
    
    // Use aria-label to find the specific widget article
    const notesArticle = await screen.findByLabelText(/Widget: Notes/i);
    const settingsBtn = within(notesArticle).getByRole('button', { name: /Settings/i });

    await act(async () => {
      fireEvent.click(settingsBtn);
    });

    expect(screen.getByText('Notes Settings')).toBeInTheDocument();

    const checkbox = screen.getByLabelText('Show archived notes');
    fireEvent.click(checkbox);
    
    await act(async () => {
      fireEvent.click(screen.getByText('Save'));
    });

    await waitFor(() => {
      const record = widgetInstallStore.get('notes');
      expect(record?.settings).toEqual({ showArchived: true });
    });
  });

  it('should toggle theme', async () => {
    render(<GridDashboard />);

    await waitFor(() => expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument());
    const themeBtn = screen.getByLabelText('Toggle theme');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    fireEvent.click(themeBtn);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should toggle edit mode', async () => {
    render(<GridDashboard />);

    await waitFor(() => expect(screen.getByText('Edit Layout')).toBeInTheDocument());
    const editBtn = screen.getByText('Edit Layout');
    fireEvent.click(editBtn);
    expect(screen.getByText('Edit Mode')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Done'));
    expect(screen.getByText('View Mode')).toBeInTheDocument();
  });
});
