import type { Metadata, Viewport } from "next";
import { Manrope, Inter, Nunito } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["700", "800"],
});

// Explicit viewport ensures touch-friendly behavior (no tap delay, no double-tap zoom).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "BahriaConnect — One Community. Every Service.",
    template: "%s · BahriaConnect",
  },
  description:
    "BahriaConnect is a verified local-services marketplace connecting Bahria Town Karachi residents with management-vetted maids, plumbers, electricians, and other home-service providers.",
  keywords: [
    "Bahria Town Karachi",
    "home services",
    "verified providers",
    "plumber",
    "electrician",
    "maid",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-base-100 text-base-content">
        {children}
      </body>
    </html>
  );
}
