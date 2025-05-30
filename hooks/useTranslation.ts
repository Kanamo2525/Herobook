"use client"

import { useContext, createContext, useState, useEffect, type ReactNode } from "react"

export type Locale = "fr" | "en"

const translations = {
  fr: {
    // Navigation
    "nav.exercises": "Exercices",
    "nav.notebook": "Mon Cahier",
    "nav.admin": "Administration",

    // Page d'exercices
    "exercises.title": "Catalogue d'exercices",
    "exercises.search": "Rechercher un exercice...",
    "exercises.filter.category": "Catégories",
    "exercises.filter.level": "Filtrer par niveau",

    // Catégories
    "category.all": "Les thématiques",
    "category.decouvrir-ses-racines": "Découvrir ses racines",
    "category.decoder": "Décoder",
    "category.changer-etat-esprit": "Changer d'état d'esprit",
    "category.se-transformer": "Se transformer",

    // Niveaux
    "level.all": "Tous les niveaux",
    "level.beginner": "Débutant",
    "level.intermediate": "Intermédiaire",
    "level.advanced": "Avancé",

    // Messages d'attente
    "waiting.development": "Exercices en cours de développement",
    "waiting.book2.description":
      "Ces exercices seront disponibles à la sortie du Livre 2, actuellement en cours de rédaction.",
    "waiting.book2.date": "Disponible fin 2025",
    "waiting.book2.link": "Découvrir le Livre 2",
    "waiting.preparation": "Exercices en préparation",
    "waiting.book3.description": "Ces exercices seront développés dans le Livre 3.",
    "waiting.book3.date": "Disponible en 2026",
    "waiting.book3.link": "Découvrir le Livre 3",
    "waiting.explore": "En attendant, explorez les autres thématiques disponibles !",
  },
  en: {
    // Navigation
    "nav.exercises": "Exercises",
    "nav.notebook": "My Notebook",
    "nav.admin": "Administration",

    // Exercise page
    "exercises.title": "Exercise Catalog",
    "exercises.search": "Search for an exercise...",
    "exercises.filter.category": "Categories",
    "exercises.filter.level": "Filter by level",

    // Categories
    "category.all": "All Themes",
    "category.decouvrir-ses-racines": "Discovering Your Roots",
    "category.decoder": "Decode",
    "category.changer-etat-esprit": "Change Mindset",
    "category.se-transformer": "Transform Yourself",

    // Levels
    "level.all": "All levels",
    "level.beginner": "Beginner",
    "level.intermediate": "Intermediate",
    "level.advanced": "Advanced",

    // Waiting messages
    "waiting.development": "Exercises in Development",
    "waiting.book2.description":
      "These exercises will be available with the release of Book 2, currently being written.",
    "waiting.book2.date": "Available end of 2025",
    "waiting.book2.link": "Discover Book 2",
    "waiting.preparation": "Exercises in Preparation",
    "waiting.book3.description": "These exercises will be developed in Book 3.",
    "waiting.book3.date": "Available in 2026",
    "waiting.book3.link": "Discover Book 3",
    "waiting.explore": "In the meantime, explore other available themes!",
  },
}

interface TranslationContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLocale = localStorage.getItem("locale") as Locale
    if (savedLocale && ["fr", "en"].includes(savedLocale)) {
      setLocaleState(savedLocale)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    if (mounted) {
      localStorage.setItem("locale", newLocale)
    }
  }

  const t = (key: string): string => {
    if (!mounted) return key

    const keys = key.split(".")
    let value: any = translations[locale]

    for (const k of keys) {
      if (!value || typeof value !== "object") return key
      value = value[k]
    }

    return typeof value === "string" ? value : key
  }

  return <TranslationContext.Provider value={{ locale, setLocale, t }}>{children}</TranslationContext.Provider>
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
