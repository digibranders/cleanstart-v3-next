import type { MetadataRoute } from "next";
import { headers } from "next/headers";

const CANONICAL_HOST = "cleanstart.com";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host =
    (await headers()).get("host")?.split(":")[0].toLowerCase() ?? "";
  const isCanonical = host === CANONICAL_HOST;

  if (!isCanonical) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    host: `https://${CANONICAL_HOST}`,
  };
}
