"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Trophy, Star, Zap, Gift } from "lucide-react"
import { useGamification } from "@/lib/gamification-context"
import { useI18n } from "@/lib/i18n-context"

interface Notification {
  id: string
  type: "achievement" | "badge" | "level_up" | "points"
  title: string
  message: string
  icon: React.ReactNode
  timestamp: Date
  read: boolean
}

export function NotificationSystem() {
  const { userStats } = useGamification()
  const { t } = useI18n()
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "achievement",
      title: "Achievement Unlocked!",
      message: "You completed your first environmental quiz!",
      icon: <Trophy className="w-5 h-5 text-yellow-500" />,
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
    },
    {
      id: "2",
      type: "points",
      title: "Points Earned!",
      message: "You earned 50 eco-points for completing a challenge!",
      icon: <Zap className="w-5 h-5 text-green-500" />,
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
    },
    {
      id: "3",
      type: "badge",
      title: "New Badge!",
      message: 'You earned the "Early Bird" badge!',
      icon: <Star className="w-5 h-5 text-purple-500" />,
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: true,
    },
  ])

  const [showNotifications, setShowNotifications] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button variant="ghost" size="sm" onClick={() => setShowNotifications(!showNotifications)} className="relative">
        <Gift className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs animate-pulse"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notifications Panel */}
      {showNotifications && (
        <Card className="absolute right-0 top-12 w-80 max-h-96 overflow-hidden shadow-lg border z-50">
          <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-green-50">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">{t("notifications")}</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                    {t("mark_all_read")}
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setShowNotifications(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <CardContent className="p-0 max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <Gift className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">{t("no_notifications")}</p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors ${
                      !notification.read ? "bg-blue-50/50" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">{notification.icon}</div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`text-sm font-medium ${!notification.read ? "text-blue-800" : "text-gray-800"}`}
                          >
                            {notification.title}
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeNotification(notification.id)
                            }}
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>

                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>

                        <p className="text-xs text-gray-400 mt-1">{getTimeAgo(notification.timestamp)}</p>
                      </div>

                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
