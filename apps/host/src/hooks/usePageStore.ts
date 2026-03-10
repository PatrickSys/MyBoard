import { useState, useEffect, useCallback, useMemo } from 'react';
import type { WidgetManifest, WidgetInstallRecord } from '@myboard/sdk';

type SavedLayout = { i: string; x: number; y: number; w: number; h: number }[];

type PageId = string;

interface PageState {
  id: PageId;
  name: string;
  widgetIds: string[];
  layout: SavedLayout;
  /** Per-widget title overrides (keyed by widget id). */
  widgetTitles: Record<string, string>;
  /** When true the grid does not scroll; row count is capped to viewport height. */
  fixedHeight: boolean;
  titleVisibility: 'always' | 'hover' | 'hidden';
  createdAt: string;
  updatedAt: string;
}

interface PageStoreState {
  version: 1;
  activePageId: PageId;
  pages: PageState[];
}

const STORAGE_KEY = 'myboard.pages.v1';
const LEGACY_LAYOUT_KEY = 'myboard.layout';

function buildDefaultLayout(widgets: ReadonlyArray<WidgetManifest>): SavedLayout {
  return widgets.map((widget, index) => {
    const defaults = widget.layoutDefaults;
    const fallbackX = index % 2 === 0 ? 0 : 2;
    const fallbackY = Math.floor(index / 2) * 3;
    return {
      i: widget.id,
      x: defaults?.x ?? fallbackX,
      y: defaults?.y ?? fallbackY,
      w: defaults?.w ?? 2,
      h: defaults?.h ?? 3,
    };
  });
}

function createPage(name: string, widgetIds: string[] = [], layout: SavedLayout = []): PageState {
  const now = new Date().toISOString();
  return {
    id: `page_${Date.now()}`,
    name,
    widgetIds,
    layout,
    widgetTitles: {},
    fixedHeight: false,
    titleVisibility: 'always',
    createdAt: now,
    updatedAt: now,
  };
}

function loadStore(installedRecords: ReadonlyArray<WidgetInstallRecord>): PageStoreState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PageStoreState;
      if (parsed.version === 1 && parsed.pages.length > 0) {
      // Back-fill fixedHeight for pages that predate this field.
      // Spread order: default first so an already-stored value wins.
      const pages = (parsed.pages as Partial<PageState>[]).map((p): PageState => ({
        ...p as PageState,
        widgetTitles: p.widgetTitles ?? {},
        fixedHeight: p.fixedHeight ?? false,
        titleVisibility: p.titleVisibility ?? 'always',
      }));
      return { ...parsed, pages };
    }
    }
  } catch {
    // fall through to migration
  }

  // Migration: use existing layout if available
  let legacyLayout: SavedLayout = [];
  try {
    const saved = localStorage.getItem(LEGACY_LAYOUT_KEY);
    if (saved) legacyLayout = JSON.parse(saved) as SavedLayout;
  } catch {
    // ignore
  }

  const widgetIds = installedRecords
    .filter((r) => r.enabled)
    .map((r) => r.widgetId);

  const mainPage = createPage('Main', widgetIds, legacyLayout);
  mainPage.id = 'page_default';

  return {
    version: 1,
    activePageId: mainPage.id,
    pages: [mainPage],
  };
}

