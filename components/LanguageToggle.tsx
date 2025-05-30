"use client"

import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"
import { useTranslation } from "@/hooks/useTranslation"

export function LanguageToggle() {
  const { locale, setLocale } = useTranslation()

  const toggleLanguage = () => {
    setLocale(locale === "fr" ? "en" : "fr")
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleLanguage} className="relative">
      <Languages className="h-4 w-4" />
      <span className="absolute -top-1 -right-1 text-xs font-bold bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
        {locale.toUpperCase()}
      </span>
    </Button>
  )
}
