"use server"

import { Resend } from "resend"
import { CahierEmail } from "../emails/CahierEmail"

let resend: Resend | null = null

try {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set in the environment variables")
  }
  resend = new Resend(process.env.RESEND_API_KEY)
} catch (error) {
  console.error("Error initializing Resend:", error)
}

export async function envoyerCahierParEmail(email: string, exercices: any[], metriques: any) {
  if (!resend) {
    throw new Error("Resend client is not initialized. Please check your RESEND_API_KEY configuration.")
  }

  try {
    const result = await resend.emails.send({
      from: "Cahier d'exercices <noreply@votredomaine.com>",
      to: email,
      subject: "Votre cahier d'exercices personnalisé",
      react: CahierEmail({ exercices, metriques }),
    })

    if ("error" in result) {
      console.error("Erreur Resend:", result.error)
      throw new Error(`Échec de l'envoi de l'email: ${result.error.message}`)
    }

    return { success: true, message: "Email envoyé avec succès" }
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error)
    throw new Error("Échec de l'envoi de l'email")
  }
}
