"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, AlertTriangle, TrendingUp, Clock, CheckCircle, X } from "lucide-react"

interface Alert {
  id: string
  type: "warning" | "success" | "info"
  title: string
  message: string
  studentName?: string
  action?: string
  timestamp: string
  dismissed: boolean
}

const initialAlerts: Alert[] = [
  {
    id: "1",
    type: "warning",
    title: "Student Falling Behind",
    message: "Vikram Singh hasn't completed any lessons in the past week",
    studentName: "Vikram Singh",
    action: "Send reminder",
    timestamp: "2 hours ago",
    dismissed: false,
  },
  {
    id: "2",
    type: "success",
    title: "Exceptional Performance",
    message: "Sneha Gupta scored 100% on the latest quiz and completed 3 challenges",
    studentName: "Sneha Gupta",
    action: "Send congratulations",
    timestamp: "4 hours ago",
    dismissed: false,
  },
  {
    id: "3",
    type: "info",
    title: "Challenge Deadline Approaching",
    message: "Water Conservation Challenge ends in 2 days with 18 participants",
    action: "Send reminder to class",
    timestamp: "6 hours ago",
    dismissed: false,
  },
  {
    id: "4",
    type: "warning",
    title: "Low Quiz Scores",
    message: "3 students scored below 60% on the Ecosystem Quiz",
    action: "Schedule review session",
    timestamp: "1 day ago",
    dismissed: false,
  },
]

export function AutomatedAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)
  const [newAlertCount, setNewAlertCount] = useState(0)

  useEffect(() => {
    // Simulate new alerts coming in
    const interval = setInterval(() => {
      const randomAlerts = [
        {
          id: Date.now().toString(),
          type: "info" as const,
          title: "New Student Joined",
          message: "A new student has joined your class and needs onboarding",
          action: "Send welcome message",
          timestamp: "Just now",
          dismissed: false,
        },
        {
          id: (Date.now() + 1).toString(),
          type: "success" as const,
          title: "Challenge Completed",
          message: "Arjun Sharma just completed the Plastic-Free Lunch Challenge",
          studentName: "Arjun Sharma",
          action: "Award points",
          timestamp: "Just now",
          dismissed: false,
        },
      ]

      if (Math.random() > 0.7) {
        // 30% chance of new alert
        const randomAlert = randomAlerts[Math.floor(Math.random() * randomAlerts.length)]
        setAlerts((prev) => [randomAlert, ...prev])
        setNewAlertCount((prev) => prev + 1)
      }
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const dismissAlert = (id: string) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, dismissed: true } : alert)))
    setNewAlertCount((prev) => Math.max(0, prev - 1))
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "success":
        return <TrendingUp className="h-5 w-5 text-green-500" />
      case "info":
        return <Bell className="h-5 w-5 text-blue-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "success":
        return "border-green-200 bg-green-50"
      case "info":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const activeAlerts = alerts.filter((alert) => !alert.dismissed)
  const dismissedAlerts = alerts.filter((alert) => alert.dismissed)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Automated Alerts</h2>
          {newAlertCount > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {newAlertCount} new
            </Badge>
          )}
        </div>
        <Button variant="outline" size="sm">
          <CheckCircle className="h-4 w-4 mr-2" />
          Mark All Read
        </Button>
      </div>

      {/* Active Alerts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Active Alerts</h3>
        {activeAlerts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
              <p className="text-muted-foreground">No active alerts at the moment.</p>
            </CardContent>
          </Card>
        ) : (
          activeAlerts.map((alert) => (
            <Card
              key={alert.id}
              className={`transition-all duration-300 hover:shadow-md animate-grow ${getAlertColor(alert.type)}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{alert.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {alert.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {alert.timestamp}
                        </div>
                        {alert.action && (
                          <Button size="sm" variant="outline" className="text-xs bg-transparent">
                            {alert.action}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => dismissAlert(alert.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Dismissed Alerts */}
      {dismissedAlerts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-muted-foreground">Recently Dismissed</h3>
          {dismissedAlerts.slice(0, 3).map((alert) => (
            <Card key={alert.id} className="opacity-60">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{alert.title}</h4>
                    <p className="text-xs text-muted-foreground">{alert.message}</p>
                  </div>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
