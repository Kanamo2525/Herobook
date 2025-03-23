"use client"

import { useParams, useRouter } from "next/navigation"
import { exercices } from "../../data/exercices"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Plus, Check, Printer, Share2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useCahier } from "../../contexts/CahierContext"
import { toast } from "@/components/ui/use-toast"

// Fonction pour récupérer une image aléatoire d'Unsplash
const getRandomUnsplashImage = async (query: string): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=C7UHtoHmAG5U6nH0sGEj0dY9LrXkSDB2WQnpb_ZZ5Mg`,
      {
        headers: {
          "Accept-Version": "v1",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (!data.urls || !data.urls.regular) {
      throw new Error("Unexpected response structure from Unsplash API")
    }

    return data.urls.regular
  } catch (error) {
    console.error("Error fetching Unsplash image:", error)
    return "/placeholder.svg" // Fallback to a placeholder image
  }
}

export default function ExerciceDetail() {
  const params = useParams()
  const router = useRouter()
  const { ajouterAuCahier, retirerDuCahier, estDansLeCahier } = useCahier()
  const exercice = exercices.find((e) => e.id === params.id)
  const [backgroundImage, setBackgroundImage] = useState("")
  const estSelectionne = exercice ? estDansLeCahier(exercice.id) : false

  useEffect(() => {
    if (exercice) {
      getRandomUnsplashImage(exercice.categorie)
        .then(setBackgroundImage)
        .catch((error) => {
          console.error("Failed to set background image:", error)
          setBackgroundImage("/placeholder.svg")
        })
    }
  }, [exercice])

  if (!exercice) {
    return <div className="p-6 text-center">Exercice non trouvé</div>
  }

  const Icone = exercice.icone

  const toggleSelection = () => {
    if (estSelectionne) {
      retirerDuCahier(exercice.id)
      toast({
        title: "Exercice retiré du cahier",
        description: `${exercice.nom} a été retiré de votre cahier d'exercices.`,
      })
    } else {
      ajouterAuCahier(exercice)
      toast({
        title: "Exercice ajouté au cahier",
        description: `${exercice.nom} a été ajouté à votre cahier d'exercices.`,
      })
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    const shareData = {
      title: exercice.nom,
      text: exercice.description,
      url: window.location.href,
    }

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData)
        toast({
          title: "Exercice partagé",
          description: "L'URL de l'exercice a été partagée avec succès.",
        })
      } else {
        throw new Error("Web Share API not supported")
      }
    } catch (error) {
      console.error("Sharing failed:", error)

      // Fallback to copying to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        toast({
          title: "URL copiée",
          description: "L'URL de l'exercice a été copiée dans le presse-papiers.",
        })
      } catch (clipboardError) {
        console.error("Clipboard write failed:", clipboardError)
        toast({
          title: "Échec du partage",
          description: "Impossible de partager ou de copier l'URL. Veuillez essayer manuellement.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header
        className="bg-gradient-to-r from-primary to-secondary text-white p-16 text-center relative h-[33vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 space-y-4">
          <h1 className="text-5xl font-bold mb-2 tracking-wider text-shadow-neon">{exercice.nom}</h1>
          <p className="text-xl">{exercice.categorie}</p>
          <div className="flex justify-center space-x-4">
            <span className="bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">Niveau: {exercice.niveau}</span>
            <span className="bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">Durée: {exercice.duree} min</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <Link href="/exercices" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au catalogue
          </Link>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Imprimer
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Partager
            </Button>
            <Button variant={estSelectionne ? "default" : "outline"} size="sm" onClick={toggleSelection}>
              {estSelectionne ? <Check className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
              {estSelectionne ? "Dans le cahier" : "Ajouter au cahier"}
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                style={{ backgroundColor: `${exercice.couleur}20` }}
              >
                <Icone className="w-6 h-6" style={{ color: exercice.couleur }} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{exercice.nom}</h2>
                <p className="text-muted-foreground">
                  {exercice.duree} minutes • Niveau {exercice.niveau}
                </p>
              </div>
            </div>
            <p className="text-foreground">{exercice.description}</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Instructions</h3>
            <ol className="list-decimal list-inside space-y-2">
              {exercice.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Conclusion</h3>
            <p className="text-foreground">{exercice.conclusion}</p>
          </CardContent>
        </Card>
      </div>

      <footer className="bg-card border-t mt-12 py-6">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-center md:text-left">
            © 2025 •{" "}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/deed.en"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              CC BY-SA 4.0
            </a>
          </p>
          <Link href="/exercices" className="text-primary hover:underline">
            Index des Exercices
          </Link>
        </div>
      </footer>
    </div>
  )
}

