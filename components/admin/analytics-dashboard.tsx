"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Users, School, Award, Calendar } from "lucide-react"

interface AnalyticsData {
  title: string
  value: number
  total: number
  percentage: number
  trend: "up" | "down" | "stable"
  color: string
}

const engagementData: AnalyticsData[] = [
  {
    title: "Daily Active Users",
    value: 892,
    total: 1247,
    percentage: 71.5,
    trend: "up",
    color: "bg-blue-500",
  },
  {
    title: "Weekly Active Users",
    value: 1156,
    total: 1247,
    percentage: 92.7,
    trend: "up",
    color: "bg-green-500",
  },
  {
    title: "Monthly Active Users",
    value: 1201,
    total: 1247,
    percentage: 96.3,
    trend: "stable",
    color: "bg-purple-500",
  },
]

const schoolPerformance = [
  { name: "Green Valley High", students: 156, engagement: 87, ecoPoints: 45200 },
  { name: "Riverside Academy", students: 134, engagement: 92, ecoPoints: 38900 },
  { name: "Sunshine Elementary", students: 98, engagement: 78, ecoPoints: 28400 },
  { name: "Mountain View School", students: 112, engagement: 85, ecoPoints: 32100 },
  { name: "Ocean Breeze High", students: 89, engagement: 94, ecoPoints: 41800 },
]

const contentMetrics = [
  { category: "Environmental Science", completions: 2340, avgScore: 85 },
  { category: "Climate Change", completions: 1890, avgScore: 78 },
  { category: "Renewable Energy", completions: 1567, avgScore: 82 },
  { category: "Waste Management", completions: 2100, avgScore: 88 },
  { category: "Biodiversity", completions: 1234, avgScore: 76 },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
      </div>

      {/* User Engagement Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {engagementData.map((data, index) => (
          <Card key={index} className="animate-grow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                {data.title}
                <Badge variant={data.trend === "up" ? "default" : "secondary"}>
                  {data.trend === "up" ? "↗" : data.trend === "down" ? "↘" : "→"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{data.value.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">of {data.total.toLocaleString()}</span>
                </div>
                <Progress value={data.percentage} className="h-2" />
                <p className="text-sm text-muted-foreground">{data.percentage}% engagement rate</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* School Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <School className="h-5 w-5" />
            School Performance Rankings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schoolPerformance.map((school, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">#{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{school.name}</h4>
                    <p className="text-sm text-muted-foreground">{school.students} students</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-500">{school.engagement}%</p>
                    <p className="text-xs text-muted-foreground">Engagement</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-yellow-500">{school.ecoPoints.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Eco-Points</p>
                  </div>
                  <div className="w-24">
                    <Progress value={school.engagement} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Content Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contentMetrics.map((content, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{content.category}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{content.avgScore}% avg</Badge>
                      <span className="text-sm text-muted-foreground">{content.completions} completions</span>
                    </div>
                  </div>
                  <Progress value={content.avgScore} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Usage Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Peak Usage Hours</h4>
                <div className="grid grid-cols-4 gap-2">
                  {["9-10 AM", "11-12 PM", "2-3 PM", "7-8 PM"].map((time, index) => (
                    <div key={index} className="text-center p-2 bg-muted rounded">
                      <p className="text-xs text-muted-foreground">{time}</p>
                      <p className="font-bold">{[245, 189, 167, 134][index]}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Weekly Activity</h4>
                <div className="space-y-2">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, index) => {
                    const activity = [85, 92, 78, 88, 95][index]
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{day}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20">
                            <Progress value={activity} className="h-1" />
                          </div>
                          <span className="text-sm font-medium w-8">{activity}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">1,247</p>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <School className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">23</p>
            <p className="text-sm text-muted-foreground">Active Schools</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">342K</p>
            <p className="text-sm text-muted-foreground">Eco-Points Awarded</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">87%</p>
            <p className="text-sm text-muted-foreground">Avg Engagement</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
