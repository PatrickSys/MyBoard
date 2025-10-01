/**
 * Core Widget System for MyBoard
 * 
 * This system addresses several pain points in traditional SPAs:
 * 1. Monolithic builds - widgets can be deployed independently
 * 2. Framework coupling - widgets can be built with any framework
 * 3. Poor modularity - widgets are completely isolated
 * 4. Type safety issues - fully typed widget communication
 * 5. Performance issues - lazy loading and resource management
 */

// Core Widget Interface
export interface IWidget {
  id: string;
  name: string;
  version: string;
  element: HTMLElement;
  config?: WidgetConfig;
  
  // Lifecycle methods
  mount(container: HTMLElement): Promise<void>;
  unmount(): Promise<void>;
  update(config?: Partial<WidgetConfig>): Promise<void>;
  
  // Event handling
  emit<T = any>(event: WidgetEvent<T>): void;
  on<T = any>(eventType: string, handler: WidgetEventHandler<T>): void;
  off<T = any>(eventType: string, handler: WidgetEventHandler<T>): void;
}

// Widget Configuration
export interface WidgetConfig {
  theme?: WidgetTheme;
  position?: WidgetPosition;
  size?: WidgetSize;
  permissions?: WidgetPermissions;
  data?: Record<string, any>;
}

export interface WidgetTheme {
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  fontFamily?: string;
}

export interface WidgetPosition {
  x: number;
  y: number;
  z?: number;
}

export interface WidgetSize {
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export interface WidgetPermissions {
  storage?: boolean;
  network?: boolean;
  notifications?: boolean;
  clipboard?: boolean;
}

// Typed Event System
export interface WidgetEvent<TData = any> {
  type: string;
  source: string;
  target?: string;
  data: TData;
  timestamp: number;
  id: string;
}

export type WidgetEventHandler<TData = any> = (event: WidgetEvent<TData>) => void;

// Widget Registry
export interface WidgetRegistry {
  register(widget: IWidget): void;
  unregister(widgetId: string): void;
  get(widgetId: string): IWidget | undefined;
  getAll(): IWidget[];
  getByType(type: string): IWidget[];
}

// Widget Manifest for dynamic loading
export interface WidgetManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  homepage?: string;
  repository?: string;
  license: string;
  keywords: string[];
  
  // Technical details
  entry: string;
  framework: 'react' | 'vue' | 'angular' | 'lit' | 'vanilla';
  dependencies?: Record<string, string>;
  
  // Widget metadata
  category: string;
  icon?: string;
  screenshots?: string[];
  defaultSize: WidgetSize;
  minSize?: WidgetSize;
  maxSize?: WidgetSize;
  
  // Permissions and capabilities
  permissions: WidgetPermissions;
  capabilities: string[];
  
  // Configuration schema
  configSchema?: any; // JSON Schema
}

// Widget Store for state management
export interface WidgetStore {
  getState(widgetId: string): any;
  setState(widgetId: string, state: any): void;
  subscribe(widgetId: string, callback: (state: any) => void): () => void;
  clear(widgetId: string): void;
}

// Performance monitoring
export interface WidgetMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  errorCount: number;
  lastError?: Error;
  isActive: boolean;
}

export interface WidgetPerformanceMonitor {
  track(widgetId: string, metrics: Partial<WidgetMetrics>): void;
  getMetrics(widgetId: string): WidgetMetrics | undefined;
  getAllMetrics(): Record<string, WidgetMetrics>;
}