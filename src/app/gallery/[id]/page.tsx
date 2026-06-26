import Link from "next/link";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { Camera, ArrowLeft } from "lucide-react";

export const metadata = { title: "Photo Detail" };

export default async function PublicPhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Link href="/gallery" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Gallery
        </Link>
        <div className="card-metal overflow-hidden">
          <div className="aspect-[3/4] bg-metal/20 flex items-center justify-center">
            <Camera className="w-24 h-24 text-muted/30" />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold text-foreground">Photo Detail</h2>
            <p className="text-sm text-muted mt-1">Photo ID: {id}</p>
            <div className="flex gap-3 mt-4">
              <button className="btn-primary">Download</button>
              <Link href="/gallery" className="btn-secondary">Back to Gallery</Link>
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
