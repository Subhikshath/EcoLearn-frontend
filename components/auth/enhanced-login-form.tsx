"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FloatingInput } from "@/components/ui/floating-input"
import { SocialLoginButtons } from "@/components/auth/social-login-buttons"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-context"
import { Leaf, Eye, EyeOff, AlertCircle } from "lucide-react"

interface EnhancedLoginFormProps {
  onSuccess: () => void
  onSwitchToSignup: () => void
}

export function EnhancedLoginForm({ onSuccess, onSwitchToSignup }: EnhancedLoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isShaking, setIsShaking] = useState(false)
  const { login, loading } = useAuth()
  const { t } = useI18n()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return "Email is required"
    if (!emailRegex.test(email)) return "Please enter a valid email"
    return ""
  }

  const validatePassword = (password: string) => {
    if (!password) return "Password is required"
    return ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setEmailError("")
    setPasswordError("")

    const emailValidation = validateEmail(email)
    const passwordValidation = validatePassword(password)

    if (emailValidation || passwordValidation) {
      setEmailError(emailValidation)
      setPasswordError(passwordValidation)
      triggerShake()
      return
    }

    try {
      const success = await login(email, password)
      if (success) {
        onSuccess()
      } else {
        setError("Invalid credentials")
        triggerShake()
      }
    } catch (err) {
      setError("Login failed. Please try again.")
      triggerShake()
    }
  }

  const triggerShake = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 500)
  }

  const handleSocialLogin = (provider: string) => {
    // Placeholder for social login implementation
    console.log(`${provider} login clicked`)
  }

  return (
    <Card
      className={`w-full max-w-md mx-auto animate-in fade-in-0 zoom-in-95 duration-500 ${isShaking ? "animate-shake" : ""}`}
    >
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-br from-green-100 to-blue-100 rounded-full animate-pulse-eco">
            <Leaf className="h-10 w-10 text-green-600 animate-leaf-float" />
          </div>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold text-balance bg-gradient-to-r from-green-700 to-blue-700 bg-clip-text text-transparent">
            {t("welcomeBack")}
          </CardTitle>
          <CardDescription className="text-base">{t("signInToContinue")}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <FloatingInput
            label={t("email")}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            disabled={loading}
            className="h-14"
          />

          <div className="relative">
            <FloatingInput
              label={t("password")}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              disabled={loading}
              className="h-14 pr-12"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg animate-in slide-in-from-top-2 duration-300">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg group relative overflow-hidden"
            disabled={loading}
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10">{loading ? "Signing in..." : t("signIn")}</span>
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={onSwitchToSignup}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline"
            >
              {t("dontHaveAccount")}
            </Button>
          </div>
        </form>

        <SocialLoginButtons
          onGoogleLogin={() => handleSocialLogin("Google")}
          onFacebookLogin={() => handleSocialLogin("Facebook")}
          disabled={loading}
        />

        <div className="text-xs text-center text-muted-foreground bg-gray-50 p-3 rounded-lg">
          <p className="font-medium mb-1">Demo accounts:</p>
          <p>admin@eco.com | teacher@eco.com | student@eco.com</p>
          <p>Password: any</p>
        </div>
      </CardContent>
    </Card>
  )
}
