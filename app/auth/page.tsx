"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { EnhancedLoginForm } from "@/components/auth/enhanced-login-form"
import { EnhancedSignupForm } from "@/components/auth/enhanced-signup-form"
import { useAuth } from "@/lib/auth-context"
import { SlidingLanguageBar } from "@/components/sliding-language-bar"
import { AnimatedBackground } from "@/components/landing/animated-background"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      // Redirect based on user role
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
        default:
          router.push("/student")
      }
    }
  }, [user, router])

  const handleAuthSuccess = () => {
    // Redirect will be handled by the useEffect above
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <SlidingLanguageBar position="top-right" />

      <div className="min-h-screen bg-gradient-to-br from-green-50/80 via-blue-50/80 to-purple-50/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-md relative z-10">
          <div className="relative">
            <div
              className={`transition-all duration-500 ${isLogin ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full absolute inset-0"}`}
            >
              {isLogin && (
                <EnhancedLoginForm onSuccess={handleAuthSuccess} onSwitchToSignup={() => setIsLogin(false)} />
              )}
            </div>
            <div
              className={`transition-all duration-500 ${!isLogin ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full absolute inset-0"}`}
            >
              {!isLogin && (
                <EnhancedSignupForm onSuccess={handleAuthSuccess} onSwitchToLogin={() => setIsLogin(true)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
