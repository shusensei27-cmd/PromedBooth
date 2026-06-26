"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/shared/empty-state";
import {
  Frame,
  Plus,
  Search,
  Copy,
  Trash2,
  Layers,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

const DEMO_TEMPLATES = [
  { id: "1", name: "Elegant Gold Frame", canvasWidth: 1080, canvasHeight: 1920, layerCount: 5, isPublic: true, eventsUsed: 12 },
  { id: "2", name: "Polaroid Classic", canvasWidth: 1080, canvasHeight: 1920, layerCount: 3, isPublic: true, eventsUsed: 8 },
  { id: "3", name: "Neon Party Strip", canvasWidth: 1920, canvasHeight: 1080, layerCount: 7, isPublic: true, eventsUsed: 5 },
  { id: "4", name: "Vintage Film Frame", canvasWidth: 1080, canvasHeight: 1920, layerCount: 4, isPublic: false, eventsUsed: 3 },
  { id: "5", name: "Minimalist White", canvasWidth: 1080, canvasHeight: 1920, layerCount: 2, isPublic: true, eventsUsed: 7 },
];

export function TemplatesListPage() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = DEMO_TEMPLATES.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-metal-slide">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Template Frames</h2>
          <p className="text-muted mt-1">Design and manage photobooth frame templates</p>
        </div>
        {isAdmin && (
          <Link href="/dashboard/templates/new">
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-1" />
              New Template
            </Button>
          </Link>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-metal pl-10"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Frame className="w-10 h-10" />}
          title="No templates found"
          description={search ? "Try a different search term" : "Create your first template"}
          action={
            isAdmin && !search ? (
              <Link href="/dashboard/templates/new">
                <Button variant="primary">
                  <Plus className="w-4 h-4 mr-1" />
                  Create Template
                </Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((template, idx) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="card-metal overflow-hidden group">
                <Link href={`/dashboard/templates/${template.id}/edit`}>
                  <div className="aspect-[9/16] bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200 relative flex items-center justify-center">
                    <Frame className="w-16 h-16 text-purple-300/50" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-4 py-2 rounded-[var(--radius-md)]">
                        Open Editor
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-foreground">{template.name}</h3>
                    {isAdmin && (
                      <div className="flex gap-1">
                        <button
                          className="touch-min w-8 h-8 flex items-center justify-center rounded-[var(--radius-sm)] hover:bg-accent/50"
                          onClick={() => setDeleteId(template.id)}
                        >
                          <Trash2 className="w-4 h-4 text-muted hover:text-destructive" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      {template.layerCount} layers
                    </span>
                    <span>{template.canvasWidth}x{template.canvasHeight}</span>
                    <span>{template.eventsUsed} events</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => setDeleteId(null)}
        title="Delete Template"
        message="Are you sure? This will remove the template from all events that use it."
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  );
}
