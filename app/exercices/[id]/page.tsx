import type { Metadata } from "next"
import { exercices as exercicesData } from "../../data/exercices"
import ExerciceDetailClient from "./ExerciceDetailClient"

// Ajoutez cette fonction de génération de métadonnées dynamiques
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const exercice = exercicesData.find((e) => e.id === params.id)

  if (!exercice) {
    return {
      title: "Exercice non trouvé",
      description: "L'exercice que vous recherchez n'existe pas.",
    }
  }

  return {
    title: `${exercice.nom} | Le cahier d'exercices`,
    description: exercice.description,
    openGraph: {
      title: `${exercice.nom} | Le cahier d'exercices`,
      description: exercice.description,
      url: `https://playbook.kristy-blog.fr/exercices/${exercice.id}`,
      siteName: "Playbook Kristy",
      locale: "fr_FR",
      type: "article",
      images: [
        {
          url: "https://playbook.kristy-blog.fr/og-image.jpg", // Idéalement, utilisez une image spécifique à l'exercice
          width: 1200,
          height: 630,
          alt: exercice.nom,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${exercice.nom} | Le cahier d'exercices`,
      description: exercice.description,
      images: ["https://playbook.kristy-blog.fr/og-image.jpg"], // Idéalement, utilisez une image spécifique à l'exercice
    },
  }
}

export default function ExerciceDetail() {
  return <ExerciceDetailClient />
}
