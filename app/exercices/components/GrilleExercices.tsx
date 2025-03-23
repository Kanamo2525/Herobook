import type { Exercice } from "../../data/exercices"
import CarteExercice from "./CarteExercice"

type GrilleExercicesProps = {
  exercices: Exercice[]
}

export default function GrilleExercices({ exercices }: GrilleExercicesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {exercices.map((exercice) => (
        <div key={exercice.id} className="h-[280px]">
          {" "}
          {/* Ajustez cette hauteur selon vos besoins */}
          <CarteExercice exercice={exercice} />
        </div>
      ))}
    </div>
  )
}

