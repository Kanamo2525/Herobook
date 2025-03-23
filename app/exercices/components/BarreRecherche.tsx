import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type BarreRechercheProps = {
  onSearch: (query: string) => void
}

export default function BarreRecherche({ onSearch }: BarreRechercheProps) {
  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Rechercher des exercices..."
        className="w-full h-10 pl-10 pr-4"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
    </div>
  )
}

