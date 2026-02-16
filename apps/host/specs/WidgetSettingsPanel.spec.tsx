import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WidgetSettingsPanel from '../src/components/WidgetSettingsPanel';
import type { WidgetManifest } from '@myboard/sdk';

const mockManifest: WidgetManifest = {
  id: 'test-widget',
  title: 'Test Widget',
  tag: 'test-widget',
  url: '/test.js',
  version: '1.0.0',
  permissions: [],
  settingsSchema: {
    title: 'Custom Title',
    fields: [
      {
        key: 'text-field',
        label: 'Text Label',
        type: 'string',
        defaultValue: 'default text',
      },
      {
        key: 'number-field',
        label: 'Number Label',
        type: 'number',
        defaultValue: 42,
      },
      {
        key: 'bool-field',
        label: 'Bool Label',
        type: 'boolean',
        defaultValue: true,
      },
      {
        key: 'select-field',
        label: 'Select Label',
        type: 'select',
        defaultValue: 'opt1',
        options: [
          { label: 'Option 1', value: 'opt1' },
          { label: 'Option 2', value: 'opt2' },
        ],
      },
    ],
  },
};

describe('WidgetSettingsPanel', () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  const defaultProps = {
    manifest: mockManifest,
    initialSettings: {},
    onClose: mockOnClose,
    onSave: mockOnSave,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when manifest is null', () => {
    render(<WidgetSettingsPanel {...defaultProps} manifest={null} />);
    expect(screen.queryByText('Custom Title')).not.toBeInTheDocument();
  });

  it('should render custom title from schema', () => {
    render(<WidgetSettingsPanel {...defaultProps} />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('should render all field types with initial values', () => {
    render(<WidgetSettingsPanel {...defaultProps} />);
    
    expect(screen.getByLabelText('Text Label')).toHaveValue('default text');
    expect(screen.getByLabelText('Number Label')).toHaveValue(42);
    expect(screen.getByLabelText('Bool Label')).toBeChecked();
    expect(screen.getByLabelText('Select Label')).toHaveValue('opt1');
  });

  it('should update draft values on change', () => {
    render(<WidgetSettingsPanel {...defaultProps} />);
    
    const textInput = screen.getByLabelText('Text Label');
    fireEvent.change(textInput, { target: { value: 'new text' } });
    expect(textInput).toHaveValue('new text');
    
    const boolInput = screen.getByLabelText('Bool Label');
    fireEvent.click(boolInput);
    expect(boolInput).not.toBeChecked();
  });

  it('should call onSave with draft values', () => {
    render(<WidgetSettingsPanel {...defaultProps} />);
    
    fireEvent.change(screen.getByLabelText('Text Label'), { target: { value: 'saved text' } });
    fireEvent.click(screen.getByText('Save'));
    
    expect(mockOnSave).toHaveBeenCalledWith(expect.objectContaining({
      'text-field': 'saved text',
      'number-field': 42,
      'bool-field': true,
      'select-field': 'opt1',
    }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should call onClose when Cancel is clicked', () => {
    render(<WidgetSettingsPanel {...defaultProps} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should use initialSettings over default values', () => {
    const initialSettings = {
      'text-field': 'initial text',
      'number-field': 100,
    };
    render(<WidgetSettingsPanel {...defaultProps} initialSettings={initialSettings} />);
    
    expect(screen.getByLabelText('Text Label')).toHaveValue('initial text');
    expect(screen.getByLabelText('Number Label')).toHaveValue(100);
  });
});
