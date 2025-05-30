"use server"

import { Resend } from "resend"

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
  console.log("=== DÉBUT ENVOI EMAIL ===")
  console.log("Email destinataire:", email)
  console.log("RESEND_API_KEY présente:", !!process.env.RESEND_API_KEY)
  console.log("Nombre d'exercices:", exercices.length)

  // Vérifier que les données sont valides
  if (!exercices || exercices.length === 0) {
    throw new Error("Aucun exercice à envoyer")
  }

  if (!metriques) {
    throw new Error("Métriques manquantes")
  }

  if (!resend) {
    const errorMsg = "Resend client is not initialized. Please check your RESEND_API_KEY configuration."
    console.error(errorMsg)
    throw new Error(errorMsg)
  }

  try {
    console.log("Tentative d'envoi avec Resend...")
    console.log("Métriques:", JSON.stringify(metriques))

    // Créer un email simple avec plus de détails de debug
    const emailData = {
      from: "Cahier d'exercices <noreply@playbook.kristy-blog.fr>",
      to: email,
      subject: "Votre cahier d'exercices personnalisé",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Votre Cahier d'Exercices</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2c3e50;">Votre Cahier d'Exercices Personnalisé</h1>
            <p>Bonjour,</p>
            <p>Voici votre cahier d'exercices personnalisé contenant <strong>${exercices.length}</strong> exercice(s).</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #2c3e50; margin-top: 0;">📊 Métriques de votre cahier</h2>
              <ul style="list-style: none; padding: 0;">
                <li style="margin: 10px 0;">📚 Nombre total d'exercices : <strong>${metriques.totalExercices}</strong></li>
                <li style="margin: 10px 0;">🎯 Nombre de thématiques : <strong>${metriques.nombreThematiques}</strong></li>
                <li style="margin: 10px 0;">⏱️ Durée totale : <strong>${metriques.dureeTotale} minutes</strong></li>
                <li style="margin: 10px 0;">📈 Niveaux couverts : <strong>${metriques.niveauxCouverts.join(", ")}</strong></li>
              </ul>
            </div>
            
            <h2 style="color: #2c3e50;">📝 Vos exercices sélectionnés</h2>
            <div style="background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
              ${exercices
                .map(
                  (ex, index) => `
    <div style="border-bottom: ${index < exercices.length - 1 ? "2px solid #e0e0e0" : "none"}; padding: 25px 0; margin-bottom: ${index < exercices.length - 1 ? "25px" : "0"};">
      <h3 style="color: #3498db; margin: 0 0 15px 0; font-size: 22px; font-weight: bold;">${ex.nom}</h3>
      
      <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3498db;">
        <p style="margin: 5px 0; color: #666; font-size: 14px;">
          <strong>📂 Catégorie:</strong> ${ex.categorie} | 
          <strong>⏱️ Durée:</strong> ${ex.duree} min | 
          <strong>📊 Niveau:</strong> ${ex.niveau}
        </p>
        <p style="margin: 10px 0 0 0; font-style: italic; color: #2c3e50; font-size: 15px;">${ex.description}</p>
      </div>

      <div style="background: #ffffff; border: 1px solid #e8e8e8; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
        <h4 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center;">
          📝 Instructions détaillées
        </h4>
        <ol style="margin: 0; padding-left: 0; counter-reset: instruction-counter;">
          ${ex.instructions
            .map(
              (instruction, i) => `
            <li style="list-style: none; counter-increment: instruction-counter; margin-bottom: 15px; padding: 15px; background: #fdfdfd; border-radius: 6px; border-left: 3px solid #27ae60; position: relative; padding-left: 50px;">
              <span style="position: absolute; left: 15px; top: 15px; background: #27ae60; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">${i + 1}</span>
              <span style="color: #2c3e50; line-height: 1.5;">${instruction}</span>
            </li>
          `,
            )
            .join("")}
        </ol>
      </div>

      ${
        ex.conclusion
          ? `
      <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; border-left: 4px solid #27ae60;">
        <h4 style="color: #27ae60; margin: 0 0 10px 0; font-size: 16px; display: flex; align-items: center;">
          💡 Conclusion
        </h4>
        <p style="margin: 0; color: #2c3e50; font-style: italic; line-height: 1.6;">${ex.conclusion}</p>
      </div>
      `
          : ""
      }
    </div>
  `,
                )
                .join("")}
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: #e8f5e8; border-radius: 8px;">
              <p style="margin: 0; text-align: center;">
                Merci d'utiliser <strong>Playbook Kristy</strong> pour votre développement personnel !<br>
                <a href="https://playbook.kristy-blog.fr" style="color: #3498db;">playbook.kristy-blog.fr</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    console.log("Données email à envoyer:", JSON.stringify(emailData, null, 2))

    const result = await resend.emails.send(emailData)

    console.log("Résultat Resend complet:", JSON.stringify(result, null, 2))

    // Vérifier le résultat plus précisément
    if (!result) {
      throw new Error("Aucune réponse de Resend")
    }

    if ("error" in result && result.error) {
      console.error("Erreur Resend détaillée:", JSON.stringify(result.error, null, 2))
      throw new Error(`Erreur Resend: ${result.error.message || JSON.stringify(result.error)}`)
    }

    if (!result.data || !result.data.id) {
      console.error("Réponse Resend inattendue:", result)
      throw new Error("Réponse inattendue de Resend - pas d'ID d'email retourné")
    }

    console.log("=== EMAIL ENVOYÉ AVEC SUCCÈS ===")
    console.log("ID de l'email:", result.data.id)

    return {
      success: true,
      message: "Email envoyé avec succès",
      id: result.data.id,
      details: `Email envoyé à ${email} avec l'ID ${result.data.id}`,
    }
  } catch (error) {
    console.error("=== ERREUR LORS DE L'ENVOI ===")
    console.error("Type d'erreur:", typeof error)
    console.error("Erreur complète:", error)
    console.error("Message d'erreur:", error instanceof Error ? error.message : "Pas de message")
    console.error("Stack trace:", error instanceof Error ? error.stack : "Pas de stack")
    console.error("Propriétés de l'erreur:", Object.getOwnPropertyNames(error))

    // Essayer de sérialiser l'erreur complètement
    try {
      console.error("Erreur sérialisée:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2))
    } catch (serializeError) {
      console.error("Impossible de sérialiser l'erreur:", serializeError)
    }

    // Retourner une erreur plus descriptive
    const errorMessage = error instanceof Error ? error.message : `Erreur de type ${typeof error}: ${String(error)}`
    throw new Error(`Échec de l'envoi de l'email: ${errorMessage}`)
  }
}
