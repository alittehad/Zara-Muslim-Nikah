"use client";

import { usePathname } from "next/navigation";

const SITE_URL = "https://zaranikahservice.online";

export default function CanonicalUrl() {
  const pathname = usePathname() || "/";
  const canonicalPath = pathname === "/" ? "/" : pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return <link rel="canonical" href={`${SITE_URL}${canonicalPath}`} />;
}
