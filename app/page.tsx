"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, ArrowRight, Book, Users, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const PreOrderBanner = () => {
  const releaseDate = new Date("2025-06-16T00:00:00")
  const amazonUrl =
    "https://www.amazon.fr/Apprendre-conna%C3%AEtre-R%C3%A9inventer-histoire-transition-ebook/dp/B0F89LSN8S/"
  const isAmazonLinkActive = false

  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = releaseDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full bg-[#ffeb06] text-gray-900 py-6 px-6 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="relative h-32 w-24 md:h-48 md:w-36 shrink-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cover%201605_jj-iJjK6rrOeGaC8xMHwndF8HDPedB2nP.png"
              alt="Couverture du livre Apprendre à se connaître"
              fill
              style={{ objectFit: "cover" }}
              className="rounded"
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-bold text-xl md:text-2xl">APPRENDRE À SE CONNAÎTRE</h3>
            <p className="text-base md:text-lg">Sortie le 16 juin 2025</p>
            <p className="text-sm md:text-base">Disponible en version numérique et papier</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-sm font-medium mb-1">Précommandez maintenant</p>
          <div className="flex gap-2 text-center">
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold">{timeLeft.days}</span>
              <span className="text-sm">jours</span>
            </div>
            <span className="text-xl font-bold">:</span>
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold">{timeLeft.hours}</span>
              <span className="text-sm">heures</span>
            </div>
            <span className="text-xl font-bold">:</span>
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold">{timeLeft.minutes}</span>
              <span className="text-sm">min</span>
            </div>
            <span className="text-xl font-bold">:</span>
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold">{timeLeft.seconds}</span>
              <span className="text-sm">sec</span>
            </div>
          </div>
        </div>

        <div className="relative group">
          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-md flex items-center gap-2 transition-colors text-base md:text-lg"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Précommander sur Amazon</span>
          </a>
          {!isAmazonLinkActive && (
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-48 bg-black/80 text-white text-xs rounded py-1 px-2 hidden group-hover:block">
              Lien de précommande bientôt disponible
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Bannière de précommande */}
      <PreOrderBanner />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Cahier d'exercices personnels</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Un cahier d'exercices disponible pour accompagner le développement personnel selon les besoins
          </p>
          <Link href="/exercices">
            <Button size="lg" className="text-lg px-8 py-4">
              Découvrir les exercices
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Pourquoi utiliser ce cahier d'exercices ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Book className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Exercices variés</h3>
                <p className="text-muted-foreground">
                  Plus de 13 exercices couvrant différents aspects du développement personnel
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Approche personnalisée</h3>
                <p className="text-muted-foreground">
                  Créez votre propre cahier en sélectionnant les exercices qui vous correspondent
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Partage et collaboration</h3>
                <p className="text-muted-foreground">
                  Partagez vos exercices et recevez votre cahier personnalisé par email
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à commencer votre parcours ?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Explorez notre catalogue d'exercices et créez votre cahier personnalisé dès maintenant.
          </p>
          <Link href="/exercices">
            <Button size="lg" className="text-lg px-8 py-4">
              Commencer maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-6">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
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
