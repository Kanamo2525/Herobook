"use client"

import { useState, useEffect } from "react"
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer"
import type { Exercice } from "@/app/data/exercices"
import dynamic from "next/dynamic"

// Dynamically import PDFDownloadLink with ssr option set to false
const PDFDownloadLink = dynamic(() => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink), { ssr: false })

// Enregistrer une police personnalisée
Font.register({
  family: "Inter",
  src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
})

// Styles pour le PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Inter",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  section: {
    marginBottom: 15,
  },
  exerciceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2a2a2a",
  },
  metadata: {
    fontSize: 12,
    marginBottom: 8,
    color: "#666666",
  },
  description: {
    fontSize: 12,
    marginBottom: 10,
    color: "#333333",
    lineHeight: 1.4,
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
    color: "#2a2a2a",
  },
  instruction: {
    fontSize: 12,
    marginBottom: 5,
    color: "#333333",
    paddingLeft: 15,
  },
  conclusion: {
    fontSize: 12,
    marginTop: 10,
    fontStyle: "italic",
    color: "#666666",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    color: "#999999",
    textAlign: "center",
  },
})

// Composant pour le contenu du PDF
const ExercicesPDF = ({ exercices }: { exercices: Exercice[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Mon Cahier d'Exercices</Text>

      {exercices.map((exercice, index) => (
        <View key={exercice.id} style={styles.section}>
          <Text style={styles.exerciceTitle}>{exercice.nom}</Text>
          <Text style={styles.metadata}>
            {`${exercice.categorie} • ${exercice.duree} minutes • Niveau ${exercice.niveau}`}
          </Text>
          <Text style={styles.description}>{exercice.description}</Text>

          <Text style={styles.instructionsTitle}>Instructions :</Text>
          {exercice.instructions.map((instruction, i) => (
            <Text key={i} style={styles.instruction}>
              {`${i + 1}. ${instruction}`}
            </Text>
          ))}

          <Text style={styles.conclusion}>{exercice.conclusion}</Text>
        </View>
      ))}

      <Text style={styles.footer}>
        {`Généré le ${new Date().toLocaleDateString("fr-FR")} • ${exercices.length} exercices`}
      </Text>
    </Page>
  </Document>
)

// Composant wrapper pour le bouton de téléchargement
export const PDFDownloadButton = ({ exercices }: { exercices: Exercice[] }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <PDFDownloadLink
      document={<ExercicesPDF exercices={exercices} />}
      fileName={`cahier-exercices-${new Date().toLocaleDateString("fr-FR")}.pdf`}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
    >
      {({ loading }) => (loading ? "Préparation du PDF..." : "Télécharger le cahier")}
    </PDFDownloadLink>
  )
}

