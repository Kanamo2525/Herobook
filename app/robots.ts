import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: "https://playbook.kristy-blog.fr/sitemap.xml",
    host: "https://playbook.kristy-blog.fr",
  }
}
