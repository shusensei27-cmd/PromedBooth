"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, Users, DollarSign, HardDrive, Frame } from "lucide-react";

const notifications = [
  { id: 1, type: "EVENT_CREATED" as const, title: "New event created", message: "Wedding Budi & Sari is now active", time: "2 hours ago" },
  { id: 2, type: "REVENUE_RECEIVED" as const, title: "Payment received", message: "Rp 50,000 from QRIS transaction", time: "5 hours ago" },
  { id: 3, type: "USER_INVITED" as const, title: "New user joined", message: "andi@example.com joined as Viewer", time: "1 day ago" },
  { id: 4, type: "STORAGE_WARNING" as const, title: "Storage nearly full", message: "You've used 80% of your storage quota", time: "2 days ago" },
  { id: 5, type: "TEMPLATE_CREATED" as const, title: "Template created", message: "Elegant Gold Frame template added", time: "3 days ago" },
];

const iconMap = {
  EVENT_CREATED: Calendar,
  REVENUE_RECEIVED: DollarSign,
  USER_INVITED: Users,
  STORAGE_WARNING: HardDrive,
  TEMPLATE_CREATED: Frame,
};

const colorMap = {
  EVENT_CREATED: "text-blue-600 bg-blue-100",
  REVENUE_RECEIVED: "text-green-600 bg-green-100",
  USER_INVITED: "text-purple-600 bg-purple-100",
  STORAGE_WARNING: "text-amber-600 bg-amber-100",
  TEMPLATE_CREATED: "text-cyan-600 bg-cyan-100",
};

export default function NotificationsPage() {
  return (
    <div className="space-y-6 animate-metal-slide">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
          <p className="text-muted mt-1">Stay updated on your organization activity</p>
        </div>
        <Bell className="w-6 h-6 text-muted" />
      </div>

      <Card>
        <CardContent className="p-0">
          {notifications.map((notif, idx) => {
            const Icon = iconMap[notif.type];
            const colorClass = colorMap[notif.type];
            return (
              <div
                key={notif.id}
                className={`flex items-start gap-4 p-4 border-b border-metal/20 last:border-0 hover:bg-accent/20 transition-colors ${
                  idx === 0 ? "bg-accent/40" : ""
                }`}
              >
                <div className={`w-10 h-10 rounded-[var(--radius-sm)] ${colorClass} flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{notif.title}</p>
                    {idx === 0 && <Badge variant="info">New</Badge>}
                  </div>
                  <p className="text-sm text-muted">{notif.message}</p>
                  <p className="text-xs text-muted mt-1">{notif.time}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
