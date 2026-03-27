import type { Metadata } from "next";
import { ForCISOContent as ForCisoContent } from "./for-ciso-content";

export const metadata: Metadata = {
  title: "For CISOs & Security Leaders | CleanStart",
  description:
    "Prove what your software is built on. Security, compliance, and traceability you can defend in any audit or board review.",
};

export default function ForCisoPage(): React.JSX.Element {
  return <ForCisoContent />;
}
