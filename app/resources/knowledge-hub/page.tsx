import type { Metadata } from "next";
import { KnowledgeHubContent } from "./knowledge-hub-content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Knowledge Hub | CleanStart",
  description:
    "Deep-dive tutorials, implementation guides, and best practices from our engineering and security teams.",
};

export default function KnowledgeHubPage() {
  return <KnowledgeHubContent />;
}
