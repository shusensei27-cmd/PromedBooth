"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, Smartphone, Download, Printer, Film, RefreshCw, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function KioskDownloadPage() {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-6 shadow-2xl"
      >
        <CheckCircle className="w-10 h-10 text-white" />
      </motion.div>

      <h2 className="text-3xl font-bold text-white mb-2">Foto Siap!</h2>
      <p className="text-zinc-400 mb-8 text-center">Hasil foto Anda sudah selesai diproses</p>

      {/* Final result preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative rounded-[var(--radius-lg)] overflow-hidden border-2 border-white/10 max-w-xs w-full aspect-[9/16] bg-zinc-800 mb-6 shadow-2xl"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-1 gap-3 p-5 w-full">
            {[1, 2].map((_, i) => (
              <div key={i} className={`aspect-[4/3] rounded-[var(--radius-sm)] bg-gradient-to-br ${i === 0 ? "from-primary/20 to-blue-200" : "from-purple-200 to-pink-200"} flex items-center justify-center`}>
                <Camera className="w-6 h-6 text-white/30" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <div className="flex gap-3 mb-8">
        <button onClick={() => toast.success("Downloading...")} className="flex flex-col items-center gap-1 px-4 py-3 rounded-[var(--radius-md)] bg-white/10 hover:bg-white/20 transition-colors">
          <Download className="w-5 h-5 text-white" />
          <span className="text-[10px] text-zinc-400">Download</span>
        </button>
        <button onClick={() => toast.success("Sent to printer")} className="flex flex-col items-center gap-1 px-4 py-3 rounded-[var(--radius-md)] bg-white/10 hover:bg-white/20 transition-colors">
          <Printer className="w-5 h-5 text-white" />
          <span className="text-[10px] text-zinc-400">Print</span>
        </button>
        <button onClick={() => toast.success("GIF dibuat!")} className="flex flex-col items-center gap-1 px-4 py-3 rounded-[var(--radius-md)] bg-white/10 hover:bg-white/20 transition-colors">
          <Film className="w-5 h-5 text-white" />
          <span className="text-[10px] text-zinc-400">Buat GIF</span>
        </button>
      </div>

      {/* QR Code */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <p className="text-zinc-400 text-sm mb-3">Scan untuk download</p>
        <div className="w-48 h-48 bg-white rounded-[var(--radius-lg)] p-4 mx-auto mb-4 shadow-2xl flex items-center justify-center">
          <Smartphone className="w-16 h-16 text-zinc-900" />
        </div>
        <p className="text-zinc-500 text-xs mb-8">Scan QR code dengan kamera HP Anda</p>
      </motion.div>

      <Button
        variant="secondary"
        size="lg"
        onClick={() => router.push(`/kiosk/${params?.eventId}`)}
        className="mt-2"
      >
        <RefreshCw className="w-5 h-5 mr-2" /> Ambil Foto Lagi
      </Button>
    </div>
  );
}
