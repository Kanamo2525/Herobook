interface DeepLTranslationResponse {
  translations: Array<{
    detected_source_language: string
    text: string
  }>
}

export async function translateText(text: string, targetLang: "EN" | "FR" = "EN"): Promise<string> {
  if (!process.env.DEEPL_API_KEY) {
    throw new Error("DEEPL_API_KEY is not configured")
  }

  try {
    const response = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        text: text,
        target_lang: targetLang,
        source_lang: targetLang === "EN" ? "FR" : "EN",
      }),
    })

    if (!response.ok) {
      throw new Error(`DeepL API error: ${response.status}`)
    }

    const data: DeepLTranslationResponse = await response.json()
    return data.translations[0]?.text || text
  } catch (error) {
    console.error("Translation error:", error)
    return text // Fallback to original text
  }
}

export async function translateMultipleTexts(texts: string[], targetLang: "EN" | "FR" = "EN"): Promise<string[]> {
  if (!process.env.DEEPL_API_KEY) {
    throw new Error("DEEPL_API_KEY is not configured")
  }

  try {
    const formData = new URLSearchParams()
    texts.forEach((text) => formData.append("text", text))
    formData.append("target_lang", targetLang)
    formData.append("source_lang", targetLang === "EN" ? "FR" : "EN")

    const response = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`DeepL API error: ${response.status}`)
    }

    const data: DeepLTranslationResponse = await response.json()
    return data.translations.map((t) => t.text)
  } catch (error) {
    console.error("Translation error:", error)
    return texts // Fallback to original texts
  }
}
