"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Images, Search, Download, Share2, Trash2, Printer, Eye, Film, X, Grid3X3, List,
} from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

const DEMO = Array.from({ length: 12 }, (_, i) => ({
  id: `${i}`, event: `Event ${Math.floor(i / 4) + 1}`,
  template: "Two Star 4R", isPublic: i % 3 !== 0,
  downloads: Math.floor(Math.random() * 30),
  date: new Date(Date.now() - Math.random() * 7 * 864e5).toLocaleDateString(),
}));

export default function GalleryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const photos = DEMO;

  const filtered = photos;

  const detailPhoto = detailId ? photos.find(p => p.id === detailId) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gallery Global</h2>
          <p className="text-muted text-sm mt-1">Riwayat semua foto dari seluruh event — klik mata untuk detail</p>
        </div>
        <div className="flex items-center gap-2 bg-surface rounded-[var(--radius-md)] border-2 border-metal p-1">
          <button onClick={() => setViewMode("grid")} className={`p-2 rounded-[var(--radius-sm)] ${viewMode === "grid" ? "bg-primary text-white" : "text-muted hover:text-foreground"}`}><Grid3X3 className="w-4 h-4" /></button>
          <button onClick={() => setViewMode("list")} className={`p-2 rounded-[var(--radius-sm)] ${viewMode === "list" ? "bg-primary text-white" : "text-muted hover:text-foreground"}`}><List className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input type="text" placeholder="Cari berdasarkan nama event..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-metal pl-10" />
        </div>
        <select value={eventFilter} onChange={(e) => setEventFilter(e.target.value)} className="input-metal w-auto min-w-[150px]">
          <option value="all">Semua Event</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={<Images className="w-12 h-12" />} title="Belum ada foto" description="Foto akan muncul setelah pengunjung berfoto di kiosk." />
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((photo, idx) => (
            <motion.div key={photo.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.02 }}
              className="group relative aspect-[3/4] rounded-[var(--radius-md)] overflow-hidden border-2 border-metal/30 bg-metal/20 hover:border-primary/50 transition-all"
            >
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-blue-100 flex items-center justify-center">
                <Images className="w-8 h-8 text-primary/30" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs font-semibold truncate">{photo.event}</p>
                <p className="text-white/60 text-[10px]">{photo.date} · {photo.downloads} download</p>
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setDetailId(photo.id)} className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-[var(--radius-sm)] flex items-center justify-center hover:bg-primary/80"><Eye className="w-3.5 h-3.5 text-white" /></button>
                <button onClick={() => toast.success("Downloading...")} className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-[var(--radius-sm)] flex items-center justify-center hover:bg-green-600/80"><Download className="w-3.5 h-3.5 text-white" /></button>
                <button onClick={() => setDeleteId(photo.id)} className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-[var(--radius-sm)] flex items-center justify-center hover:bg-destructive/80"><Trash2 className="w-3.5 h-3.5 text-white" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card><div className="divide-y divide-metal/20">
          {filtered.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-6 py-4 hover:bg-accent/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-gradient-to-br from-primary/20 to-blue-200 flex items-center justify-center"><Images className="w-5 h-5 text-primary" /></div>
                <div><p className="text-sm font-semibold">{p.event}</p><p className="text-xs text-muted">{p.template} · {p.date} · {p.downloads} download</p></div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setDetailId(p.id)} className="p-1.5 rounded-[var(--radius-sm)] hover:bg-accent/50"><Eye className="w-4 h-4 text-muted" /></button>
                <button onClick={() => toast.success("Downloading...")} className="p-1.5 rounded-[var(--radius-sm)] hover:bg-accent/50"><Download className="w-4 h-4 text-muted" /></button>
                <button className="p-1.5 rounded-[var(--radius-sm)] hover:bg-accent/50"><Printer className="w-4 h-4 text-muted" /></button>
                <button className="p-1.5 rounded-[var(--radius-sm)] hover:bg-accent/50"><Film className="w-4 h-4 text-muted" /></button>
              </div>
            </div>
          ))}
        </div></Card>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {detailId && detailPhoto && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setDetailId(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-surface rounded-[var(--radius-lg)] border-2 border-metal overflow-hidden w-full max-w-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b border-metal/30">
                <div>
                  <h3 className="font-bold text-foreground">{detailPhoto.event}</h3>
                  <p className="text-xs text-muted">{detailPhoto.template} · {detailPhoto.date}</p>
                </div>
                <button onClick={() => setDetailId(null)} className="p-1.5 rounded-[var(--radius-sm)] hover:bg-accent/50"><X className="w-5 h-5" /></button>
              </div>
              <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-blue-100 flex items-center justify-center">
                <Images className="w-20 h-20 text-primary/30" />
              </div>
              <div className="p-4 flex items-center justify-center gap-3 flex-wrap">
                <Button variant="primary" size="sm" onClick={() => toast.success("Download started")}><Download className="w-4 h-4 mr-1" /> Download</Button>
                <Button variant="secondary" size="sm" onClick={() => toast.success("Sent to printer")}><Printer className="w-4 h-4 mr-1" /> Print</Button>
                <Button variant="secondary" size="sm" onClick={() => toast.success("GIF dibuat")}><Film className="w-4 h-4 mr-1" /> Buat GIF</Button>
                <Button variant="secondary" size="sm" onClick={() => toast.success("Link copied")}><Share2 className="w-4 h-4 mr-1" /> Share</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => setDeleteId(null)} title="Hapus Foto" message="Foto akan dihapus permanen." confirmLabel="Hapus" variant="danger" />
    </div>
  );
}
