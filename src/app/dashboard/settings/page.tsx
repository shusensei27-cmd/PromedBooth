"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-hot-toast";
import {
  Building2, Palette, Shield, HardDrive, CreditCard, Users, Save,
} from "lucide-react";

const TABS = [
  { id: "general", label: "Umum", icon: Building2 },
  { id: "branding", label: "Branding", icon: Palette },
  { id: "users", label: "Pengguna", icon: Users },
  { id: "payment", label: "Pembayaran", icon: CreditCard },
  { id: "storage", label: "Penyimpanan", icon: HardDrive },
  { id: "security", label: "Keamanan", icon: Shield },
];

export default function SettingsPage() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const [activeTab, setActiveTab] = useState("general");

  const handleSave = () => toast.success("Pengaturan disimpan!");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted text-sm mt-1">Atur profil organisasi dan preferensi akun</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-[var(--radius-md)] text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                activeTab === tab.id ? "bg-primary text-white shadow-md" : "bg-surface border-2 border-metal text-muted hover:border-primary/30"
              }`}
            ><Icon className="w-4 h-4" />{tab.label}</button>
          );
        })}
      </div>

      {activeTab === "general" && (
        <Card><div className="p-5 space-y-4">
          <h3 className="font-bold text-foreground">Profil Organisasi</h3>
          <Input label="Nama Organisasi" id="org-name" defaultValue={session?.user?.organizationSlug || "My Organization"} disabled={!isAdmin} />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold">Deskripsi</label>
            <textarea className="input-metal min-h-[100px] resize-y" placeholder="Deskripsi organisasi Anda" disabled={!isAdmin} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Website" id="web" placeholder="https://" disabled={!isAdmin} />
            <Input label="Instagram" id="ig" placeholder="@username" disabled={!isAdmin} />
          </div>
          {isAdmin && <Button variant="primary" onClick={handleSave}><Save className="w-4 h-4 mr-1" />Simpan</Button>}
        </div></Card>
      )}

      {activeTab === "payment" && (
        <Card><div className="p-5 space-y-4">
          <h3 className="font-bold text-foreground">Konfigurasi Pembayaran</h3>
          <div className="grid md:grid-cols-3 gap-3">
            {["Midtrans", "Tripay", "Xendit"].map((g) => (
              <div key={g} className="p-4 rounded-[var(--radius-md)] border-2 border-metal/50 hover:border-primary/50 transition-colors cursor-pointer">
                <p className="text-sm font-semibold">{g}</p>
                <p className="text-xs text-muted mt-1">Klik untuk konfigurasi</p>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-[var(--radius-md)] bg-accent/30 border border-primary/20">
            <p className="text-sm text-primary font-semibold">API key dienkripsi menggunakan AES-256-GCM</p>
          </div>
          {isAdmin && <Button variant="primary" onClick={handleSave}><Save className="w-4 h-4 mr-1" />Simpan</Button>}
        </div></Card>
      )}

      {activeTab === "users" && (
        <Card><div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-foreground">Manajemen Pengguna</h3>
            {isAdmin && <Button variant="primary" size="sm"><Users className="w-4 h-4 mr-1" />Undang Pengguna</Button>}
          </div>
          <div className="flex items-center justify-between p-3 rounded-[var(--radius-md)] bg-accent/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                {session?.user?.name?.[0] || "U"}
              </div>
              <div>
                <p className="text-sm font-semibold">{session?.user?.name}</p>
                <p className="text-xs text-muted">{session?.user?.email}</p>
              </div>
            </div>
            <Badge variant="info">ADMIN</Badge>
          </div>
        </div></Card>
      )}

      {activeTab === "storage" && (
        <Card><div className="p-5 space-y-4">
          <h3 className="font-bold text-foreground">Penggunaan Penyimpanan</h3>
          <div>
            <div className="flex justify-between text-sm mb-2"><span className="font-semibold">0 B digunakan</span><span className="text-muted">dari 25 GB</span></div>
            <div className="h-3 bg-metal/30 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full" style={{ width: "0%" }} /></div>
          </div>
        </div></Card>
      )}

      {activeTab === "security" && (
        <Card><div className="p-5 space-y-3">
          <h3 className="font-bold text-foreground">Keamanan</h3>
          {[{ label: "Metode Autentikasi", desc: "Google OAuth", status: "Active" },
            { label: "Enkripsi Data", desc: "AES-256-GCM", status: "Active" },
            { label: "RBAC", desc: "Role-based access control", status: "Active" },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-[var(--radius-md)] border-2 border-metal/30">
              <div><p className="text-sm font-semibold">{s.label}</p><p className="text-xs text-muted">{s.desc}</p></div>
              <Badge variant="success">{s.status}</Badge>
            </div>
          ))}
        </div></Card>
      )}

      {activeTab === "branding" && (
        <Card><div className="p-5 space-y-4">
          <h3 className="font-bold text-foreground">Branding</h3>
          <div className="p-8 rounded-[var(--radius-md)] border-2 border-dashed border-metal/50 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
            <Palette className="w-12 h-12 text-muted mb-3" />
            <p className="text-sm font-semibold text-muted">Upload Logo</p>
            <p className="text-xs text-muted mt-1">PNG, JPG. Max 2MB</p>
          </div>
          {isAdmin && <Button variant="primary" onClick={handleSave}><Save className="w-4 h-4 mr-1" />Simpan</Button>}
        </div></Card>
      )}
    </div>
  );
}
