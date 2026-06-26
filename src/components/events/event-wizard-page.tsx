"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-hot-toast";
import {
  Eye, Camera, Monitor, CreditCard, ArrowLeft, CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  { id: "tampilan", label: "Tampilan", icon: Eye },
  { id: "foto", label: "Fitur Foto", icon: Camera },
  { id: "kiosk", label: "Fitur Kiosk", icon: Monitor },
  { id: "payment", label: "Pembayaran", icon: CreditCard },
];

const THEMES = [
  { value: "MINIMALIST", label: "Minimalist Modern", emoji: "◻️", desc: "Acara premium/bersih" },
  { value: "VINTAGE", label: "Vintage Film", emoji: "🎞️", desc: "Nuansa hangat/klasik" },
  { value: "NEWSPAPER", label: "Newspaper Editorial", emoji: "📰", desc: "Gaya koran klasik" },
  { value: "FUNKY", label: "Funky Gen Z", emoji: "🌈", desc: "Warna neon berani" },
  { value: "FLORAL", label: "Floral Romantic", emoji: "🌸", desc: "Pernikahan/lamaran" },
  { value: "RETRO", label: "Retro 90s", emoji: "💾", desc: "Gaya Windows 95" },
];

export default function EventWizardPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("tampilan");
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("MINIMALIST");
  const [orientation, setOrientation] = useState("PORTRAIT");
  const [mirror, setMirror] = useState(true);
  const [allowGuestTheme, setAllowGuestTheme] = useState(false);
  const [payBeforePhoto, setPayBeforePhoto] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("FREE");

  const isAdmin = session?.user?.role === "ADMIN";

  const handleSave = () => {
    if (!name.trim()) { toast.error("Nama event harus diisi"); return; }
    toast.success("Event berhasil dibuat!");
    router.push("/dashboard/events");
  };

  if (!isAdmin) {
    return <Card className="p-8 text-center"><p className="text-muted">You do not have permission.</p></Card>;
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="touch-min w-10 h-10 flex items-center justify-center rounded-[var(--radius-sm)] hover:bg-accent/50">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Buat Event Baru</h2>
          <p className="text-muted text-sm mt-1">Atur photobooth event Anda</p>
        </div>
      </div>

      <Input label="Nama Event" id="event-name" placeholder="Cth: Wedding Andi & Sari" value={name} onChange={(e) => setName(e.target.value)} />

      <div className="flex gap-1 bg-metal/20 p-1 rounded-[var(--radius-md)] overflow-x-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-sm)] text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id ? "bg-white text-primary shadow-sm" : "text-muted hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.15 }}>
          {activeTab === "tampilan" && (
            <div className="space-y-6">
              <Card>
                <div className="p-5 space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Pengalaman Tema</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] border-2 border-primary/30 bg-primary/5 cursor-pointer">
                        <input type="radio" name="theme-exp" checked readOnly className="accent-primary" />
                        <div>
                          <span className="text-sm font-semibold">Hanya Warna</span>
                          <p className="text-xs text-muted">Ubah warna dasar tombol dan teks</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] border-2 border-metal/30 cursor-not-allowed opacity-50">
                        <input type="radio" name="theme-exp" disabled className="accent-primary" />
                        <div>
                          <span className="text-sm font-semibold">Full Experience <Badge variant="vintage">Business Only</Badge></span>
                          <p className="text-xs text-muted">Ubah total dekorasi, font, dan animasi</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Layout Kiosk</h4>
                    <div className="p-4 rounded-[var(--radius-md)] bg-amber-50 border border-amber-200 text-sm text-amber-800">
                      <span className="font-semibold">MAINTENANCE</span> — Fitur ganti layout sedang dinonaktifkan sementara
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Pilih Tema</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {THEMES.map((t) => (
                        <button key={t.value} onClick={() => setTheme(t.value)}
                          className={`p-4 rounded-[var(--radius-md)] border-2 text-left transition-all ${
                            theme === t.value ? "border-primary bg-primary/5 shadow-sm" : "border-metal/30 hover:border-metal"
                          }`}
                        >
                          <span className="text-2xl">{t.emoji}</span>
                          <p className="text-sm font-semibold mt-2">{t.label}</p>
                          <p className="text-xs text-muted">{t.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={allowGuestTheme} onChange={(e) => setAllowGuestTheme(e.target.checked)} className="w-5 h-5 rounded accent-primary" />
                    <div>
                      <span className="text-sm font-semibold">Izinkan Tamu Ganti Tema</span>
                      <p className="text-xs text-muted">Pengunjung bisa mengubah tema di layar kiosk</p>
                    </div>
                  </label>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "foto" && (
            <Card>
              <div className="p-5 space-y-6">
                <h4 className="font-semibold text-foreground">Pengaturan Kamera</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Orientasi</label>
                    <select value={orientation} onChange={(e) => setOrientation(e.target.value)} className="input-metal">
                      <option value="PORTRAIT">Portrait</option>
                      <option value="LANDSCAPE">Landscape</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Kamera</label>
                    <select className="input-metal" disabled>
                      <option>Default device</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Zoom (Anti-Wide) <span className="text-xs text-muted font-normal">1x</span></label>
                  <input type="range" min="0" max="5" step="0.1" defaultValue="1" className="w-full accent-primary" />
                  <p className="text-xs text-muted mt-1">Gunakan zoom untuk menghindari lensa wide-angle otomatis pada iPad/iPhone</p>
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={mirror} onChange={(e) => setMirror(e.target.checked)} className="w-5 h-5 rounded accent-primary" />
                  <span className="text-sm font-semibold">Mirror View</span>
                </label>

                <div className="p-4 rounded-[var(--radius-md)] bg-accent/30 border border-primary/20">
                  <p className="text-sm font-semibold text-primary">Ganti Kamera & Filter</p>
                  <p className="text-xs text-muted mt-1">Izinkan tamu beralih kamera depan/belakang dan menggunakan filter</p>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "kiosk" && (
            <Card>
              <div className="p-5 space-y-6">
                <h4 className="font-semibold text-foreground">Pengaturan Welcome Screen</h4>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-primary" />
                      <span className="text-sm font-semibold">LOGO</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-primary" />
                      <span className="text-sm font-semibold">TAMPILKAN NAMA EVENT</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-primary" />
                      <span className="text-sm font-semibold">Pakai Layout Welcome Bawaan Tema</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-primary" />
                      <span className="text-sm font-semibold">Fullscreen Kiosk</span>
                    </label>
                  </div>

                  <div className="p-6 rounded-[var(--radius-md)] bg-gradient-to-br from-primary/5 to-blue-100/30 border-2 border-dashed border-primary/30 flex flex-col items-center justify-center min-h-[200px]">
                    <Eye className="w-10 h-10 text-primary/50 mb-2" />
                    <p className="text-sm font-semibold text-primary">Live Preview</p>
                    <p className="text-xs text-muted mt-1 text-center">Ubah pengaturan untuk melihat pratinjau</p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "payment" && (
            <Card>
              <div className="p-5 space-y-6">
                <h4 className="font-semibold text-foreground">Pengaturan Pembayaran</h4>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={payBeforePhoto} onChange={(e) => setPayBeforePhoto(e.target.checked)} className="w-5 h-5 rounded accent-primary" />
                  <div>
                    <span className="text-sm font-semibold">Bayar Sebelum Foto</span>
                    <p className="text-xs text-muted">Jika nonaktif, sesi photobooth akan berjalan gratis</p>
                  </div>
                </label>

                {payBeforePhoto && (
                  <div className="space-y-4 p-4 rounded-[var(--radius-md)] bg-accent/30 border border-primary/20">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Metode Pembayaran</label>
                      <div className="flex gap-2">
                        {["CASH", "QRIS"].map((m) => (
                          <button key={m} onClick={() => setPaymentMethod(m)}
                            className={`px-4 py-2 rounded-[var(--radius-sm)] text-sm font-semibold border-2 transition-all ${
                              paymentMethod === m ? "border-primary bg-primary text-white" : "border-metal text-muted"
                            }`}
                          >{m}</button>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted">Atur harga per sesi di pengaturan payment gateway pada menu Settings</p>
                  </div>
                )}
              </div>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <Button variant="secondary" onClick={() => router.back()}>Batal</Button>
        <Button variant="primary" onClick={handleSave} size="lg">
          <CheckCircle2 className="w-4 h-4 mr-1" />
          Buat Event & Pilih Template
        </Button>
      </div>
    </div>
  );
}
