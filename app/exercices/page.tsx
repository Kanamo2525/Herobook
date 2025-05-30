"use client"

import { useState, useMemo } from "react"
import { categories, exercices } from "../data/exercices"
import CategorieFiltre from "./components/CategorieFiltre"
import BarreRecherche from "./components/BarreRecherche"
import FiltreNiveau from "./components/FiltreNiveau"
import Pagination from "./components/Pagination"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/LanguageToggle"
import { Button } from "@/components/ui/button"
import { Book, Settings, Menu, Filter } from "lucide-react"
import Link from "next/link"
import { useCahier } from "../contexts/CahierContext"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import GrilleExercices from "./components/GrilleExercices"

const ELEMENTS_PAR_PAGE = 30

export default function PageExercices() {
  const { exercicesSelectionnes } = useCahier()
  const [categorieSelectionnee, setCategorieSelectionnee] = useState("Les thématiques")
  const [requeteRecherche, setRequeteRecherche] = useState("")
  const [niveauSelectionne, setNiveauSelectionne] = useState("Tout")
  const [pageCourante, setPageCourante] = useState(1)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

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
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex flex-col md:flex-row h-[calc(100vh-80px)]">
        {/* Sidebar pour desktop */}
        <div className="hidden md:block">
          <CategorieFiltre
            categories={categories}
            categorieSelectionnee={categorieSelectionnee}
            onSelectCategorie={(categorie) => {
              setCategorieSelectionnee(categorie)
              setPageCourante(1)
            }}
          />
        </div>

        {/* Sidebar pour mobile dans un Sheet */}
        <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
          <SheetContent side="left" className="w-[80%] sm:w-[350px] p-0">
            <div className="h-full overflow-auto">
              <CategorieFiltre
                categories={categories}
                categorieSelectionnee={categorieSelectionnee}
                onSelectCategorie={(categorie) => {
                  setCategorieSelectionnee(categorie)
                  setPageCourante(1)
                  setIsMobileFilterOpen(false)
                }}
              />
            </div>
          </SheetContent>
        </Sheet>

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 md:p-6 space-y-4 border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {/* Bouton menu pour mobile */}
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden mr-2"
                  onClick={() => setIsMobileFilterOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <Link href="/">
                  <h1 className="text-xl md:text-3xl font-heading font-bold hover:text-primary cursor-pointer transition-colors">
                    Catalogue d'exercices
                  </h1>
                </Link>
              </div>
              <div className="flex items-center space-x-2 md:space-x-4">
                <Link href="/cahier">
                  <Button
                    variant="outline"
                    className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm px-2 md:px-4"
                  >
                    <Book className="h-4 w-4" />
                    <span className="hidden sm:inline">Mon Cahier</span>
                    <span>({exercicesSelectionnes.length})</span>
                  </Button>
                </Link>
                <Link href="/admin" className="hidden sm:block">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Administration</span>
                  </Button>
                </Link>
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>

            {/* Filtres */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow">
                <BarreRecherche
                  onSearch={(query) => {
                    setRequeteRecherche(query)
                    setPageCourante(1)
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <FiltreNiveau
                  niveauSelectionne={niveauSelectionne}
                  onSelectNiveau={(niveau) => {
                    setNiveauSelectionne(niveau)
                    setPageCourante(1)
                  }}
                />
                <Button variant="outline" size="icon" className="md:hidden" onClick={() => setIsMobileFilterOpen(true)}>
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 md:p-6">
            <GrilleExercices exercices={exercicesPagines} categorieSelectionnee={categorieSelectionnee} />
          </div>

          <div className="p-4 md:p-6 border-t">
            <Pagination pageCourante={pageCourante} totalPages={totalPages} onChangementPage={setPageCourante} />
          </div>
        </main>
      </div>

      {/* Pied de page */}
      <footer className="bg-card border-t py-4 md:py-6 mt-auto">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-center md:text-left text-sm">
            © 2025 Kristy Anamoutou •{" "}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/deed.en"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              CC BY-SA 4.0
            </a>
          </p>
          <div className="flex space-x-4">
            <a
              href="https://kristy-blog.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm"
            >
              Accès au blog
            </a>
            <Link href="/exercices" className="text-primary hover:underline text-sm">
              Index des Exercices
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
