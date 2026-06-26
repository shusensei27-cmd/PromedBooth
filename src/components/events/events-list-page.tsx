"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import {
  Calendar,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Copy,
  Archive,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

// Demo data - will be replaced with Server Action calls
const DEMO_EVENTS = [
  { id: "1", name: "Wedding Budi & Sari", slug: "wedding-budi-sari", status: "ACTIVE", theme: "VINTAGE", photoCount: 342, transactionCount: 89, createdAt: "2026-06-20T10:00:00Z" },
  { id: "2", name: "Company Gathering 2026", slug: "company-gathering-2026", status: "ACTIVE", theme: "MINIMALIST", photoCount: 156, transactionCount: 45, createdAt: "2026-06-18T08:30:00Z" },
  { id: "3", name: "Graduation Party", slug: "graduation-party", status: "ACTIVE", theme: "FUNKY", photoCount: 89, transactionCount: 23, createdAt: "2026-06-15T14:00:00Z" },
  { id: "4", name: "Music Festival 2026", slug: "music-festival-2026", status: "ARCHIVED", theme: "RETRO", photoCount: 523, transactionCount: 167, createdAt: "2026-06-01T09:00:00Z" },
  { id: "5", name: "Birthday Party - Andi", slug: "birthday-andi", status: "DRAFT", theme: "FLORAL", photoCount: 0, transactionCount: 0, createdAt: "2026-06-25T12:00:00Z" },
];

const statusColors: Record<string, "success" | "warning" | "info"> = {
  ACTIVE: "success",
  DRAFT: "warning",
  ARCHIVED: "info",
};

export function EventsListPage() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [events, setEvents] = useState(DEMO_EVENTS);

  const filtered = events.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 animate-metal-slide">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Events</h2>
          <p className="text-muted mt-1">Manage your photobooth events</p>
        </div>
        {isAdmin && (
          <Link href="/dashboard/events/new">
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-1" />
              New Event
            </Button>
          </Link>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-metal pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {paginated.length === 0 ? (
            <EmptyState
              icon={<Calendar className="w-10 h-10" />}
              title="No events found"
              description={search ? "Try a different search term" : "Create your first event to get started"}
              action={
                isAdmin && !search ? (
                  <Link href="/dashboard/events/new">
                    <Button variant="primary">
                      <Plus className="w-4 h-4 mr-1" />
                      Create Event
                    </Button>
                  </Link>
                ) : undefined
              }
            />
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {paginated.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-[var(--radius-md)] hover:bg-accent/30 transition-colors border border-transparent hover:border-metal/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-gradient-to-br from-primary/20 to-blue-200 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <Link
                          href={`/dashboard/events/${event.id}`}
                          className="text-sm font-bold text-foreground hover:text-primary transition-colors"
                        >
                          {event.name}
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={statusColors[event.status]}>
                            {event.status}
                          </Badge>
                          <span className="text-xs text-muted">
                            {event.photoCount} photos · {event.transactionCount} transactions
                          </span>
                        </div>
                      </div>
                    </div>
                    {isAdmin && (
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/dashboard/events/${event.id}/edit`}
                          className="touch-min w-9 h-9 flex items-center justify-center rounded-[var(--radius-sm)] hover:bg-accent/50"
                        >
                          <Edit className="w-4 h-4 text-muted" />
                        </Link>
                        <button
                          className="touch-min w-9 h-9 flex items-center justify-center rounded-[var(--radius-sm)] hover:bg-accent/50"
                          onClick={() => setDeleteId(event.id)}
                        >
                          <Trash2 className="w-4 h-4 text-muted hover:text-destructive" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          setEvents((prev) => prev.filter((e) => e.id !== deleteId));
          setDeleteId(null);
        }}
        title="Delete Event"
        message="Are you sure you want to delete this event? All associated photos and data will be permanently removed."
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  );
}
