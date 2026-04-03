import type { Metadata } from "next";
import { BlogContent } from "./blog-content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Blog — Security Perspectives | CleanStart",
  description:
    "Practical perspectives on secure containers, vulnerability management, and continuous compliance from the CleanStart engineering team.",
};

export default function BlogPage() {
  return <BlogContent />;
}
