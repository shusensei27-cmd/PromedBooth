"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Calendar,
  Frame,
  Images,
  Pipette,
  DollarSign,
  Settings,
  Bell,
  X,
  ChevronRight,
  Camera,
} from "lucide-react";

interface NavItem {
  label: string;
  labelEn: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Dashboard", labelEn: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Event", labelEn: "Event", href: "/dashboard/events", icon: <Calendar className="w-5 h-5" /> },
  { label: "Template Frame", labelEn: "Template Frame", href: "/dashboard/templates", icon: <Frame className="w-5 h-5" /> },
  { label: "Gallery Global", labelEn: "Gallery", href: "/dashboard/gallery", icon: <Images className="w-5 h-5" /> },
  { label: "Chroma Key", labelEn: "Chroma Key", href: "/dashboard/chroma-key", icon: <Pipette className="w-5 h-5" /> },
  { label: "Pendapatan", labelEn: "Revenue", href: "/dashboard/revenue", icon: <DollarSign className="w-5 h-5" /> },
  { label: "Notifikasi", labelEn: "Notifications", href: "/dashboard/notifications", icon: <Bell className="w-5 h-5" /> },
  { label: "Settings", labelEn: "Settings", href: "/dashboard/settings", icon: <Settings className="w-5 h-5" /> },
];

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="w-72 h-full bg-surface border-r-2 border-metal/30 flex flex-col z-50 shadow-xl">
      <div className="flex items-center justify-between p-4 border-b-2 border-metal/30">
        <Link href="/" className="flex items-center gap-2">
          <Camera className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg tracking-tight">
            Promed<span className="text-primary">Booth</span>
          </span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="touch-min w-8 h-8 flex items-center justify-center rounded-[var(--radius-sm)] hover:bg-accent/50"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-[var(--radius-md)] transition-all duration-200 group",
                active
                  ? "bg-primary/10 text-primary font-semibold border border-primary/20"
                  : "text-muted hover:text-foreground hover:bg-accent/30"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="shrink-0">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </div>
              <ChevronRight className={cn("w-4 h-4", active ? "text-primary" : "text-muted/30")} />
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t-2 border-metal/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {session?.user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="truncate min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {session?.user?.name || "User"}
            </p>
            <p className="text-xs text-muted truncate capitalize">
              {session?.user?.role?.toLowerCase() || "guest"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
