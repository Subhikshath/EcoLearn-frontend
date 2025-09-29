"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./auth-context"

interface OnboardingStep {
  id: string
  title: string
  description: string
  target?: string
  action?: () => void
  component?: React.ComponentType
}

interface OnboardingContextType {
  isOnboarding: boolean
  currentStep: number
  steps: OnboardingStep[]
  startOnboarding: (role: "student" | "teacher" | "admin") => void
  nextStep: () => void
  prevStep: () => void
  skipOnboarding: () => void
  completeOnboarding: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

const studentSteps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome to EcoLearn! 🌱",
    description:
      "Hi there! I'm Eco, your learning companion. Let me show you around this amazing platform where learning about the environment is fun and rewarding!",
  },
  {
    id: "dashboard",
    title: "Your Learning Dashboard",
    description:
      "This is your personal dashboard where you can track your progress, see your eco-points, and discover new challenges!",
  },
  {
    id: "eco-points",
    title: "Earn Eco-Points! 🌟",
    description:
      "Complete lessons, answer quizzes, and participate in challenges to earn eco-points. Watch them grow like a beautiful garden!",
  },
  {
    id: "achievements",
    title: "Unlock Achievements",
    description:
      "Earn badges and achievements as you progress. Each one represents your growing knowledge about our environment!",
  },
  {
    id: "challenges",
    title: "Daily Challenges",
    description: "Take on daily eco-challenges to learn something new every day and compete with your classmates!",
  },
]

const teacherSteps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome, Educator! 🍃",
    description:
      "Hello! I'm Eco, and I'm excited to help you create engaging environmental education experiences for your students.",
  },
  {
    id: "class-management",
    title: "Manage Your Classes",
    description:
      "Monitor student progress, create assignments, and track engagement across all your classes from one central dashboard.",
  },
  {
    id: "analytics",
    title: "Student Analytics",
    description:
      "Get detailed insights into student performance, engagement patterns, and learning outcomes with our comprehensive analytics.",
  },
  {
    id: "challenges",
    title: "Create Challenges",
    description:
      "Design custom challenges and assignments that align with your curriculum and engage students in environmental learning.",
  },
]

const adminSteps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome, Administrator! 🌍",
    description: "Greetings! I'm Eco, your guide to managing the EcoLearn platform across your institution.",
  },
  {
    id: "system-overview",
    title: "System Overview",
    description:
      "Monitor platform health, user engagement, and system performance from your comprehensive admin dashboard.",
  },
  {
    id: "user-management",
    title: "User Management",
    description: "Manage teachers, students, and classes across your institution with powerful user management tools.",
  },
  {
    id: "analytics",
    title: "Institution Analytics",
    description:
      "Track learning outcomes, engagement metrics, and platform usage across your entire educational institution.",
  },
]

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [isOnboarding, setIsOnboarding] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<OnboardingStep[]>([])
  const { user } = useAuth()

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem(`onboarding-completed-${user?.email}`)
    if (user && !hasCompletedOnboarding) {
      startOnboarding(user.role)
    }
  }, [user])

  const startOnboarding = (role: "student" | "teacher" | "admin") => {
    const roleSteps = role === "student" ? studentSteps : role === "teacher" ? teacherSteps : adminSteps
    setSteps(roleSteps)
    setCurrentStep(0)
    setIsOnboarding(true)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeOnboarding()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipOnboarding = () => {
    completeOnboarding()
  }

  const completeOnboarding = () => {
    setIsOnboarding(false)
    setCurrentStep(0)
    if (user?.email) {
      localStorage.setItem(`onboarding-completed-${user.email}`, "true")
    }
  }

  return (
    <OnboardingContext.Provider
      value={{
        isOnboarding,
        currentStep,
        steps,
        startOnboarding,
        nextStep,
        prevStep,
        skipOnboarding,
        completeOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}
