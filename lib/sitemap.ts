import { exercices } from "@/app/data/exercices"

export function generateSitemap() {
  const baseUrl = "https://playbook.kristy-blog.fr"
  const currentDate = new Date().toISOString()

  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/exercices`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cahier`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]

  const exercisePages = exercices.map((exercice) => ({
    url: `${baseUrl}/exercices/${exercice.id}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...exercisePages]
}
