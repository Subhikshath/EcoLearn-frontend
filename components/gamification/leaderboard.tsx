"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Crown, Medal, Trophy, TrendingUp, Users, Calendar } from "lucide-react"
import { useGamification } from "@/lib/gamification-context"
import { useI18n } from "@/lib/i18n-context"

export function Leaderboard() {
  const { leaderboard, userStats } = useGamification()
  const { t } = useI18n()
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly" | "all-time">("weekly")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
      case 3:
        return <Medal className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
      default:
        return (
          <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs sm:text-sm font-bold text-gray-500">
            #{rank}
          </span>
        )
    }
  }

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200"
      case 2:
        return "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200"
      case 3:
        return "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200"
      default:
        return "bg-white border-gray-100"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
          <span className="mobile-text">{t("leaderboard")}</span>
        </CardTitle>

        <div className="overflow-x-auto mt-4">
          <div className="flex gap-1 min-w-max">
            {["daily", "weekly", "monthly", "all-time"].map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe(tf as any)}
                className="text-xs whitespace-nowrap touch-friendly"
              >
                {t(tf.replace("-", "_"))}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4">
        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-xs sm:text-sm font-bold text-blue-600">#{userStats.rank}</span>
              </div>
              <div>
                <p className="font-semibold text-blue-800 text-sm sm:text-base">{t("your_position")}</p>
                <p className="text-xs sm:text-sm text-blue-600">
                  {userStats.totalPoints} {t("points")}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="border-blue-300 text-blue-700 text-xs">
              {t("level")} {userStats.level}
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          {leaderboard.map((entry, index) => (
            <div
              key={entry.id}
              className={`p-3 sm:p-4 rounded-lg border transition-all duration-300 hover:shadow-md touch-friendly ${getRankBg(index + 1)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
                    {getRankIcon(index + 1)}
                  </div>

                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="text-lg sm:text-2xl flex-shrink-0">{entry.avatar}</span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm sm:text-base truncate">{entry.name}</h3>
                      <div className="flex items-center gap-2 sm:gap-4 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          <span className="hidden xs:inline">{entry.points}</span>
                          <span className="xs:hidden">{Math.round(entry.points / 100)}k</span>
                        </span>
                        <span className="hidden sm:flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {entry.badges}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {entry.streak}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <Badge variant="outline" className="text-xs flex-shrink-0">
                  L{entry.level}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center py-2 sm:py-4 text-gray-500">
          <p className="text-xs sm:text-sm mobile-text">{t("keep_learning_climb_leaderboard")}</p>
        </div>
      </CardContent>
    </Card>
  )
}
