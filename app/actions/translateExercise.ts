"use server"

import { translateText, translateMultipleTexts } from "@/lib/deepl"
import type { Exercice } from "@/app/data/exercices"

export async function translateExercise(exercise: Exercice, targetLang: "EN" | "FR"): Promise<Exercice> {
  try {
    const textsToTranslate = [
      exercise.titre,
      exercise.description,
      exercise.objectif,
      ...exercise.instructions,
      ...(exercise.materiel || []),
      ...(exercise.conseils || []),
    ]

    const translatedTexts = await translateMultipleTexts(textsToTranslate, targetLang)

    let index = 0
    const translatedExercise: Exercice = {
      ...exercise,
      titre: translatedTexts[index++],
      description: translatedTexts[index++],
      objectif: translatedTexts[index++],
      instructions: exercise.instructions.map(() => translatedTexts[index++]),
      materiel: exercise.materiel?.map(() => translatedTexts[index++]),
      conseils: exercise.conseils?.map(() => translatedTexts[index++]),
    }

    return translatedExercise
  } catch (error) {
    console.error("Error translating exercise:", error)
    return exercise // Return original if translation fails
  }
}

export async function translateCategory(categoryName: string, targetLang: "EN" | "FR"): Promise<string> {
  try {
    return await translateText(categoryName, targetLang)
  } catch (error) {
    console.error("Error translating category:", error)
    return categoryName
  }
}
