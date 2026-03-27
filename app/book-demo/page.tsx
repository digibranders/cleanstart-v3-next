import type { Metadata } from "next";
import { BookDemoContent } from "./book-demo-content";

export const metadata: Metadata = {
  title: "Book a Demo | CleanStart",
  description:
    "Get a personalized demo of CleanStart. See how we deliver clean, hardened, and compliant container images.",
};

export default function BookDemoPage() {
  return <BookDemoContent />;
}
