"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Star, Zap, Target } from "lucide-react"
import { useGamification } from "@/lib/gamification-context"
import { useI18n } from "@/lib/i18n-context"
import { AnimatedCounter } from "./animated-counter"
import { ParticleEffect } from "./particle-effect"
import { useState, useEffect } from "react"

export function LevelProgress() {
  const { userStats } = useGamification()
  const { t } = useI18n()
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [prevLevel, setPrevLevel] = useState(userStats.level)

  const progressPercentage =
    (userStats.currentLevelProgress / (userStats.currentLevelProgress + userStats.nextLevelPoints)) * 100

  useEffect(() => {
    if (userStats.level > prevLevel) {
      setShowLevelUp(true)
      setPrevLevel(userStats.level)
    }
  }, [userStats.level, prevLevel])

  return (
    <Card className="w-full bg-gradient-to-r from-blue-50 to-green-50 border-blue-200 gamification-card relative overflow-hidden">
      <ParticleEffect trigger={showLevelUp} onComplete={() => setShowLevelUp(false)} particleCount={30} />

      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center shadow-lg transition-all duration-300 ${showLevelUp ? "animate-level-up" : ""}`}
                >
                  <Star
                    className={`w-8 h-8 text-white ${userStats.streak > 5 ? "animate-streak-fire" : "animate-pulse"}`}
                  />
                </div>
                <Badge className="absolute -bottom-1 -right-1 bg-yellow-500 text-yellow-900 border-yellow-300 animate-bounce-in">
                  {userStats.level}
                </Badge>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {t("level")} {userStats.level}
                </h3>
                <p className="text-sm text-gray-600">
                  <AnimatedCounter
                    value={userStats.totalPoints}
                    suffix={` ${t("total_points")}`}
                    className="font-medium"
                  />
                </p>
              </div>
            </div>

            <div className="text-right">
              <div
                className={`flex items-center gap-1 text-green-600 mb-1 ${userStats.streak > 7 ? "animate-streak-fire" : ""}`}
              >
                <Zap className="w-4 h-4" />
                <AnimatedCounter value={userStats.streak} className="font-semibold" />
                <span className="text-sm">{t("day_streak")}</span>
              </div>
              <div className="flex items-center gap-1 text-blue-600 animate-leaderboard-climb">
                <Target className="w-4 h-4" />
                <span className="text-sm">
                  #{userStats.rank} {t("rank")}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t("progress_to_next_level")}</span>
              <span className="font-semibold text-gray-800">
                <AnimatedCounter value={userStats.currentLevelProgress} /> /{" "}
                {userStats.currentLevelProgress + userStats.nextLevelPoints}
              </span>
            </div>

            <div className="relative">
              <Progress
                value={progressPercentage}
                className="h-3 bg-gray-200 animate-progress-fill"
                style={{ "--progress-width": `${progressPercentage}%` } as React.CSSProperties}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-badge-shimmer rounded-full"></div>
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>
                {t("level")} {userStats.level}
              </span>
              <span className="text-blue-600 font-medium animate-bounce">
                <AnimatedCounter value={userStats.nextLevelPoints} suffix={` ${t("points_to_next_level")}`} />
              </span>
              <span>
                {t("level")} {userStats.level + 1}
              </span>
            </div>
          </div>

          <div className="bg-white/50 rounded-lg p-3 border border-white/20 animate-mobile-fade-in">
            <p className="text-xs text-gray-600 mb-1">{t("next_level_unlocks")}:</p>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs badge-item">
                {t("new_avatar_options")}
              </Badge>
              <Badge variant="outline" className="text-xs badge-item">
                {t("exclusive_challenges")}
              </Badge>
              <Badge variant="outline" className="text-xs badge-item">
                {t("bonus_points")}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
