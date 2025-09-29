"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Menu, Home, BookOpen, Trophy, Users, Settings, LogOut, Bell } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useGamification } from "@/lib/gamification-context"
import { useI18n } from "@/lib/i18n-context"
import { LanguageSwitcher } from "@/components/language-switcher"

interface MobileNavigationProps {
  currentTab?: string
  onTabChange?: (tab: string) => void
}

export function MobileNavigation({ currentTab, onTabChange }: MobileNavigationProps) {
  const { user, logout } = useAuth()
  const { userStats } = useGamification()
  const { t } = useI18n()
  const [open, setOpen] = useState(false)

  const navigationItems = [
    { id: "journey", label: t("yourEcoJourney"), icon: Home },
    { id: "challenges", label: t("dailyChallenges"), icon: BookOpen },
    { id: "achievements", label: t("achievements"), icon: Trophy },
    { id: "community", label: "Community", icon: Users },
  ]

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-80 p-0">
          <div className="flex flex-col h-full">
            <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-b">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center text-white font-bold text-lg">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{user?.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{user?.role}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{userStats.totalPoints}</p>
                  <p className="text-xs text-gray-600">{t("ecoPoints")}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{userStats.level}</p>
                  <p className="text-xs text-gray-600">{t("level")}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">#{userStats.rank}</p>
                  <p className="text-xs text-gray-600">{t("rank")}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4">
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = currentTab === item.id

                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start gap-3 h-12 ${
                        isActive ? "bg-gradient-to-r from-green-500 to-blue-500 text-white" : ""
                      }`}
                      onClick={() => {
                        onTabChange?.(item.id)
                        setOpen(false)
                      }}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  )
                })}
              </nav>

              <div className="mt-8 pt-4 border-t space-y-2">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">{t("settings")}</p>
                  <LanguageSwitcher variant="mobile" />
                </div>

                <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                  <Bell className="h-5 w-5" />
                  {t("notifications")}
                  <Badge variant="destructive" className="ml-auto">
                    3
                  </Badge>
                </Button>

                <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                  <Settings className="h-5 w-5" />
                  {t("settings")}
                </Button>
              </div>
            </div>

            <div className="p-4 border-t">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-12 text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                onClick={() => {
                  logout()
                  setOpen(false)
                }}
              >
                <LogOut className="h-5 w-5" />
                {t("logout")}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
