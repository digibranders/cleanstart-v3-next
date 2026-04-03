import type { Metadata } from "next";
import { ResourceCenterContent } from "./resource-center-content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Resource Center | CleanStart",
  description:
    "Whitepapers, architecture insights, datasheets, ebooks, and reports on container security, compliance, and software supply chain integrity.",
};

export default function ResourceCenterPage() {
  return <ResourceCenterContent />;
}
