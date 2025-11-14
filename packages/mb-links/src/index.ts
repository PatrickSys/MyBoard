import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { emitReady } from '@myboard/widget-utils';

interface Link {
  id: string;
  title: string;
  url: string;
}

@customElement('mb-links')
export class LinksWidget extends LitElement {
  @state() private links: Link[] = [];
  @state() private isAdding = false;

  private readonly STORAGE_KEY = 'mb-links';

  static styles = css`
    :host {
      display: block;
      height: 100%;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .container {
      height: 100%;
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      border-radius: 12px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      color: white;
      overflow: hidden;
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

    .btn {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      border-radius: 6px;
      color: white;
      cursor: pointer;
      padding: 8px 12px;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
    }

    .btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }

    .links-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 12px;
      flex: 1;
      overflow-y: auto;
      padding: 4px;
    }

    .link-card {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 16px;
      text-align: center;
      text-decoration: none;
      color: white;
      transition: all 0.2s;
      position: relative;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 80px;
      backdrop-filter: blur(10px);
    }

    .link-card:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: translateY(-2px);
    }

    .link-title {
      font-weight: 500;
      font-size: 14px;
      word-break: break-word;
    }

    .delete-btn {
      position: absolute;
      top: 4px;
      right: 4px;
      background: rgba(239, 68, 68, 0.8);
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      width: 20px;
      height: 20px;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.2s;
    }

    .link-card:hover .delete-btn {
      opacity: 1;
    }

    .add-form {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 12px;
    }

    .form-group {
      margin-bottom: 12px;
    }

    .form-group:last-of-type {
      margin-bottom: 0;
    }

    label {
      display: block;
      font-size: 12px;
      margin-bottom: 4px;
      opacity: 0.9;
    }

    input {
      width: 100%;
      padding: 8px;
      border: none;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.9);
      font-size: 14px;
      box-sizing: border-box;
    }

    .form-actions {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }

    .form-actions .btn {
      flex: 1;
    }

    .empty-state {
      text-align: center;
      opacity: 0.7;
      padding: 40px 20px;
    }

    @media (max-width: 768px) {
      .links-grid {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.loadLinks();
    queueMicrotask(() => emitReady(this));
  }

  private loadLinks() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.links = JSON.parse(stored);
      } else {
        // Default links
        this.links = [
          { id: '1', title: 'GitHub', url: 'https://github.com' },
          { id: '2', title: 'Gmail', url: 'https://gmail.com' },
          { id: '3', title: 'Calendar', url: 'https://calendar.google.com' },
        ];
        this.saveLinks();
      }
    } catch (e) {
      console.error('Failed to load links:', e);
      this.links = [];
    }
  }

  private saveLinks() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.links));
    } catch (e) {
      console.error('Failed to save links:', e);
    }
  }

  private handleAdd(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const title = formData.get('title') as string;
    const url = formData.get('url') as string;

    if (title.trim() && url.trim()) {
      this.links = [
        ...this.links,
        {
          id: Date.now().toString(),
          title: title.trim(),
          url: url.trim(),
        },
      ];
      this.saveLinks();
      this.isAdding = false;
    }
  }

  private deleteLink(id: string) {
    this.links = this.links.filter((link) => link.id !== id);
    this.saveLinks();
  }

  private openLink(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  render() {
    return html`
      <div class="container">
        <div class="header">
          <h3>Quick Links</h3>
          <button class="btn" @click=${() => (this.isAdding = !this.isAdding)}>
            ${this.isAdding ? 'Cancel' : '+ Add'}
          </button>
        </div>

        ${this.isAdding
          ? html`
              <form class="add-form" @submit=${this.handleAdd}>
                <div class="form-group">
                  <label>Title</label>
                  <input type="text" name="title" placeholder="GitHub" required />
                </div>
                <div class="form-group">
                  <label>URL</label>
                  <input
                    type="url"
                    name="url"
                    placeholder="https://github.com"
                    required
                  />
                </div>
                <div class="form-actions">
                  <button type="submit" class="btn">Save</button>
                </div>
              </form>
            `
          : ''}

        <div class="links-grid">
          ${this.links.length === 0
            ? html`<div class="empty-state">No links yet. Click "+ Add" to create one.</div>`
            : this.links.map(
                (link) => html`
                  <div class="link-card" @click=${() => this.openLink(link.url)}>
                    <button
                      class="delete-btn"
                      @click=${(e: Event) => {
                        e.stopPropagation();
                        this.deleteLink(link.id);
                      }}
                    >
                      ×
                    </button>
                    <div class="link-title">${link.title}</div>
                  </div>
                `
              )}
        </div>
      </div>
    `;
  }
}
