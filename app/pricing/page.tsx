import type { Metadata } from "next";
import { PricingContent } from "./pricing-content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Pricing | CleanStart",
  description:
    "Our platform is built to support a wide range of enterprise and operational needs across industries.",
};

export default function PricingPage() {
  return <PricingContent />;
}
