"use client"
import { useOnboarding } from "@/lib/onboarding-context"
import { useI18n } from "@/lib/i18n-context"
import { EcoAvatar } from "./eco-avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { X, ChevronLeft, ChevronRight, Ship as Skip } from "lucide-react"

export function OnboardingModal() {
  const { isOnboarding, currentStep, steps, nextStep, prevStep, skipOnboarding } = useOnboarding()
  const { t } = useI18n()

  if (!isOnboarding || steps.length === 0) return null

  const step = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
          <button
            onClick={skipOnboarding}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-4">
            <EcoAvatar mood="excited" size="md" animate />
            <div>
              <h2 className="text-2xl font-bold">{step.title}</h2>
              <p className="text-green-100 mt-1">
                {t("onboarding.step")} {currentStep + 1} {t("onboarding.of")} {steps.length}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <Progress value={progress} className="h-2 bg-green-400/30" />
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{step.description}</p>
          </div>

          {/* Interactive Elements */}
          {step.component && <step.component />}

          {/* Demo Content Based on Step */}
          {step.id === "eco-points" && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 animate-bounce">+50</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Eco-Points</div>
                </div>
                <div className="text-2xl">🌱</div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">1,250</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Points</div>
                </div>
              </div>
            </div>
          )}

          {step.id === "achievements" && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              {["🌱", "🌿", "🌳"].map((emoji, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="text-3xl mb-2 animate-bounce" style={{ animationDelay: `${index * 200}ms` }}>
                    {emoji}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {index === 0 ? "Seedling" : index === 1 ? "Sprout" : "Tree"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-800 px-8 py-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t("onboarding.previous")}</span>
          </Button>

          <Button onClick={skipOnboarding} variant="ghost" className="flex items-center space-x-2 text-gray-500">
            <Skip className="w-4 h-4" />
            <span>{t("onboarding.skip")}</span>
          </Button>

          <Button onClick={nextStep} className="flex items-center space-x-2 bg-green-600 hover:bg-green-700">
            <span>{currentStep === steps.length - 1 ? t("onboarding.finish") : t("onboarding.next")}</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
