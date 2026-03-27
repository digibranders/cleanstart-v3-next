import type { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About Us | CleanStart",
  description:
    "CleanStart is building the foundation for trusted software delivery. Security, compliance, and provenance integrated into every build.",
};

export default function AboutPage() {
  return <AboutContent />;
}
