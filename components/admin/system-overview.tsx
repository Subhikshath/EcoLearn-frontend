"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Users, School, Award, BookOpen, Target, Activity } from "lucide-react"

interface SystemMetric {
  title: string
  value: string | number
  change: number
  trend: "up" | "down" | "stable"
  icon: React.ReactNode
  color: string
}

const systemMetrics: SystemMetric[] = [
  {
    title: "Total Users",
    value: 1247,
    change: 12.5,
    trend: "up",
    icon: <Users className="h-6 w-6" />,
    color: "text-blue-500",
  },
  {
    title: "Active Schools",
    value: 23,
    change: 8.3,
    trend: "up",
    icon: <School className="h-6 w-6" />,
    color: "text-green-500",
  },
  {
    title: "Lessons Completed",
    value: "15.2K",
    change: -2.1,
    trend: "down",
    icon: <BookOpen className="h-6 w-6" />,
    color: "text-purple-500",
  },
  {
    title: "Challenges Active",
    value: 89,
    change: 15.7,
    trend: "up",
    icon: <Target className="h-6 w-6" />,
    color: "text-orange-500",
  },
  {
    title: "Eco-Points Awarded",
    value: "342K",
    change: 23.4,
    trend: "up",
    icon: <Award className="h-6 w-6" />,
    color: "text-yellow-500",
  },
  {
    title: "System Uptime",
    value: "99.9%",
    change: 0.1,
    trend: "stable",
    icon: <Activity className="h-6 w-6" />,
    color: "text-green-500",
  },
]

export function SystemOverview() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <div className="h-4 w-4" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-500"
      case "down":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Activity className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">System Overview</h2>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systemMetrics.map((metric, index) => (
          <Card key={index} className="animate-grow hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-full bg-opacity-10 ${metric.color.replace("text-", "bg-")}/10`}>
                  <div className={metric.color}>{metric.icon}</div>
                </div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(metric.trend)}
                  <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                    {metric.change > 0 ? "+" : ""}
                    {metric.change}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold mb-1">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Server Performance</span>
                <span className="font-medium">95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Database Health</span>
                <span className="font-medium">98%</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>API Response Time</span>
                <span className="font-medium">87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>User Satisfaction</span>
                <span className="font-medium">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New school registered</p>
                  <p className="text-xs text-muted-foreground">Green Valley High School - 2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">System update deployed</p>
                  <p className="text-xs text-muted-foreground">Version 2.1.3 - 1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Database backup completed</p>
                  <p className="text-xs text-muted-foreground">Automated backup - 3 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New feature released</p>
                  <p className="text-xs text-muted-foreground">Peer interaction system - 1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <Users className="h-8 w-8 text-blue-500 mb-2" />
              <p className="font-medium">Manage Users</p>
              <p className="text-xs text-muted-foreground">Add, edit, or remove users</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <School className="h-8 w-8 text-green-500 mb-2" />
              <p className="font-medium">School Settings</p>
              <p className="text-xs text-muted-foreground">Configure school parameters</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <Activity className="h-8 w-8 text-purple-500 mb-2" />
              <p className="font-medium">System Logs</p>
              <p className="text-xs text-muted-foreground">View system activity</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <Award className="h-8 w-8 text-yellow-500 mb-2" />
              <p className="font-medium">Analytics</p>
              <p className="text-xs text-muted-foreground">Detailed reports</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
