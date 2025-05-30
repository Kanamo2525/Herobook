"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { Exercice } from "../data/exercices"

type CahierContextType = {
  exercicesSelectionnes: Exercice[]
  ajouterAuCahier: (exercice: Exercice) => void
  retirerDuCahier: (exerciceId: string) => void
  estDansLeCahier: (exerciceId: string) => boolean
}

const CahierContext = createContext<CahierContextType | undefined>(undefined)

export function CahierProvider({ children }: { children: React.ReactNode }) {
  const [exercicesSelectionnes, setExercicesSelectionnes] = useState<Exercice[]>([])

  const ajouterAuCahier = (exercice: Exercice) => {
    setExercicesSelectionnes((prev) => {
      if (!prev.find((e) => e.id === exercice.id)) {
        return [...prev, exercice]
      }
      return prev
    })
  }

  const retirerDuCahier = (exerciceId: string) => {
    setExercicesSelectionnes((prev) => prev.filter((e) => e.id !== exerciceId))
  }

  const estDansLeCahier = (exerciceId: string) => {
    return exercicesSelectionnes.some((e) => e.id === exerciceId)
  }

  return (
    <CahierContext.Provider
      value={{
        exercicesSelectionnes,
        ajouterAuCahier,
        retirerDuCahier,
        estDansLeCahier,
      }}
    >
      {children}
    </CahierContext.Provider>
  )
}

export function useCahier() {
  const context = useContext(CahierContext)
  if (context === undefined) {
    throw new Error("useCahier doit être utilisé à l'intérieur d'un CahierProvider")
  }
  return context
}
