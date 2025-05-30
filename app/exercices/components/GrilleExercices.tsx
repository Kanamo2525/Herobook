import type { Exercice } from "../../data/exercices"
import CarteExercice from "./CarteExercice"

type GrilleExercicesProps = {
  exercices: Exercice[]
}

export default function GrilleExercices({ exercices }: GrilleExercicesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {exercices.map((exercice) => (
        <div key={exercice.id} className="h-auto sm:h-[280px]">
          <CarteExercice exercice={exercice} />
        </div>
      ))}
      {exercices.length === 0 && (
        <div className="col-span-full text-center py-10 text-muted-foreground">
          Aucun exercice ne correspond à vos critères de recherche.
        </div>
      )}
    </div>
  )
}
