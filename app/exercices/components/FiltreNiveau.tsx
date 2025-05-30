"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FiltreNiveauProps {
  niveauSelectionne: string
  onSelectNiveau: (niveau: string) => void
}

const niveaux = [
  { value: "Tout", label: "Tous les niveaux" },
  { value: "Débutant", label: "Débutant" },
  { value: "Intermédiaire", label: "Intermédiaire" },
  { value: "Avancé", label: "Avancé" },
]

export default function FiltreNiveau({ niveauSelectionne, onSelectNiveau }: FiltreNiveauProps) {
  return (
    <Select value={niveauSelectionne} onValueChange={onSelectNiveau}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Tous les niveaux" />
      </SelectTrigger>
      <SelectContent>
        {niveaux.map((niveau) => (
          <SelectItem key={niveau.value} value={niveau.value}>
            {niveau.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
