"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, Users } from "lucide-react"

interface HeatmapData {
  date: string
  engagement: number
  studentsActive: number
  totalStudents: number
}

// Mock data for the last 30 days
const generateHeatmapData = (): HeatmapData[] => {
  const data: HeatmapData[] = []
  const today = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    const engagement = Math.floor(Math.random() * 100)
    const totalStudents = 25
    const studentsActive = Math.floor((engagement / 100) * totalStudents)

    data.push({
      date: date.toISOString().split("T")[0],
      engagement,
      studentsActive,
      totalStudents,
    })
  }

  return data
}

export function ClassProgressHeatmap() {
  const [heatmapData] = useState(generateHeatmapData())
  const [selectedDate, setSelectedDate] = useState<HeatmapData | null>(null)

  const getEngagementColor = (engagement: number) => {
    if (engagement >= 80) return "bg-green-500"
    if (engagement >= 60) return "bg-yellow-500"
    if (engagement >= 40) return "bg-orange-500"
    if (engagement >= 20) return "bg-red-400"
    return "bg-gray-300"
  }

  const getEngagementIntensity = (engagement: number) => {
    const opacity = Math.max(0.2, engagement / 100)
    return { opacity }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { weekday: "short" })
  }

  // Group data by weeks
  const weeks: HeatmapData[][] = []
  for (let i = 0; i < heatmapData.length; i += 7) {
    weeks.push(heatmapData.slice(i, i + 7))
  }

  const averageEngagement = Math.round(heatmapData.reduce((sum, day) => sum + day.engagement, 0) / heatmapData.length)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Calendar className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Class Engagement Heatmap</h2>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Average Engagement</p>
                <p className="text-2xl font-bold text-green-500">{averageEngagement}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold text-blue-500">25</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Days Tracked</p>
                <p className="text-2xl font-bold text-purple-500">30</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Engagement Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex gap-1">
                {week.map((day) => (
                  <div
                    key={day.date}
                    className={`w-8 h-8 rounded cursor-pointer transition-all duration-200 hover:scale-110 ${getEngagementColor(
                      day.engagement,
                    )}`}
                    style={getEngagementIntensity(day.engagement)}
                    onClick={() => setSelectedDate(day)}
                    title={`${formatDate(day.date)}: ${day.engagement}% engagement`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-gray-300 rounded"></div>
              <div className="w-3 h-3 bg-red-400 rounded"></div>
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <div className="w-3 h-3 bg-green-500 rounded"></div>
            </div>
            <span>More</span>
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Details */}
      {selectedDate && (
        <Card className="animate-grow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {formatDate(selectedDate.date)} ({getDayOfWeek(selectedDate.date)})
              </span>
              <Badge variant={selectedDate.engagement >= 70 ? "default" : "secondary"}>
                {selectedDate.engagement}% Engagement
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Students Active</p>
                <p className="text-xl font-bold">
                  {selectedDate.studentsActive}/{selectedDate.totalStudents}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Engagement Level</p>
                <p className="text-xl font-bold">{selectedDate.engagement}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
