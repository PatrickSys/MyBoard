import { BaseWidget, WidgetEvent } from '@myboard/widget-system';

/**
 * Notes Widget
 * 
 * A demonstration widget that showcases:
 * - Real-time text editing
 * - Auto-save functionality
 * - Typed event communication
 * - Theme support
 * - State persistence
 */
export class NotesWidget extends BaseWidget {
  private textarea: HTMLTextAreaElement;
  private saveButton: HTMLButtonElement;
  private statusIndicator: HTMLElement;
  private autoSaveTimer?: NodeJS.Timeout;
  private lastSaved = Date.now();

  constructor(id: string, name: string, version: string) {
    super(id, name, version);
    
    this.textarea = this.createTextarea();
    this.saveButton = this.createSaveButton();
    this.statusIndicator = this.createStatusIndicator();
    
    this.setupLayout();
    this.setupEventHandlers();
  }

  /**
   * Render the widget content
   */
  protected async render(): Promise<void> {
    // Load saved content
    this.loadContent();
    
    // Setup auto-save
    this.setupAutoSave();
    
    // Apply theme
    this.applyWidgetTheme();
  }

  /**
   * Cleanup widget resources
   */
  protected async cleanup(): Promise<void> {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
    }
    
    // Save before cleanup
    this.saveContent();
  }

  /**
   * Create the textarea element
   */
  private createTextarea(): HTMLTextAreaElement {
    const textarea = document.createElement('textarea');
    textarea.className = 'notes-textarea';
    textarea.placeholder = 'Start typing your notes...';
    textarea.style.cssText = `
      width: 100%;
      height: calc(100% - 60px);
      border: none;
      outline: none;
      resize: none;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      background: transparent;
      color: inherit;
      box-sizing: border-box;
    `;
    return textarea;
  }

  /**
   * Create the save button
   */
  private createSaveButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = '💾 Save';
    button.className = 'notes-save-button';
    button.style.cssText = `
      background: var(--widget-primary-color, #007bff);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      margin: 8px;
    `;
    return button;
  }

  /**
   * Create the status indicator
   */
  private createStatusIndicator(): HTMLElement {
    const indicator = document.createElement('div');
    indicator.className = 'notes-status';
    indicator.style.cssText = `
      padding: 8px 16px;
      font-size: 11px;
      color: #666;
      text-align: right;
      flex: 1;
    `;
    this.updateStatus('Ready');
    return indicator;
  }

  /**
   * Setup the widget layout
   */
  private setupLayout(): void {
    // Create header with controls
    const header = document.createElement('div');
    header.style.cssText = `
      display: flex;
      align-items: center;
      height: 40px;
      border-bottom: 1px solid #eee;
      background: #f8f9fa;
    `;
    
    header.appendChild(this.saveButton);
    header.appendChild(this.statusIndicator);
    
    // Add elements to widget
    this.element.appendChild(header);
    this.element.appendChild(this.textarea);
  }

  /**
   * Setup event handlers
   */
  private setupEventHandlers(): void {
    // Save button click
    this.saveButton.addEventListener('click', () => {
      this.saveContent();
    });

    // Textarea input
    this.textarea.addEventListener('input', () => {
      this.updateStatus('Typing...');
      
      // Emit content change event
      this.emit({
        type: 'notes-content-changed',
        source: this.id,
        data: { 
          content: this.textarea.value,
          length: this.textarea.value.length 
        },
        timestamp: Date.now(),
        id: `content-change-${Date.now()}`
      });
    });

    // Listen for theme changes
    this.on('theme-changed', (event: WidgetEvent) => {
      if (event.target === this.id) {
        this.applyWidgetTheme();
      }
    });
  }

  /**
   * Load content from widget store
   */
  private loadContent(): void {
    const content = this.getStoredContent();
    if (content) {
      this.textarea.value = content.text || '';
      this.lastSaved = content.lastSaved || Date.now();
      this.updateStatus(`Loaded (${new Date(this.lastSaved).toLocaleTimeString()})`);
    }
  }

  /**
   * Save content to widget store
   */
  private saveContent(): void {
    const content = {
      text: this.textarea.value,
      lastSaved: Date.now(),
      wordCount: this.textarea.value.split(/\s+/).filter(word => word.length > 0).length
    };

    this.setStoredContent(content);
    this.lastSaved = content.lastSaved;
    this.updateStatus(`Saved (${new Date(this.lastSaved).toLocaleTimeString()})`);

    // Emit save event
    this.emit({
      type: 'notes-saved',
      source: this.id,
      data: { 
        content: content.text,
        wordCount: content.wordCount,
        savedAt: this.lastSaved
      },
      timestamp: Date.now(),
      id: `save-${Date.now()}`
    });
  }

  /**
   * Setup auto-save functionality
   */
  private setupAutoSave(): void {
    const autoSaveEnabled = this.config?.data?.autoSave !== false;
    const saveInterval = this.config?.data?.saveInterval || 2000;

    if (autoSaveEnabled) {
      this.autoSaveTimer = setInterval(() => {
        if (this.textarea.value !== this.getStoredContent()?.text) {
          this.saveContent();
        }
      }, saveInterval);
    }
  }

  /**
   * Apply widget theme
   */
  private applyWidgetTheme(): void {
    const theme = this.config?.theme;
    if (theme) {
      if (theme.backgroundColor) {
        this.textarea.style.backgroundColor = theme.backgroundColor;
      }
      if (theme.textColor) {
        this.textarea.style.color = theme.textColor;
      }
    }
  }

  /**
   * Update status indicator
   */
  private updateStatus(status: string): void {
    this.statusIndicator.textContent = status;
  }

  /**
   * Get stored content
   */
  private getStoredContent(): any {
    return (window as any).MyBoardDebug?.store?.getState(this.id) || {};
  }

  /**
   * Set stored content
   */
  private setStoredContent(content: any): void {
    (window as any).MyBoardDebug?.store?.setState(this.id, content);
  }
}

// Export as default for dynamic loading
export default NotesWidget;