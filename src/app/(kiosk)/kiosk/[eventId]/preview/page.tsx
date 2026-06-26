"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, RotateCcw, Camera } from "lucide-react";
import { motion } from "framer-motion";

const PREVIEW_PHOTOS = [
  { id: 1, gradient: "from-primary/20 to-blue-200" },
  { id: 2, gradient: "from-purple-200 to-pink-200" },
];

export default function KioskPreviewPage() {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-900 flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold text-white mb-8">Preview Foto</h2>

      {/* Template frame preview */}
      <div className="relative rounded-[var(--radius-lg)] overflow-hidden border-2 border-white/10 max-w-sm w-full aspect-[9/16] bg-zinc-800 mb-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-1 gap-4 p-6 w-full">
            {PREVIEW_PHOTOS.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`aspect-[4/3] rounded-[var(--radius-md)] bg-gradient-to-br ${p.gradient} flex items-center justify-center shadow-lg`}
              >
                <Camera className="w-8 h-8 text-white/40" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="secondary" size="lg" onClick={() => router.push(`/kiosk/${params?.eventId}/capture`)}>
          <RotateCcw className="w-5 h-5 mr-2" /> Retake
        </Button>
        <Button variant="primary" size="lg" onClick={() => router.push(`/kiosk/${params?.eventId}/download`)}>
          <Check className="w-5 h-5 mr-2" /> Lanjut
        </Button>
      </div>
    </div>
  );
}
