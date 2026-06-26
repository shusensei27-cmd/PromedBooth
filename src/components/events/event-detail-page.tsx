"use client";

import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Camera,
  DollarSign,
  Edit,
  ExternalLink,
  QrCode,
  Monitor,
} from "lucide-react";
import Link from "next/link";

export function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const event = {
    id: params?.id || "1",
    name: "Wedding Budi & Sari",
    slug: "wedding-budi-sari",
    status: "ACTIVE" as const,
    theme: "VINTAGE",
    photoCount: 342,
    transactionCount: 89,
    revenue: 4450000,
    createdAt: "2026-06-20T10:00:00Z",
  };

  return (
    <div className="space-y-6 animate-metal-slide">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-[var(--radius-md)] bg-gradient-to-br from-primary/20 to-blue-200 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-foreground">{event.name}</h2>
              <Badge variant={event.status === "ACTIVE" ? "success" : "warning"}>
                {event.status}
              </Badge>
            </div>
            <p className="text-sm text-muted mt-1">
              Created {new Date(event.createdAt).toLocaleDateString()} · {event.theme} theme
            </p>
          </div>
        </div>
        {isAdmin && (
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => router.push(`/events/${event.id}/edit`)}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Link href={`/kiosk/${event.id}`}>
              <Button variant="primary">
                <Monitor className="w-4 h-4 mr-1" />
                Open Kiosk
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card withRivets={false} className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-blue-100 flex items-center justify-center">
              <Camera className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted">Photos</p>
              <p className="text-xl font-bold">{event.photoCount}</p>
            </div>
          </div>
        </Card>
        <Card withRivets={false} className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-green-100 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted">Revenue</p>
              <p className="text-xl font-bold">Rp {(event.revenue / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </Card>
        <Card withRivets={false} className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-purple-100 flex items-center justify-center">
              <QrCode className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-muted">Transactions</p>
              <p className="text-xl font-bold">{event.transactionCount}</p>
            </div>
          </div>
        </Card>
        <Card withRivets={false} className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-amber-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-muted">Theme</p>
              <p className="text-xl font-bold">{event.theme}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link
              href={`/kiosk/${event.id}`}
              className="flex items-center gap-3 p-4 rounded-[var(--radius-md)] border-2 border-metal/50 hover:border-primary/50 hover:bg-accent/20 transition-all"
            >
              <Monitor className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold">Kiosk Mode</span>
            </Link>
            <Link
              href={`/events/${event.id}/edit`}
              className="flex items-center gap-3 p-4 rounded-[var(--radius-md)] border-2 border-metal/50 hover:border-primary/50 hover:bg-accent/20 transition-all"
            >
              <Edit className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold">Edit Event</span>
            </Link>
            <Link
              href={`/events/${event.slug}`}
              className="flex items-center gap-3 p-4 rounded-[var(--radius-md)] border-2 border-metal/50 hover:border-primary/50 hover:bg-accent/20 transition-all"
            >
              <ExternalLink className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold">Public Page</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
