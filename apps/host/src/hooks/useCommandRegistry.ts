import { useMemo } from 'react';
import type { WidgetManifest } from '@myboard/sdk';

export interface Command {
  id: string;
  label: string;
  description?: string;
  group: 'Navigation' | 'Pages' | 'Widgets' | 'Layout' | 'Settings' | 'Dev';
  shortcutHint?: string;
  action: () => void;
}

interface PageInfo {
  id: string;
  name: string;
}

interface ActivePage {
  id: string;
  name: string;
  widgetIds: string[];
  fixedHeight: boolean;
}

export interface UseCommandRegistryParams {
  pages: ReadonlyArray<PageInfo>;
  activePageId: string;
  activePage: ActivePage;
  activeWidgets: WidgetManifest[];
  isEditing: boolean;
  devMode: boolean;
  setActivePage: (id: string) => void;
  createPage: (name: string) => void;
  deletePage: (id: string) => void;
  addWidgetToPage: (pageId: string, widgetId: string) => void;
  removeWidgetFromPage: (pageId: string, widgetId: string) => void;
  resetPageLayout: (pageId: string, widgets: WidgetManifest[]) => void;
  setPageFixedHeight: (pageId: string, value: boolean) => void;
  onToggleEdit: () => void;
  onToggleDevMode: () => void;
  onOpenMarketplace: () => void;
  onOpenPageSettings: () => void;
  onOpenAutomation: () => void;
  onOpenMonitor: () => void;
  onClose: () => void;
}

export function useCommandRegistry(params: UseCommandRegistryParams): Command[] {
  const {
    pages, activePageId, activePage, activeWidgets,
    isEditing, devMode,
    setActivePage, createPage, deletePage,
    addWidgetToPage, removeWidgetFromPage,
    resetPageLayout, setPageFixedHeight,
    onToggleEdit, onToggleDevMode, onOpenMarketplace, onOpenPageSettings,
    onOpenAutomation, onOpenMonitor, onClose,
  } = params;

  return useMemo<Command[]>(() => {
    const cmds: Command[] = [];
    const pageWidgetIds = new Set(activePage.widgetIds);

    // Navigation: one entry per non-active page
    for (const page of pages) {
      if (page.id !== activePageId) {
        cmds.push({
          id: `nav-${page.id}`,
          label: `Go to ${page.name}`,
          group: 'Navigation',
          action: () => { onClose(); setActivePage(page.id); },
        });
      }
    }

    // Pages
    cmds.push({
      id: 'page-create',
      label: 'Create new page',
      group: 'Pages',
      action: () => { onClose(); createPage(`Page ${pages.length + 1}`); },
    });
    cmds.push({
      id: 'page-rename',
      label: 'Rename current page\u2026',
      group: 'Pages',
      action: () => {
        onClose();
        window.dispatchEvent(
          new CustomEvent('myboard:start-page-rename', {
            detail: { pageId: activePage.id },
          })
        );
      },
    });
    if (pages.length > 1) {
      cmds.push({
        id: 'page-delete',
        label: 'Delete current page',
        group: 'Pages',
        action: () => {
          onClose();
          if (window.confirm(`Delete page "${activePage.name}"?`)) {
            deletePage(activePageId);
          }
        },
      });
    }

    // Widgets: add/remove per widget based on current page membership
    for (const widget of activeWidgets) {
      if (pageWidgetIds.has(widget.id)) {
        cmds.push({
          id: `widget-remove-${widget.id}`,
          label: `Remove ${widget.title} from page`,
          description: widget.description,
          group: 'Widgets',
          action: () => { onClose(); removeWidgetFromPage(activePageId, widget.id); },
        });
      } else {
        cmds.push({
          id: `widget-add-${widget.id}`,
          label: `Add ${widget.title} to page`,
          description: widget.description,
          group: 'Widgets',
          action: () => { onClose(); addWidgetToPage(activePageId, widget.id); },
        });
      }
    }

    // Layout
    cmds.push({
      id: 'layout-toggle-edit',
      label: isEditing ? 'Exit edit mode' : 'Enter edit mode',
      group: 'Layout',
      shortcutHint: '⇧E',
      action: () => { onClose(); onToggleEdit(); },
    });
    cmds.push({
      id: 'layout-reset',
      label: 'Reset layout',
      group: 'Layout',
      shortcutHint: '⇧R',
      action: () => { onClose(); resetPageLayout(activePageId, activeWidgets); },
    });
    cmds.push({
      id: 'layout-fixed-height',
      label: activePage.fixedHeight ? 'Disable fixed height' : 'Enable fixed height',
      group: 'Layout',
      action: () => { onClose(); setPageFixedHeight(activePageId, !activePage.fixedHeight); },
    });

    // Settings
    cmds.push({
      id: 'settings-marketplace',
      label: 'Open widget marketplace',
      group: 'Settings',
      shortcutHint: '⇧M',
      action: () => { onClose(); onOpenMarketplace(); },
    });
    cmds.push({
      id: 'settings-page',
      label: 'Open page settings',
      group: 'Settings',
      action: () => { onClose(); onOpenPageSettings(); },
    });

    // Dev
    if (devMode) {
      cmds.push({
        id: 'dev-automation',
        label: 'Open automation studio',
        group: 'Dev',
        shortcutHint: '⇧A',
        action: () => { onClose(); onOpenAutomation(); },
      });
      cmds.push({
        id: 'dev-monitor',
        label: 'Open monitor',
        group: 'Dev',
        shortcutHint: '⇧Esc',
        action: () => { onClose(); onOpenMonitor(); },
      });
    }
    cmds.push({
      id: 'dev-toggle',
      label: devMode ? 'Disable dev mode' : 'Enable dev mode',
      group: 'Dev',
      shortcutHint: '`',
      action: () => { onClose(); onToggleDevMode(); },
    });

    return cmds;
  }, [
    pages, activePageId, activePage, activeWidgets, isEditing, devMode,
    setActivePage, createPage, deletePage, addWidgetToPage, removeWidgetFromPage,
    resetPageLayout, setPageFixedHeight, onToggleEdit, onToggleDevMode,
    onOpenMarketplace, onOpenPageSettings, onOpenAutomation, onOpenMonitor, onClose,
  ]);
}
