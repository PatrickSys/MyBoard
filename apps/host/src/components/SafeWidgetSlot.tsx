'use client';

import React, { Component, type ReactNode } from 'react';
import WidgetSlot from './WidgetSlot';

type Props = React.ComponentProps<typeof WidgetSlot>;

type State = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundary extends Component<{ children: ReactNode; title: string }, State> {
  constructor(props: { children: ReactNode; title: string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`[SafeWidgetSlot] Error in ${this.props.title}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="slot">
          <div className="slot__hdr">
            <span className="slot__title">{this.props.title}</span>
            <span className="slot__badge slot__badge--error">crashed</span>
          </div>
          <div className="slot__body">
            <div className="slot__error">
              <div className="error-message">
                <strong>Widget crashed</strong>
                <p>{this.state.error?.message ?? 'Unknown error'}</p>
                <button
                  className="retry-btn"
                  onClick={() => this.setState({ hasError: false })}
                >
                  Reload Widget
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * A wrapper around WidgetSlot that catches React render errors.
 * Critical for protecting the host app from faulty widget code.
 */
export default function SafeWidgetSlot(props: Props) {
  return (
    <ErrorBoundary title={props.title ?? props.tag}>
      <WidgetSlot {...props} />
    </ErrorBoundary>
  );
}
