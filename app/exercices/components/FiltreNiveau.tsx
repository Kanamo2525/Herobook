import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type FiltreNiveauProps = {
  niveauSelectionne: string
  onSelectNiveau: (niveau: string) => void
}

export default function FiltreNiveau({ niveauSelectionne, onSelectNiveau }: FiltreNiveauProps) {
  return (
    <Select value={niveauSelectionne} onValueChange={onSelectNiveau}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sélectionner un niveau" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Tout">Tous les niveaux</SelectItem>
        <SelectItem value="Débutant">Débutant</SelectItem>
        <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
        <SelectItem value="Avancé">Avancé</SelectItem>
      </SelectContent>
    </Select>
  )
}
