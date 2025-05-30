"use client"

import type React from "react"

import { useParams, useRouter } from "next/navigation"
import { exercices } from "../../data/exercices"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Plus, Check, Printer, Share2, Download, ZoomIn, ZoomOut, RotateCcw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCahier } from "../../contexts/CahierContext"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"
import { useState } from "react"

const ImageZoomModal = ({
  src,
  alt,
  isOpen,
  onClose,
}: {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}) => {
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.2, 5))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.2, 0.5))
  }

  const handleReset = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      handleZoomIn()
    } else {
      handleZoomOut()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-white rounded-lg overflow-hidden">
          {/* Header avec contrôles */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-b p-4 flex items-center justify-between">
            <h3 className="font-semibold text-lg">{alt}</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[60px] text-center">{Math.round(zoom * 100)}%</span>
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Zone d'image */}
          <div
            className="w-full h-full pt-16 overflow-hidden cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                transition: isDragging ? "none" : "transform 0.2s ease-out",
              }}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={alt}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain select-none"
                draggable={false}
              />
            </div>
          </div>

          {/* Instructions en bas */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t p-2">
            <p className="text-xs text-center text-muted-foreground">
              Utilisez la molette de la souris pour zoomer • Glissez pour déplacer l'image zoomée
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ExerciceDetailClient() {
  const params = useParams()
  const router = useRouter()
  const { ajouterAuCahier, retirerDuCahier, estDansLeCahier } = useCahier()
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const exercice = exercices.find((e) => e.id === params.id)
  const estSelectionne = exercice ? estDansLeCahier(exercice.id) : false

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

  const handlePdfDownload = () => {
    if (exercice.pdfUrl) {
      window.open(exercice.pdfUrl, "_blank")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header
        className="text-white pt-16 pb-8 md:p-16 text-center relative h-[25vh] md:h-[33vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundColor: exercice.couleur,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 space-y-2 md:space-y-4 px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-1 md:mb-2 tracking-wider text-shadow-neon">
            {exercice.nom}
          </h1>
          <p className="text-lg md:text-xl">{exercice.categorie}</p>
          <div className="flex justify-center space-x-2 md:space-x-4 flex-wrap">
            <span className="bg-black bg-opacity-50 px-2 py-1 rounded-full text-xs md:text-sm">
              Niveau: {exercice.niveau}
            </span>
            <span className="bg-black bg-opacity-50 px-2 py-1 rounded-full text-xs md:text-sm">
              Durée: {exercice.duree} min
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <Link href="/exercices" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au catalogue
          </Link>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint} className="text-xs">
              <Printer className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Imprimer</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare} className="text-xs">
              <Share2 className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Partager</span>
            </Button>
            {exercice.pdfUrl && (
              <Button variant="outline" size="sm" onClick={handlePdfDownload} className="text-xs">
                <Download className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Télécharger PDF</span>
                <span className="sm:hidden">PDF</span>
              </Button>
            )}
            <Button
              variant={estSelectionne ? "default" : "outline"}
              size="sm"
              onClick={toggleSelection}
              className="text-xs"
            >
              {estSelectionne ? (
                <Check className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
              ) : (
                <Plus className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
              )}
              {estSelectionne ? (
                <span className="hidden sm:inline">Dans le cahier</span>
              ) : (
                <span className="hidden sm:inline">Ajouter au cahier</span>
              )}
              <span className="sm:hidden">{estSelectionne ? "Ajouté" : "Ajouter"}</span>
            </Button>
          </div>
        </div>

        <Card className="mb-4 md:mb-6">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center mb-4">
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-3 md:mr-4"
                style={{ backgroundColor: `${exercice.couleur}20` }}
              >
                <Icone className="w-5 h-5 md:w-6 md:h-6" style={{ color: exercice.couleur }} />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-semibold">{exercice.nom}</h2>
                <p className="text-sm text-muted-foreground">
                  {exercice.duree} minutes • Niveau {exercice.niveau}
                </p>
              </div>
            </div>
            <p className="text-sm md:text-base text-foreground">{exercice.description}</p>
          </CardContent>
        </Card>

        {/* Section Image et PDF */}
        {exercice.image && (
          <Card className="mb-4 md:mb-6">
            <CardContent className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Outil de travail</h3>
              <div className="space-y-4">
                <div className="relative">
                  <div className="relative cursor-pointer group" onClick={() => setIsImageModalOpen(true)}>
                    <Image
                      src={exercice.image || "/placeholder.svg?height=400&width=600&text=Outil+de+travail"}
                      alt={`Diagramme pour ${exercice.nom}`}
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg border shadow-sm group-hover:shadow-md transition-shadow"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
                {exercice.pdfUrl && (
                  <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                    <p className="text-sm text-muted-foreground flex-grow">
                      Cliquez sur l'image pour l'agrandir ou téléchargez le PDF pour imprimer l'outil de travail.
                    </p>
                    <Button onClick={handlePdfDownload} className="text-sm">
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger le PDF
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-4 md:mb-6">
          <CardContent className="p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
              {exercice.instructions.map((instruction, index) => (
                <li key={index} className="pl-2">
                  {instruction}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Conclusion</h3>
            <p className="text-sm md:text-base text-foreground">{exercice.conclusion}</p>
          </CardContent>
        </Card>
      </div>

      {/* Modale de zoom d'image */}
      <ImageZoomModal
        src={exercice.image || "/placeholder.svg?height=400&width=600&text=Outil+de+travail"}
        alt={`Diagramme pour ${exercice.nom}`}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      />

      <footer className="bg-card border-t mt-8 md:mt-12 py-4 md:py-6">
        <div className="max-w-4xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="text-muted-foreground text-center md:text-left text-xs md:text-sm">
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
              className="text-primary hover:underline text-xs md:text-sm"
            >
              Accès au blog
            </a>
            <Link href="/exercices" className="text-primary hover:underline text-xs md:text-sm">
              Index des Exercices
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
