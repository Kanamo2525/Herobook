"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { envoyerCahierParEmail } from "@/app/actions/envoyerCahierParEmail"

export function EnvoiCahierForm({ exercices, metriques }) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await envoyerCahierParEmail(email, exercices, metriques)
      toast({
        title: "Cahier envoyé",
        description: "Votre cahier d'exercices a été envoyé à votre adresse e-mail.",
      })
      setEmail("")
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du cahier.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto"
    >
      <Input
        type="email"
        placeholder="Votre adresse e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-grow text-sm"
      />
      <Button type="submit" disabled={isLoading} className="text-sm">
        {isLoading ? "Envoi en cours..." : "Envoyer le cahier"}
      </Button>
    </form>
  )
}
