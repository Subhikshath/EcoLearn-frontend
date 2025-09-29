"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Target, Calendar, Users, Award, Trash2, Edit } from "lucide-react"

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  points: number
  dueDate: string
  participantsCount: number
  status: "draft" | "active" | "completed"
  createdAt: string
}

const existingChallenges: Challenge[] = [
  {
    id: "1",
    title: "Water Conservation Week",
    description: "Document daily water-saving activities and measure impact",
    difficulty: "medium",
    points: 50,
    dueDate: "2024-02-15",
    participantsCount: 18,
    status: "active",
    createdAt: "2024-01-20",
  },
  {
    id: "2",
    title: "Plastic-Free Lunch Challenge",
    description: "Bring plastic-free lunches for 5 consecutive days",
    difficulty: "easy",
    points: 25,
    dueDate: "2024-02-10",
    participantsCount: 22,
    status: "completed",
    createdAt: "2024-01-15",
  },
]

export function ClassChallengesManager() {
  const [challenges, setChallenges] = useState<Challenge[]>(existingChallenges)
  const [isCreating, setIsCreating] = useState(false)
  const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null)
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    difficulty: "medium" as const,
    points: 25,
    dueDate: "",
  })

  const handleCreateChallenge = () => {
    if (!newChallenge.title || !newChallenge.description || !newChallenge.dueDate) {
      return
    }

    const challenge: Challenge = {
      id: Date.now().toString(),
      ...newChallenge,
      participantsCount: 0,
      status: "draft",
      createdAt: new Date().toISOString().split("T")[0],
    }

    setChallenges([challenge, ...challenges])
    setNewChallenge({
      title: "",
      description: "",
      difficulty: "medium",
      points: 25,
      dueDate: "",
    })
    setIsCreating(false)

    // Simulate confetti animation
    setTimeout(() => {
      const button = document.getElementById("create-challenge-btn")
      if (button) {
        button.classList.add("animate-bounce-in")
        setTimeout(() => {
          button.classList.remove("animate-bounce-in")
        }, 600)
      }
    }, 100)
  }

  const handleDeleteChallenge = (id: string) => {
    setChallenges(challenges.filter((c) => c.id !== id))
  }

  const handleActivateChallenge = (id: string) => {
    setChallenges(challenges.map((c) => (c.id === id ? { ...c, status: "active" as const } : c)))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Class Challenges</h2>
        </div>
        <Button
          id="create-challenge-btn"
          onClick={() => setIsCreating(true)}
          className="transition-all duration-200 hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Challenge
        </Button>
      </div>

      {/* Create Challenge Form */}
      {isCreating && (
        <Card className="animate-grow">
          <CardHeader>
            <CardTitle>Create New Challenge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Challenge Title</label>
              <Input
                placeholder="Enter challenge title"
                value={newChallenge.title}
                onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                placeholder="Describe the challenge and what students need to do"
                value={newChallenge.description}
                onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Difficulty</label>
                <Select
                  value={newChallenge.difficulty}
                  onValueChange={(value: "easy" | "medium" | "hard") =>
                    setNewChallenge({ ...newChallenge, difficulty: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Points Reward</label>
                <Input
                  type="number"
                  min="5"
                  max="100"
                  value={newChallenge.points}
                  onChange={(e) => setNewChallenge({ ...newChallenge, points: Number.parseInt(e.target.value) || 25 })}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Due Date</label>
                <Input
                  type="date"
                  value={newChallenge.dueDate}
                  onChange={(e) => setNewChallenge({ ...newChallenge, dueDate: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateChallenge} className="transition-all duration-200 hover:scale-105">
                Create Challenge
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Challenges List */}
      <div className="grid gap-4">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="transition-all duration-200 hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{challenge.title}</h3>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                    <Badge className={getStatusColor(challenge.status)}>{challenge.status}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">{challenge.description}</p>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      <span>{challenge.points} points</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {new Date(challenge.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{challenge.participantsCount} participants</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {challenge.status === "draft" && (
                    <Button
                      size="sm"
                      onClick={() => handleActivateChallenge(challenge.id)}
                      className="transition-all duration-200 hover:scale-105"
                    >
                      Activate
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteChallenge(challenge.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {challenge.status === "active" && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                  <p className="text-sm text-blue-800">
                    This challenge is currently active. Students can participate and submit their work.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {challenges.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No challenges yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first challenge to engage your students in environmental activities.
            </p>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Challenge
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
