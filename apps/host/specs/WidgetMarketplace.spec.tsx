import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WidgetMarketplace from '../src/components/WidgetMarketplace';
import type { WidgetCatalogResponse, WidgetManifest, WidgetInstallRecord } from '@myboard/sdk';

const mockCatalog: WidgetCatalogResponse = {
  version: '1.0.0',
  generatedAt: new Date().toISOString(),
  widgets: [
    {
      id: 'test-widget',
      title: 'Test Widget',
      description: 'A test widget description',
      tag: 'test-widget',
      url: '/test.js',
      version: '1.0.0',
      permissions: ['storage'],
      defaultInstalled: false,
    },
    {
      id: 'installed-widget',
      title: 'Installed Widget',
      tag: 'installed-widget',
      url: '/installed.js',
      version: '1.1.0',
      permissions: ['events'],
      defaultInstalled: true,
    }
  ],
};

const mockInstalled: WidgetInstallRecord[] = [
  {
    widgetId: 'installed-widget',
    installedVersion: '1.1.0',
    enabled: true,
    source: 'core',
    installedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

describe('WidgetMarketplace', () => {
  const mockOnClose = jest.fn();
  const mockOnInstall = jest.fn();
  const mockOnUninstall = jest.fn();
  const mockOnToggleEnabled = jest.fn();
  const mockOnOpenSettings = jest.fn();

  const defaultProps = {
    isOpen: true,
    catalog: mockCatalog,
    installedRecords: mockInstalled,
    onClose: mockOnClose,
    onInstall: mockOnInstall,
    onUninstall: mockOnUninstall,
    onToggleEnabled: mockOnToggleEnabled,
    onOpenSettings: mockOnOpenSettings,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    window.confirm = jest.fn().mockReturnValue(true);
  });

  it('should not render when isOpen is false', () => {
    render(<WidgetMarketplace {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Widget Marketplace')).not.toBeInTheDocument();
  });

  it('should render catalog widgets', () => {
    render(<WidgetMarketplace {...defaultProps} />);
    expect(screen.getByText('Test Widget')).toBeInTheDocument();
    expect(screen.getByText('Installed Widget')).toBeInTheDocument();
  });

  it('should filter widgets by search query', () => {
    render(<WidgetMarketplace {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search widgets...');
    
    fireEvent.change(searchInput, { target: { value: 'Test' } });
    
    expect(screen.getByText('Test Widget')).toBeInTheDocument();
    expect(screen.queryByText('Installed Widget')).not.toBeInTheDocument();
  });

  it('should show install button for non-installed widgets', () => {
    render(<WidgetMarketplace {...defaultProps} />);
    const installButtons = screen.getAllByText('Install');
    expect(installButtons.length).toBe(1);
    
    fireEvent.click(installButtons[0]);
    expect(mockOnInstall).toHaveBeenCalledWith(mockCatalog.widgets[0]);
  });

  it('should show disable/enable button for installed widgets', () => {
    render(<WidgetMarketplace {...defaultProps} />);
    const disableButton = screen.getByText('Disable');
    expect(disableButton).toBeInTheDocument();
    
    fireEvent.click(disableButton);
    expect(mockOnToggleEnabled).toHaveBeenCalledWith('installed-widget', false);
  });

  it('should show uninstall button for non-core installed widgets', () => {
    const installed = [
      ...mockInstalled,
      {
        widgetId: 'test-widget',
        installedVersion: '1.0.0',
        enabled: true,
        source: 'catalog' as const,
        installedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ];
    render(<WidgetMarketplace {...defaultProps} installedRecords={installed} />);
    
    const uninstallButtons = screen.getAllByText('Uninstall');
    expect(uninstallButtons.length).toBe(1);
    
    fireEvent.click(uninstallButtons[0]);
    expect(mockOnUninstall).toHaveBeenCalledWith('test-widget');
  });

  it('should not show uninstall button for core widgets', () => {
    render(<WidgetMarketplace {...defaultProps} />);
    expect(screen.queryByText('Uninstall')).not.toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    render(<WidgetMarketplace {...defaultProps} />);
    fireEvent.click(screen.getByText('Close'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
