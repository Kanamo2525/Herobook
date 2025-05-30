import type { Metadata } from "next"
import { exercices as exercicesData } from "../../data/exercices"
import ExerciceDetailClient from "./ExerciceDetailClient"
import { generateStructuredData, seoKeywords } from "@/lib/seo"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const exercice = exercicesData.find((e) => e.id === params.id)

  if (!exercice) {
    return {
      title: "Exercice non trouvé",
      description: "L'exercice que vous recherchez n'existe pas.",
    }
  }

  const categoryKeywords = seoKeywords.categories[exercice.categorie as keyof typeof seoKeywords.categories] || []
  const keywords = [...seoKeywords.global, ...categoryKeywords, exercice.nom.toLowerCase()]

  return {
    title: `${exercice.nom} | Exercice de développement personnel`,
    description: `${exercice.description} Durée: ${exercice.duree} min. Niveau: ${exercice.niveau}. Catégorie: ${exercice.categorie}.`,
    keywords,
    authors: [{ name: "Kristy Anamoutou", url: "https://kristy-blog.fr" }],
    openGraph: {
      title: `${exercice.nom} | Exercice de développement personnel`,
      description: exercice.description,
      url: `https://playbook.kristy-blog.fr/exercices/${exercice.id}`,
      siteName: "Playbook Kristy",
      locale: "fr_FR",
      type: "article",
      images: [
        {
          url: exercice.image || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: exercice.nom,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${exercice.nom} | Exercice de développement personnel`,
      description: exercice.description,
      images: [exercice.image || "/og-image.jpg"],
    },
    alternates: {
      canonical: `https://playbook.kristy-blog.fr/exercices/${exercice.id}`,
    },
  }
}

export default function ExerciceDetail({ params }: { params: { id: string } }) {
  const exercice = exercicesData.find((e) => e.id === params.id)

  if (!exercice) {
    return <div>Exercice non trouvé</div>
  }

  const structuredData = generateStructuredData("exercise", exercice)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <ExerciceDetailClient />
    </>
  )
}
