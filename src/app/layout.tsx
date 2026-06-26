import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToastProvider } from "@/providers/toast-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "PROMEDBOOTH - Enterprise Event Photo Platform",
    template: "%s | PROMEDBOOTH",
  },
  description:
    "Enterprise-grade photobooth platform for events. Create, manage, and share photo experiences with custom templates, kiosk mode, and real-time analytics.",
  keywords: [
    "photobooth",
    "event photo",
    "kiosk",
    "photo template",
    "QRIS payment",
    "event platform",
  ],
  authors: [{ name: "PROMEDBOOTH" }],
  creator: "PROMEDBOOTH",
  publisher: "PROMEDBOOTH",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "PROMEDBOOTH",
    title: "PROMEDBOOTH - Enterprise Event Photo Platform",
    description:
      "Enterprise-grade photobooth platform for events. Create, manage, and share photo experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PROMEDBOOTH",
    description:
      "Enterprise-grade photobooth platform for events.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <ThemeProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
