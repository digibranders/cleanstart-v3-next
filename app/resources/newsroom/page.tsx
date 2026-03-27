import type { Metadata } from "next";
import { NewsroomContent } from "./newsroom-content";

export const metadata: Metadata = {
  title: "Newsroom | CleanStart",
  description:
    "The latest press releases, media coverage, partnerships, and company announcements.",
};

export default function NewsroomPage() {
  return <NewsroomContent />;
}
