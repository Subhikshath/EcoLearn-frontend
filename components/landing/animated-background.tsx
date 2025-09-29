"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animated elements
    const elements = [
      // Floating leaves
      ...Array.from({ length: 8 }, (_, i) => ({
        type: "leaf",
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 0.5 + 0.2,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.3 + 0.1,
      })),
      // Flying birds
      ...Array.from({ length: 3 }, (_, i) => ({
        type: "bird",
        x: -50,
        y: Math.random() * canvas.height * 0.3 + 50,
        speed: Math.random() * 0.8 + 0.5,
        wingPhase: Math.random() * Math.PI * 2,
        opacity: 0.4,
      })),
      // Flowing water particles
      ...Array.from({ length: 15 }, (_, i) => ({
        type: "water",
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      })),
    ]

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      elements.forEach((element, index) => {
        ctx.save()
        ctx.globalAlpha = element.opacity

        if (element.type === "leaf") {
          // Animate floating leaves
          element.x += Math.sin(element.angle) * element.speed
          element.y += Math.cos(element.angle) * element.speed * 0.5
          element.angle += element.rotationSpeed

          // Wrap around screen
          if (element.x > canvas.width + 50) element.x = -50
          if (element.y > canvas.height + 50) element.y = -50

          // Draw leaf
          ctx.fillStyle = `hsl(120, 60%, ${40 + Math.sin(element.angle) * 10}%)`
          ctx.translate(element.x, element.y)
          ctx.rotate(element.angle)
          ctx.beginPath()
          ctx.ellipse(0, 0, element.size, element.size * 0.6, 0, 0, Math.PI * 2)
          ctx.fill()
        } else if (element.type === "bird") {
          // Animate flying birds
          element.x += element.speed
          element.wingPhase += 0.2

          // Reset bird position when it flies off screen
          if (element.x > canvas.width + 100) {
            element.x = -50
            element.y = Math.random() * canvas.height * 0.3 + 50
          }

          // Draw simple bird shape
          ctx.fillStyle = `rgba(100, 100, 100, ${element.opacity})`
          const wingOffset = Math.sin(element.wingPhase) * 5
          ctx.beginPath()
          ctx.ellipse(element.x, element.y, 8, 3, 0, 0, Math.PI * 2)
          ctx.fill()
          // Wings
          ctx.beginPath()
          ctx.ellipse(element.x - 5, element.y + wingOffset, 6, 2, -0.3, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.ellipse(element.x + 5, element.y - wingOffset, 6, 2, 0.3, 0, Math.PI * 2)
          ctx.fill()
        } else if (element.type === "water") {
          // Animate water particles
          element.y -= element.speed
          element.x += Math.sin(element.y * 0.01) * 0.5

          // Reset particle when it reaches top
          if (element.y < -10) {
            element.y = canvas.height + 10
            element.x = Math.random() * canvas.width
          }

          // Draw water droplet
          ctx.fillStyle = `rgba(100, 150, 255, ${element.opacity})`
          ctx.beginPath()
          ctx.arc(element.x, element.y, element.size, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
  )
}
