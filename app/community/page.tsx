import type { Metadata } from "next";
import { CommunityContent } from "./community-content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Community | CleanStart",
  description:
    "Join the Clean Software Movement. Collaborate with developers, security leaders, and enterprises building trusted software.",
};

export default function CommunityPage(): React.ReactElement {
  return <CommunityContent />;
}
