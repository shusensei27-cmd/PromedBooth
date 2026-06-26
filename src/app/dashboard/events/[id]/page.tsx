"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { toast } from "react-hot-toast";
import {
  ArrowLeft, Edit, Trash2, ExternalLink, Monitor, QrCode,
  Camera, Frame, CreditCard, ToggleLeft, Power,
} from "lucide-react";

const DEMO_TEMPLATES = [
  { id: "1", name: "Two Star 4R (Community)", slots: 2 },
  { id: "2", name: "Elegant Gold Frame", slots: 1 },
  { id: "3", name: "Polaroid Classic", slots: 4 },
];

const DEMO = {
  id: "1", name: "Wedding Budi & Sari", status: "ACTIVE" as const,
  theme: "VINTAGE", template: "Two Star 4R (Community)", templateSlots: 2,
  photos: 342, transactions: 89, revenue: 4450000,
  kioskActive: true, qrisActive: true,
};

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const [showDelete, setShowDelete] = useState(false);
  const [kioskActive, setKioskActive] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState("1");

  const handleToggleKiosk = () => {
    setKioskActive(!kioskActive);
    toast.success(kioskActive ? "Kiosk dimatikan" : "Kiosk diaktifkan");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/dashboard/events")} className="touch-min w-10 h-10 flex items-center justify-center rounded-[var(--radius-sm)] hover:bg-accent/50">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-foreground">{DEMO.name}</h2>
              <Badge variant={DEMO.status === "ACTIVE" ? "success" : "warning"}>{DEMO.status}</Badge>
              <Badge variant={kioskActive ? "success" : "destructive"}>
                Kiosk {kioskActive ? "ON" : "OFF"}
              </Badge>
            </div>
            <p className="text-sm text-muted mt-1">{DEMO.theme} theme · {DEMO.photos} foto · {DEMO.transactions} transaksi</p>
          </div>
        </div>
        {isAdmin && (
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => router.push(`/dashboard/events/${params?.id}/edit`)}>
              <Edit className="w-4 h-4 mr-1" /> Edit
            </Button>
            <Button variant="danger" size="sm" onClick={() => setShowDelete(true)}>
              <Trash2 className="w-4 h-4 mr-1" /> Hapus
            </Button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card><div className="p-5 space-y-4">
          <h3 className="font-bold text-foreground">Kiosk Control</h3>
          <div className="flex items-center justify-between p-3 rounded-[var(--radius-md)] bg-accent/30">
            <div className="flex items-center gap-3">
              <Power className={`w-5 h-5 ${kioskActive ? "text-green-600" : "text-muted"}`} />
              <div>
                <p className="text-sm font-semibold">Kiosk Mode</p>
                <p className="text-xs text-muted">{kioskActive ? "Sedang aktif" : "Nonaktif"}</p>
              </div>
            </div>
            <button onClick={handleToggleKiosk} className={`relative w-12 h-6 rounded-full transition-colors ${kioskActive ? "bg-green-500" : "bg-metal"}`}>
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${kioskActive ? "translate-x-6" : ""}`} />
            </button>
          </div>
          <Link href={`/kiosk/${params?.id}`}>
            <Button variant="primary" className="w-full"><Monitor className="w-4 h-4 mr-1" /> Buka Kiosk</Button>
          </Link>
        </div></Card>

        <Card><div className="p-5 space-y-4">
          <h3 className="font-bold text-foreground">Template Frame</h3>
          <div className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] bg-metal/10">
            <Frame className="w-8 h-8 text-purple-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold">{DEMO.template}</p>
              <p className="text-xs text-muted">{DEMO.templateSlots} slot foto</p>
            </div>
          </div>
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="input-metal text-sm"
          >
            {DEMO_TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>{t.name} ({t.slots} slot)</option>
            ))}
          </select>
          <Link href={`/dashboard/templates/${selectedTemplate}/edit`}>
            <Button variant="secondary" className="w-full"><Frame className="w-4 h-4 mr-1" /> Atur Template</Button>
          </Link>
        </div></Card>

        <Card><div className="p-5 space-y-4">
          <h3 className="font-bold text-foreground">Quick Links</h3>
          <Link href={`/kiosk/${params?.id}`} className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] border-2 border-metal/30 hover:border-primary/50 transition-all">
            <Monitor className="w-5 h-5 text-primary" /><span className="text-sm font-semibold">Mode Kiosk</span>
          </Link>
          <Link href={`/dashboard/gallery`} className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] border-2 border-metal/30 hover:border-primary/50 transition-all">
            <QrCode className="w-5 h-5 text-green-600" /><span className="text-sm font-semibold">QR & Gallery</span>
          </Link>
          <Link href={`/dashboard/templates`} className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] border-2 border-metal/30 hover:border-primary/50 transition-all">
            <Frame className="w-5 h-5 text-purple-600" /><span className="text-sm font-semibold">Template Frame</span>
          </Link>
        </div></Card>
      </div>

      <Card><div className="p-5">
        <h3 className="font-bold text-foreground mb-4">Statistik Event</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Foto", value: DEMO.photos, icon: Camera, color: "text-blue-600 bg-blue-100" },
            { label: "Transaksi", value: DEMO.transactions, icon: CreditCard, color: "text-purple-600 bg-purple-100" },
            { label: "Pendapatan", value: `Rp ${(DEMO.revenue / 1000).toFixed(0)}K`, icon: CreditCard, color: "text-green-600 bg-green-100" },
            { label: "Slot Template", value: `${DEMO.templateSlots} foto/frame`, icon: Frame, color: "text-amber-600 bg-amber-100" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-[var(--radius-md)] bg-metal/10">
              <div className={`w-10 h-10 rounded-[var(--radius-sm)] ${s.color} flex items-center justify-center`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted">{s.label}</p>
                <p className="text-xl font-bold">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div></Card>

      <ConfirmDialog
        isOpen={showDelete} onClose={() => setShowDelete(false)}
        onConfirm={() => { toast.success("Event dihapus"); router.push("/dashboard/events"); }}
        title="Hapus Event" message="Semua foto dan data event akan dihapus permanen."
        confirmLabel="Hapus" variant="danger"
      />
    </div>
  );
}
