"use client"

import { useEffect, useRef, useState } from "react"

interface ActivityRing {
  name: string
  value: number
  total: number
}

interface ActivityRingsProps {
  data: ActivityRing[]
  size?: number
}

export function ActivityRings({ data, size = 250 }: ActivityRingsProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoveredRing, setHoveredRing] = useState<string | null>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Animation des anneaux
    const rings = svgRef.current.querySelectorAll(".activity-ring")
    rings.forEach((ring) => {
      const circle = ring.querySelector("circle:nth-child(2)")
      if (circle) {
        const length = circle.getTotalLength()
        circle.style.strokeDasharray = `${length} ${length}`
        circle.style.strokeDashoffset = `${length}`

        // Force a reflow
        circle.getBoundingClientRect()

        // Définir la nouvelle position
        circle.style.transition = "stroke-dashoffset 1s ease-in-out"
        const progress = Number.parseFloat(circle.getAttribute("data-progress") || "0")
        circle.style.strokeDashoffset = `${length * (1 - progress)}`
      }
    })
  }, [svgRef])

  const colors = [
    { bg: "#351c2f", ring: "#ff375f" }, // Rouge
    { bg: "#1c351f", ring: "#30d158" }, // Vert
    { bg: "#1c2835", ring: "#5e5ce6" }, // Bleu
    { bg: "#35271c", ring: "#ffd60a" }, // Jaune
    { bg: "#351c35", ring: "#bf5af2" }, // Violet
  ]

  const strokeWidth = size * 0.1
  const radius = size * 0.5 - strokeWidth
  const center = size * 0.5

  return (
    <svg ref={svgRef} width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
      {data.map((ring, index) => {
        const progress = ring.value / ring.total
        const currentRadius = radius - index * (strokeWidth + 2)

        return (
          <g
            key={ring.name}
            className="activity-ring"
            onMouseEnter={() => setHoveredRing(ring.name)}
            onMouseLeave={() => setHoveredRing(null)}
          >
            {/* Anneau de fond */}
            <circle
              cx={center}
              cy={center}
              r={currentRadius}
              fill="none"
              stroke={colors[index % colors.length].bg}
              strokeWidth={strokeWidth}
            />
            {/* Anneau de progression */}
            <circle
              cx={center}
              cy={center}
              r={currentRadius}
              fill="none"
              stroke={colors[index % colors.length].ring}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              data-progress={progress}
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "center",
              }}
            />
            {/* Texte */}
            <text
              x={size - 10}
              y={center + index * 20}
              className="text-xs fill-current transform rotate-90"
              textAnchor="end"
            >
              {ring.name}: {Math.round(progress * 100)}%
            </text>
            {/* Légende au survol */}
            {hoveredRing === ring.name && (
              <g className="transform rotate-90">
                <rect
                  x={size - 120}
                  y={center + index * 20 - 15}
                  width={110}
                  height={20}
                  fill="rgba(0,0,0,0.7)"
                  rx={4}
                />
                <text x={size - 115} y={center + index * 20} className="text-xs fill-white">
                  {ring.name}: {ring.value} / {ring.total}
                </text>
              </g>
            )}
          </g>
        )
      })}
    </svg>
  )
}

