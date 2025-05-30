import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-6 text-center space-y-4">
          <div className="flex justify-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold">Cahier introuvable</h2>
          <p className="text-muted-foreground">
            Ce cahier d'impression n'existe pas ou a expiré. Les liens d'impression sont valables 24 heures.
          </p>
          <Link href="/cahier">
            <Button className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au cahier
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
