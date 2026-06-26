import Link from "next/link";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { Camera, Frame } from "lucide-react";

export const metadata = { title: "Template Gallery" };

export default function PublicTemplatesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Template Gallery</h1>
          <p className="text-muted mt-2">Explore our collection of photobooth frame templates</p>
        </div>
        <div className="text-center py-20">
          <Frame className="w-16 h-16 text-muted mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground">No Templates Yet</h2>
          <p className="text-muted mt-2">Templates will appear here when published</p>
          <Link href="/dashboard/templates" className="btn-primary inline-flex items-center gap-2 mt-6">Browse Templates</Link>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
