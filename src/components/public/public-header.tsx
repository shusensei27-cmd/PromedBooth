"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function PublicHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/gallery", label: "Gallery" },
    { href: "/templates", label: "Templates" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="border-b-2 border-metal/30 bg-surface/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Camera className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">PROMEDBOOTH</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-semibold transition-colors",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="btn-primary text-sm px-5 py-2"
            >
              Dashboard
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden touch-min w-10 h-10 flex items-center justify-center rounded-[var(--radius-sm)] hover:bg-accent/50"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t-2 border-metal/30 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-[var(--radius-sm)] text-sm font-semibold transition-colors",
                  pathname === link.href
                    ? "text-primary bg-primary/5"
                    : "text-muted hover:text-foreground hover:bg-accent/30"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 mt-2 btn-primary text-sm text-center"
            >
              Dashboard
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
