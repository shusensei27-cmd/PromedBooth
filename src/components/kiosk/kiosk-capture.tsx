"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Camera, FlipHorizontal, Check, RotateCcw, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_SLOTS = 2; // from template config

export function KioskCapture() {
  const params = useParams();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isMirror, setIsMirror] = useState(true);
  const [photos, setPhotos] = useState<string[]>([]);
  const [currentSlot, setCurrentSlot] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsReady(true);
        setError(null);
      }
    } catch {
      setError("Kamera tidak dapat diakses. Izinkan akses kamera.");
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => streamRef.current?.getTracks().forEach((t) => t.stop());
  }, [startCamera]);

  const capture = useCallback(() => {
    if (!videoRef.current || !isReady) return;
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          const canvas = document.createElement("canvas");
          canvas.width = videoRef.current!.videoWidth || 1920;
          canvas.height = videoRef.current!.videoHeight || 1080;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            if (isMirror) { ctx.translate(canvas.width, 0); ctx.scale(-1, 1); }
            ctx.drawImage(videoRef.current!, 0, 0);
            const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
            setPhotos((prev) => {
              const next = [...prev];
              next[currentSlot] = dataUrl;
              return next;
            });
          }
          setCountdown(null);
          if (currentSlot < TOTAL_SLOTS - 1) {
            setCurrentSlot(currentSlot + 1);
          } else {
            setIsComplete(true);
          }
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  }, [isReady, isMirror, currentSlot]);

  const retakeSlot = (slotIdx: number) => {
    setCurrentSlot(slotIdx);
    setIsComplete(false);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-8">
        <div className="text-center">
          <Camera className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
          <p className="text-zinc-400 mb-4">{error}</p>
          <Button variant="primary" onClick={startCamera}>Coba Lagi</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative flex flex-col">
      {/* Camera preview */}
      <div className="flex-1 relative flex items-center justify-center">
        <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover ${isMirror ? "scale-x-[-1]" : ""}`} />

        {/* Slot progress indicator */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-3">
          {Array.from({ length: TOTAL_SLOTS }).map((_, i) => (
            <div key={i} className={`w-12 h-1.5 rounded-full transition-all ${i === currentSlot && !isComplete ? "bg-primary w-16" : photos[i] ? "bg-green-500" : "bg-white/30"}`} />
          ))}
        </div>

        {/* Slot label */}
        <div className="absolute top-14 left-1/2 -translate-x-1/2">
          <span className="text-white/70 text-sm">
            Foto {currentSlot + 1} dari {TOTAL_SLOTS}
          </span>
        </div>

        {/* Countdown */}
        <AnimatePresence>
          {countdown !== null && (
            <motion.div key="cd" initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="text-9xl font-bold text-white drop-shadow-2xl">{countdown}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Photos preview at bottom */}
        {photos.some(Boolean) && (
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-3">
            {photos.map((p, i) => p ? (
              <div key={i} className="relative group cursor-pointer" onClick={() => retakeSlot(i)}>
                <div className="w-16 h-20 rounded-[var(--radius-sm)] overflow-hidden border-2 border-white/40 shadow-lg">
                  <img src={p} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center rounded-[var(--radius-sm)] transition-all">
                  <RotateCcw className="w-5 h-5 text-white opacity-0 group-hover:opacity-100" />
                </div>
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">✓</span>
              </div>
            ) : null)}
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
        <div className="flex items-center justify-center gap-6 max-w-md mx-auto">
          <button onClick={() => setIsMirror(!isMirror)} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors">
            <FlipHorizontal className="w-5 h-5 text-white" />
          </button>

          {isComplete ? (
            <Button variant="primary" size="lg" className="text-lg px-10 py-5 rounded-[var(--radius-lg)] shadow-2xl"
              onClick={() => router.push(`/kiosk/${params?.eventId}/preview`)}>
              <Check className="w-6 h-6 mr-2" /> Selesai ({TOTAL_SLOTS} foto)
            </Button>
          ) : (
            <button
              onClick={capture}
              disabled={!isReady || countdown !== null}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Camera className="w-8 h-8 text-white" />
            </button>
          )}

          <button onClick={() => { setPhotos([]); setCurrentSlot(0); setIsComplete(false); }}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors">
            <RotateCcw className="w-5 h-5 text-white" />
          </button>
        </div>

        {!isComplete && (
          <p className="text-center text-zinc-400 text-xs mt-4">
            {currentSlot > 0 ? `Klik foto untuk retake` : `Tekan tombol kamera untuk mulai`}
          </p>
        )}
      </div>
    </div>
  );
}
