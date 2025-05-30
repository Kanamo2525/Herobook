import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Le cahier d'exercices",
  description: "Un cahier d'exercices disponible pour accompagner le développement personnel selon les besoins",
  openGraph: {
    title: "Le cahier d'exercices",
    description: "Un cahier d'exercices disponible pour accompagner le développement personnel selon les besoins",
    url: "https://playbook.kristy-blog.fr/exercices",
    siteName: "Playbook Kristy",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://playbook.kristy-blog.fr/og-image.jpg", // Remplacez par l'URL réelle de votre image
        width: 1200,
        height: 630,
        alt: "Le cahier d'exercices de Kristy Anamoutou",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le cahier d'exercices",
    description: "Un cahier d'exercices disponible pour accompagner le développement personnel selon les besoins",
    images: ["https://playbook.kristy-blog.fr/og-image.jpg"], // Remplacez par l'URL réelle de votre image
  },
}

export default function ExercicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
