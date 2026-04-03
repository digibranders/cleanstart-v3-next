import type { Metadata } from "next";
import { ForDevelopersContent } from "./for-developers-content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Built for Developers | CleanStart",
  description:
    "Build secure software without slowing down. Drop-in replacements for popular base images, native CI/CD integrations, fewer CVEs, and zero learning curve.",
};

export default function ForDevelopersPage(): React.JSX.Element {
  return <ForDevelopersContent />;
}
