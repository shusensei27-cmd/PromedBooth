"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Banknote, QrCode, TrendingUp, RefreshCw } from "lucide-react";

function fmt(n: number) { return `Rp ${n.toLocaleString("id-ID")}`; }

const data = {
  total: 0, cash: 0, qris: 0, tx: 0,
  daily: [1800, 2200, 1500, 2800, 1900, 1200, 1100],
};

const perEvent: { name: string; total: number; cash: number; qris: number; tx: number }[] = [];

export default function RevenuePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Pendapatan</h2>
          <p className="text-muted text-sm mt-1">Rekapitulasi transaksi dan pendapatan dari seluruh event</p>
        </div>
        <Button variant="secondary" size="sm"><RefreshCw className="w-4 h-4 mr-1" /> Muat Ulang</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card withRivets={false} className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted">Total Pendapatan</p>
              <p className="text-2xl font-bold text-foreground">{fmt(data.total)}</p>
            </div>
          </div>
        </Card>
        <Card withRivets={false} className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-blue-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted">Total Transaksi</p>
              <p className="text-2xl font-bold text-foreground">{data.tx}</p>
            </div>
          </div>
        </Card>
        <Card withRivets={false} className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-green-100 flex items-center justify-center">
              <Banknote className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted">Via Cash</p>
              <p className="text-2xl font-bold text-foreground">{fmt(data.cash)}</p>
            </div>
          </div>
        </Card>
        <Card withRivets={false} className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-purple-100 flex items-center justify-center">
              <QrCode className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-muted">Via QRIS</p>
              <p className="text-2xl font-bold text-foreground">{fmt(data.qris)}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="p-4 rounded-[var(--radius-md)] bg-accent border border-primary/20 text-sm text-primary flex items-center gap-2">
        <TrendingUp className="w-5 h-5 shrink-0" />
        PromedBooth mendukung metode pembayaran non-tunai dan tunai. Atur harga per sesi di menu Event &rarr; tab Pembayaran.
      </div>

      <Card>
        <div className="p-5">
          <h3 className="font-bold text-foreground mb-4">Detail Per Event</h3>
          {perEvent.length === 0 ? (
            <div className="text-center py-8 text-muted text-sm">Belum ada data event</div>
          ) : (
            <div className="space-y-3">
              {perEvent.map((e, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-[var(--radius-md)] bg-metal/10">
                  <div><p className="font-semibold">{e.name}</p><p className="text-xs text-muted">{e.tx} transaksi</p></div>
                  <div className="text-right"><p className="font-bold">{fmt(e.total)}</p><p className="text-xs text-muted">Cash: {fmt(e.cash)} · QRIS: {fmt(e.qris)}</p></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
