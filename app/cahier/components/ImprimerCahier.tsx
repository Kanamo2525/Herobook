"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Printer, ExternalLink } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { creerCahierImpression } from "@/app/actions/creerCahierImpression"
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
      // Créer un cahier temporaire et obtenir son ID
      const exerciceIds = exercices.map((ex) => ex.id)
      const cahierId = await creerCahierImpression(exerciceIds, metriques)

      // Construire l'URL de la page d'impression
      const printUrl = `/cahier/imprimer/${cahierId}`

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
