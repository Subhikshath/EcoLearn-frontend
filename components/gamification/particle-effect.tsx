"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  size: number
}

interface ParticleEffectProps {
  trigger: boolean
  onComplete?: () => void
  particleCount?: number
  colors?: string[]
}

export function ParticleEffect({
  trigger,
  onComplete,
  particleCount = 20,
  colors = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"],
}: ParticleEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    if (!trigger) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Create particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10 - 2,
      life: 0,
      maxLife: 60 + Math.random() * 40,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 2 + Math.random() * 4,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let activeParticles = 0

      particlesRef.current.forEach((particle) => {
        if (particle.life < particle.maxLife) {
          activeParticles++

          // Update particle
          particle.x += particle.vx
          particle.y += particle.vy
          particle.vy += 0.1 // gravity
          particle.life++

          // Calculate alpha based on life
          const alpha = 1 - particle.life / particle.maxLife

          // Draw particle
          ctx.save()
          ctx.globalAlpha = alpha
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
      })

      if (activeParticles > 0) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        onComplete?.()
      }
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [trigger, particleCount, colors, onComplete])

  if (!trigger) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      style={{ width: "100%", height: "100%" }}
    />
  )
}
