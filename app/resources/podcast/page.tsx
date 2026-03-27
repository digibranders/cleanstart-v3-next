import type { Metadata } from "next";
import { PodcastContent } from "./podcast-content";

export const metadata: Metadata = {
  title: "Leadership Exchange Podcast | CleanStart",
  description:
    "Where industry leaders decode container security and define the future of the software supply chain.",
};

export default function PodcastPage() {
  return <PodcastContent />;
}
