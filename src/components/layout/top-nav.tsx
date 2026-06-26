"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Camera, LogOut, User, Menu, Bell, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface TopNavProps {
  onMenuToggle?: () => void;
}

export function TopNav({ onMenuToggle }: TopNavProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isPublic = pathname.startsWith("/kiosk");
  const isAuthPage = pathname.startsWith("/login");
  const isDashboard = pathname.startsWith("/dashboard");

  if (isPublic) return null;

  const pageTitle = getPageTitle(pathname);

  return (
    <header className="fixed top-0 left-0 right-0 z-20 h-16 bg-surface border-b-2 border-metal/30 md:ml-72">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        <div className="flex items-center gap-3">
          {isDashboard && (
            <button
              onClick={onMenuToggle}
              className="md:hidden touch-min w-10 h-10 flex items-center justify-center rounded-[var(--radius-sm)] hover:bg-accent/50"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          {isDashboard && (
            <div className="hidden md:flex items-center gap-2">
              <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-foreground">
                Promed<span className="text-primary">Booth</span>
              </span>
            </div>
          )}
          {!isDashboard && (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-foreground">
                Promed<span className="text-primary">Booth</span>
              </span>
            </Link>
          )}
        </div>

        <div className="hidden md:block">
          <h1 className="text-lg font-bold text-foreground">{pageTitle}</h1>
        </div>

        <div className="flex items-center gap-2">
          {isDashboard && (
            <Link
              href="/dashboard/notifications"
              className="touch-min w-10 h-10 flex items-center justify-center rounded-[var(--radius-sm)] hover:bg-accent/50 relative"
            >
              <Bell className="w-5 h-5 text-muted" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
            </Link>
          )}

          {status === "authenticated" && session?.user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] hover:bg-accent/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  {session.user.name?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-sm font-semibold hidden sm:block text-foreground">
                  {session.user.name || "User"}
                </span>
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 top-full mt-2 w-56 z-50 bg-surface border-2 border-metal rounded-[var(--radius-md)] shadow-xl overflow-hidden"
                    >
                      <div className="p-3 border-b border-metal/30">
                        <p className="text-sm font-semibold text-foreground">{session.user.name}</p>
                        <p className="text-xs text-muted">{session.user.email}</p>
                        <span className="scrapbook-tag inline-block mt-2">{session.user.role}</span>
                      </div>
                      <div className="p-1">
                        <Link
                          href="/dashboard/settings"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm rounded-[var(--radius-sm)] hover:bg-accent/50 transition-colors text-foreground"
                        >
                          <User className="w-4 h-4" />
                          Settings
                        </Link>
                        <button
                          onClick={() => signOut()}
                          className="flex items-center gap-2 px-3 py-2 text-sm rounded-[var(--radius-sm)] hover:bg-accent/50 transition-colors w-full text-destructive"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : !isAuthPage ? (
            <Link href="/login">
              <Button variant="primary" size="sm">Login</Button>
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}

function getPageTitle(pathname: string): string {
  if (pathname === "/dashboard") return "Dashboard";
  if (pathname.startsWith("/dashboard/events")) return "Event";
  if (pathname.startsWith("/dashboard/templates")) return "Template Frame";
  if (pathname.startsWith("/dashboard/gallery")) return "Gallery Global";
  if (pathname.startsWith("/dashboard/chroma-key")) return "Chroma Key";
  if (pathname.startsWith("/dashboard/revenue")) return "Pendapatan";
  if (pathname.startsWith("/dashboard/settings")) return "Settings";
  if (pathname.startsWith("/dashboard/notifications")) return "Notifikasi";
  return "PROMEDBOOTH";
}
