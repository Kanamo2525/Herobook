"use client"

import CarteExercice from "./CarteExercice"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, ExternalLink } from "lucide-react"

interface Exercise {
  id: string
  nom: string
  description: string
  categorie: string
  niveau: string
  duree: number
  image?: string
  icone: any
  couleur: string
}

interface GrilleExercicesProps {
  exercices: Exercise[]
  categorieSelectionnee: string
}

export default function GrilleExercices({ exercices, categorieSelectionnee }: GrilleExercicesProps) {
  // Messages d'attente pour les catégories spécifiques
  const getWaitingMessage = (categorie: string) => {
    if (categorie === "Decoder" || categorie === "Décoder" || categorie === "Changer d'état d'esprit") {
      return {
        title: "Exercices en cours de développement",
        description: "Ces exercices seront disponibles à la sortie du Livre 2, actuellement en cours de rédaction.",
        date: "Disponible fin 2025",
        link: "https://kristy-blog.fr/books/2",
        linkText: "Découvrir le Livre 2",
        icon: Clock,
      }
    }

    if (categorie === "Se transformer") {
      return {
        title: "Exercices en préparation",
        description: "Ces exercices seront développés dans le Livre 3.",
        date: "Disponible en 2026",
        link: "https://kristy-blog.fr/books/3",
        linkText: "Découvrir le Livre 3",
        icon: Calendar,
      }
    }

    return null
  }

  const waitingMessage = getWaitingMessage(categorieSelectionnee)

  if (waitingMessage) {
    const IconComponent = waitingMessage.icon
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center space-y-4">
            <div className="flex justify-center">
              <IconComponent className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">{waitingMessage.title}</h3>
            <p className="text-muted-foreground">{waitingMessage.description}</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{waitingMessage.date}</span>
            </div>
            <Button asChild className="w-full">
              <a href={waitingMessage.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                {waitingMessage.linkText}
              </a>
            </Button>
            <p className="text-sm text-muted-foreground">
              En attendant, explorez les autres thématiques disponibles pour enrichir votre parcours de développement
              personnel.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (exercices.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucun exercice ne correspond à vos critères de recherche.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {exercices.map((exercice) => (
        <CarteExercice key={exercice.id} exercice={exercice} />
      ))}
    </div>
  )
}
