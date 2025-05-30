import type { Exercice } from "../../data/exercices"
import CarteExercice from "./CarteExercice"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Clock, Calendar } from "lucide-react"

type GrilleExercicesProps = {
  exercices: Exercice[]
  categorieSelectionnee?: string
}

export default function GrilleExercices({ exercices, categorieSelectionnee }: GrilleExercicesProps) {
  // Messages temporaires pour certaines catégories
  const getMessageTemporaire = (categorie: string) => {
    switch (categorie) {
      case "Décoder":
      case "Changer d'état d'esprit":
        return {
          titre: "Exercices en cours de développement",
          description: "Ces exercices seront disponibles à la sortie du Livre 2, actuellement en cours de rédaction.",
          dateInfo: "Disponible fin 2025",
          lien: "https://kristy-blog.fr/books/2",
          texteLien: "Découvrir le Livre 2",
        }
      case "Se transformer":
        return {
          titre: "Exercices en préparation",
          description: "Ces exercices seront développés dans le Livre 3.",
          dateInfo: "Disponible en 2026",
          lien: "https://kristy-blog.fr/books/3",
          texteLien: "Découvrir le Livre 3",
        }
      default:
        return null
    }
  }

  const messageTemporaire = categorieSelectionnee ? getMessageTemporaire(categorieSelectionnee) : null

  // Si une catégorie temporaire est sélectionnée, afficher le message
  if (messageTemporaire) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Clock className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-3">{messageTemporaire.titre}</h2>
              <p className="text-muted-foreground mb-4 text-lg">{messageTemporaire.description}</p>
              <div className="flex items-center justify-center gap-2 text-primary font-semibold mb-6">
                <Calendar className="h-5 w-5" />
                <span>{messageTemporaire.dateInfo}</span>
              </div>
            </div>

            <Button asChild className="inline-flex items-center gap-2">
              <a href={messageTemporaire.lien} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                {messageTemporaire.texteLien}
              </a>
            </Button>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                En attendant, explorez les autres thématiques disponibles pour enrichir votre parcours de développement
                personnel.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {exercices.map((exercice) => (
        <div key={exercice.id} className="h-[280px] sm:h-[320px]">
          <CarteExercice exercice={exercice} />
        </div>
      ))}
      {exercices.length === 0 && !messageTemporaire && (
        <div className="col-span-full text-center py-10 text-muted-foreground">
          Aucun exercice ne correspond à vos critères de recherche.
        </div>
      )}
    </div>
  )
}
