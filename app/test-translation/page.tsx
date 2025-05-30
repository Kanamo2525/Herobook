"use client"

import { useTranslation } from "@/hooks/useTranslation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LanguageToggle } from "@/components/LanguageToggle"

export default function TestTranslationPage() {
  const { t, locale } = useTranslation()

  const testKeys = [
    "nav.exercises",
    "nav.notebook",
    "nav.admin",
    "exercises.title",
    "exercises.search",
    "exercises.filter.category",
    "exercises.filter.level",
    "category.all",
    "category.decouvrir-ses-racines",
    "level.beginner",
    "level.intermediate",
    "level.advanced",
    "waiting.development",
    "waiting.book2.description",
  ]

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Test de Traduction</h1>
        <div className="flex items-center gap-4">
          <span>Langue actuelle: {locale}</span>
          <LanguageToggle />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clés de traduction testées</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {testKeys.map((key) => (
              <div key={key} className="flex justify-between items-center p-2 border rounded">
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">{key}</code>
                <span className="font-medium">{t(key)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Test de changement de langue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Utilisez le bouton de changement de langue en haut à droite pour tester la traduction.</p>
          <div className="space-y-2">
            <p>
              <strong>Exercices:</strong> {t("nav.exercises")}
            </p>
            <p>
              <strong>Mon Cahier:</strong> {t("nav.notebook")}
            </p>
            <p>
              <strong>Catalogue:</strong> {t("exercises.title")}
            </p>
            <p>
              <strong>Rechercher:</strong> {t("exercises.search")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
