import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

type PaginationProps = {
  pageCourante: number
  totalPages: number
  onChangementPage: (page: number) => void
}

export default function Pagination({ pageCourante, totalPages, onChangementPage }: PaginationProps) {
  return (
    <div className="flex justify-center items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onChangementPage(pageCourante - 1)}
        disabled={pageCourante === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm">
        Page {pageCourante} sur {totalPages}
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onChangementPage(pageCourante + 1)}
        disabled={pageCourante === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

