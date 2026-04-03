import type { Metadata } from "next";
import { FipsComplianceContent } from "./fips-compliance-content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "FIPS Compliance | CleanStart",
  description:
    "FIPS 140-3 validated cryptography built into our hermetic build system. Deploy secure containers from build to runtime with continuous compliance.",
};

export default function FipsCompliancePage() {
  return <FipsComplianceContent />;
}
