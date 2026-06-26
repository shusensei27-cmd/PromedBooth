import Link from "next/link";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { Camera, ArrowLeft } from "lucide-react";

export const metadata = { title: "Event Detail" };

export default async function PublicEventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Link href="/events" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>
        <div className="card-metal overflow-hidden">
          <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-blue-100 flex items-center justify-center">
            <Camera className="w-24 h-24 text-primary/20" />
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-foreground capitalize">{slug.replace(/-/g, " ")}</h1>
            <p className="text-muted mt-4">Browse and download photos from this event.</p>
            <div className="flex gap-3 mt-6">
              <Link href="/gallery" className="btn-primary inline-flex items-center gap-2">View Gallery</Link>
              <Link href="/dashboard" className="btn-secondary inline-flex items-center gap-2">Dashboard</Link>
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
