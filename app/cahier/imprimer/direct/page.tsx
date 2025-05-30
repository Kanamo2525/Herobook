"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { notFound } from "next/navigation"

export default function PageImpressionDirecte() {
  const searchParams = useSearchParams()
  const [printData, setPrintData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const encodedData = searchParams.get("data")
      if (!encodedData) {
        notFound()
        return
      }

      // Décoder les données en utilisant decodeURIComponent
      const decodedData = JSON.parse(decodeURIComponent(encodedData))
      setPrintData(decodedData)
      setIsLoading(false)

      // Auto-impression après un court délai
      setTimeout(() => {
        window.print()
      }, 1000)
    } catch (error) {
      console.error("Erreur lors du décodage des données:", error)
      notFound()
    }
  }, [searchParams])

  if (isLoading || !printData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Préparation de l'impression...</p>
        </div>
      </div>
    )
  }

  const currentDate = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <html lang="fr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mon Cahier d'Exercices - {currentDate}</title>
        <style dangerouslySetInnerHTML={{ __html: printStyles }} />
      </head>
      <body>
        <div className="print-container">
          {/* En-tête */}
          <div className="header">
            <h1>Mon Cahier d'Exercices</h1>
            <p className="subtitle">Développement Personnel • Généré le {currentDate}</p>
          </div>

          {/* Métriques */}
          <div className="metrics">
            <h2>📊 Résumé de votre cahier</h2>
            <div className="metrics-grid">
              <div className="metric-item">
                <span className="metric-label">Nombre d'exercices :</span>
                <span className="metric-value">{printData.metriques.totalExercices}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Thématiques :</span>
                <span className="metric-value">{printData.metriques.nombreThematiques}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Durée totale :</span>
                <span className="metric-value">{printData.metriques.dureeTotale} minutes</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Niveaux couverts :</span>
                <span className="metric-value">{printData.metriques.niveauxCouverts.join(", ")}</span>
              </div>
            </div>
          </div>

          {/* Exercices */}
          {printData.exercices.map((exercice: any, index: number) => (
            <div key={exercice.id} className={`exercise ${index > 0 ? "page-break" : ""}`}>
              <div className="exercise-header">
                <h2 className="exercise-title">{exercice.nom}</h2>
                <p className="exercise-meta">
                  {exercice.categorie} • {exercice.duree} minutes • Niveau {exercice.niveau}
                </p>
              </div>

              <div className="exercise-content">
                <div className="exercise-description">{exercice.description}</div>

                <div className="instructions">
                  <h3>📝 Instructions</h3>
                  <ol>
                    {exercice.instructions.map((instruction: string, i: number) => (
                      <li key={i}>{instruction}</li>
                    ))}
                  </ol>
                </div>

                <div className="conclusion">
                  <h3>💡 Conclusion</h3>
                  <p>{exercice.conclusion}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Pied de page */}
          <div className="footer">
            <p>
              © 2025 Kristy Anamoutou • Playbook Kristy • {printData.exercices.length} exercice
              {printData.exercices.length > 1 ? "s" : ""} • Généré le {currentDate}
            </p>
            <p>Ce cahier a été créé avec Playbook Kristy - playbook.kristy-blog.fr</p>
          </div>
        </div>
      </body>
    </html>
  )
}

const printStyles = `
  @page {
    margin: 2cm;
    size: A4;
  }
  
  body {
    font-family: 'Georgia', serif;
    line-height: 1.6;
    color: #333;
    max-width: 100%;
    margin: 0;
    padding: 0;
  }
  
  .print-container {
    max-width: 100%;
  }
  
  .header {
    text-align: center;
    border-bottom: 3px solid #333;
    padding-bottom: 20px;
    margin-bottom: 30px;
  }
  
  .header h1 {
    font-size: 28px;
    margin: 0 0 10px 0;
    color: #2c3e50;
  }
  
  .header .subtitle {
    font-size: 16px;
    color: #7f8c8d;
    margin: 0;
  }
  
  .metrics {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
    border-left: 4px solid #3498db;
  }
  
  .metrics h2 {
    margin-top: 0;
    color: #2c3e50;
    font-size: 18px;
  }
  
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-top: 15px;
  }
  
  .metric-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px dotted #bdc3c7;
  }
  
  .metric-label {
    font-weight: 600;
    color: #34495e;
  }
  
  .metric-value {
    color: #2980b9;
    font-weight: bold;
  }
  
  .exercise {
    page-break-inside: avoid;
    margin-bottom: 40px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .exercise-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    margin: 0;
  }
  
  .exercise-title {
    font-size: 20px;
    margin: 0 0 8px 0;
    font-weight: bold;
  }
  
  .exercise-meta {
    font-size: 14px;
    opacity: 0.9;
    margin: 0;
  }
  
  .exercise-content {
    padding: 25px;
  }
  
  .exercise-description {
    font-size: 16px;
    margin-bottom: 25px;
    color: #2c3e50;
    font-style: italic;
    background: #f8f9fa;
    padding: 15px;
    border-radius: 6px;
    border-left: 4px solid #3498db;
  }
  
  .instructions {
    margin-bottom: 25px;
  }
  
  .instructions h3 {
    color: #2c3e50;
    font-size: 18px;
    margin-bottom: 15px;
    border-bottom: 2px solid #ecf0f1;
    padding-bottom: 8px;
  }
  
  .instructions ol {
    padding-left: 0;
    counter-reset: instruction-counter;
  }
  
  .instructions li {
    list-style: none;
    counter-increment: instruction-counter;
    margin-bottom: 12px;
    padding: 12px 15px;
    background: #fdfdfd;
    border-radius: 6px;
    border-left: 3px solid #3498db;
    position: relative;
  }
  
  .instructions li::before {
    content: counter(instruction-counter);
    position: absolute;
    left: -15px;
    top: 12px;
    background: #3498db;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 12px;
  }
  
  .conclusion {
    background: #e8f5e8;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #27ae60;
    margin-top: 20px;
  }
  
  .conclusion h3 {
    color: #27ae60;
    margin-top: 0;
    font-size: 16px;
  }
  
  .conclusion p {
    margin-bottom: 0;
    color: #2c3e50;
    font-style: italic;
  }
  
  .footer {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 2px solid #ecf0f1;
    text-align: center;
    color: #7f8c8d;
    font-size: 12px;
  }
  
  .page-break {
    page-break-before: always;
  }
  
  @media print {
    body {
      font-size: 12px;
    }
    
    .exercise {
      margin-bottom: 30px;
    }
    
    .exercise-content {
      padding: 20px;
    }
  }
`
