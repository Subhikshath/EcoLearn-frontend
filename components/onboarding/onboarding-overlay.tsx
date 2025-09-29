"use client"
import { useOnboarding } from "@/lib/onboarding-context"
import { OnboardingModal } from "./onboarding-modal"

export function OnboardingOverlay() {
  const { isOnboarding } = useOnboarding()

  if (!isOnboarding) return null

  return <OnboardingModal />
}
