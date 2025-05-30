"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { TooltipProps } from "recharts"

type ChartContextType = {
  config: Record<string, { label: string; color: string }>
}

const ChartContext = createContext<ChartContextType | null>(null)

export function ChartContainer({
  config,
  children,
  className,
}: {
  config: ChartContextType["config"]
  children: ReactNode
  className?: string
}) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div className={className}>{children}</div>
    </ChartContext.Provider>
  )
}

export function ChartTooltip({ active, payload, label }: TooltipProps<number, string>) {
  const context = useContext(ChartContext)

  if (!context) {
    throw new Error("ChartTooltip must be used within a ChartContainer")
  }

  if (!active || !payload) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        {payload.map((item) => (
          <div key={item.name} className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {context.config[item.name as string]?.label}
            </span>
            <span className="font-bold text-muted-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChartTooltipContent({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        {payload.map((item) => (
          <div key={item.name} className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">{item.name}</span>
            <span className="font-bold text-muted-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
