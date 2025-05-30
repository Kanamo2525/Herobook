"use client"

import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"

export function LanguageToggle() {
  // Version simplifiée sans fonctionnalité de traduction
  return (
    <Button variant="outline" size="icon" className="relative">
      <Languages className="h-4 w-4" />
      <span className="absolute -top-1 -right-1 text-xs font-bold bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
        FR
      </span>
    </Button>
  )
}
