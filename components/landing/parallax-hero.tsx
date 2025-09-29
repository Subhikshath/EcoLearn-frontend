"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

interface ParallaxHeroProps {
  onGetStarted: () => void
  onTakeQuiz: () => void
}

export function ParallaxHero({ onGetStarted, onTakeQuiz }: ParallaxHeroProps) {
  const { t } = useI18n()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background Layers */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-sky-200 via-green-100 to-blue-200"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />

      {/* Animated Clouds */}
      <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
        <div className="absolute top-20 left-10 w-32 h-16 bg-white/40 rounded-full animate-float-slow" />
        <div className="absolute top-32 right-20 w-24 h-12 bg-white/30 rounded-full animate-float-slower" />
        <div className="absolute top-40 left-1/3 w-40 h-20 bg-white/35 rounded-full animate-float" />
      </div>

      {/* Mountain Silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 h-64" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
        <svg viewBox="0 0 1200 300" className="w-full h-full">
          <path
            d="M0,300 L0,200 L200,100 L400,150 L600,80 L800,120 L1000,60 L1200,100 L1200,300 Z"
            fill="rgba(34, 197, 94, 0.3)"
          />
          <path
            d="M0,300 L0,250 L150,180 L350,200 L550,140 L750,160 L950,120 L1200,140 L1200,300 Z"
            fill="rgba(34, 197, 94, 0.5)"
          />
        </svg>
      </div>

      {/* Trees */}
      <div className="absolute bottom-0 left-0 right-0" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0"
            style={{
              left: `${10 + i * 12}%`,
              transform: `scale(${0.8 + Math.random() * 0.4})`,
            }}
          >
            <div className="w-2 h-16 bg-amber-800 mx-auto" />
            <div className="w-12 h-12 bg-green-600 rounded-full -mt-6 animate-sway" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-in fade-in-0 slide-in-from-bottom-8 duration-1000">
          <div className="flex justify-center mb-8">
            <div className="p-6 bg-white/20 backdrop-blur-sm rounded-full animate-pulse-eco">
              <Leaf className="h-20 w-20 text-green-600 animate-leaf-float" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-balance mb-6 bg-gradient-to-r from-green-700 via-blue-600 to-green-800 bg-clip-text text-transparent animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-300">
            {t("welcomeToEcoLearn")}
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 text-pretty max-w-3xl mx-auto mb-12 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-500">
            {t("platformDescription")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-700">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative z-10">{t("getStarted")}</span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={onTakeQuiz}
              className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-green-300 hover:bg-white/90 px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Leaf className="mr-2 h-5 w-5 text-green-600 group-hover:rotate-12 transition-transform duration-300" />
              <span>{t("takeEcoQuiz") || "Take Quick Eco-Quiz"}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-random"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            <Leaf className="h-6 w-6 text-green-500/30" style={{ transform: `rotate(${Math.random() * 360}deg)` }} />
          </div>
        ))}
      </div>
    </div>
  )
}
