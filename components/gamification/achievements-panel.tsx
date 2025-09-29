"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Trophy, Lock, Star, Users, Leaf, Flame } from "lucide-react"
import { useGamification } from "@/lib/gamification-context"
import { useI18n } from "@/lib/i18n-context"

export function AchievementsPanel() {
  const { achievements, userStats } = useGamification()
  const { t } = useI18n()
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all")
  const [category, setCategory] = useState<"all" | "learning" | "social" | "environmental" | "streak">("all")

  const filteredAchievements = achievements.filter((achievement) => {
    const statusMatch =
      filter === "all" ||
      (filter === "unlocked" && achievement.unlocked) ||
      (filter === "locked" && !achievement.unlocked)

    const categoryMatch = category === "all" || achievement.category === category

    return statusMatch && categoryMatch
  })

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "learning":
        return <Star className="w-4 h-4" />
      case "social":
        return <Users className="w-4 h-4" />
      case "environmental":
        return <Leaf className="w-4 h-4" />
      case "streak":
        return <Flame className="w-4 h-4" />
      default:
        return <Trophy className="w-4 h-4" />
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          {t("achievements")}
        </CardTitle>

        <div className="flex flex-wrap gap-2 mt-4">
          <div className="flex gap-1">
            {["all", "unlocked", "locked"].map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f as any)}
                className="text-xs"
              >
                {t(f)}
              </Button>
            ))}
          </div>
          <div className="flex gap-1">
            {["all", "learning", "social", "environmental", "streak"].map((c) => (
              <Button
                key={c}
                variant={category === c ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(c as any)}
                className="text-xs flex items-center gap-1"
              >
                {getCategoryIcon(c)}
                {t(c)}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                achievement.unlocked
                  ? "bg-gradient-to-r from-green-50 to-blue-50 border-green-200 shadow-md"
                  : "bg-gray-50 border-gray-200 opacity-75"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`text-2xl p-2 rounded-full ${achievement.unlocked ? "bg-green-100" : "bg-gray-100"}`}>
                  {achievement.unlocked ? achievement.icon : <Lock className="w-6 h-6 text-gray-400" />}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold ${achievement.unlocked ? "text-green-800" : "text-gray-600"}`}>
                      {achievement.title}
                    </h3>
                    <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                      +{achievement.points} {t("points")}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600">{achievement.description}</p>

                  {!achievement.unlocked && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{t("progress")}</span>
                        <span>
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                    </div>
                  )}

                  {achievement.unlocked && achievement.unlockedAt && (
                    <p className="text-xs text-green-600">
                      {t("unlocked_on")} {achievement.unlockedAt.toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Trophy className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>{t("no_achievements_found")}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
