"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FloatingInput } from "@/components/ui/floating-input"
import { SocialLoginButtons } from "@/components/auth/social-login-buttons"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-context"
import { Leaf, Eye, EyeOff, AlertCircle } from "lucide-react"

interface EnhancedSignupFormProps {
  onSuccess: () => void
  onSwitchToLogin: () => void
}

export function EnhancedSignupForm({ onSuccess, onSwitchToLogin }: EnhancedSignupFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "" as UserRole | "",
    school: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [error, setError] = useState("")
  const [isShaking, setIsShaking] = useState(false)
  const { signup, loading } = useAuth()
  const { t } = useI18n()

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "name":
        return !value ? "Full name is required" : value.length < 2 ? "Name must be at least 2 characters" : ""
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return !value ? "Email is required" : !emailRegex.test(value) ? "Please enter a valid email" : ""
      case "password":
        return !value ? "Password is required" : value.length < 6 ? "Password must be at least 6 characters" : ""
      case "confirmPassword":
        return !value ? "Please confirm your password" : value !== formData.password ? "Passwords do not match" : ""
      case "role":
        return !value ? "Please select a role" : ""
      case "school":
        return (formData.role === "student" || formData.role === "teacher") && !value ? "School name is required" : ""
      default:
        return ""
    }
  }

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }

    // Validate confirm password when password changes
    if (field === "password" && formData.confirmPassword) {
      const confirmError = validateField("confirmPassword", formData.confirmPassword)
      setErrors((prev) => ({ ...prev, confirmPassword: confirmError }))
    }
  }

  const handleBlur = (field: string, value: string) => {
    const error = validateField(field, value)
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate all fields
    const newErrors: Record<string, string> = {}
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field as keyof typeof formData])
      if (error) newErrors[field] = error
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      triggerShake()
      return
    }

    try {
      const success = await signup(
        formData.name,
        formData.email,
        formData.password,
        formData.role as UserRole,
        formData.school || undefined,
      )
      if (success) {
        onSuccess()
      } else {
        setError("Signup failed. Please try again.")
        triggerShake()
      }
    } catch (err) {
      setError("Signup failed. Please try again.")
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

  const getFieldSuccess = (field: string) => {
    const value = formData[field as keyof typeof formData]
    return value && !errors[field] && !validateField(field, value)
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
            {t("joinEcoLearn")}
          </CardTitle>
          <CardDescription className="text-base">{t("startJourney")}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <FloatingInput
            label={t("fullName")}
            type="text"
            value={formData.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            onBlur={(e) => handleBlur("name", e.target.value)}
            error={errors.name}
            success={getFieldSuccess("name")}
            disabled={loading}
            className="h-14"
          />

          <FloatingInput
            label={t("email")}
            type="email"
            value={formData.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            onBlur={(e) => handleBlur("email", e.target.value)}
            error={errors.email}
            success={getFieldSuccess("email")}
            disabled={loading}
            className="h-14"
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">{t("role")}</label>
            <Select value={formData.role} onValueChange={(value) => handleFieldChange("role", value)}>
              <SelectTrigger
                className={`h-14 transition-all duration-200 ${errors.role ? "border-red-500" : getFieldSuccess("role") ? "border-green-500" : ""}`}
              >
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">{t("student")}</SelectItem>
                <SelectItem value="teacher">{t("teacher")}</SelectItem>
                <SelectItem value="admin">{t("admin")}</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <div className="text-xs text-red-500 animate-in slide-in-from-top-1 duration-200">{errors.role}</div>
            )}
          </div>

          {(formData.role === "student" || formData.role === "teacher") && (
            <FloatingInput
              label={t("school")}
              type="text"
              value={formData.school}
              onChange={(e) => handleFieldChange("school", e.target.value)}
              onBlur={(e) => handleBlur("school", e.target.value)}
              error={errors.school}
              success={getFieldSuccess("school")}
              disabled={loading}
              className="h-14 animate-in slide-in-from-top-2 duration-300"
            />
          )}

          <div className="relative">
            <FloatingInput
              label={t("password")}
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleFieldChange("password", e.target.value)}
              onBlur={(e) => handleBlur("password", e.target.value)}
              error={errors.password}
              success={getFieldSuccess("password")}
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

          <div className="relative">
            <FloatingInput
              label={t("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => handleFieldChange("confirmPassword", e.target.value)}
              onBlur={(e) => handleBlur("confirmPassword", e.target.value)}
              error={errors.confirmPassword}
              success={getFieldSuccess("confirmPassword")}
              disabled={loading}
              className="h-14 pr-12"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
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
            <span className="relative z-10">{loading ? "Creating Account..." : t("signUp")}</span>
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={onSwitchToLogin}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline"
            >
              {t("alreadyHaveAccount")}
            </Button>
          </div>
        </form>

        <SocialLoginButtons
          onGoogleLogin={() => handleSocialLogin("Google")}
          onFacebookLogin={() => handleSocialLogin("Facebook")}
          disabled={loading}
        />
      </CardContent>
    </Card>
  )
}
