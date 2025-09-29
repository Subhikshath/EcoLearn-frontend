"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, Award, Leaf } from "lucide-react"
import { AnimatedBackground } from "@/components/landing/animated-background"
import { ParallaxHero } from "@/components/landing/parallax-hero"
import { MiniEcoQuiz } from "@/components/landing/mini-eco-quiz"
import { SlidingLanguageBar } from "@/components/sliding-language-bar"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { t } = useI18n()
  const [showQuiz, setShowQuiz] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      // Redirect authenticated users to their dashboard
      switch (user.role) {
        case "admin":
          router.push("/admin")
          break
        case "teacher":
          router.push("/teacher")
          break
        case "student":
          router.push("/student")
          break
      }
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center">
        <div className="animate-pulse-eco p-4 bg-primary/10 rounded-full">
          <Leaf className="h-12 w-12 text-primary animate-leaf-float" />
        </div>
      </div>
    )
  }

  if (user) {
    return null // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <SlidingLanguageBar position="top-right" />

      <ParallaxHero onGetStarted={() => router.push("/auth")} onTakeQuiz={() => setShowQuiz(true)} />

      <div className="relative z-10 container mx-auto px-4 py-16 bg-white/80 backdrop-blur-sm">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="group animate-grow hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-green-100">
            <CardHeader>
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="group-hover:text-blue-600 transition-colors duration-300">
                {t("roleBasedLearning")}
              </CardTitle>
              <CardDescription>{t("roleBasedDescription")}</CardDescription>
            </CardHeader>
          </Card>

          <Card className="group animate-grow hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-green-100">
            <CardHeader>
              <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="group-hover:text-green-600 transition-colors duration-300">
                {t("interactiveLessons")}
              </CardTitle>
              <CardDescription>{t("interactiveLessonsDescription")}</CardDescription>
            </CardHeader>
          </Card>

          <Card className="group animate-grow hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-green-100">
            <CardHeader>
              <div className="p-3 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <CardTitle className="group-hover:text-yellow-600 transition-colors duration-300">
                {t("gamifiedExperience")}
              </CardTitle>
              <CardDescription>{t("gamifiedDescription")}</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-green-50 to-blue-50 border-green-200 shadow-lg">
            <CardContent className="pt-8 pb-8">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-green-100 to-blue-100 rounded-full animate-pulse-eco">
                  <Leaf className="h-12 w-12 text-green-600 animate-leaf-float" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-700 to-blue-700 bg-clip-text text-transparent">
                {t("readyToStart")}
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">{t("joinThousands")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => router.push("/auth")}
                  className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  <span className="relative z-10">{t("signUpNow")}</span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setShowQuiz(true)}
                  className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-green-300 hover:bg-white/90 transition-all duration-300 hover:scale-105"
                >
                  <Leaf className="mr-2 h-5 w-5 text-green-600 group-hover:rotate-12 transition-transform duration-300" />
                  <span>{t("takeEcoQuiz") || "Try Quick Quiz"}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showQuiz && <MiniEcoQuiz />}
    </div>
  )
}
