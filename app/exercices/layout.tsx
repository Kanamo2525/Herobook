import type React from "react"
import type { Metadata } from "next"
import { seoKeywords } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Catalogue d'exercices de développement personnel",
  description:
    "Découvrez plus de 13 exercices de développement personnel organisés par thématiques : découvrir ses racines, décoder ses émotions, changer d'état d'esprit et se transformer.",
  keywords: [
    ...seoKeywords.global,
    "catalogue d'exercices",
    "exercices par thématique",
    "exercices de connaissance de soi",
    "exercices de transformation",
  ],
  openGraph: {
    title: "Catalogue d'exercices de développement personnel",
    description:
      "Découvrez plus de 13 exercices de développement personnel organisés par thématiques pour votre croissance personnelle.",
    url: "https://playbook.kristy-blog.fr/exercices",
    siteName: "Playbook Kristy",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://playbook.kristy-blog.fr/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Catalogue d'exercices de développement personnel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catalogue d'exercices de développement personnel",
    description: "Découvrez plus de 13 exercices de développement personnel organisés par thématiques.",
    images: ["https://playbook.kristy-blog.fr/og-image.jpg"],
  },
  alternates: {
    canonical: "https://playbook.kristy-blog.fr/exercices",
  },
}

export default function ExercicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