function persist(state: PageStoreState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

/** Server-safe initial state: single empty page, consistent between SSR and CSR hydration. */
function getInitialState(): PageStoreState {
  const page = createPage('Main', [], []);
  page.id = 'page_default';
  return { version: 1, activePageId: page.id, pages: [page] };
}

export function usePageStore(installedRecords: ReadonlyArray<WidgetInstallRecord>) {
  // Initialize with a stable server-safe default to avoid SSR/CSR hydration mismatch.
  // localStorage is loaded after mount via useEffect.
  const [state, setState] = useState<PageStoreState>(getInitialState);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage after mount
  useEffect(() => {
    setState(loadStore(installedRecords));
    setHydrated(true);
  // Run once on mount; installedRecords intentionally excluded to avoid re-loading on every render.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist on every state change, but only after hydration to avoid overwriting saved data
  // with the blank initial state.
  useEffect(() => {
    if (hydrated) persist(state);
  }, [state, hydrated]);

  // Prune stale widget IDs when widgets are globally uninstalled
  useEffect(() => {
    const installedIds = new Set(installedRecords.map((r) => r.widgetId));
    setState((prev) => {
      let changed = false;
      const pages = prev.pages.map((page) => {
        const filtered = page.widgetIds.filter((id) => installedIds.has(id));
        if (filtered.length !== page.widgetIds.length) {
          changed = true;
          return {
            ...page,
            widgetIds: filtered,
            layout: page.layout.filter((item) => installedIds.has(item.i)),
            updatedAt: new Date().toISOString(),
          };
        }
        return page;
      });
      return changed ? { ...prev, pages } : prev;
    });
  }, [installedRecords]);

  const pages = state.pages;
  const activePageId = state.activePageId;
  const activePage = useMemo(
    () => state.pages.find((p) => p.id === state.activePageId) ?? state.pages[0],
    [state]
  );

  const setActivePage = useCallback((id: PageId) => {
    setState((prev) => ({ ...prev, activePageId: id }));
  }, []);

  const createNewPage = useCallback((name: string) => {
    setState((prev) => {
      const page = createPage(name);
      return {
        ...prev,
        activePageId: page.id,
        pages: [...prev.pages, page],
      };
    });
  }, []);

  const renamePage = useCallback((id: PageId, name: string) => {
    setState((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.id === id ? { ...p, name, updatedAt: new Date().toISOString() } : p
      ),
    }));
  }, []);

  const deletePage = useCallback((id: PageId) => {
    setState((prev) => {
      if (prev.pages.length <= 1) return prev;
      const pages = prev.pages.filter((p) => p.id !== id);
      const activePageId =
        prev.activePageId === id ? pages[0].id : prev.activePageId;
      return { ...prev, pages, activePageId };
    });
  }, []);

  const addWidgetToPage = useCallback((pageId: PageId, widgetId: string) => {
    setState((prev) => ({
      ...prev,
      pages: prev.pages.map((p) => {
        if (p.id !== pageId || p.widgetIds.includes(widgetId)) return p;
        return {
          ...p,
          widgetIds: [...p.widgetIds, widgetId],
          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  }, []);

  const removeWidgetFromPage = useCallback((pageId: PageId, widgetId: string) => {
    setState((prev) => ({
      ...prev,
      pages: prev.pages.map((p) => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          widgetIds: p.widgetIds.filter((id) => id !== widgetId),
          layout: p.layout.filter((item) => item.i !== widgetId),
          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  }, []);

  const updatePageLayout = useCallback((pageId: PageId, layout: SavedLayout) => {
    setState((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.id === pageId ? { ...p, layout, updatedAt: new Date().toISOString() } : p
      ),
    }));
  }, []);

  const setPageFixedHeight = useCallback((pageId: PageId, value: boolean) => {
    setState((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.id === pageId
          ? { ...p, fixedHeight: value, updatedAt: new Date().toISOString() }
          : p
      ),
    }));
  }, []);

  const setPageTitleVisibility = useCallback(
    (pageId: PageId, visibility: 'always' | 'hover' | 'hidden') => {
      setState((prev) => ({
        ...prev,
        pages: prev.pages.map((p) =>
          p.id === pageId
            ? { ...p, titleVisibility: visibility, updatedAt: new Date().toISOString() }
            : p
        ),
      }));
    },
    []
  );

  const setWidgetTitle = useCallback((pageId: PageId, widgetId: string, title: string) => {
    setState((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.id === pageId
          ? {
              ...p,
              widgetTitles: { ...p.widgetTitles, [widgetId]: title },
              updatedAt: new Date().toISOString(),
            }
          : p
      ),
    }));
  }, []);

  const resetPageLayout = useCallback(
    (pageId: PageId, manifests: ReadonlyArray<WidgetManifest>) => {
      setState((prev) => ({
        ...prev,
        pages: prev.pages.map((p) => {
          if (p.id !== pageId) return p;
          const pageManifests = manifests.filter((m) => p.widgetIds.includes(m.id));
          return {
            ...p,
            layout: buildDefaultLayout(pageManifests),
            updatedAt: new Date().toISOString(),
          };
        }),
      }));
    },
    []
  );

  return {
    pages,
    activePageId,
    activePage,
    setActivePage,
    createPage: createNewPage,
    renamePage,
    deletePage,
    addWidgetToPage,
    removeWidgetFromPage,
    updatePageLayout,
    resetPageLayout,
    setPageFixedHeight,
    setPageTitleVisibility,
    setWidgetTitle,
  };
}
