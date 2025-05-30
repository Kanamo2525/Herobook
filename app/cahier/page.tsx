"use client"

import { useCahier } from "../contexts/CahierContext"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Trash2, Book, Clock, Layout, Target } from "lucide-react"
import { ActivityRings } from "./components/activity-rings"
import { LevelBarChart } from "./components/level-bar-chart"
import { EnvoiCahierForm } from "./components/EnvoiCahierForm"
import { ImprimerCahier } from "./components/ImprimerCahier"

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

  if (totalExercices === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-8">
            <Link
              href="/exercices"
              className="inline-flex items-center text-primary hover:underline text-sm md:text-base"
            >
              <ArrowLeft className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
              Retour au catalogue
            </Link>
            <h1 className="text-xl md:text-3xl font-heading font-bold">Mon Cahier d'Exercices</h1>
          </div>

          <Card>
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Book className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-bold mb-2">Votre cahier est vide</h2>
                <p className="text-muted-foreground">
                  Commencez par sélectionner des exercices dans le catalogue pour créer votre cahier personnalisé.
                </p>
              </div>
              <Link href="/exercices">
                <Button size="lg">Découvrir les exercices</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <Link
            href="/exercices"
            className="inline-flex items-center text-primary hover:underline text-sm md:text-base"
          >
            <ArrowLeft className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
            Retour au catalogue
          </Link>
          <h1 className="text-xl md:text-3xl font-heading font-bold">Mon Cahier d'Exercices</h1>
        </div>

        {/* Section KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <Card>
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="p-1 md:p-2 bg-blue-500/10 rounded-full">
                  <Book className="h-4 w-4 md:h-6 md:w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Exercices</p>
                  <h3 className="text-lg md:text-2xl font-bold text-blue-500">{totalExercices}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="p-1 md:p-2 bg-green-500/10 rounded-full">
                  <Layout className="h-4 w-4 md:h-6 md:w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Thématiques</p>
                  <h3 className="text-lg md:text-2xl font-bold text-green-500">{thematiquesUniques.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="p-1 md:p-2 bg-yellow-500/10 rounded-full">
                  <Clock className="h-4 w-4 md:h-6 md:w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Durée totale</p>
                  <h3 className="text-lg md:text-2xl font-bold text-yellow-500">{dureeTotale} min</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="p-1 md:p-2 bg-purple-500/10 rounded-full">
                  <Target className="h-4 w-4 md:h-6 md:w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Niveaux</p>
                  <h3 className="text-lg md:text-2xl font-bold text-purple-500">
                    {niveauxData.filter((n) => n.count > 0).length}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vérifier si le cahier contient uniquement des thématiques en attente */}
        const thematiquesEnAttente = ["Décoder", "Changer d'état d'esprit", "Se transformer"];
        const thematiquesDisponibles = thematiquesUniques.filter(theme => !thematiquesEnAttente.includes(theme));
        const seulementThematiquesEnAttente = thematiquesUniques.length > 0 && thematiquesDisponibles.length === 0;

        // Si le cahier contient uniquement des thématiques en attente, afficher un message
        if (seulementThematiquesEnAttente) {
          return (
            <div className="min-h-screen bg-background">
              <div className="max-w-6xl mx-auto p-4 md:p-6">
                <div className="flex items-center justify-between mb-4 md:mb-8">
                  <Link
                    href="/exercices"
                    className="inline-flex items-center text-primary hover:underline text-sm md:text-base"
                  >
                    <ArrowLeft className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                    Retour au catalogue
                  </Link>
                  <h1 className="text-xl md:text-3xl font-heading font-bold">Mon Cahier d'Exercices</h1>
                </div>

                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <Clock className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <h2 className="text-2xl font-bold mb-2">Exercices en cours de préparation</h2>
                      <p className="text-muted-foreground mb-4">
                        Les thématiques que vous avez sélectionnées sont actuellement en cours de préparation :
                      </p>
                      <div className="space-y-3 mb-6">
                        {thematiquesUniques.map(theme => {
                          if (theme === "Décoder" || theme === "Changer d'état d'esprit") {
                            return (
                              <div key={theme} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <p className="font-medium text-blue-900">{theme}</p>
                                <p className="text-sm text-blue-700 mb-2">
                                  Ces exercices sont en cours de préparation et seront disponibles fin 2025 avec la publication du Livre 2.
                                </p>
                                <a 
                                  href="https://kristy-blog.fr/books/2" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                                >
                                  Découvrir le Livre 2 →
                                </a>
                              </div>
                            )
                          }
                          if (theme === "Se transformer") {
                            return (
                              <div key={theme} className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                <p className="font-medium text-purple-900">{theme}</p>
                                <p className="text-sm text-purple-700 mb-2">
                                  Ces exercices seront publiés pour la sortie du Livre 3 en 2026.
                                </p>
                                <a 
                                  href="https://kristy-blog.fr/books/3" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-sm text-purple-600 hover:text-purple-800 underline"
                                >
                                  Découvrir le Livre 3 →
                                </a>
                              </div>
                            )
                          }
                          return null
                        })}
                      </div>
                      <p className="text-sm text-muted-foreground mb-6">
                        En attendant, explorez les autres thématiques disponibles pour enrichir votre parcours de développement personnel.
                      </p>
                    </div>
                    <Link href="/exercices">
                      <Button size="lg">Découvrir les exercices disponibles</Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          )
        }

        {/* Graphiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 md:mb-8">
          {/* Anneaux d'activité */}
          <Card>
            <CardContent className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Répartition des thématiques</h2>
              <div className="flex items-center justify-center h-[250px] md:h-[300px] relative">
                <ActivityRings data={thematiquesData} size={200} />
                {/* Légende des thématiques */}
                <div className="absolute bottom-2 left-2 text-xs space-y-1">
                  {thematiquesData.map((theme, index) => {
                    const colors = [
                      { ring: "#ff375f" }, // Rouge
                      { ring: "#30d158" }, // Vert
                      { ring: "#5e5ce6" }, // Bleu
                      { ring: "#ffd60a" }, // Jaune
                      { ring: "#bf5af2" }, // Violet
                    ]
                    return (
                      <div key={theme.name} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: colors[index % colors.length].ring }}
                        />
                        <span className="text-muted-foreground">{theme.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Graphique des niveaux */}
          <Card>
            <CardContent className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Répartition des niveaux</h2>
              <div className="h-[250px] md:h-[300px]">
                <LevelBarChart data={niveauxData} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des exercices par thématique */}
        {Object.entries(exercicesParThematique).map(([theme, exercices]) => (
          <Card key={theme} className="mb-4 md:mb-8">
            <CardContent className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">{theme}</h2>
              <div className="space-y-3 md:space-y-4">
                {exercices.map((exercice) => {
                  const Icone = exercice.icone
                  return (
                    <div key={exercice.id} className="flex items-center justify-between p-3 md:p-4 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2 md:space-x-4">
                        <div
                          className="w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${exercice.couleur}20` }}
                        >
                          <Icone className="w-4 h-4 md:w-6 md:h-6" style={{ color: exercice.couleur }} />
                        </div>
                        <div>
                          <h3 className="text-sm md:text-base font-semibold">{exercice.nom}</h3>
                          <p className="text-xs md:text-sm text-muted-foreground">
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

        {/* Actions du cahier */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 md:pt-6 border-t">
          <p className="text-sm text-muted-foreground">
            {totalExercices} exercice{totalExercices > 1 ? "s" : ""} sélectionné
            {totalExercices > 1 ? "s" : ""}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <ImprimerCahier exercices={exercicesSelectionnes} metriques={metriques} />
            <EnvoiCahierForm exercices={exercicesSelectionnes} metriques={metriques} />
          </div>
        </div>
      </div>
    </div>
  )
}
