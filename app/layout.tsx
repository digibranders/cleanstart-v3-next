import type { Metadata } from "next";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CleanStart — Hardened Container Security",
    template: "%s | CleanStart",
  },
  description:
    "Enterprise container hardening, SBOM management, and vulnerability remediation platform. Zero-CVE hardened images for production.",
  openGraph: {
    title: "CleanStart — Hardened Container Security",
    description:
      "Enterprise container hardening, SBOM management, and vulnerability remediation platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Google Sans', sans-serif" }}>
        <SmoothScrollProvider>
          <ScrollToTop />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
