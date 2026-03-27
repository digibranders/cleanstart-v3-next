import type { Metadata } from "next";
import { ScaContent } from "./sca-content";

export const metadata: Metadata = {
  title: "Enhance Software Composition Analysis | CleanStart",
  description:
    "CleanStart images create a powerful synergy with SCA tools, reducing noise by 90%, eliminating false positives, and improving security effectiveness.",
};

export default function ScaPage() {
  return <ScaContent />;
}
