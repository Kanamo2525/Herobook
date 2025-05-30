export interface SEOData {
  title: string
  description: string
  keywords: string[]
  canonicalUrl?: string
  ogImage?: string
  structuredData?: any
}

export function generateStructuredData(type: "website" | "article" | "exercise", data: any) {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": type === "website" ? "WebSite" : type === "article" ? "Article" : "CreativeWork",
  }

  switch (type) {
    case "website":
      return {
        ...baseStructuredData,
        "@type": "WebSite",
        name: "Playbook Kristy - Cahier d'exercices de développement personnel",
        description:
          "Un cahier d'exercices personnalisé pour accompagner votre développement personnel selon vos besoins spécifiques",
        url: "https://playbook.kristy-blog.fr",
        author: {
          "@type": "Person",
          name: "Kristy Anamoutou",
          url: "https://kristy-blog.fr",
        },
        publisher: {
          "@type": "Person",
          name: "Kristy Anamoutou",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://playbook.kristy-blog.fr/exercices?search={search_term_string}",
          "query-input": "required name=search_term_string",
        },
        mainEntity: {
          "@type": "Course",
          name: "Cahier d'exercices de développement personnel",
          description: "Plus de 13 exercices pratiques pour la connaissance de soi et la transformation personnelle",
          provider: {
            "@type": "Person",
            name: "Kristy Anamoutou",
          },
          courseMode: "online",
          educationalLevel: "Beginner to Advanced",
          teaches: ["Découvrir ses racines", "Décoder ses émotions", "Changer d'état d'esprit", "Se transformer"],
        },
      }

    case "exercise":
      return {
        ...baseStructuredData,
        "@type": "CreativeWork",
        name: data.nom,
        description: data.description,
        author: {
          "@type": "Person",
          name: "Kristy Anamoutou",
        },
        educationalLevel: data.niveau,
        timeRequired: `PT${data.duree}M`,
        learningResourceType: "Exercise",
        about: data.categorie,
        inLanguage: "fr-FR",
        isPartOf: {
          "@type": "Course",
          name: "Playbook Kristy - Cahier d'exercices",
        },
      }

    default:
      return baseStructuredData
  }
}

export const seoKeywords = {
  global: [
    "développement personnel",
    "exercices de développement personnel",
    "cahier d'exercices",
    "croissance personnelle",
    "bien-être",
    "introspection",
    "connaissance de soi",
    "transformation personnelle",
    "coaching personnel",
    "Kristy Anamoutou",
  ],
  categories: {
    "Découvrir ses racines": [
      "découvrir ses racines",
      "histoire personnelle",
      "patrimoine familial",
      "généalogie émotionnelle",
      "racines familiales",
    ],
    Décoder: ["décoder ses émotions", "analyse comportementale", "compréhension de soi", "psychologie personnelle"],
    "Changer d'état d'esprit": [
      "changer d'état d'esprit",
      "mindset",
      "transformation mentale",
      "pensée positive",
      "développement mental",
    ],
    "Se transformer": [
      "transformation personnelle",
      "changement de vie",
      "évolution personnelle",
      "métamorphose intérieure",
    ],
  },
}
