"use client"

import { useCahier } from "../contexts/CahierContext"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Trash2, Book, Clock, Layout, Target } from "lucide-react"
import { ActivityRings } from "./components/activity-rings"
import { LevelBarChart } from "./components/level-bar-chart"
import { EnvoiCahierForm } from "./components/EnvoiCahierForm"

export default function CahierPage() {
  const { exercicesSelectionnes, retirerDuCahier } = useCahier()

  // Calcul des KPIs
  const totalExercices = exercicesSelectionnes.length
  const thematiquesUniques = [...new Set(exercicesSelectionnes.map((ex) => ex.categorie))]
  const dureeTotale = exercicesSelectionnes.reduce((acc, ex) => acc + ex.duree, 0)

  // Données pour l'infographie des thématiques
  const thematiquesData = thematiquesUniques.map((theme) => ({
    name: theme,
    value: exercicesSelectionnes.filter((ex) => ex.categorie === theme).length,
    total: totalExercices,
  }))

  // Données pour le graphique des niveaux
  const niveauxData = [
    { name: "Débutant", count: exercicesSelectionnes.filter((ex) => ex.niveau === "Débutant").length },
    { name: "Intermédiaire", count: exercicesSelectionnes.filter((ex) => ex.niveau === "Intermédiaire").length },
    { name: "Avancé", count: exercicesSelectionnes.filter((ex) => ex.niveau === "Avancé").length },
  ]

  // Grouper les exercices par thématique
  const exercicesParThematique = thematiquesUniques.reduce(
    (acc, theme) => {
      acc[theme] = exercicesSelectionnes.filter((ex) => ex.categorie === theme)
      return acc
    },
    {} as Record<string, typeof exercicesSelectionnes>,
  )

  const metriques = {
    totalExercices,
    nombreThematiques: thematiquesUniques.length,
    dureeTotale,
    niveauxCouverts: niveauxData.filter((n) => n.count > 0).map((n) => n.name),
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <Link href="/exercices" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au catalogue
          </Link>
          <h1 className="text-3xl font-heading font-bold">Mon Cahier d'Exercices</h1>
        </div>

        {/* Section KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-500/10 rounded-full">
                  <Book className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Exercices</p>
                  <h3 className="text-2xl font-bold text-blue-500">{totalExercices}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-500/10 rounded-full">
                  <Layout className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Thématiques</p>
                  <h3 className="text-2xl font-bold text-green-500">{thematiquesUniques.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-500/10 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Durée totale</p>
                  <h3 className="text-2xl font-bold text-yellow-500">{dureeTotale} min</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-500/10 rounded-full">
                  <Target className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Niveaux</p>
                  <h3 className="text-2xl font-bold text-purple-500">
                    {niveauxData.filter((n) => n.count > 0).length}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Anneaux d'activité */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Répartition des thématiques</h2>
              <div className="flex items-center justify-center h-[300px]">
                <ActivityRings data={thematiquesData} />
              </div>
            </CardContent>
          </Card>

          {/* Graphique des niveaux */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Répartition des niveaux</h2>
              <div className="h-[300px]">
                <LevelBarChart data={niveauxData} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des exercices par thématique */}
        {Object.entries(exercicesParThematique).map(([theme, exercices]) => (
          <Card key={theme} className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">{theme}</h2>
              <div className="space-y-4">
                {exercices.map((exercice) => {
                  const Icone = exercice.icone
                  return (
                    <div key={exercice.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${exercice.couleur}20` }}
                        >
                          <Icone className="w-6 h-6" style={{ color: exercice.couleur }} />
                        </div>
                        <div>
                          <h3 className="font-semibold">{exercice.nom}</h3>
                          <p className="text-sm text-muted-foreground">
                            {exercice.duree} min • Niveau {exercice.niveau}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => retirerDuCahier(exercice.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Retirer du cahier</span>
                      </Button>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex flex-col items-end space-y-4 pt-6">
          <p className="text-muted-foreground">
            {totalExercices} exercice{totalExercices > 1 ? "s" : ""} sélectionné
            {totalExercices > 1 ? "s" : ""}
          </p>
          <EnvoiCahierForm exercices={exercicesSelectionnes} metriques={metriques} />
        </div>
      </div>
    </div>
  )
}

