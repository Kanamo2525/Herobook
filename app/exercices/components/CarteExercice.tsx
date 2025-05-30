"use client"

import Link from "next/link"
import type { Exercice } from "../../data/exercices"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Check, Star, Eye } from "lucide-react"
import { useCahier } from "../../contexts/CahierContext"
import type React from "react"

type CarteExerciceProps = {
  exercice: Exercice
}

export default function CarteExercice({ exercice }: CarteExerciceProps) {
  const { ajouterAuCahier, retirerDuCahier, estDansLeCahier, ajouterAuxFavoris, retirerDesFavoris, estDansLesFavoris } =
    useCahier()

  const estSelectionne = estDansLeCahier(exercice.id)
  const estFavori = estDansLesFavoris(exercice.id)
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

  const toggleFavoris = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (estFavori) {
      retirerDesFavoris(exercice.id)
    } else {
      ajouterAuxFavoris(exercice)
    }
  }

  return (
    <div className="group h-full relative">
      <Card className="hover:shadow-lg transition-all duration-300 h-full">
        <CardContent className="p-4 sm:p-6 flex flex-col h-full">
          {/* Header avec icône colorée et bouton favoris */}
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
              {/* Icône colorée de l'exercice */}
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
              <div className="flex-grow min-w-0">
                <h3 className="font-heading text-base sm:text-lg font-semibold leading-tight pr-2">{exercice.nom}</h3>
              </div>
            </div>

            {/* Bouton favoris - icône étoile uniquement */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 hover:bg-yellow-50"
              onClick={toggleFavoris}
            >
              <Star
                className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors ${
                  estFavori ? "fill-yellow-400 text-yellow-400" : "text-gray-400 hover:text-yellow-400"
                }`}
              />
              <span className="sr-only">{estFavori ? "Retirer des favoris" : "Ajouter aux favoris"}</span>
            </Button>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-muted-foreground mb-4 flex-grow line-clamp-3 overflow-hidden">
            {exercice.description}
          </p>

          {/* Badges durée et niveau */}
          <div className="flex items-center justify-between mb-4 text-xs sm:text-sm">
            <span className="text-muted-foreground">{exercice.duree} min</span>
            <Badge variant="outline">{exercice.niveau}</Badge>
          </div>

          {/* Boutons d'action - icônes uniquement */}
          <div className="flex gap-2 mt-auto">
            {/* Bouton Découvrir - icône œil */}
            <Link href={`/exercices/${exercice.id}`} className="flex-1">
              <Button
                variant="outline"
                size="icon"
                className="w-full h-8 sm:h-9 hover:bg-blue-50"
                onClick={(e) => e.stopPropagation()}
              >
                <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                <span className="sr-only">Découvrir l'exercice</span>
              </Button>
            </Link>

            {/* Bouton Ajouter au cahier - icône plus/check */}
            <Button
              variant={estSelectionne ? "default" : "outline"}
              size="icon"
              className={`flex-1 h-8 sm:h-9 ${
                estSelectionne ? "bg-green-600 hover:bg-green-700 text-white" : "hover:bg-green-50 border-green-200"
              }`}
              onClick={toggleSelection}
            >
              {estSelectionne ? (
                <Check className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              )}
              <span className="sr-only">{estSelectionne ? "Retirer du cahier" : "Ajouter au cahier"}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
