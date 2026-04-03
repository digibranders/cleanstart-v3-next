import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import "./globals.css";

const googleSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-google-sans",
});

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
      <body className={`${googleSans.variable} font-['Google_Sans',sans-serif]`}>
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
