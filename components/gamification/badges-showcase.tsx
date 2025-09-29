"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Star } from "lucide-react"
import { useGamification } from "@/lib/gamification-context"
import { useI18n } from "@/lib/i18n-context"

export function BadgesShowcase() {
  const { badges } = useGamification()
  const { t } = useI18n()

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case "rare":
        return "shadow-blue-200"
      case "epic":
        return "shadow-purple-200"
      case "legendary":
        return "shadow-yellow-200"
      default:
        return ""
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-500" />
          {t("badges_collection")}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`relative p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 touch-friendly ${
                badge.earned
                  ? `${getRarityColor(badge.rarity)} shadow-lg ${getRarityGlow(badge.rarity)}`
                  : "bg-gray-50 border-gray-200 opacity-50"
              }`}
            >
              {badge.earned && badge.rarity !== "common" && (
                <div className="absolute -top-2 -right-2">
                  <div
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center ${
                      badge.rarity === "legendary"
                        ? "bg-yellow-400"
                        : badge.rarity === "epic"
                          ? "bg-purple-400"
                          : "bg-blue-400"
                    }`}
                  >
                    <Star className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                  </div>
                </div>
              )}

              <div className="text-center space-y-2">
                <div
                  className={`text-2xl sm:text-3xl mx-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                    badge.earned ? "bg-white/50" : "bg-gray-100"
                  }`}
                >
                  {badge.earned ? badge.icon : "🔒"}
                </div>

                <h3
                  className={`font-semibold text-xs sm:text-sm mobile-text ${
                    badge.earned ? "text-current" : "text-gray-500"
                  }`}
                >
                  {badge.name}
                </h3>

                <p className="text-xs opacity-75 line-clamp-2">{badge.description}</p>

                <Badge variant="outline" className={`text-xs ${badge.earned ? "border-current" : "border-gray-300"}`}>
                  {t(badge.rarity)}
                </Badge>

                {badge.earned && badge.earnedAt && (
                  <p className="text-xs opacity-60 hidden sm:block">{badge.earnedAt.toLocaleDateString()}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
