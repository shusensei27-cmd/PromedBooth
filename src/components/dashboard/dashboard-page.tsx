"use client";

import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Frame,
  CalendarCheck,
  Camera,
  Package,
  Download,
  Printer,
  Image,
  Plus,
  QrCode,
  Monitor,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";

export function DashboardPage() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Selamat datang di PromedBooth
          </h2>
          <p className="text-muted mt-1">Manage your photobooth events and templates</p>
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

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card withRivets={false} className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-purple-100 flex items-center justify-center">
              <Frame className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-muted">Template</p>
              <p className="text-2xl font-bold text-foreground">2 / 2</p>
            </div>
          </div>
        </Card>
        <Card withRivets={false} className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-blue-100 flex items-center justify-center">
              <CalendarCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted">Event aktif</p>
              <p className="text-2xl font-bold text-foreground">0</p>
            </div>
          </div>
        </Card>
        <Card withRivets={false} className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-green-100 flex items-center justify-center">
              <Camera className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted">Foto bulan ini</p>
              <p className="text-2xl font-bold text-foreground">0</p>
            </div>
          </div>
        </Card>
        <Card withRivets={false} className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-amber-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-muted">Paket</p>
              <p className="text-2xl font-bold text-foreground">
                <span className="text-xs font-semibold bg-accent text-primary px-2 py-1 rounded-[var(--radius-sm)]">
                  Free
                </span>
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card withRivets={false} className="p-4 text-center">
          <Download className="w-6 h-6 text-muted mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">0</p>
          <p className="text-xs text-muted">Download</p>
        </Card>
        <Card withRivets={false} className="p-4 text-center">
          <Printer className="w-6 h-6 text-muted mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">0</p>
          <p className="text-xs text-muted">Cetak</p>
        </Card>
        <Card withRivets={false} className="p-4 text-center">
          <Image className="w-6 h-6 text-muted mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">0</p>
          <p className="text-xs text-muted">Total foto</p>
        </Card>
      </div>

      <Card>
        <div className="p-5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-foreground">Foto 7 Hari Terakhir</h3>
            <Badge variant="info">+0% vs last week</Badge>
          </div>
          <div className="flex items-end justify-between h-32 px-2">
            {["06-18","06-19","06-20","06-21","06-22","06-23","06-24"].map((date, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full max-w-[32px] mx-auto bg-metal/20 rounded-[var(--radius-sm)]" style={{ height: "4px" }} />
                <span className="text-xs text-muted">{date}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">Event terbaru</h3>
              <Link href="/dashboard/events" className="text-sm text-primary hover:underline flex items-center gap-1">
                LIHAT SEMUA <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="text-center py-8 text-muted text-sm">Belum ada event</div>
          </div>
        </Card>

        <Card>
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">Template aktif</h3>
              <Link href="/dashboard/templates" className="text-sm text-primary hover:underline flex items-center gap-1">
                LIHAT SEMUA <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {["Two Star 4R (Community)"].map((name, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] bg-accent/30">
                  <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-purple-100 flex items-center justify-center">
                    <Frame className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-5">
          <h3 className="font-bold text-foreground mb-4">Aksi Cepat</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/dashboard/templates/new">
              <div className="flex flex-col items-center gap-2 p-4 rounded-[var(--radius-md)] border-2 border-metal/50 hover:border-primary/50 hover:bg-accent/20 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-purple-100 flex items-center justify-center">
                  <Frame className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm font-semibold text-center">Template Baru<br /><span className="text-xs text-muted font-normal">Buat template</span></span>
              </div>
            </Link>
            <Link href="/dashboard/events/new">
              <div className="flex flex-col items-center gap-2 p-4 rounded-[var(--radius-md)] border-2 border-metal/50 hover:border-primary/50 hover:bg-accent/20 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-blue-100 flex items-center justify-center">
                  <CalendarCheck className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-center">Event baru<br /><span className="text-xs text-muted font-normal">Buat event</span></span>
              </div>
            </Link>
            <Link href="/dashboard/events">
              <div className="flex flex-col items-center gap-2 p-4 rounded-[var(--radius-md)] border-2 border-metal/50 hover:border-green-500/50 hover:bg-green-50/20 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-green-100 flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm font-semibold text-center">Buka QR / Kiosk<br /><span className="text-xs text-muted font-normal">Akses galeri</span></span>
              </div>
            </Link>
            <Link href="/dashboard/templates">
              <div className="flex flex-col items-center gap-2 p-4 rounded-[var(--radius-md)] border-2 border-metal/50 hover:border-cyan-500/50 hover:bg-cyan-50/20 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-cyan-100 flex items-center justify-center">
                  <LayoutGrid className="w-6 h-6 text-cyan-600" />
                </div>
                <span className="text-sm font-semibold text-center">Template Frame<br /><span className="text-xs text-muted font-normal">Kelola template</span></span>
              </div>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
