"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { envoyerCahierParEmail } from "@/app/actions/envoyerCahierParEmail"
import { Mail, Send, X, AlertCircle, CheckCircle } from "lucide-react"

export function EnvoiCahierForm({ exercices, metriques }) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [errorDetails, setErrorDetails] = useState("")
  const [debugInfo, setDebugInfo] = useState("")

  const handleOpenModal = () => {
    console.log("Ouverture de la modal d'envoi email")
    console.log("Exercices disponibles:", exercices?.length || 0)
    console.log("Métriques:", metriques)
    setIsModalOpen(true)
    setErrorDetails("")
    setDebugInfo("")
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEmail("")
    setErrorDetails("")
    setDebugInfo("")
  }

  const handleConfirmSend = async () => {
    console.log("=== DÉBUT HANDLECONFIRMSEND ===")

    if (!email) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir une adresse email valide",
        variant: "destructive",
      })
      return
    }

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "Format d'email invalide",
        description: "Veuillez saisir une adresse email valide",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setErrorDetails("")
    setDebugInfo("")

    try {
      console.log("Tentative d'envoi d'email à:", email)
      console.log("Nombre d'exercices:", exercices?.length || 0)
      console.log("Métriques reçues:", metriques)

      // Vérifier que les données sont valides avant l'envoi
      if (!exercices || exercices.length === 0) {
        throw new Error("Aucun exercice sélectionné pour l'envoi")
      }

      // Vérifier et reconstruire les métriques si nécessaire
      let metriquesFinales = metriques
      if (!metriques || !metriques.totalExercices) {
        console.warn("Métriques incomplètes, reconstruction...")
        metriquesFinales = {
          totalExercices: exercices.length,
          nombreThematiques: new Set(exercices.map((ex) => ex.categorie)).size,
          dureeTotale: exercices.reduce((acc, ex) => acc + (ex.duree || 0), 0),
          niveauxCouverts: [...new Set(exercices.map((ex) => ex.niveau))],
        }
        console.log("Métriques reconstruites:", metriquesFinales)
      }

      setDebugInfo(`Envoi en cours vers ${email} avec ${exercices.length} exercices...`)

      const result = await envoyerCahierParEmail(email, exercices, metriquesFinales)
      console.log("Résultat envoi:", result)

      setDebugInfo(`Succès! ID: ${result.id}`)

      toast({
        title: "✅ Cahier envoyé avec succès !",
        description: `Votre cahier d'exercices personnalisé a été envoyé à ${email}. Vérifiez votre boîte de réception (et vos spams).`,
        duration: 5000,
      })
      setEmail("")
      setIsModalOpen(false)
    } catch (error) {
      console.error("=== ERREUR DANS HANDLECONFIRMSEND ===")
      console.error("Erreur complète:", error)
      console.error("Type:", typeof error)
      console.error("Message:", error instanceof Error ? error.message : String(error))
      console.error("Stack:", error instanceof Error ? error.stack : "Pas de stack")

      // Capturer les détails de l'erreur pour affichage
      const errorMessage = error instanceof Error ? error.message : String(error)
      setErrorDetails(errorMessage)
      setDebugInfo(`Erreur: ${errorMessage}`)

      // Message d'erreur plus convivial
      let userMessage = "Une erreur est survenue lors de l'envoi du cahier."

      if (errorMessage.includes("domain is not verified")) {
        userMessage = "Le domaine d'envoi n'est pas vérifié. Veuillez contacter l'administrateur."
      } else if (errorMessage.includes("RESEND_API_KEY")) {
        userMessage = "La configuration du service d'email est incomplète."
      } else if (errorMessage.includes("Aucun exercice")) {
        userMessage = "Aucun exercice sélectionné pour l'envoi."
      } else if (errorMessage.includes("Erreur Resend")) {
        userMessage = "Erreur du service d'envoi d'emails. Veuillez réessayer plus tard."
      } else {
        userMessage = `Erreur technique: ${errorMessage}`
      }

      toast({
        title: "❌ Erreur d'envoi",
        description: userMessage,
        variant: "destructive",
        duration: 8000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Bouton pour ouvrir la modal */}
      <Button
        onClick={handleOpenModal}
        className="flex items-center gap-2 hover:bg-primary/90 transition-colors"
        size="default"
      >
        <Mail className="h-4 w-4" />
        <span>Envoyer par email</span>
      </Button>

      {/* Modal personnalisée */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCloseModal} />

          {/* Modal content */}
          <div className="relative bg-background border rounded-lg shadow-lg w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Envoyer votre cahier par email</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={handleCloseModal} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4">
              Recevez votre cahier d'exercices personnalisé directement dans votre boîte mail.
            </p>

            {/* Résumé du cahier */}
            <div className="bg-muted/50 p-4 rounded-lg mb-4">
              <h4 className="font-medium mb-2">Contenu de votre cahier :</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  • {exercices?.length || 0} exercice{(exercices?.length || 0) > 1 ? "s" : ""} sélectionné
                  {(exercices?.length || 0) > 1 ? "s" : ""}
                </li>
                <li>
                  • {metriques?.nombreThematiques || 0} thématique{(metriques?.nombreThematiques || 0) > 1 ? "s" : ""}
                </li>
                <li>• Durée totale : {metriques?.dureeTotale || 0} minutes</li>
                <li>• Niveaux : {metriques?.niveauxCouverts?.join(", ") || "Non défini"}</li>
              </ul>
            </div>

            {/* Informations de debug */}
            {debugInfo && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Statut:</p>
                    <p className="text-xs text-blue-700 mt-1">{debugInfo}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Affichage des erreurs détaillées si présentes */}
            {errorDetails && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Détails de l'erreur:</p>
                    <p className="text-xs text-red-700 mt-1 break-words">{errorDetails}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Champ email */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Votre adresse email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="votre-email@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
                autoFocus
              />
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={handleCloseModal} disabled={isLoading}>
                Annuler
              </Button>
              <Button onClick={handleConfirmSend} disabled={isLoading || !email}>
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer le cahier
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
