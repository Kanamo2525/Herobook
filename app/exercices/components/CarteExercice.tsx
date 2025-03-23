import Link from "next/link"
import type { Exercice } from "../../data/exercices"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Check } from "lucide-react"
import { useCahier } from "../../contexts/CahierContext"
import type React from "react"

type CarteExerciceProps = {
  exercice: Exercice
}

export default function CarteExercice({ exercice }: CarteExerciceProps) {
  const { ajouterAuCahier, retirerDuCahier, estDansLeCahier } = useCahier()
  const estSelectionne = estDansLeCahier(exercice.id)
  const Icone = exercice.icone

  const toggleSelection = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (estSelectionne) {
      retirerDuCahier(exercice.id)
    } else {
      ajouterAuCahier(exercice)
    }
  }

  return (
    <div className="group h-full relative">
      <Link href={`/exercices/${exercice.id}`}>
        <Card className="hover:shadow-lg transition-all duration-300 h-full">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex items-start space-x-4 mb-4">
              {/* Icône */}
              <div className="flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
                  style={{ backgroundColor: `${exercice.couleur}20` }}
                >
                  <Icone
                    className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: exercice.couleur }}
                  />
                </div>
              </div>

              {/* Titre de l'exercice */}
              <div className="flex-grow min-w-0 pr-8">
                <h3 className="font-heading text-lg font-semibold leading-tight">{exercice.nom}</h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4 flex-grow">{exercice.description}</p>

            {/* Conteneur des badges avec flexbox et espacement égal */}
            <div className="flex items-center justify-end space-x-4 text-sm mt-auto">
              <span className="text-muted-foreground">{exercice.duree} min</span>
              <Badge variant="outline">{exercice.niveau}</Badge>
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* Bouton de sélection positionné absolument */}
      <Button
        variant={estSelectionne ? "default" : "secondary"}
        size="icon"
        className="absolute top-4 right-4 z-10"
        onClick={toggleSelection}
      >
        {estSelectionne ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        <span className="sr-only">{estSelectionne ? "Retirer du cahier" : "Ajouter au cahier"}</span>
      </Button>
    </div>
  )
}

