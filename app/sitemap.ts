import { generateSitemap } from "@/lib/sitemap"
import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return generateSitemap()
}
