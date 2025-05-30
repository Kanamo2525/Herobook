"use server"

import { nanoid } from "nanoid"

// Simuler une base de données temporaire pour les cahiers
// En production, cela devrait être stocké dans une vraie base de données
const cahiersTemporaires = new Map<
  string,
  {
    exerciceIds: string[]
    metriques: any
    dateCreation: Date
  }
>()

// Nettoyer les cahiers expirés (plus de 24h)
function nettoyerCahiersExpires() {
  const maintenant = new Date()
  const unJourEnMs = 24 * 60 * 60 * 1000

  for (const [id, cahier] of cahiersTemporaires.entries()) {
    if (maintenant.getTime() - cahier.dateCreation.getTime() > unJourEnMs) {
      cahiersTemporaires.delete(id)
    }
  }
}

export async function creerCahierImpression(exerciceIds: string[], metriques: any): Promise<string> {
  // Nettoyer les cahiers expirés
  nettoyerCahiersExpires()

  // Générer un ID unique pour le cahier
  const cahierId = nanoid(10)

  // Stocker les données du cahier
  cahiersTemporaires.set(cahierId, {
    exerciceIds,
    metriques,
    dateCreation: new Date(),
  })

  return cahierId
}

export async function getCahierData(cahierId: string) {
  return cahiersTemporaires.get(cahierId) || null
}
