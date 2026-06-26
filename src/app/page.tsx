import Link from "next/link";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { Camera, QrCode, Frame, Shield, Zap, Globe } from "lucide-react";

const features = [
  { icon: Camera, title: "Smart Photo Capture", description: "WebRTC-powered camera with countdown, filters, and burst mode for perfect shots every time." },
  { icon: Frame, title: "Custom Template Editor", description: "Drag-and-drop Fabric.js editor with unlimited layers, text, stickers, and photo slots." },
  { icon: QrCode, title: "Instant QR Sharing", description: "Auto-generated QR codes for each photo session. Guests download directly to their phones." },
  { icon: Shield, title: "Enterprise Security", description: "Role-based access control, organization isolation, and encrypted payment data storage." },
  { icon: Zap, title: "Kiosk Mode", description: "Fullscreen tablet-optimized photobooth runtime with payment integration and live preview." },
  { icon: Globe, title: "Multi-Event Platform", description: "Manage unlimited events, templates, and galleries from a single centralized dashboard." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-6 scrapbook-tag">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">Enterprise Event Photo Platform</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-tight">
              Capture Every Moment. <br />
              <span className="text-primary">Simplify Every Workflow.</span>
            </h1>
            <p className="text-lg text-muted mt-6 max-w-xl mx-auto">
              The all-in-one photobooth platform for event professionals. Create stunning photo experiences with custom templates, kiosk mode, and real-time analytics.
            </p>
            <div className="flex items-center justify-center gap-4 mt-10">
              <Link href="/dashboard" className="btn-primary text-base px-8 py-4">Go to Dashboard</Link>
              <Link href="/events" className="btn-secondary text-base px-8 py-4">Browse Events</Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl" />
        </div>
      </section>

      <section className="py-20 border-t-2 border-metal/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Everything You Need</h2>
            <p className="text-muted mt-4 max-w-xl mx-auto">From event creation to photo delivery, PROMEDBOOTH handles the entire workflow.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="card-metal p-6 hover:translate-y-[-2px] transition-all duration-300">
                <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-primary/5 border-t-2 border-metal/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Transform Your Events?</h2>
          <p className="text-muted mb-8 max-w-lg mx-auto">Join professional event organizers who trust PROMEDBOOTH for their photo experiences.</p>
          <Link href="/dashboard" className="btn-primary text-base px-10 py-4">Go to Dashboard</Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
