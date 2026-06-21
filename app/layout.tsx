import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bharatmonitor.vercel.app"),
  title: "Bharat Monitor | Situational Awareness",
  description: "Real-time India-focused news intelligence dashboard. Aggregates news from 30+ sources, provides AI summaries, and tracks domestic financial markets.",
  keywords: ["India", "News", "Dashboard", "Sensex", "Nifty", "Breaking News", "AI Summaries"],
  authors: [{ name: "Parth Bhanushali" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    url: "https://bharatmonitor.vercel.app",
    title: "Bharat Monitor",
    description: "The single tab you open to stay informed about India.",
    siteName: "Bharat Monitor",
    images: [{
      url: "/icon.svg",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharat Monitor",
    description: "The single tab you open to stay informed about India.",
    images: ["/icon.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background antialiased text-foreground`}>
        <Header />
        <main className="container max-w-screen-2xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
