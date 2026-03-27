import type { Metadata } from "next";
import { PartnersContent } from "./partners-content";

export const metadata: Metadata = {
  title: "Partners | CleanStart",
  description:
    "Together, we set a new standard for trusted software. Join the Clean Software Movement.",
};

export default function PartnersPage() {
  return <PartnersContent />;
}
