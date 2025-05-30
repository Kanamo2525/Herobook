"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Printer, ExternalLink } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import type { Exercice } from "@/app/data/exercices"

interface ImprimerCahierProps {
  exercices: Exercice[]
  metriques: any
}

export function ImprimerCahier({ exercices, metriques }: ImprimerCahierProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePrint = async () => {
    setIsLoading(true)

    try {
      // Créer les données à passer à la page d'impression
      const printData = {
        exercices: exercices.map((ex) => ({
          id: ex.id,
          nom: ex.nom,
          description: ex.description,
          categorie: ex.categorie,
          duree: ex.duree,
          niveau: ex.niveau,
          instructions: ex.instructions,
          conclusion: ex.conclusion,
        })),
        metriques,
      }

      // Encoder les données en utilisant encodeURIComponent pour gérer les caractères Unicode
      const jsonString = JSON.stringify(printData)
      const encodedData = encodeURIComponent(jsonString)

      // Construire l'URL de la page d'impression avec les données
      const printUrl = `/cahier/imprimer/direct?data=${encodedData}`

      // Ouvrir la page d'impression dans un nouvel onglet
      const printWindow = window.open(printUrl, "_blank")

      if (!printWindow) {
        toast({
          title: "Erreur",
          description: "Impossible d'ouvrir la page d'impression. Veuillez autoriser les pop-ups.",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Page d'impression ouverte",
        description:
          "La page d'impression s'est ouverte dans un nouvel onglet. L'impression démarrera automatiquement.",
      })
    } catch (error) {
      console.error("Erreur lors de la création du cahier d'impression:", error)
      toast({
        title: "Erreur",
        description: "Impossible de créer la page d'impression. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="outline" onClick={handlePrint} disabled={isLoading} className="flex items-center gap-2">
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
          Préparation...
        </>
      ) : (
        <>
          <Printer className="h-4 w-4" />
          Imprimer le cahier
          <ExternalLink className="h-3 w-3 opacity-60" />
        </>
      )}
    </Button>
  )
}
