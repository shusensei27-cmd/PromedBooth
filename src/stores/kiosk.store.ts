import { create } from "zustand";

type KioskStep =
  | "WELCOME"
  | "PAYMENT"
  | "COUNTDOWN"
  | "CAPTURE"
  | "PREVIEW"
  | "RENDER"
  | "DOWNLOAD"
  | "FINISH";

interface CapturedPhoto {
  id: string;
  dataUrl: string;
  index: number;
}

interface KioskState {
  step: KioskStep;
  eventId: string | null;
  sessionId: string | null;
  transactionId: string | null;
  capturedPhotos: CapturedPhoto[];
  currentCaptureIndex: number;
  totalCaptures: number;
  isProcessing: boolean;
  error: string | null;

  setStep: (step: KioskStep) => void;
  setEventId: (id: string) => void;
  setSessionId: (id: string) => void;
  setTransactionId: (id: string | null) => void;
  addPhoto: (photo: CapturedPhoto) => void;
  removePhoto: (id: string) => void;
  clearPhotos: () => void;
  nextCapture: () => void;
  setTotalCaptures: (n: number) => void;
  setProcessing: (v: boolean) => void;
  setError: (e: string | null) => void;
  reset: () => void;
}

export const useKioskStore = create<KioskState>((set) => ({
  step: "WELCOME",
  eventId: null,
  sessionId: null,
  transactionId: null,
  capturedPhotos: [],
  currentCaptureIndex: 0,
  totalCaptures: 1,
  isProcessing: false,
  error: null,

  setStep: (step) => set({ step }),
  setEventId: (id) => set({ eventId: id }),
  setSessionId: (id) => set({ sessionId: id }),
  setTransactionId: (id) => set({ transactionId: id }),
  addPhoto: (photo) =>
    set((s) => ({ capturedPhotos: [...s.capturedPhotos, photo] })),
  removePhoto: (id) =>
    set((s) => ({
      capturedPhotos: s.capturedPhotos.filter((p) => p.id !== id),
    })),
  clearPhotos: () => set({ capturedPhotos: [], currentCaptureIndex: 0 }),
  nextCapture: () =>
    set((s) => ({ currentCaptureIndex: s.currentCaptureIndex + 1 })),
  setTotalCaptures: (n) => set({ totalCaptures: n }),
  setProcessing: (v) => set({ isProcessing: v }),
  setError: (e) => set({ error: e }),
  reset: () =>
    set({
      step: "WELCOME",
      sessionId: null,
      transactionId: null,
      capturedPhotos: [],
      currentCaptureIndex: 0,
      totalCaptures: 1,
      isProcessing: false,
      error: null,
    }),
}));
