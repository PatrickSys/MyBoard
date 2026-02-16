import type { WidgetManifest } from '@myboard/sdk';
import { WIDGET_CATALOG } from '../config/widget-catalog';
import { createRuntimeKernel } from './widget-runtime-kernel';

const manifestsById = new Map<string, WidgetManifest>(
  WIDGET_CATALOG.widgets.map((manifest) => [manifest.id, manifest])
);

export function syncKernelManifests(manifests: ReadonlyArray<WidgetManifest>): void {
  manifestsById.clear();
  manifests.forEach((manifest) => {
    manifestsById.set(manifest.id, manifest);
  });
}

export const runtimeKernel = createRuntimeKernel({
  getManifestById(widgetId: string) {
    return manifestsById.get(widgetId);
  },
});
