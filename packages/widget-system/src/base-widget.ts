import { 
  IWidget, 
  WidgetConfig, 
  WidgetEvent, 
  WidgetEventHandler,
  WidgetPosition,
  WidgetSize 
} from './types';
import { EventBus } from './event-bus';

/**
 * Base Widget Class
 * 
 * Provides a standard foundation for all widgets with:
 * - Lifecycle management
 * - Event handling
 * - Configuration management
 * - Error handling
 * - Performance tracking
 */
export abstract class BaseWidget implements IWidget {
  public readonly id: string;
  public readonly name: string;
  public readonly version: string;
  public element: HTMLElement;
  public config?: WidgetConfig;

  private eventBus: EventBus;
  private mounted = false;
  private startTime = 0;

  constructor(id: string, name: string, version: string) {
    this.id = id;
    this.name = name;
    this.version = version;
    this.element = this.createElement();
    this.eventBus = new EventBus();
    
    // Add widget identification
    this.element.setAttribute('data-widget-id', id);
    this.element.setAttribute('data-widget-name', name);
    this.element.setAttribute('data-widget-version', version);
  }

  /**
   * Create the root DOM element for the widget
   */
  protected createElement(): HTMLElement {
    const element = document.createElement('div');
    element.className = 'myboard-widget';
    element.style.cssText = `
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      box-sizing: border-box;
    `;
    return element;
  }

  /**
   * Mount the widget to a container
   */
  public async mount(container: HTMLElement): Promise<void> {
    if (this.mounted) {
      throw new Error(`Widget ${this.id} is already mounted`);
    }

    try {
      this.startTime = performance.now();
      
      // Apply configuration before mounting
      if (this.config) {
        this.applyConfig(this.config);
      }

      // Mount the element
      container.appendChild(this.element);
      
      // Call the widget-specific render method
      await this.render();
      
      this.mounted = true;
      
      // Emit widget ready event
      this.emit({
        type: 'widget-ready',
        source: this.id,
        data: {
          name: this.name,
          version: this.version,
          loadTime: performance.now() - this.startTime
        },
        timestamp: Date.now(),
        id: this.generateEventId()
      });

    } catch (error) {
      this.emit({
        type: 'widget-error',
        source: this.id,
        data: { error: error instanceof Error ? error.message : String(error) },
        timestamp: Date.now(),
        id: this.generateEventId()
      });
      throw error;
    }
  }

  /**
   * Unmount the widget
   */
  public async unmount(): Promise<void> {
    if (!this.mounted) {
      return;
    }

    try {
      // Call widget-specific cleanup
      await this.cleanup();
      
      // Remove from DOM
      if (this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
      
      // Clear event listeners
      this.eventBus.clear();
      
      this.mounted = false;

      this.emit({
        type: 'widget-unmounted',
        source: this.id,
        data: { name: this.name },
        timestamp: Date.now(),
        id: this.generateEventId()
      });

    } catch (error) {
      this.emit({
        type: 'widget-error',
        source: this.id,
        data: { error: error instanceof Error ? error.message : String(error) },
        timestamp: Date.now(),
        id: this.generateEventId()
      });
      throw error;
    }
  }

  /**
   * Update widget configuration
   */
  public async update(config?: Partial<WidgetConfig>): Promise<void> {
    if (config) {
      this.config = { ...this.config, ...config };
      this.applyConfig(this.config);
    }

    if (this.mounted) {
      await this.render();
    }

    this.emit({
      type: 'widget-updated',
      source: this.id,
      data: { config: this.config },
      timestamp: Date.now(),
      id: this.generateEventId()
    });
  }

  /**
   * Apply configuration to the widget
   */
  protected applyConfig(config: WidgetConfig): void {
    if (config.size) {
      this.applySize(config.size);
    }
    
    if (config.position) {
      this.applyPosition(config.position);
    }
    
    if (config.theme) {
      this.applyTheme(config.theme);
    }
  }

  /**
   * Apply size configuration
   */
  protected applySize(size: WidgetSize): void {
    this.element.style.width = `${size.width}px`;
    this.element.style.height = `${size.height}px`;
    
    if (size.minWidth) {
      this.element.style.minWidth = `${size.minWidth}px`;
    }
    if (size.minHeight) {
      this.element.style.minHeight = `${size.minHeight}px`;
    }
    if (size.maxWidth) {
      this.element.style.maxWidth = `${size.maxWidth}px`;
    }
    if (size.maxHeight) {
      this.element.style.maxHeight = `${size.maxHeight}px`;
    }
  }

  /**
   * Apply position configuration
   */
  protected applyPosition(position: WidgetPosition): void {
    this.element.style.position = 'absolute';
    this.element.style.left = `${position.x}px`;
    this.element.style.top = `${position.y}px`;
    
    if (position.z !== undefined) {
      this.element.style.zIndex = String(position.z);
    }
  }

  /**
   * Apply theme configuration
   */
  protected applyTheme(theme: any): void {
    if (theme.backgroundColor) {
      this.element.style.backgroundColor = theme.backgroundColor;
    }
    if (theme.primaryColor) {
      this.element.style.setProperty('--widget-primary-color', theme.primaryColor);
    }
    if (theme.textColor) {
      this.element.style.color = theme.textColor;
    }
    if (theme.borderRadius) {
      this.element.style.borderRadius = theme.borderRadius;
    }
    if (theme.fontFamily) {
      this.element.style.fontFamily = theme.fontFamily;
    }
  }

  /**
   * Event handling methods
   */
  public emit<T = any>(event: WidgetEvent<T>): void {
    this.eventBus.emit(event);
  }

  public on<T = any>(eventType: string, handler: WidgetEventHandler<T>): void {
    this.eventBus.on(eventType, handler);
  }

  public off<T = any>(eventType: string, handler: WidgetEventHandler<T>): void {
    this.eventBus.off(eventType, handler);
  }

  /**
   * Generate unique event ID
   */
  private generateEventId(): string {
    return `${this.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Abstract methods to be implemented by concrete widgets
   */
  protected abstract render(): Promise<void>;
  protected abstract cleanup(): Promise<void>;
}