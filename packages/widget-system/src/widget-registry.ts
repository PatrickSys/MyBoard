import { IWidget, WidgetRegistry as IWidgetRegistry, WidgetManifest } from './types';
import { globalEventBus } from './event-bus';

/**
 * Widget Registry Implementation
 * 
 * Manages widget lifecycle and provides:
 * - Widget registration and discovery
 * - Dynamic widget loading
 * - Dependency management
 * - Version control
 * - Performance monitoring
 */
export class WidgetRegistry implements IWidgetRegistry {
  private widgets: Map<string, IWidget> = new Map();
  private manifests: Map<string, WidgetManifest> = new Map();
  private loadingPromises: Map<string, Promise<IWidget>> = new Map();

  /**
   * Register a widget instance
   */
  public register(widget: IWidget): void {
    if (this.widgets.has(widget.id)) {
      throw new Error(`Widget with id ${widget.id} is already registered`);
    }

    this.widgets.set(widget.id, widget);
    
    // Listen to widget events for monitoring
    widget.on('widget-error', (event) => {
      console.error(`Widget ${widget.id} error:`, event.data);
      globalEventBus.emit({
        type: 'widget-registry-error',
        source: 'widget-registry',
        data: { widgetId: widget.id, error: event.data },
        timestamp: Date.now(),
        id: `registry-error-${Date.now()}`
      });
    });

    globalEventBus.emit({
      type: 'widget-registered',
      source: 'widget-registry',
      data: { 
        widgetId: widget.id, 
        name: widget.name, 
        version: widget.version 
      },
      timestamp: Date.now(),
      id: `registry-${Date.now()}`
    });
  }

  /**
   * Unregister a widget
   */
  public unregister(widgetId: string): void {
    const widget = this.widgets.get(widgetId);
    if (!widget) {
      return;
    }

    // Unmount if still mounted
    widget.unmount().catch(error => {
      console.error(`Error unmounting widget ${widgetId}:`, error);
    });

    this.widgets.delete(widgetId);
    this.manifests.delete(widgetId);

    globalEventBus.emit({
      type: 'widget-unregistered',
      source: 'widget-registry',
      data: { widgetId },
      timestamp: Date.now(),
      id: `registry-unreg-${Date.now()}`
    });
  }

  /**
   * Get a widget by ID
   */
  public get(widgetId: string): IWidget | undefined {
    return this.widgets.get(widgetId);
  }

  /**
   * Get all registered widgets
   */
  public getAll(): IWidget[] {
    return Array.from(this.widgets.values());
  }

  /**
   * Get widgets by type/category
   */
  public getByType(type: string): IWidget[] {
    return this.getAll().filter(widget => {
      const manifest = this.manifests.get(widget.id);
      return manifest?.category === type;
    });
  }

  /**
   * Register a widget manifest
   */
  public registerManifest(manifest: WidgetManifest): void {
    this.manifests.set(manifest.id, manifest);
    
    globalEventBus.emit({
      type: 'widget-manifest-registered',
      source: 'widget-registry',
      data: { manifest },
      timestamp: Date.now(),
      id: `manifest-${Date.now()}`
    });
  }

  /**
   * Get widget manifest
   */
  public getManifest(widgetId: string): WidgetManifest | undefined {
    return this.manifests.get(widgetId);
  }

  /**
   * Get all manifests
   */
  public getAllManifests(): WidgetManifest[] {
    return Array.from(this.manifests.values());
  }

  /**
   * Load a widget dynamically
   */
  public async loadWidget(widgetId: string): Promise<IWidget> {
    // Check if already loaded
    const existingWidget = this.widgets.get(widgetId);
    if (existingWidget) {
      return existingWidget;
    }

    // Check if already loading
    const loadingPromise = this.loadingPromises.get(widgetId);
    if (loadingPromise) {
      return loadingPromise;
    }

    const manifest = this.manifests.get(widgetId);
    if (!manifest) {
      throw new Error(`No manifest found for widget: ${widgetId}`);
    }

    // Create loading promise
    const promise = this.doLoadWidget(manifest);
    this.loadingPromises.set(widgetId, promise);

    try {
      const widget = await promise;
      this.register(widget);
      return widget;
    } finally {
      this.loadingPromises.delete(widgetId);
    }
  }

  /**
   * Actually perform the widget loading
   */
  private async doLoadWidget(manifest: WidgetManifest): Promise<IWidget> {
    globalEventBus.emit({
      type: 'widget-loading-start',
      source: 'widget-registry',
      data: { widgetId: manifest.id },
      timestamp: Date.now(),
      id: `loading-start-${Date.now()}`
    });

    try {
      // Load the widget module
      const module = await this.loadModule(manifest.entry);
      
      // Create widget instance
      const WidgetClass = module.default || module[manifest.name];
      if (!WidgetClass) {
        throw new Error(`Widget class not found in module: ${manifest.id}`);
      }

      const widget = new WidgetClass(manifest.id, manifest.name, manifest.version);
      
      // Apply default configuration
      if (manifest.defaultSize) {
        await widget.update({
          size: manifest.defaultSize
        });
      }

      globalEventBus.emit({
        type: 'widget-loading-complete',
        source: 'widget-registry',
        data: { widgetId: manifest.id },
        timestamp: Date.now(),
        id: `loading-complete-${Date.now()}`
      });

      return widget;

    } catch (error) {
      globalEventBus.emit({
        type: 'widget-loading-error',
        source: 'widget-registry',
        data: { 
          widgetId: manifest.id, 
          error: error instanceof Error ? error.message : String(error)
        },
        timestamp: Date.now(),
        id: `loading-error-${Date.now()}`
      });
      throw error;
    }
  }

  /**
   * Load a JavaScript module dynamically
   */
  private async loadModule(entry: string): Promise<any> {
    if (entry.startsWith('http://') || entry.startsWith('https://')) {
      // Remote module
      return import(/* webpackIgnore: true */ entry);
    } else {
      // Local module
      return import(entry);
    }
  }

  /**
   * Check if a widget is loaded
   */
  public isLoaded(widgetId: string): boolean {
    return this.widgets.has(widgetId);
  }

  /**
   * Check if a widget is currently loading
   */
  public isLoading(widgetId: string): boolean {
    return this.loadingPromises.has(widgetId);
  }

  /**
   * Get widget count
   */
  public getCount(): number {
    return this.widgets.size;
  }

  /**
   * Clear all widgets
   */
  public clear(): void {
    // Unmount all widgets
    const unmountPromises = Array.from(this.widgets.values()).map(widget => 
      widget.unmount().catch(error => console.error('Error unmounting widget:', error))
    );

    Promise.all(unmountPromises).then(() => {
      this.widgets.clear();
      this.manifests.clear();
      this.loadingPromises.clear();
    });
  }
}

/**
 * Global widget registry instance
 */
export const globalWidgetRegistry = new WidgetRegistry();