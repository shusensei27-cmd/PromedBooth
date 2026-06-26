"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Frame, Plus, Search, Trash2, Layers, ExternalLink } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { motion } from "framer-motion";

const DEMO_TEMPLATES = [
  { id: "1", name: "Two Star 4R (Community)", layers: 5, used: 3, isPublic: true },
  { id: "2", name: "Elegant Gold Frame", layers: 7, used: 2, isPublic: true },
  { id: "3", name: "Polaroid Classic", layers: 3, used: 4, isPublic: true },
];

export default function TemplatesPage() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = DEMO_TEMPLATES.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Template Frame</h2>
          <p className="text-muted mt-1">Daftar bingkai foto milik Anda</p>
        </div>
        {isAdmin && (
          <Link href="/dashboard/templates/new">
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-1" />
              + Template Baru
            </Button>
          </Link>
        )}
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Cari template..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-metal pl-10"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Frame className="w-12 h-12" />}
          title="Tidak ada template"
          description={search ? "Coba kata kunci lain" : "Buat template bingkai foto pertama Anda"}
          action={isAdmin && !search ? (
            <Link href="/dashboard/templates/new"><Button variant="primary"><Plus className="w-4 h-4 mr-1" />Buat Template</Button></Link>
          ) : undefined}
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((template, idx) => (
            <motion.div key={template.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <div className="card-metal overflow-hidden group">
                <Link href={`/dashboard/templates/${template.id}/edit`}>
                  <div className="aspect-[9/16] bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200 relative flex items-center justify-center">
                    <Frame className="w-16 h-16 text-purple-300/50" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-4 py-2 rounded-[var(--radius-md)]">Edit</span>
                    </div>
                  </div>
                </Link>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-foreground">{template.name}</h3>
                    {isAdmin && (
                      <button onClick={() => setDeleteId(template.id)} className="p-1.5 rounded-[var(--radius-sm)] hover:bg-accent/50">
                        <Trash2 className="w-4 h-4 text-muted hover:text-destructive" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span className="flex items-center gap-1"><Layers className="w-3 h-3" />{template.layers} layer</span>
                    <span>{template.used} event</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => setDeleteId(null)}
        title="Hapus Template" message="Template akan dihapus dari semua event yang menggunakannya." confirmLabel="Hapus" variant="danger"
      />
    </div>
  );
}
