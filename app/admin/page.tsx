"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories, paletteCouleurs, ajouterExercice } from "../data/exercices"
import type { Exercice } from "../data/exercices"
import {
  Lightbulb,
  Compass,
  TreesIcon as Tree,
  Heart,
  Map,
  Mountain,
  Shield,
  Network,
  Book,
  Cloud,
  Puzzle,
  Brain,
  ReplaceIcon as Transform,
  Target,
  Star,
} from "lucide-react"

const icones = {
  Lightbulb,
  Compass,
  Tree,
  Heart,
  Map,
  Mountain,
  Shield,
  Network,
  Book,
  Cloud,
  Puzzle,
  Brain,
  Transform,
  Target,
  Star,
}

export default function AdminPage() {
  const router = useRouter()
  const [nouvelExercice, setNouvelExercice] = useState<Partial<Exercice>>({
    id: "",
    nom: "",
    description: "",
    categorie: "",
    icone: "Lightbulb",
    couleur: paletteCouleurs[0],
    duree: 0,
    niveau: "Débutant",
    instructions: [""],
    conclusion: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNouvelExercice((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNouvelExercice((prev) => ({ ...prev, [name]: value }))
  }

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...nouvelExercice.instructions!]
    newInstructions[index] = value
    setNouvelExercice((prev) => ({ ...prev, instructions: newInstructions }))
  }

  const addInstruction = () => {
    setNouvelExercice((prev) => ({
      ...prev,
      instructions: [...prev.instructions!, ""],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const exerciceComplet = {
      ...nouvelExercice,
      id: Date.now().toString(),
      icone: icones[nouvelExercice.icone as keyof typeof icones],
    } as Exercice
    ajouterExercice(exerciceComplet)
    alert("Exercice ajouté avec succès!")
    router.push("/exercices")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ajouter un nouvel exercice</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="nom" value={nouvelExercice.nom} onChange={handleChange} placeholder="Nom de l'exercice" required />
        <Textarea
          name="description"
          value={nouvelExercice.description}
          onChange={handleChange}
          placeholder="Description de l'exercice"
          required
        />
        <Select onValueChange={(value) => handleSelectChange("categorie", value)} required>
          <SelectTrigger>
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleSelectChange("icone", value)} required>
          <SelectTrigger>
            <SelectValue placeholder="Icône" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(icones).map((iconName) => (
              <SelectItem key={iconName} value={iconName}>
                {iconName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleSelectChange("couleur", value)} required>
          <SelectTrigger>
            <SelectValue placeholder="Couleur" />
          </SelectTrigger>
          <SelectContent>
            {paletteCouleurs.map((couleur) => (
              <SelectItem key={couleur} value={couleur}>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: couleur }}></div>
                  {couleur}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="number"
          name="duree"
          value={nouvelExercice.duree}
          onChange={handleChange}
          placeholder="Durée (en minutes)"
          required
        />
        <Select onValueChange={(value) => handleSelectChange("niveau", value)} required>
          <SelectTrigger>
            <SelectValue placeholder="Niveau" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Débutant">Débutant</SelectItem>
            <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
            <SelectItem value="Avancé">Avancé</SelectItem>
          </SelectContent>
        </Select>
        {nouvelExercice.instructions!.map((instruction, index) => (
          <Input
            key={index}
            value={instruction}
            onChange={(e) => handleInstructionChange(index, e.target.value)}
            placeholder={`Instruction ${index + 1}`}
            required
          />
        ))}
        <Button type="button" onClick={addInstruction}>
          Ajouter une instruction
        </Button>
        <Textarea
          name="conclusion"
          value={nouvelExercice.conclusion}
          onChange={handleChange}
          placeholder="Conclusion de l'exercice"
          required
        />
        <Button type="submit">Ajouter l'exercice</Button>
      </form>
    </div>
  )
}
