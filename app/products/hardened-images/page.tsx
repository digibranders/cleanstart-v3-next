import type { Metadata } from "next";
import { CleanstartImagesContent } from "@/components/products/cleanstart-images-content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Hardened Container Images | CleanStart",
  description:
    "Production-ready, zero-CVE container base images rebuilt daily. Start every build from a secure, verified foundation.",
};

export default function HardenedImagesPage() {
  return <CleanstartImagesContent />;
}
