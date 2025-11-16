import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { emitReady } from '@myboard/widget-utils';

interface WeatherData {
  temp: number;
  condition: string;
  location: string;
  humidity: number;
  wind: number;
}

@customElement('mb-weather')
export class WeatherWidget extends LitElement {
  @state() private weather: WeatherData | null = null;
  @state() private loading = false;
  @state() private error = '';
  @state() private location = '';
  @state() private isEditing = false;

  private readonly STORAGE_KEY = 'mb-weather-location';

  static styles = css`
    :host {
      display: block;
      height: 100%;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .container {
      height: 100%;
      background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
      border-radius: 12px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      color: white;
      position: relative;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }

    .edit-btn {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      border-radius: 6px;
      color: white;
      cursor: pointer;
      padding: 6px 12px;
      font-size: 12px;
      transition: all 0.2s;
    }

    .edit-btn:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .location-form {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 16px;
    }

    input {
      width: 100%;
      padding: 8px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      margin-bottom: 8px;
      box-sizing: border-box;
    }

    .btn {
      background: rgba(16, 185, 129, 0.6);
      border: none;
      border-radius: 6px;
      color: white;
      cursor: pointer;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
      width: 100%;
    }

    .btn:hover {
      background: rgba(16, 185, 129, 0.8);
    }

    .weather-display {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .temp {
      font-size: 64px;
      font-weight: 700;
      margin: 16px 0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .condition {
      font-size: 24px;
      margin-bottom: 8px;
      text-transform: capitalize;
    }

    .location-name {
      font-size: 16px;
      opacity: 0.9;
      margin-bottom: 24px;
    }

    .details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      width: 100%;
      max-width: 200px;
    }

    .detail {
      background: rgba(0, 0, 0, 0.15);
      border-radius: 8px;
      padding: 12px;
      text-align: center;
    }

    .detail-label {
      font-size: 12px;
      opacity: 0.8;
      margin-bottom: 4px;
    }

    .detail-value {
      font-size: 18px;
      font-weight: 600;
    }

    .loading, .error, .empty {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
      opacity: 0.8;
    }

    .error {
      color: #fee;
      font-size: 14px;
    }

    @media (max-width: 768px) {
      .temp {
        font-size: 48px;
      }
      .condition {
        font-size: 18px;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.loadLocation();
    queueMicrotask(() => emitReady(this));
  }

  private loadLocation() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        this.location = saved;
        this.fetchWeather();
      }
    } catch (e) {
      console.error('Failed to load location:', e);
    }
  }

  private saveLocation() {
    try {
      localStorage.setItem(this.STORAGE_KEY, this.location);
    } catch (e) {
      console.error('Failed to save location:', e);
    }
  }

  private async fetchWeather() {
    if (!this.location) return;

    this.loading = true;
    this.error = '';

    try {
      // Using wttr.in - free weather API, no key required
      const response = await fetch(
        `https://wttr.in/${encodeURIComponent(this.location)}?format=j1`
      );

      if (!response.ok) {
        throw new Error('Location not found');
      }

      const data = await response.json();
      const current = data.current_condition[0];

      this.weather = {
        temp: Math.round(parseFloat(current.temp_C)),
        condition: current.weatherDesc[0].value,
        location: data.nearest_area[0].areaName[0].value,
        humidity: parseInt(current.humidity),
        wind: Math.round(parseFloat(current.windspeedKmph)),
      };

      this.error = '';
    } catch (e) {
      this.error = e instanceof Error ? e.message : 'Failed to fetch weather';
      this.weather = null;
    } finally {
      this.loading = false;
    }
  }

  private handleSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector('input') as HTMLInputElement;
    const location = input.value.trim();

    if (location) {
      this.location = location;
      this.saveLocation();
      this.fetchWeather();
      this.isEditing = false;
    }
  }

  render() {
    return html`
      <div class="container">
        <div class="header">
          <h3>Weather</h3>
          ${this.weather
            ? html`
                <button
                  class="edit-btn"
                  @click=${() => (this.isEditing = !this.isEditing)}
                >
                  ${this.isEditing ? 'Cancel' : 'Change'}
                </button>
              `
            : ''}
        </div>

        ${this.isEditing || !this.location
          ? html`
              <form class="location-form" @submit=${this.handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter city name..."
                  value=${this.location}
                  @input=${(e: InputEvent) =>
                    (this.location = (e.target as HTMLInputElement).value)}
                  required
                />
                <button type="submit" class="btn">Get Weather</button>
              </form>
            `
          : ''}

        ${this.loading
          ? html`<div class="loading">Loading weather...</div>`
          : this.error
          ? html`<div class="error">${this.error}<br /><small>Try another location</small></div>`
          : this.weather
          ? html`
              <div class="weather-display">
                <div class="temp">${this.weather.temp}°C</div>
                <div class="condition">${this.weather.condition}</div>
                <div class="location-name">${this.weather.location}</div>
                <div class="details">
                  <div class="detail">
                    <div class="detail-label">Humidity</div>
                    <div class="detail-value">${this.weather.humidity}%</div>
                  </div>
                  <div class="detail">
                    <div class="detail-label">Wind</div>
                    <div class="detail-value">${this.weather.wind} km/h</div>
                  </div>
                </div>
              </div>
            `
          : !this.isEditing
          ? html`<div class="empty">Enter a location to see weather</div>`
          : ''}
      </div>
    `;
  }
}
