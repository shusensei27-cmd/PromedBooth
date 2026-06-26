import Link from "next/link";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { Camera, Calendar, MapPin } from "lucide-react";

export const metadata = { title: "Public Events" };

const DEMO_EVENTS = [
  { id: "1", name: "Wedding Budi & Sari", slug: "wedding-budi-sari", theme: "VINTAGE", description: "A beautiful traditional wedding ceremony", photos: 342, orgName: "PROMEDBOOTH" },
  { id: "2", name: "Company Gathering 2026", slug: "company-gathering-2026", theme: "MINIMALIST", description: "Annual company gathering event", photos: 156, orgName: "PROMEDBOOTH" },
  { id: "3", name: "Music Festival 2026", slug: "music-festival", theme: "RETRO", description: "Annual music festival with multiple performances", photos: 523, orgName: "PROMEDBOOTH" },
];

export default function PublicEventsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Public Events</h1>
          <p className="text-muted mt-2">Browse and explore photobooth events</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_EVENTS.map((event) => (
            <Link key={event.id} href={`/events/${event.slug}`} className="card-metal overflow-hidden group hover:translate-y-[-2px] transition-all duration-300">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-blue-100 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center"><Camera className="w-12 h-12 text-primary/30" /></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                  <span className="text-white text-sm font-semibold">{event.photos} photos</span>
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-[var(--radius-sm)]">{event.theme}</span>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mt-2">{event.name}</h3>
                <p className="text-xs text-muted mt-2 line-clamp-2">{event.description}</p>
                <div className="flex items-center gap-2 mt-3 text-xs text-muted">
                  <MapPin className="w-3 h-3" /><span>{event.orgName}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
