import type { Metadata } from "next";
import { CareersContent } from "./careers-content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Careers | CleanStart",
  description:
    "Join CleanStart and help secure the software supply chain. We're building the future of trusted software delivery.",
};

export default function CareersPage() {
  return <CareersContent />;
}
