"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { envoyerCahierParEmail } from "@/app/actions/envoyerCahierParEmail"

export default function TestEmailPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [lastResult, setLastResult] = useState<any>(null)

  // Données de test
  const exercicesTest = [
    {
      id: "test-1",
      nom: "Exercice de test 1",
      description: "Description de l'exercice de test 1",
      categorie: "Test",
      duree: 30,
      niveau: "Débutant",
      instructions: ["Étape 1", "Étape 2", "Étape 3"],
      conclusion: "Conclusion de l'exercice de test",
    },
    {
      id: "test-2",
      nom: "Exercice de test 2",
      description: "Description de l'exercice de test 2",
      categorie: "Test",
      duree: 45,
      niveau: "Intermédiaire",
      instructions: ["Instruction A", "Instruction B"],
      conclusion: "Conclusion du second exercice",
    },
  ]

  const metriquesTest = {
    totalExercices: 2,
    nombreThematiques: 1,
    dureeTotale: 75,
    niveauxCouverts: ["Débutant", "Intermédiaire"],
  }

  const handleTestEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir une adresse email",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setLastResult(null)

    try {
      console.log("=== DÉBUT TEST EMAIL ===")
      const result = await envoyerCahierParEmail(email, exercicesTest, metriquesTest)
      console.log("Résultat:", result)

      setLastResult(result)
      toast({
        title: "Test réussi",
        description: "L'email de test a été envoyé avec succès!",
      })
    } catch (error) {
      console.error("Erreur test email:", error)
      setLastResult({ error: error instanceof Error ? error.message : "Erreur inconnue" })
      toast({
        title: "Test échoué",
        description: error instanceof Error ? error.message : "Erreur lors de l'envoi",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Test d'envoi d'email</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Configuration Resend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>RESEND_API_KEY configurée:</strong> {process.env.RESEND_API_KEY ? "✅ Oui" : "❌ Non"}
            </p>
            <p>
              <strong>Domaine d'envoi:</strong> playbook.kristy-blog.fr
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Test d'envoi</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTestEmail} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Adresse email de test
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre-email@exemple.com"
                required
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Envoi en cours..." : "Envoyer email de test"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Données de test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Exercices de test:</h4>
              <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto">
                {JSON.stringify(exercicesTest, null, 2)}
              </pre>
            </div>
            <div>
              <h4 className="font-medium">Métriques de test:</h4>
              <pre className="text-xs bg-gray-100 p-2 rounded mt-2">{JSON.stringify(metriquesTest, null, 2)}</pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {lastResult && (
        <Card>
          <CardHeader>
            <CardTitle>Dernier résultat</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">{JSON.stringify(lastResult, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
