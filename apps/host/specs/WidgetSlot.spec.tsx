import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WidgetSlot from '../src/components/WidgetSlot';
import * as widgetLoader from '../src/lib/widget-loader';
import { performanceTracker } from '../src/lib/performance-tracker';

jest.mock('../src/lib/widget-loader');
jest.mock('../src/lib/performance-tracker');

describe('WidgetSlot', () => {
    const mockEnsureLoaded = widgetLoader.ensureLoaded as jest.MockedFunction<
        typeof widgetLoader.ensureLoaded
    >;

    beforeEach(() => {
        jest.clearAllMocks();
        mockEnsureLoaded.mockResolvedValue(undefined);
    });

    it('should render loading state initially', () => {
        render(<WidgetSlot id="test" tag="test-widget" url="/test.js" title="Test" />);

        expect(screen.getByText('loading')).toBeInTheDocument();
    });

    it('should start performance tracking on mount with widget ID', () => {
        render(<WidgetSlot id="test" tag="test-widget" url="/test.js" title="Test" />);

        expect(performanceTracker.startTracking).toHaveBeenCalledWith('test');
    });

    it('should call ensureLoaded with correct URL', () => {
        render(<WidgetSlot id="test" tag="test-widget" url="/test.js" />);

        expect(mockEnsureLoaded).toHaveBeenCalledWith('/test.js', {
            widgetId: 'test',
            expectedTag: 'test-widget',
        });
    });

    it('should show error state when widget load fails', async () => {
        mockEnsureLoaded.mockRejectedValue(new Error('Failed to load'));

        render(<WidgetSlot id="test" tag="test-widget" url="/test.js" title="Test" />);

        await waitFor(() => {
            expect(screen.getByTitle('Failed to load')).toBeInTheDocument();
        });

        expect(performanceTracker.markError).toHaveBeenCalledWith('test');
    });

    it('should show ready state when widget emits ready event', async () => {
        const { container } = render(
            <WidgetSlot id="test" tag="test-widget" url="/test.js" title="Test" />
        );

        // Wait for the widget element to be rendered
        await waitFor(() => {
            const widgetElement = container.querySelector('test-widget');
            expect(widgetElement).toBeInTheDocument();
        });

        // Simulate widget-ready event
        const widgetElement = container.querySelector('test-widget');
        const event = new CustomEvent('widget-ready', { bubbles: true });
        act(() => {
            widgetElement?.dispatchEvent(event);
        });

        await waitFor(() => {
            expect(screen.getByText('ready')).toBeInTheDocument();
        });

        expect(performanceTracker.markReady).toHaveBeenCalledWith('test');
    });

    it('should show error state when widget emits error event', async () => {
        const { container } = render(
            <WidgetSlot id="test" tag="test-widget" url="/test.js" title="Test" />
        );

        await waitFor(() => {
            const widgetElement = container.querySelector('test-widget');
            expect(widgetElement).toBeInTheDocument();
        });

        const widgetElement = container.querySelector('test-widget');
        const event = new CustomEvent('widget-error', {
            bubbles: true,
            detail: { reason: 'mount-error' },
        });
        act(() => {
            widgetElement?.dispatchEvent(event);
        });

        await waitFor(() => {
            expect(screen.getByTitle('mount-error')).toBeInTheDocument();
        });

        expect(performanceTracker.markError).toHaveBeenCalledWith('test');
    });

    it('should timeout after 10 seconds if no ready event', async () => {
        jest.useFakeTimers();

        render(<WidgetSlot id="test" tag="test-widget" url="/test.js" title="Test" />);

        // Fast-forward past the timeout
        act(() => {
            jest.advanceTimersByTime(10000);
        });

        await waitFor(() => {
            expect(screen.getByTitle('ready-timeout')).toBeInTheDocument();
        });

        jest.useRealTimers();
    });

    it('should render widget element with correct tag', async () => {
        const { container } = render(
            <WidgetSlot id="custom" tag="custom-widget" url="/test.js" />
        );

        await waitFor(() => {
            const widgetElement = container.querySelector('custom-widget');
            expect(widgetElement).toBeInTheDocument();
        });
    });

    it('should use provided ID for performance tracking', () => {
        render(<WidgetSlot id="my-widget" tag="test-widget" url="/test.js" title="My Widget" />);

        expect(performanceTracker.startTracking).toHaveBeenCalledWith('my-widget');
    });
});

