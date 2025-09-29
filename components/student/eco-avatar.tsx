"use client"

import { useState, useEffect } from "react"
import { Leaf, Sparkles } from "lucide-react"

interface EcoAvatarProps {
  name: string
  ecoPoints: number
  className?: string
}

export function EcoAvatar({ name, ecoPoints, className = "" }: EcoAvatarProps) {
  const [isBreathing, setIsBreathing] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBreathing((prev) => !prev)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const getAvatarLevel = (points: number) => {
    if (points >= 500) return { level: "Eco Champion", color: "text-yellow-500" }
    if (points >= 300) return { level: "Green Guardian", color: "text-green-500" }
    if (points >= 150) return { level: "Nature Friend", color: "text-blue-500" }
    return { level: "Eco Explorer", color: "text-gray-500" }
  }

  const { level, color } = getAvatarLevel(ecoPoints)

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative">
        <div
          className={`w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center transition-transform duration-1000 ${
            isBreathing ? "scale-105" : "scale-100"
          }`}
        >
          <Leaf className="h-8 w-8 text-primary animate-leaf-float" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
          <Sparkles className="h-3 w-3 text-white" />
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-lg">Hello, {name}!</h3>
        <p className={`text-sm font-medium ${color}`}>{level}</p>
        <p className="text-xs text-muted-foreground">{ecoPoints} Eco-Points</p>
      </div>
    </div>
  )
}
