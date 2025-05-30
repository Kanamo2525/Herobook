"use client"

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
          <CardContent className="p-4 sm:p-6 flex flex-col h-full">
            <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
              {/* Icône */}
              <div className="flex-shrink-0">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors duration-300"
                  style={{ backgroundColor: `${exercice.couleur}20` }}
                >
                  <Icone
                    className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: exercice.couleur }}
                  />
                </div>
              </div>

              {/* Titre de l'exercice */}
              <div className="flex-grow min-w-0 pr-8">
                <h3 className="font-heading text-base sm:text-lg font-semibold leading-tight">{exercice.nom}</h3>
              </div>
            </div>

            {/* Description - avec limitation de lignes sur tous les écrans */}
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 flex-grow line-clamp-3 overflow-hidden">
              {exercice.description}
            </p>

            {/* Conteneur des badges avec flexbox et espacement égal */}
            <div className="flex items-center justify-end space-x-2 sm:space-x-4 text-xs sm:text-sm mt-auto">
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
        className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 h-7 w-7 sm:h-9 sm:w-9"
        onClick={toggleSelection}
      >
        {estSelectionne ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : <Plus className="h-3 w-3 sm:h-4 sm:w-4" />}
        <span className="sr-only">{estSelectionne ? "Retirer du cahier" : "Ajouter au cahier"}</span>
      </Button>
    </div>
  )
}
