export interface AutomationWire {
  id: string;
  enabled: boolean;
  sourceWidgetId: string;
  sourceEvent: string;
  targetWidgetId: string;
  targetAction: string;
  payloadTemplate?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AutomationState {
  wires: AutomationWire[];
}
