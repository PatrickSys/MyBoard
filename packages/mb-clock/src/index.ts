import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { emitReady } from '@myboard/widget-utils';

@customElement('mb-clock')
export class ClockWidget extends LitElement {
  @state() private time = '';
  @state() private date = '';
  private intervalId?: number;

  static styles = css`
    :host {
      display: block;
      height: 100%;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .container {
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      color: white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .time {
      font-size: 48px;
      font-weight: 700;
      letter-spacing: -1px;
      margin: 0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .date {
      font-size: 18px;
      font-weight: 400;
      margin-top: 8px;
      opacity: 0.9;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .seconds {
      font-size: 24px;
      opacity: 0.7;
      margin-top: 4px;
    }

    @media (max-width: 768px) {
      .time {
        font-size: 36px;
      }
      .date {
        font-size: 14px;
      }
      .seconds {
        font-size: 18px;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.updateTime();
    this.intervalId = window.setInterval(() => this.updateTime(), 1000);
    queueMicrotask(() => emitReady(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateTime() {
    const now = new Date();

    // Format time as HH:MM
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.time = `${hours}:${minutes}`;

    // Format date
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    };
    this.date = now.toLocaleDateString('en-US', options);
  }

  render() {
    const now = new Date();
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return html`
      <div class="container">
        <div class="time">${this.time}</div>
        <div class="seconds">${seconds}</div>
        <div class="date">${this.date}</div>
      </div>
    `;
  }
}
