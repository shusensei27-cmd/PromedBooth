"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Camera, Sparkles, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export function KioskWelcome() {
  const params = useParams();
  const router = useRouter();
  const eventId = params?.eventId as string;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [bgType, setBgType] = useState<"color" | "video">("color");

  useEffect(() => {
    // Try to load background.mp4 if it exists
    const video = videoRef.current;
    if (video) {
      video.onerror = () => setBgType("color");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-zinc-900 via-black to-zinc-900 relative overflow-hidden">
      {/* Background media */}
      {bgType === "video" ? (
        <video ref={videoRef} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40">
          <source src={`/backgrounds/${eventId}.mp4`} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
      )}

      {/* Branding overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

      <div className="text-center z-10 max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/30">
            <Camera className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
            PROMEDBOOTH
          </h1>
          <p className="text-xl text-zinc-300 mb-2">Wedding Budi & Sari</p>
          <p className="text-zinc-400 mb-12">Abadikan momen spesial Anda</p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <Button
              variant="primary"
              size="lg"
              className="text-xl px-12 py-6 rounded-[var(--radius-lg)] shadow-2xl shadow-primary/30 animate-pulse"
              onClick={() => router.push(`/kiosk/${eventId}/capture`)}
            >
              <Sparkles className="w-6 h-6 mr-2" />
              Mulai
            </Button>

            <p className="text-zinc-500 text-sm flex items-center justify-center gap-1">
              <Smartphone className="w-4 h-4" /> Scan QR untuk lihat hasil
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 text-center text-zinc-600 text-xs">
        PROMEDBOOTH Enterprise · Photobooth Runtime v2.0
      </div>
    </div>
  );
}
