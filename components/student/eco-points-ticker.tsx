"use client"

import { useEffect, useState } from "react"
import { Leaf } from "lucide-react"

interface EcoPointsTickerProps {
  points: number
}

export function EcoPointsTicker({ points }: EcoPointsTickerProps) {
  const [displayPoints, setDisplayPoints] = useState(0)
  const [leaves, setLeaves] = useState<{ id: number; x: number }[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayPoints((prev) => {
        if (prev < points) {
          return Math.min(prev + 1, points)
        }
        return prev
      })
    }, 50)

    return () => clearInterval(interval)
  }, [points])

  useEffect(() => {
    const leafInterval = setInterval(() => {
      setLeaves((prev) => [
        ...prev.slice(-4), // Keep only last 4 leaves
        { id: Date.now(), x: Math.random() * 100 },
      ])
    }, 2000)

    return () => clearInterval(leafInterval)
  }, [])

  useEffect(() => {
    const cleanup = setTimeout(() => {
      setLeaves((prev) => prev.slice(1))
    }, 3000)

    return () => clearTimeout(cleanup)
  }, [leaves])

  return (
    <div className="relative bg-primary/10 rounded-full px-4 py-2 flex items-center gap-2 overflow-hidden">
      <Leaf className="h-5 w-5 text-primary animate-leaf-float" />
      <span className="font-semibold text-primary">{displayPoints} Eco-Points</span>

      {/* Animated leaves */}
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute top-1/2 transform -translate-y-1/2 animate-[slide-right_3s_ease-out_forwards] opacity-30"
          style={{ left: `${leaf.x}%` }}
        >
          <Leaf className="h-3 w-3 text-primary/50 animate-leaf-float" />
        </div>
      ))}
    </div>
  )
}
