import type { Metadata } from "next";
import { AttackSurfaceContent } from "./attack-surface-content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Attack Surface Reduction | CleanStart",
  description:
    "Reduce container attack surface by eliminating unnecessary components before they enter production. Minimal foundations, deterministic builds, and secure defaults.",
};

export default function AttackSurfacePage() {
  return <AttackSurfaceContent />;
}
