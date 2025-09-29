"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Flame, Target, Camera, CheckCircle, Clock } from "lucide-react"

interface Challenge {
  id: string
  title: string
  description: string
  points: number
  difficulty: "easy" | "medium" | "hard"
  timeLeft: string
  completed: boolean
  streak?: number
}

const dailyChallenges: Challenge[] = [
  {
    id: "1",
    title: "Water Conservation",
    description: "Turn off the tap while brushing teeth and document it",
    points: 15,
    difficulty: "easy",
    timeLeft: "18h 32m",
    completed: false,
  },
  {
    id: "2",
    title: "Plastic-Free Lunch",
    description: "Pack your lunch without any plastic containers",
    points: 25,
    difficulty: "medium",
    timeLeft: "18h 32m",
    completed: true,
    streak: 3,
  },
  {
    id: "3",
    title: "Energy Audit",
    description: "Count and document all electronic devices in your home",
    points: 35,
    difficulty: "hard",
    timeLeft: "18h 32m",
    completed: false,
  },
]

export function DailyChallenges() {
  const [challenges, setChallenges] = useState(dailyChallenges)
  const [streakCount, setStreakCount] = useState(7)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "hard":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const completeChallenge = (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === challengeId
          ? { ...challenge, completed: true, streak: (challenge.streak || 0) + 1 }
          : challenge,
      ),
    )
  }

  const completedToday = challenges.filter((c) => c.completed).length
  const totalChallenges = challenges.length
  const progressPercentage = (completedToday / totalChallenges) * 100

  return (
    <div className="space-y-6">
      {/* Streak Counter */}
      <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Flame className="h-8 w-8 text-orange-500 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{streakCount}</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-orange-700">Challenge Streak</h3>
                <p className="text-sm text-orange-600">{streakCount} days in a row!</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              On Fire!
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Daily Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Today's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Challenges Completed</span>
              <span className="font-medium">
                {completedToday}/{totalChallenges}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {progressPercentage === 100
                ? "Amazing! You've completed all challenges today!"
                : `${totalChallenges - completedToday} challenges remaining`}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Challenge List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Today's Challenges
        </h3>

        {challenges.map((challenge) => (
          <Card
            key={challenge.id}
            className={`transition-all duration-300 hover:shadow-md ${
              challenge.completed ? "bg-green-50 border-green-200" : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className={`font-semibold ${challenge.completed ? "line-through text-muted-foreground" : ""}`}>
                      {challenge.title}
                    </h4>
                    <div className={`w-2 h-2 rounded-full ${getDifficultyColor(challenge.difficulty)}`}></div>
                    {challenge.streak && challenge.streak > 1 && (
                      <Badge variant="outline" className="text-xs">
                        {challenge.streak}x streak
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{challenge.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>+{challenge.points} points</span>
                    <span>{challenge.timeLeft} left</span>
                    <Badge variant="outline" size="sm">
                      {challenge.difficulty}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  {challenge.completed ? (
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-grow">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => completeChallenge(challenge.id)}
                      className="transition-all duration-200 hover:scale-105"
                    >
                      <Camera className="h-4 w-4 mr-1" />
                      Submit
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
