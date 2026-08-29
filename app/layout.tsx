import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Explicit viewport ensures touch-friendly behavior (no tap delay, no double-tap zoom).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2f5d3a",
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
  manifest: "/manifest",
  appleWebApp: {
    capable: true,
    title: "BahriaConnect",
    statusBarStyle: "default",
  },
  icons: {
    apple: "/secondary_logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest" />
        <link rel="apple-touch-icon" href="/secondary_logo.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="BahriaConnect" />
      </head>
      <body className="flex min-h-full flex-col bg-base-100 text-base-content">
        {children}
      </body>
    </html>
  );
}
