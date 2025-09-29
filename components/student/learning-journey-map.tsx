"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Play, Star, Leaf, Flower, TreePine } from "lucide-react"

interface JourneyNode {
  id: string
  title: string
  type: "lesson" | "quiz" | "challenge"
  status: "completed" | "current" | "locked"
  points: number
  description: string
}

const journeyData: JourneyNode[] = [
  {
    id: "1",
    title: "Introduction to Ecosystems",
    type: "lesson",
    status: "completed",
    points: 25,
    description: "Learn about different types of ecosystems",
  },
  {
    id: "2",
    title: "Ecosystem Quiz",
    type: "quiz",
    status: "completed",
    points: 15,
    description: "Test your knowledge about ecosystems",
  },
  {
    id: "3",
    title: "Plant a Tree Challenge",
    type: "challenge",
    status: "completed",
    points: 50,
    description: "Plant and document a tree in your area",
  },
  {
    id: "4",
    title: "Water Conservation",
    type: "lesson",
    status: "current",
    points: 30,
    description: "Understanding water conservation methods",
  },
  {
    id: "5",
    title: "Water Quiz",
    type: "quiz",
    status: "locked",
    points: 20,
    description: "Quiz on water conservation",
  },
  {
    id: "6",
    title: "Reduce Plastic Challenge",
    type: "challenge",
    status: "locked",
    points: 40,
    description: "Document your plastic reduction efforts",
  },
]

export function LearningJourneyMap() {
  const [selectedNode, setSelectedNode] = useState<JourneyNode | null>(null)

  const getNodeIcon = (node: JourneyNode) => {
    if (node.status === "completed") {
      switch (node.type) {
        case "lesson":
          return <TreePine className="h-6 w-6 text-green-500" />
        case "quiz":
          return <Flower className="h-6 w-6 text-blue-500" />
        case "challenge":
          return <Star className="h-6 w-6 text-yellow-500" />
      }
    }
    if (node.status === "current") {
      return <Play className="h-6 w-6 text-primary animate-pulse" />
    }
    return <Circle className="h-6 w-6 text-muted-foreground" />
  }

  const getNodeAnimation = (node: JourneyNode) => {
    switch (node.status) {
      case "completed":
        return "animate-grow hover:scale-110"
      case "current":
        return "animate-pulse-eco hover:scale-105"
      default:
        return "opacity-50"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Leaf className="h-6 w-6 text-primary animate-leaf-float" />
        <h2 className="text-2xl font-bold">Your Eco-Journey</h2>
      </div>

      {/* Journey Timeline */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-muted"></div>

        <div className="space-y-8">
          {journeyData.map((node, index) => (
            <div key={node.id} className="relative flex items-start gap-4">
              {/* Node Icon */}
              <div
                className={`relative z-10 w-16 h-16 rounded-full bg-card border-2 border-primary/20 flex items-center justify-center cursor-pointer transition-all duration-300 ${getNodeAnimation(
                  node,
                )}`}
                onClick={() => setSelectedNode(node)}
              >
                {getNodeIcon(node)}
                {node.status === "completed" && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>

              {/* Node Content */}
              <Card
                className={`flex-1 cursor-pointer transition-all duration-300 hover:shadow-md ${
                  node.status === "current" ? "ring-2 ring-primary/50" : ""
                }`}
                onClick={() => setSelectedNode(node)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{node.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant={node.type === "challenge" ? "default" : "secondary"}>{node.type}</Badge>
                      <span className="text-sm font-medium text-primary">+{node.points} pts</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{node.description}</p>
                  {node.status === "current" && (
                    <Button size="sm" className="mt-3 animate-pulse">
                      Continue Learning
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Node Details */}
      {selectedNode && (
        <Card className="animate-grow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              {getNodeIcon(selectedNode)}
              <div>
                <h3 className="text-xl font-bold">{selectedNode.title}</h3>
                <Badge variant={selectedNode.type === "challenge" ? "default" : "secondary"}>{selectedNode.type}</Badge>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">{selectedNode.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary">Reward: +{selectedNode.points} Eco-Points</span>
              {selectedNode.status !== "locked" && (
                <Button
                  variant={selectedNode.status === "completed" ? "outline" : "default"}
                  onClick={() => setSelectedNode(null)}
                >
                  {selectedNode.status === "completed" ? "Review" : "Start"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
