import "./globals.css"
import { Newsreader } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { CahierProvider } from "./contexts/CahierContext"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import type React from "react"
import type { Metadata } from "next"
import { TranslationProvider } from "@/hooks/useTranslation"
import { generateStructuredData, seoKeywords } from "@/lib/seo"

const fontSans = Newsreader({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: "Playbook Kristy | Cahier d'exercices de développement personnel",
    template: "%s | Playbook Kristy",
  },
  description:
    "Créez votre cahier d'exercices personnalisé pour le développement personnel. Plus de 13 exercices pratiques pour la connaissance de soi, la transformation personnelle et la croissance intérieure. Thématiques : Découvrir ses racines, Décoder, Changer d'état d'esprit, Se transformer.",
  keywords: seoKeywords.global,
  authors: [{ name: "Kristy Anamoutou", url: "https://kristy-blog.fr" }],
  creator: "Kristy Anamoutou",
  publisher: "Kristy Anamoutou",
  metadataBase: new URL("https://playbook.kristy-blog.fr"),
  alternates: {
    canonical: "https://playbook.kristy-blog.fr",
    languages: {
      "fr-FR": "https://playbook.kristy-blog.fr",
      "en-US": "https://playbook.kristy-blog.fr?lang=en",
    },
  },
  openGraph: {
    title: "Playbook Kristy | Cahier d'exercices de développement personnel",
    description:
      "Créez votre cahier d'exercices personnalisé pour le développement personnel. 4 thématiques : Découvrir ses racines, Décoder, Changer d'état d'esprit, Se transformer. Plus de 13 exercices pratiques gratuits.",
    url: "https://playbook.kristy-blog.fr",
    siteName: "Playbook Kristy",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Playbook Kristy - Cahier d'exercices de développement personnel avec 4 thématiques",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Playbook Kristy | Cahier d'exercices de développement personnel",
    description:
      "Créez votre cahier d'exercices personnalisé. 4 thématiques de développement personnel : racines, décoder, mindset, transformation. 13+ exercices gratuits.",
    images: ["/opengraph-image"],
    creator: "@kristy_anamoutou",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // À remplacer par votre code de vérification
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = generateStructuredData("website", {})

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <link rel="canonical" href="https://playbook.kristy-blog.fr" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TranslationProvider>
            <CahierProvider>
              {children}
              <Toaster />
            </CahierProvider>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
