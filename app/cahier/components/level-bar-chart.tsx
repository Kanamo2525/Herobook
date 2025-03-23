"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface LevelData {
  name: string
  count: number
}

interface LevelBarChartProps {
  data: LevelData[]
}

export const LevelBarChart: React.FC<LevelBarChartProps> = ({ data }) => {
  const maxCount = Math.max(...data.map((d) => d.count))

  return (
    <div className="flex flex-col space-y-8 w-full h-full py-4">
      {data.map((level, index) => {
        const progress = (level.count / maxCount) * 100
        const segments = level.count || 1 // Use at least 1 segment even when count is 0
        const segmentWidth = progress / segments

        return (
          <div key={level.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{level.name}</span>
              <span className="text-muted-foreground">{level.count} exercices</span>
            </div>
            <div className="relative h-1.5 w-full bg-muted/10 rounded-full overflow-hidden">
              {/* Container pour les segments avec espacement */}
              <div className="absolute inset-0 flex gap-1">
                {Array.from({ length: segments }).map((_, i) => (
                  <div key={i} className="h-full flex-1 relative">
                    <div
                      className={cn("absolute inset-0 transition-all duration-500 rounded-full")}
                      style={{
                        opacity: progress > i * (100 / segments) ? 1 : 0.1,
                        backgroundColor: "#bf5af2", // Couleur violette des métriques
                        width: progress > i * (100 / segments) ? "100%" : "0%",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

