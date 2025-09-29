"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { ClassProgressHeatmap } from "@/components/teacher/class-progress-heatmap"
import { StudentProgressTracker } from "@/components/teacher/student-progress-tracker"
import { ClassChallengesManager } from "@/components/teacher/class-challenges-manager"
import { AutomatedAlerts } from "@/components/teacher/automated-alerts"
import { OnboardingOverlay } from "@/components/onboarding/onboarding-overlay"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, Settings, Bell, Users, BarChart3, Target, AlertCircle } from "lucide-react"

export default function TeacherDashboard() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== "teacher")) {
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

  if (!user || user.role !== "teacher") {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold">Welcome back, {user.name}</h1>
                <p className="text-sm text-muted-foreground">{user.school}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-semibold text-primary">25 Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Challenges
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <ClassProgressHeatmap />
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <StudentProgressTracker />
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <ClassChallengesManager />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <AutomatedAlerts />
          </TabsContent>
        </Tabs>
      </main>

      <OnboardingOverlay />
    </div>
  )
}
