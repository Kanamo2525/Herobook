"use client"

import { useState, useMemo } from "react"
import { categories, exercices } from "../data/exercices"
import CategorieFiltre from "./components/CategorieFiltre"
import BarreRecherche from "./components/BarreRecherche"
import FiltreNiveau from "./components/FiltreNiveau"
import GrilleExercices from "./components/GrilleExercices"
import Pagination from "./components/Pagination"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Book, Settings } from "lucide-react"
import Link from "next/link"
import { useCahier } from "../contexts/CahierContext"

const ELEMENTS_PAR_PAGE = 30

export default function PageExercices() {
  const { exercicesSelectionnes } = useCahier()
  const [categorieSelectionnee, setCategorieSelectionnee] = useState("Les thématiques")
  const [requeteRecherche, setRequeteRecherche] = useState("")
  const [niveauSelectionne, setNiveauSelectionne] = useState("Tout")
  const [pageCourante, setPageCourante] = useState(1)

  const exercicesFiltres = useMemo(() => {
    return exercices.filter((exercice) => {
      const correspondanceCategorie =
        categorieSelectionnee === "Les thématiques" || exercice.categorie === categorieSelectionnee
      const correspondanceRecherche =
        exercice.nom.toLowerCase().includes(requeteRecherche.toLowerCase()) ||
        exercice.description.toLowerCase().includes(requeteRecherche.toLowerCase())
      const correspondanceNiveau = niveauSelectionne === "Tout" || exercice.niveau === niveauSelectionne
      return correspondanceCategorie && correspondanceRecherche && correspondanceNiveau
    })
  }, [categorieSelectionnee, requeteRecherche, niveauSelectionne])

  const totalPages = Math.ceil(exercicesFiltres.length / ELEMENTS_PAR_PAGE)
  const exercicesPagines = exercicesFiltres.slice(
    (pageCourante - 1) * ELEMENTS_PAR_PAGE,
    pageCourante * ELEMENTS_PAR_PAGE,
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-[calc(100vh-1px)] overflow-hidden">
        <CategorieFiltre
          categories={categories}
          categorieSelectionnee={categorieSelectionnee}
          onSelectCategorie={(categorie) => {
            setCategorieSelectionnee(categorie)
            setPageCourante(1)
          }}
        />
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 md:p-6 space-y-4 border-b">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-heading font-bold">Catalogue d'exercices</h1>
              <div className="flex items-center space-x-4">
                <Link href="/cahier">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Book className="h-4 w-4" />
                    <span>Mon Cahier ({exercicesSelectionnes.length})</span>
                  </Button>
                </Link>
                <Link href="/admin">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Administration</span>
                  </Button>
                </Link>
                <ThemeToggle />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow">
                <BarreRecherche
                  onSearch={(query) => {
                    setRequeteRecherche(query)
                    setPageCourante(1)
                  }}
                />
              </div>
              <FiltreNiveau
                niveauSelectionne={niveauSelectionne}
                onSelectNiveau={(niveau) => {
                  setNiveauSelectionne(niveau)
                  setPageCourante(1)
                }}
              />
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4 md:p-6">
            <GrilleExercices exercices={exercicesPagines} />
          </div>
          <div className="p-4 md:p-6 border-t">
            <Pagination pageCourante={pageCourante} totalPages={totalPages} onChangementPage={setPageCourante} />
          </div>
        </main>
      </div>
    </div>
  )
}

