import type { Metadata } from "next";
import { SbomContent } from "./sbom-content";

export const metadata: Metadata = {
  title: "CleanStart SBOM | Know What You Ship",
  description:
    "Software Bill of Materials for total supply chain visibility. Automated SBOMs with verified provenance, open standards support, and continuous validation.",
};

export default function SbomPage() {
  return <SbomContent />;
}
