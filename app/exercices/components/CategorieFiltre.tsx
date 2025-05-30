"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface CategorieFilterProps {
  categories: string[]
  categorieSelectionnee: string
  onSelectCategorie: (categorie: string) => void
}

export default function CategorieFiltre({
  categories,
  categorieSelectionnee,
  onSelectCategorie,
}: CategorieFilterProps) {
  return (
    <div className="w-64 border-r bg-card h-full">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">Catégories</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="p-4 space-y-2">
          {categories.map((categorie) => (
            <Button
              key={categorie}
              variant={categorieSelectionnee === categorie ? "default" : "ghost"}
              className={cn(
                "w-full justify-start text-left h-auto py-3 px-4",
                categorieSelectionnee === categorie && "bg-primary text-primary-foreground",
              )}
              onClick={() => onSelectCategorie(categorie)}
            >
              <span className="text-sm leading-relaxed">
                {categorie === "Les thématiques" ? "Les thématiques" : categorie}
              </span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
