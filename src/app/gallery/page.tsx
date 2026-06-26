import Link from "next/link";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { Camera, Images } from "lucide-react";

export const metadata = { title: "Public Gallery" };

export default function PublicGalleryPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Public Gallery</h1>
          <p className="text-muted mt-2">Browse photos from all public events</p>
        </div>
        <div className="text-center py-20">
          <Images className="w-16 h-16 text-muted mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground">No Photos Yet</h2>
          <p className="text-muted mt-2">Photos from events will appear here when shared publicly</p>
          <Link href="/dashboard" className="btn-primary inline-flex items-center gap-2 mt-6">Go to Dashboard</Link>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
