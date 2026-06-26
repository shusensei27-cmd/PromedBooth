"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { Undo2, Redo2, Save, ChevronLeft, Upload, Move, Plus, Image, Trash2, ZoomIn, ZoomOut } from "lucide-react";

export default function TemplateEditorPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<any>(null);
  const [slotCount, setSlotCount] = useState(2);
  const [hasBg, setHasBg] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const isAdmin = session?.user?.role === "ADMIN";

  const pushHistory = useCallback(() => {
    if (!fabricRef.current) return;
    const json = JSON.stringify(fabricRef.current.toJSON());
    setHistory(prev => {
      const next = prev.slice(0, histIdx + 1);
      next.push(json);
      return next.slice(-30);
    });
    setHistIdx(prev => Math.min(prev + 1, 29));
  }, [histIdx]);

  const initCanvas = useCallback(async () => {
    const { fabric } = await import("fabric");
    if (!canvasRef.current || fabricRef.current) return;
    const canvas = new fabric.Canvas(canvasRef.current, { width: 1080, height: 1920, backgroundColor: "#f0f0f0", preserveObjectStacking: true });
    fabricRef.current = canvas;
    pushHistory();
    canvas.on("object:modified", () => pushHistory());
  }, [pushHistory]);

  useEffect(() => {
    initCanvas();
    return () => { fabricRef.current?.dispose(); fabricRef.current = null; };
  }, [initCanvas]);

  const undo = useCallback(() => {
    if (histIdx <= 0 || !fabricRef.current) return;
    setHistIdx(i => i - 1);
    fabricRef.current.loadFromJSON(JSON.parse(history[histIdx - 1]), () => fabricRef.current!.renderAll());
  }, [histIdx, history]);

  const redo = useCallback(() => {
    if (histIdx >= history.length - 1 || !fabricRef.current) return;
    setHistIdx(i => i + 1);
    fabricRef.current.loadFromJSON(JSON.parse(history[histIdx + 1]), () => fabricRef.current!.renderAll());
  }, [histIdx, history]);

  const uploadDesign = useCallback(async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png,image/webp";
    input.onchange = async (e: any) => {
      const file = e.target?.files?.[0];
      if (!file) return;
      const { fabric } = await import("fabric");
      const reader = new FileReader();
      reader.onload = (ev) => {
        const url = ev.target?.result as string;
        fabric.Image.fromURL(url, (img: any) => {
          if (!fabricRef.current) return;
          const cw = fabricRef.current.width, ch = fabricRef.current.height;
          const scale = Math.min(cw / (img.width || cw), ch / (img.height || ch));
          img.set({ left: 0, top: 0, scaleX: scale, scaleY: scale, selectable: false, evented: false, name: "__bg__" });
          const existing = fabricRef.current.getObjects().filter((o: any) => o.name === "__bg__");
          existing.forEach((o: any) => fabricRef.current!.remove(o));
          fabricRef.current.sendToBack(img);
          fabricRef.current.add(img);
          fabricRef.current.renderAll();
          setHasBg(true);
          pushHistory();
        });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }, [pushHistory]);

  const addSlots = useCallback(async (count?: number) => {
    const { fabric } = await import("fabric");
    if (!fabricRef.current) return;
    const n = count ?? slotCount + 1;
    setSlotCount(n);
    const existing = fabricRef.current.getObjects().filter((o: any) => o.name?.startsWith("slot_"));
    existing.forEach((o: any) => fabricRef.current!.remove(o));
    const cols = n <= 2 ? 1 : 2;
    const rows = Math.ceil(n / cols);
    const cw = 700 / cols, ch = 520 / rows;
    const startX = (1080 - cw * cols) / 2, startY = 200;
    const colors = ["#DBEAFE", "#FEF3C7", "#D1FAE5", "#FCE7F3", "#E0E7FF", "#FFEDD5"];
    for (let i = 0; i < n; i++) {
      const col = i % cols, row = Math.floor(i / cols);
      const rect = new fabric.Rect({
        left: startX + col * cw + 8, top: startY + row * ch + 8,
        width: cw - 16, height: ch - 16,
        fill: colors[i % colors.length], stroke: "#2563EB", strokeWidth: 2.5,
        strokeDashArray: [6, 4], rx: 12, ry: 12,
        name: `slot_${i + 1}`, cornerSize: 10,
      });
      const label = new fabric.Text(`Foto ${i + 1}`, {
        left: startX + col * cw + cw / 2, top: startY + row * ch + ch / 2 - 10,
        fontSize: 28, fontFamily: "Arial", fill: "#2563EB", originX: "center", originY: "center", selectable: false, evented: false,
      });
      fabricRef.current.add(rect);
      fabricRef.current.add(label);
    }
    fabricRef.current.renderAll();
    pushHistory();
    toast.success(`${n} slot foto ditambahkan`);
  }, [slotCount, pushHistory]);

  const deleteSelected = useCallback(() => {
    const active = fabricRef.current?.getActiveObject();
    if (active) {
      fabricRef.current?.remove(active);
      fabricRef.current?.discardActiveObject();
      fabricRef.current?.renderAll();
      pushHistory();
    }
  }, [pushHistory]);

  const handleSave = () => { toast.success("Template disimpan!"); };

  if (!isAdmin) return <div className="p-8 text-center"><p className="text-muted">Permission denied</p></div>;

  const btn = "h-9 px-3 flex items-center gap-1.5 rounded-[var(--radius-sm)] text-sm font-semibold text-muted hover:bg-accent hover:text-primary transition-colors whitespace-nowrap";

  const zoomIn = () => setZoom(z => Math.min(z + 0.1, 3));
  const zoomOut = () => setZoom(z => Math.max(z - 0.1, 0.3));

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-zinc-800">
      {/* Top toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-surface border-b-2 border-metal/30 shrink-0">
        <div className="flex items-center gap-2">
          <button onClick={() => router.push("/dashboard/templates")} className="touch-min w-9 h-9 flex items-center justify-center rounded-[var(--radius-sm)] hover:bg-accent/50"><ChevronLeft className="w-5 h-5" /></button>
          <span className="font-bold text-foreground">Two Star 4R (Community)</span>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto">
          <button onClick={undo} disabled={histIdx <= 0} className={btn}><Undo2 className="w-4 h-4" /> Undo</button>
          <button onClick={redo} disabled={histIdx >= history.length - 1} className={btn}><Redo2 className="w-4 h-4" /> Redo</button>
          <div className="w-px h-6 bg-metal/40 mx-1" />
          <button onClick={zoomOut} className={btn}><ZoomOut className="w-4 h-4" /></button>
          <span className="text-xs text-muted w-12 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={zoomIn} className={btn}><ZoomIn className="w-4 h-4" /></button>
          <div className="w-px h-6 bg-metal/40 mx-1" />
          <button onClick={uploadDesign} className={`${btn} ${hasBg ? "bg-green-50 text-green-700" : ""}`}>
            <Upload className="w-4 h-4" /> Upload Desain
          </button>
          <button onClick={() => addSlots()} className={btn}>
            <Plus className="w-4 h-4" /> Tambah Slot ({slotCount})
          </button>
          <button onClick={deleteSelected} className={btn}>
            <Trash2 className="w-4 h-4" /> Hapus
          </button>
          <div className="w-px h-6 bg-metal/40 mx-1" />
          <Button variant="primary" size="sm" onClick={handleSave}><Save className="w-4 h-4 mr-1" /> Simpan</Button>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-1.5 bg-metal/5 border-b border-metal/10 text-xs text-muted shrink-0">
        <span className="flex items-center gap-1"><Image className="w-3 h-3" /> Upload desain frame (PNG transparan)</span>
        <span className="text-metal/50">|</span>
        <span className="flex items-center gap-1"><Plus className="w-3 h-3" /> Atur posisi foto di atas desain</span>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex items-start justify-center overflow-auto p-4 bg-zinc-800" style={{ backgroundImage: "radial-gradient(circle, #444 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
          <div style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}>
            <canvas ref={canvasRef} />
          </div>
        </div>

        {/* Right panel */}
        <div className="w-64 bg-surface border-l-2 border-metal/30 p-4 overflow-y-auto shrink-0">
          <h4 className="font-semibold text-foreground mb-4">Layers</h4>
          <p className="text-xs text-muted">
            {hasBg ? "✓ Background terpasang" : "Upload desain frame (PNG) untuk mulai"}
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-xs font-semibold text-muted">Slot aktif: {slotCount}</p>
            <p className="text-xs text-muted">Klik slot di canvas untuk atur posisi</p>
          </div>
          <div className="mt-6 p-3 rounded-[var(--radius-md)] bg-accent/30 border border-primary/20 text-xs text-primary">
            <p className="font-semibold">Tips:</p>
            <p className="mt-1">1. Upload desain frame (PNG transparan)</p>
            <p className="mt-1">2. Tambah slot foto sesuai jumlah template</p>
            <p className="mt-1">3. Drag slot ke posisi yang diinginkan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
