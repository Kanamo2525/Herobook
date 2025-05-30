export type Locale = "fr" | "en"

export const defaultLocale: Locale = "fr"
export const locales: Locale[] = ["fr", "en"]

export const translations = {
  fr: {
    // Navigation
    "nav.exercises": "Exercices",
    "nav.notebook": "Mon Cahier",
    "nav.admin": "Administration",

    // Page d'exercices
    "exercises.title": "Catalogue d'exercices",
    "exercises.search": "Rechercher un exercice...",
    "exercises.filter.category": "Filtrer par catégorie",
    "exercises.filter.level": "Filtrer par niveau",
    "exercises.filter.all": "Toutes les catégories",
    "exercises.level.beginner": "Débutant",
    "exercises.level.intermediate": "Intermédiaire",
    "exercises.level.advanced": "Avancé",
    "exercises.duration": "Durée",
    "exercises.minutes": "min",
    "exercises.add.to.notebook": "Ajouter au cahier",
    "exercises.remove.from.notebook": "Retirer du cahier",
    "exercises.no.results": "Aucun exercice ne correspond à vos critères de recherche.",

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
    "waiting.explore":
      "En attendant, explorez les autres thématiques disponibles pour enrichir votre parcours de développement personnel.",

    // Catégories
    "category.decouvrir-ses-racines": "Découvrir ses racines",
    "category.decoder": "Décoder",
    "category.changer-etat-esprit": "Changer d'état d'esprit",
    "category.se-transformer": "Se transformer",
    "category.all": "Les thématiques",

    // Niveaux
    "level.all": "Tout",
    "level.beginner": "Débutant",
    "level.intermediate": "Intermédiaire",
    "level.advanced": "Avancé",

    // Commun
    "common.loading": "Chargement...",
    "common.error": "Une erreur est survenue",
    "common.retry": "Réessayer",
    "common.close": "Fermer",
    "common.save": "Enregistrer",
    "common.cancel": "Annuler",
  },
  en: {
    // Navigation
    "nav.exercises": "Exercises",
    "nav.notebook": "My Notebook",
    "nav.admin": "Administration",

    // Exercise page
    "exercises.title": "Exercise Catalog",
    "exercises.search": "Search for an exercise...",
    "exercises.filter.category": "Filter by category",
    "exercises.filter.level": "Filter by level",
    "exercises.filter.all": "All categories",
    "exercises.level.beginner": "Beginner",
    "exercises.level.intermediate": "Intermediate",
    "exercises.level.advanced": "Advanced",
    "exercises.duration": "Duration",
    "exercises.minutes": "min",
    "exercises.add.to.notebook": "Add to notebook",
    "exercises.remove.from.notebook": "Remove from notebook",
    "exercises.no.results": "No exercises match your search criteria.",

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
    "waiting.explore": "In the meantime, explore other available themes to enrich your personal development journey.",

    // Categories
    "category.decouvrir-ses-racines": "Discovering Your Roots",
    "category.decoder": "Decode",
    "category.changer-etat-esprit": "Change Mindset",
    "category.se-transformer": "Transform Yourself",
    "category.all": "All Themes",

    // Levels
    "level.all": "All",
    "level.beginner": "Beginner",
    "level.intermediate": "Intermediate",
    "level.advanced": "Advanced",

    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.retry": "Retry",
    "common.close": "Close",
    "common.save": "Save",
    "common.cancel": "Cancel",
  },
}

export function getTranslation(locale: Locale, key: string): string {
  if (!key) return ""

  const keys = key.split(".")
  let value: any = translations[locale]

  for (const k of keys) {
    if (!value || !value[k]) return key
    value = value[k]
  }

  return value || key
}
