import "./globals.css"
import { Newsreader } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { CahierProvider } from "./contexts/CahierContext"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import type React from "react"
import type { Metadata } from "next"

const fontSans = Newsreader({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: "Playbook Kristy | Le cahier d'exercices",
    template: "%s | Playbook Kristy",
  },
  description: "Un cahier d'exercices disponible pour accompagner le développement personnel selon les besoins",
  metadataBase: new URL("https://playbook.kristy-blog.fr"),
  openGraph: {
    title: "Playbook Kristy | Le cahier d'exercices",
    description: "Un cahier d'exercices disponible pour accompagner le développement personnel selon les besoins",
    url: "https://playbook.kristy-blog.fr",
    siteName: "Playbook Kristy",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // Remplacez par le chemin relatif de votre image
        width: 1200,
        height: 630,
        alt: "Playbook Kristy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Playbook Kristy | Le cahier d'exercices",
    description: "Un cahier d'exercices disponible pour accompagner le développement personnel selon les besoins",
    images: ["/og-image.jpg"], // Remplacez par le chemin relatif de votre image
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CahierProvider>
            {children}
            <Toaster />
          </CahierProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
