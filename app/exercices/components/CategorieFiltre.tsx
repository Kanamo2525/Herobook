import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

type CategorieFilterProps = {
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
    <aside className="w-64 border-r bg-card">
      <div className="p-6 border-b">
        <h2 className="font-heading text-lg font-semibold">Catégories</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="p-4">
          {categories.map((categorie) => (
            <Button
              key={categorie}
              variant={categorieSelectionnee === categorie ? "default" : "ghost"}
              className="w-full justify-start text-sm py-2 px-4 mb-1"
              onClick={() => onSelectCategorie(categorie)}
            >
              {categorie}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </aside>
  )
}
