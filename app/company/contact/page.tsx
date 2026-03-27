import type { Metadata } from "next";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact Us | CleanStart",
  description:
    "Whether you have questions, feedback, or want to explore what CleanStart can do for your organization — we're here.",
};

export default function ContactPage() {
  return <ContactContent />;
}
