import type { Metadata } from "next";
import { EventsContent } from "./events-content";

export const metadata: Metadata = {
  title: "In-Person Events | CleanStart",
  description:
    "Meet the CleanStart team at industry conferences, workshops, and our own security summits.",
};

export default function EventsPage() {
  return <EventsContent />;
}
