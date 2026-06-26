"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import {
  CalendarPlus,
  Plus,
  Search,
  Edit,
  Copy,
  Trash2,
  ExternalLink,
  Monitor,
  QrCode,
} from "lucide-react";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { motion } from "framer-motion";

const DEMO_EVENTS = [
  { id: "1", name: "Wedding Budi & Sari", status: "ACTIVE", theme: "VINTAGE", photos: 342, transactions: 89, date: "2026-06-20" },
  { id: "2", name: "Company Gathering", status: "ACTIVE", theme: "MINIMALIST", photos: 156, transactions: 45, date: "2026-06-18" },
];

const statusColors: Record<string, "success" | "warning" | "info"> = {
  ACTIVE: "success", DRAFT: "warning", ARCHIVED: "info",
};

export default function EventsPage() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [events] = useState(DEMO_EVENTS);

  const filtered = events.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Event</h2>
          <p className="text-muted mt-1">Kelola sesi photobooth, monitoring hasil foto, dan atur mode kiosk</p>
        </div>
        {isAdmin && (
          <Link href="/dashboard/events/new">
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-1" />
              + Event baru
            </Button>
          </Link>
        )}
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Cari event..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-metal pl-10"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<CalendarPlus className="w-12 h-12" />}
          title="Belum ada event"
          description="Buat event photobooth baru untuk mulai mengumpulkan foto"
          action={
            isAdmin ? (
              <Link href="/dashboard/events/new">
                <Button variant="primary">
                  <Plus className="w-4 h-4 mr-1" />
                  + Buat event sekarang
                </Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <Card>
          <div className="divide-y divide-metal/20">
            {filtered.map((event) => (
              <motion.div
                key={event.id}
                className="flex items-center justify-between p-4 hover:bg-accent/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-gradient-to-br from-primary/20 to-blue-200 flex items-center justify-center">
                    <CalendarPlus className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <Link href={`/dashboard/events/${event.id}`} className="text-sm font-bold text-foreground hover:text-primary">
                      {event.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={statusColors[event.status]}>{event.status}</Badge>
                      <span className="text-xs text-muted">{event.photos} foto · {event.transactions} transaksi</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link href={`/kiosk/${event.id}`} className="text-xs text-primary hover:underline flex items-center gap-1">
                    <Monitor className="w-3 h-3" /> Kiosk
                  </Link>
                  {isAdmin && (
                    <Link href={`/dashboard/events/${event.id}/edit`} className="p-1.5 rounded-[var(--radius-sm)] hover:bg-accent/50">
                      <Edit className="w-4 h-4 text-muted" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => setDeleteId(null)}
        title="Hapus Event"
        message="Semua foto dan data terkait akan dihapus permanen."
        confirmLabel="Hapus"
        variant="danger"
      />
    </div>
  );
}
