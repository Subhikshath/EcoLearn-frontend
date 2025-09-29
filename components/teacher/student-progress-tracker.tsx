"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, TrendingUp, TrendingDown, Award, BookOpen, Target } from "lucide-react"

interface StudentData {
  id: string
  name: string
  email: string
  ecoPoints: number
  lessonsCompleted: number
  totalLessons: number
  quizAverage: number
  challengesCompleted: number
  lastActive: string
  trend: "up" | "down" | "stable"
  initials: string
}

const studentsData: StudentData[] = [
  {
    id: "1",
    name: "Arjun Sharma",
    email: "arjun@school.edu",
    ecoPoints: 320,
    lessonsCompleted: 15,
    totalLessons: 20,
    quizAverage: 85,
    challengesCompleted: 8,
    lastActive: "2 hours ago",
    trend: "up",
    initials: "AS",
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya@school.edu",
    ecoPoints: 280,
    lessonsCompleted: 12,
    totalLessons: 20,
    quizAverage: 92,
    challengesCompleted: 6,
    lastActive: "1 day ago",
    trend: "up",
    initials: "PP",
  },
  {
    id: "3",
    name: "Rahul Kumar",
    email: "rahul@school.edu",
    ecoPoints: 195,
    lessonsCompleted: 8,
    totalLessons: 20,
    quizAverage: 78,
    challengesCompleted: 4,
    lastActive: "3 days ago",
    trend: "down",
    initials: "RK",
  },
  {
    id: "4",
    name: "Sneha Gupta",
    email: "sneha@school.edu",
    ecoPoints: 410,
    lessonsCompleted: 18,
    totalLessons: 20,
    quizAverage: 95,
    challengesCompleted: 12,
    lastActive: "30 minutes ago",
    trend: "up",
    initials: "SG",
  },
  {
    id: "5",
    name: "Vikram Singh",
    email: "vikram@school.edu",
    ecoPoints: 150,
    lessonsCompleted: 6,
    totalLessons: 20,
    quizAverage: 65,
    challengesCompleted: 2,
    lastActive: "1 week ago",
    trend: "down",
    initials: "VS",
  },
]

export function StudentProgressTracker() {
  const [students, setStudents] = useState(studentsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "ecoPoints" | "progress" | "quizAverage">("ecoPoints")
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null)

  const filteredStudents = students
    .filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "ecoPoints":
          return b.ecoPoints - a.ecoPoints
        case "progress":
          return b.lessonsCompleted / b.totalLessons - a.lessonsCompleted / a.totalLessons
        case "quizAverage":
          return b.quizAverage - a.quizAverage
        default:
          return 0
      }
    })

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

  const getPerformanceColor = (average: number) => {
    if (average >= 90) return "text-green-500"
    if (average >= 80) return "text-blue-500"
    if (average >= 70) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Student Progress Tracker</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="ecoPoints">Sort by Eco-Points</option>
            <option value="name">Sort by Name</option>
            <option value="progress">Sort by Progress</option>
            <option value="quizAverage">Sort by Quiz Average</option>
          </select>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid gap-4">
        {filteredStudents.map((student) => {
          const progressPercentage = (student.lessonsCompleted / student.totalLessons) * 100

          return (
            <Card
              key={student.id}
              className="cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
              onClick={() => setSelectedStudent(student)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{student.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                      <p className="text-xs text-muted-foreground">Last active: {student.lastActive}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Eco Points */}
                    <div className="text-center">
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="font-bold text-primary">{student.ecoPoints}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Eco-Points</p>
                    </div>

                    {/* Progress */}
                    <div className="w-32">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs font-medium">{Math.round(progressPercentage)}%</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>

                    {/* Quiz Average */}
                    <div className="text-center">
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4 text-blue-500" />
                        <span className={`font-bold ${getPerformanceColor(student.quizAverage)}`}>
                          {student.quizAverage}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Quiz Avg</p>
                    </div>

                    {/* Trend */}
                    <div className="flex items-center gap-2">
                      {getTrendIcon(student.trend)}
                      <Badge
                        variant={
                          student.trend === "up" ? "default" : student.trend === "down" ? "destructive" : "secondary"
                        }
                      >
                        {student.trend}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <Card className="animate-grow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{selectedStudent.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl">{selectedStudent.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedStudent.email}</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => setSelectedStudent(null)}>
                Close
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-primary">{selectedStudent.ecoPoints}</p>
                <p className="text-sm text-muted-foreground">Eco-Points</p>
              </div>

              <div className="text-center">
                <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-500">
                  {selectedStudent.lessonsCompleted}/{selectedStudent.totalLessons}
                </p>
                <p className="text-sm text-muted-foreground">Lessons</p>
              </div>

              <div className="text-center">
                <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className={`text-2xl font-bold ${getPerformanceColor(selectedStudent.quizAverage)}`}>
                  {selectedStudent.quizAverage}%
                </p>
                <p className="text-sm text-muted-foreground">Quiz Average</p>
              </div>

              <div className="text-center">
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">{selectedStudent.challengesCompleted}</span>
                </div>
                <p className="text-2xl font-bold text-purple-500">{selectedStudent.challengesCompleted}</p>
                <p className="text-sm text-muted-foreground">Challenges</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-3">Recommendations</h4>
              <div className="space-y-2">
                {selectedStudent.quizAverage < 70 && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-800">Consider providing additional quiz practice materials</p>
                  </div>
                )}
                {selectedStudent.lessonsCompleted / selectedStudent.totalLessons < 0.5 && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-800">Student is behind on lessons - consider one-on-one support</p>
                  </div>
                )}
                {selectedStudent.trend === "up" && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800">Excellent progress! Consider assigning advanced challenges</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
