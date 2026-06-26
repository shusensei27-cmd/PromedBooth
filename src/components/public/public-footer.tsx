import Link from "next/link";
import { Camera } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="border-t-2 border-metal/30 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg">PROMEDBOOTH</span>
            </div>
            <p className="text-sm text-muted">
              Enterprise-grade event photo experience platform.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Navigate</h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted hover:text-foreground">Home</Link>
              <Link href="/events" className="text-sm text-muted hover:text-foreground">Events</Link>
              <Link href="/gallery" className="text-sm text-muted hover:text-foreground">Gallery</Link>
              <Link href="/templates" className="text-sm text-muted hover:text-foreground">Templates</Link>
              <Link href="/about" className="text-sm text-muted hover:text-foreground">About</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Account</h4>
            <div className="flex flex-col gap-2">
              <Link href="/login" className="text-sm text-muted hover:text-foreground">Sign In</Link>
              <Link href="/dashboard" className="text-sm text-muted hover:text-foreground">Dashboard</Link>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-metal/20 mt-8 pt-8 text-center text-sm text-muted">
          &copy; {new Date().getFullYear()} PROMEDBOOTH. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
