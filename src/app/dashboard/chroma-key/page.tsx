"use client";

import { useState, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pipette, Camera, Upload, Download, Wand2 } from "lucide-react";

export default function ChromaKeyPage() {
  const [mode, setMode] = useState<"camera" | "upload">("upload");
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [sensitivity, setSensitivity] = useState(30);
  const [smoothness, setSmoothness] = useState(15);
  const [targetColor, setTargetColor] = useState("#00FF00");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setSourceImage(ev.target?.result as string); setResultImage(null); };
    reader.readAsDataURL(file);
  }, []);

  const handleProcess = useCallback(() => {
    if (!sourceImage) return; setIsProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas"); canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext("2d"); if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const r = parseInt(targetColor.slice(1,3), 16), g = parseInt(targetColor.slice(3,5), 16), b = parseInt(targetColor.slice(5,7), 16);
      for (let i = 0; i < data.length; i += 4) {
        const dr = data[i] - r, dg = data[i+1] - g, db = data[i+2] - b;
        if (Math.sqrt(dr*dr + dg*dg + db*db) < sensitivity) data[i+3] = 0;
      }
      ctx.putImageData(imageData, 0, 0);
      setResultImage(canvas.toDataURL("image/png"));
      setIsProcessing(false);
    };
    img.src = sourceImage;
  }, [sourceImage, targetColor, sensitivity]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Chroma Key Tool</h2>
        <p className="text-muted text-sm mt-1">Hapus latar belakang secara instan — hasil transparan resolusi Full HD</p>
      </div>

      <div className="flex gap-2">
        {[{ id: "camera" as const, label: "Gunakan Kamera", icon: Camera }, { id: "upload" as const, label: "Unggah Foto", icon: Upload }].map((m) => (
          <button key={m.id} onClick={() => setMode(m.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-[var(--radius-md)] text-sm font-semibold transition-all ${
              mode === m.id ? "bg-primary text-white shadow-md" : "bg-surface border-2 border-metal text-muted hover:border-primary/30"
            }`}
          ><m.icon className="w-4 h-4" />{m.label}</button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card><div className="p-5">
          <h4 className="font-semibold mb-4">Sumber</h4>
          {!sourceImage ? (
            <div onClick={() => fileRef.current?.click()} className="aspect-[4/3] rounded-[var(--radius-md)] border-2 border-dashed border-metal/50 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-accent/20 transition-all">
              <Upload className="w-12 h-12 text-muted mb-3" />
              <p className="text-sm font-semibold text-muted">Klik untuk unggah foto</p>
              <p className="text-xs text-muted mt-1">PNG, JPG</p>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            </div>
          ) : (
            <div className="relative aspect-[4/3] rounded-[var(--radius-md)] overflow-hidden border-2 border-metal/30">
              <img src={sourceImage} alt="Source" className="w-full h-full object-contain bg-zinc-900" />
            </div>
          )}
        </div></Card>

        <Card><div className="p-5">
          <h4 className="font-semibold mb-4">Hasil</h4>
          {resultImage ? (
            <div className="relative aspect-[4/3] rounded-[var(--radius-md)] overflow-hidden border-2 border-metal/30">
              <img src={resultImage} alt="Result" className="w-full h-full object-contain" />
              <Button variant="primary" size="sm" className="absolute bottom-2 right-2"
                onClick={() => { const a = document.createElement("a"); a.download = "chroma-key-result.png"; a.href = resultImage; a.click(); }}>
                <Download className="w-4 h-4 mr-1" /> Download Full HD
              </Button>
            </div>
          ) : sourceImage ? (
            <div className="aspect-[4/3] rounded-[var(--radius-md)] border-2 border-dashed border-metal/50 flex items-center justify-center">
              <p className="text-sm text-muted">Klik &quot;Proses&quot; untuk melihat hasil</p>
            </div>
          ) : (
            <div className="aspect-[4/3] rounded-[var(--radius-md)] border-2 border-dashed border-metal/50 flex items-center justify-center">
              <p className="text-sm text-muted">Unggah foto untuk memulai</p>
            </div>
          )}
        </div></Card>
      </div>

      {sourceImage && !resultImage && (
        <div className="flex justify-center">
          <Button variant="primary" size="lg" onClick={handleProcess} isLoading={isProcessing}>
            <Wand2 className="w-5 h-5 mr-2" /> {isProcessing ? "Memproses..." : "Proses Chroma Key"}
          </Button>
        </div>
      )}

      <Card><div className="p-5 space-y-6">
        <h4 className="font-semibold text-foreground">Pengaturan Efek</h4>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-semibold mb-2 block">Warna Target</label>
            <div className="flex items-center gap-3">
              <input type="color" value={targetColor} onChange={(e) => setTargetColor(e.target.value)} className="w-12 h-12 rounded-[var(--radius-sm)] border-2 border-metal cursor-pointer" />
              <span className="text-sm text-muted">{targetColor}</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Sensitivitas <span className="text-muted font-normal">{sensitivity}</span></label>
            <input type="range" min="0" max="200" value={sensitivity} onChange={(e) => setSensitivity(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Kehalusan <span className="text-muted font-normal">{smoothness}</span></label>
            <input type="range" min="0" max="20" value={smoothness} onChange={(e) => setSmoothness(Number(e.target.value))} className="w-full accent-primary" />
          </div>
        </div>
      </div></Card>
    </div>
  );
}
