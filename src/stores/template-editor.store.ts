import { create } from "zustand";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FabricCanvas = any;

interface HistoryEntry {
  canvasJson: string;
  timestamp: number;
}

interface TemplateEditorState {
  canvas: FabricCanvas | null;
  selectedLayerId: string | null;
  zoom: number;
  showGrid: boolean;
  snapEnabled: boolean;
  history: HistoryEntry[];
  historyPointer: number;
  isDirty: boolean;

  setCanvas: (canvas: FabricCanvas | null) => void;
  setSelectedLayer: (id: string | null) => void;
  setZoom: (zoom: number) => void;
  toggleGrid: () => void;
  toggleSnap: () => void;
  pushHistory: (canvasJson: string) => void;
  undo: () => string | null;
  redo: () => string | null;
  setDirty: (dirty: boolean) => void;
  reset: () => void;
}

const MAX_HISTORY = 50;

export const useTemplateEditorStore = create<TemplateEditorState>((set, get) => ({
  canvas: null,
  selectedLayerId: null,
  zoom: 1,
  showGrid: false,
  snapEnabled: true,
  history: [],
  historyPointer: -1,
  isDirty: false,

  setCanvas: (canvas) => set({ canvas }),

  setSelectedLayer: (id) => set({ selectedLayerId: id }),

  setZoom: (zoom) => set({ zoom: Math.max(0.1, Math.min(5, zoom)) }),

  toggleGrid: () => set((s) => ({ showGrid: !s.showGrid })),

  toggleSnap: () => set((s) => ({ snapEnabled: !s.snapEnabled })),

  pushHistory: (canvasJson) =>
    set((s) => {
      const newHistory = s.history.slice(0, s.historyPointer + 1);
      newHistory.push({ canvasJson, timestamp: Date.now() });

      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
      }

      return {
        history: newHistory,
        historyPointer: newHistory.length - 1,
        isDirty: true,
      };
    }),

  undo: () => {
    const { historyPointer, history } = get();
    if (historyPointer <= 0) return null;

    const newPointer = historyPointer - 1;
    set({ historyPointer: newPointer, isDirty: true });
    return history[newPointer].canvasJson;
  },

  redo: () => {
    const { historyPointer, history } = get();
    if (historyPointer >= history.length - 1) return null;

    const newPointer = historyPointer + 1;
    set({ historyPointer: newPointer, isDirty: true });
    return history[newPointer].canvasJson;
  },

  setDirty: (dirty) => set({ isDirty: dirty }),

  reset: () =>
    set({
      canvas: null,
      selectedLayerId: null,
      zoom: 1,
      showGrid: false,
      snapEnabled: true,
      history: [],
      historyPointer: -1,
      isDirty: false,
    }),
}));
