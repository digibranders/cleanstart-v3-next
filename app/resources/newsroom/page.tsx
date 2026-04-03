import type { Metadata } from "next";
import { NewsroomContent } from "./newsroom-content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Newsroom | CleanStart",
  description:
    "The latest press releases, media coverage, partnerships, and company announcements.",
};

export default function NewsroomPage() {
  return <NewsroomContent />;
}
