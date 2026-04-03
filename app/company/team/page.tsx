import type { Metadata } from "next";
import { TeamContent } from "./team-content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Our Team | CleanStart",
  description:
    "Leaders and innovators building trust into software. Meet the CleanStart team.",
};

export default function TeamPage() {
  return <TeamContent />;
}
