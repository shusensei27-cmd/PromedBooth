import Link from "next/link";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { Camera, Shield, Zap, Globe } from "lucide-react";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <h1 className="text-4xl font-bold text-foreground mb-6">About PROMEDBOOTH</h1>
        <p className="text-lg text-muted leading-relaxed">
          PROMEDBOOTH is an enterprise-grade event photo experience platform designed for
          professional event organizers, photobooth operators, and creative agencies.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {[
            { icon: Camera, title: "Complete Platform", desc: "From event creation to photo delivery, everything in one place." },
            { icon: Shield, title: "Enterprise Security", desc: "RBAC, encryption, and organization isolation for data protection." },
            { icon: Zap, title: "Real-time Processing", desc: "Instant photo capture, template rendering, and download delivery." },
            { icon: Globe, title: "Multi-Event Scale", desc: "Unlimited events, templates, and galleries from one dashboard." },
          ].map((feature, idx) => (
            <div key={idx} className="card-metal p-6">
              <feature.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted">{feature.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/dashboard" className="btn-primary text-base px-10 py-4">Go to Dashboard</Link>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
