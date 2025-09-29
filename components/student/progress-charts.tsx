"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Award, BookOpen, Target } from "lucide-react"

interface ProgressData {
  category: string
  current: number
  total: number
  color: string
  icon: React.ReactNode
}

const progressData: ProgressData[] = [
  {
    category: "Lessons Completed",
    current: 12,
    total: 20,
    color: "bg-blue-500",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    category: "Quizzes Passed",
    current: 8,
    total: 12,
    color: "bg-green-500",
    icon: <Target className="h-5 w-5" />,
  },
  {
    category: "Challenges Done",
    current: 15,
    total: 25,
    color: "bg-purple-500",
    icon: <Award className="h-5 w-5" />,
  },
]

export function ProgressCharts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Your Progress</h2>
      </div>

      <div className="grid gap-4">
        {progressData.map((item, index) => {
          const percentage = (item.current / item.total) * 100
          return (
            <Card key={index} className="animate-grow hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-full ${item.color}/10`}>
                      <div className={`${item.color.replace("bg-", "text-")}`}>{item.icon}</div>
                    </div>
                    {item.category}
                  </div>
                  <span className="text-sm font-normal text-muted-foreground">
                    {item.current}/{item.total}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <Progress value={percentage} className="h-3" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{Math.round(percentage)}% Complete</span>
                    <span>{item.total - item.current} remaining</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Weekly Summary */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="text-lg">This Week's Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">47</div>
              <div className="text-sm text-muted-foreground">Points Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">5</div>
              <div className="text-sm text-muted-foreground">Activities Done</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
