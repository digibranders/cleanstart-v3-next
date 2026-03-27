import type { Metadata } from "next";
import { CleansightContent } from "./cleansight-content";

export const metadata: Metadata = {
  title: "CleanSight | Continuous Container Visibility",
  description:
    "Discover, assess, and remediate container risk with CleanSight. Continuous visibility across your entire container estate with automated remediation.",
};

export default function CleansightPage() {
  return <CleansightContent />;
}
