"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { MobileNavigation } from "@/components/mobile-navigation"
import { EcoAvatar } from "@/components/student/eco-avatar"
import { EcoPointsTicker } from "@/components/student/eco-points-ticker"
import { LearningJourneyMap } from "@/components/student/learning-journey-map"
import { DailyChallenges } from "@/components/student/daily-challenges"
import { ProgressCharts } from "@/components/student/progress-charts"
import { PeerInteraction } from "@/components/student/peer-interaction"
import { AchievementsPanel } from "@/components/gamification/achievements-panel"
import { BadgesShowcase } from "@/components/gamification/badges-showcase"
import { Leaderboard } from "@/components/gamification/leaderboard"
import { LevelProgress } from "@/components/gamification/level-progress"
import { NotificationSystem } from "@/components/gamification/notification-system"
import { OnboardingOverlay } from "@/components/onboarding/onboarding-overlay"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Settings } from "lucide-react"

export default function StudentDashboard() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState("journey")

  useEffect(() => {
    if (!loading && (!user || user.role !== "student")) {
      router.push("/auth")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center">
        <div className="animate-pulse-eco p-4 bg-primary/10 rounded-full">
          <div className="h-12 w-12 bg-primary/20 rounded-full animate-leaf-float"></div>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "student") {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <MobileNavigation currentTab={activeTab} onTabChange={setActiveTab} />
              <div className="hidden sm:block">
                <EcoAvatar name={user.name} ecoPoints={user.ecoPoints || 0} />
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:block">
                <EcoPointsTicker points={user.ecoPoints || 0} />
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="hidden sm:block">
                  <LanguageSwitcher variant="button" size="sm" />
                </div>
                <NotificationSystem />
                <div className="hidden sm:block">
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
                <div className="hidden sm:block">
                  <Button variant="ghost" size="sm" onClick={logout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:hidden mt-4 flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center text-white font-bold">
                {user.name?.charAt(0) || "U"}
              </div>
              <div>
                <h3 className="font-semibold text-sm">{user.name}</h3>
                <p className="text-xs text-gray-600">
                  {user.ecoPoints || 0} {t("ecoPoints")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="mb-4 sm:mb-6">
          <LevelProgress />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-6 min-w-[600px] sm:min-w-0">
              <TabsTrigger value="journey" className="text-xs sm:text-sm">
                Journey
              </TabsTrigger>
              <TabsTrigger value="challenges" className="text-xs sm:text-sm">
                {t("dailyChallenges")}
              </TabsTrigger>
              <TabsTrigger value="progress" className="text-xs sm:text-sm">
                Progress
              </TabsTrigger>
              <TabsTrigger value="achievements" className="text-xs sm:text-sm">
                {t("achievements")}
              </TabsTrigger>
              <TabsTrigger value="badges" className="text-xs sm:text-sm">
                Badges
              </TabsTrigger>
              <TabsTrigger value="community" className="text-xs sm:text-sm">
                Community
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="journey" className="space-y-4 sm:space-y-6">
            <LearningJourneyMap />
          </TabsContent>

          <TabsContent value="challenges" className="space-y-4 sm:space-y-6">
            <DailyChallenges />
          </TabsContent>

          <TabsContent value="progress" className="space-y-4 sm:space-y-6">
            <ProgressCharts />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4 sm:space-y-6">
            <AchievementsPanel />
          </TabsContent>

          <TabsContent value="badges" className="space-y-4 sm:space-y-6">
            <BadgesShowcase />
          </TabsContent>

          <TabsContent value="community" className="space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              <PeerInteraction />
              <Leaderboard />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <OnboardingOverlay />
    </div>
  )
}
