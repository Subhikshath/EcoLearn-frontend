"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, Leaf, Users, Sparkles } from "lucide-react"

interface Peer {
  id: string
  name: string
  ecoPoints: number
  recentActivity: string
  initials: string
}

const peers: Peer[] = [
  {
    id: "1",
    name: "Arjun Sharma",
    ecoPoints: 320,
    recentActivity: "Completed Water Conservation Challenge",
    initials: "AS",
  },
  {
    id: "2",
    name: "Priya Patel",
    ecoPoints: 280,
    recentActivity: "Planted 3 trees this week",
    initials: "PP",
  },
  {
    id: "3",
    name: "Rahul Kumar",
    ecoPoints: 195,
    recentActivity: "Finished Ecosystem Quiz with 95%",
    initials: "RK",
  },
]

export function PeerInteraction() {
  const [interactions, setInteractions] = useState<{ [key: string]: number }>({})

  const sendLeafExchange = (peerId: string) => {
    setInteractions((prev) => ({
      ...prev,
      [peerId]: (prev[peerId] || 0) + 1,
    }))

    // Create particle effect
    const button = document.getElementById(`leaf-btn-${peerId}`)
    if (button) {
      button.classList.add("animate-pulse-eco")
      setTimeout(() => {
        button.classList.remove("animate-pulse-eco")
      }, 1000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Users className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Connect with Peers</h2>
      </div>

      {/* Class Leaderboard Preview */}
      <Card className="bg-gradient-to-r from-accent/10 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-accent" />
            Top Eco-Warriors This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {peers.map((peer, index) => (
              <div key={peer.id} className="flex items-center justify-between p-3 bg-card rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-muted-foreground">#{index + 1}</span>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{peer.initials}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{peer.name}</p>
                    <p className="text-xs text-muted-foreground">{peer.recentActivity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {peer.ecoPoints} pts
                  </Badge>
                  <Button
                    id={`leaf-btn-${peer.id}`}
                    size="sm"
                    variant="outline"
                    onClick={() => sendLeafExchange(peer.id)}
                    className="transition-all duration-200 hover:scale-105"
                  >
                    <Leaf className="h-3 w-3 mr-1 text-green-500" />
                    {interactions[peer.id] || 0}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Encouragement Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Heart className="h-5 w-5 text-red-500" />
            Spread Positivity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Send leaf exchanges to encourage your classmates and celebrate their eco-achievements!
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="transition-all duration-200 hover:scale-105 bg-transparent">
              <Leaf className="h-4 w-4 mr-1 text-green-500" />
              Send Encouragement
            </Button>
            <Button size="sm" variant="outline" className="transition-all duration-200 hover:scale-105 bg-transparent">
              <Sparkles className="h-4 w-4 mr-1 text-yellow-500" />
              Celebrate Achievement
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Interactions */}
      {Object.keys(interactions).length > 0 && (
        <Card className="animate-grow">
          <CardHeader>
            <CardTitle className="text-lg">Recent Interactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(interactions).map(([peerId, count]) => {
                const peer = peers.find((p) => p.id === peerId)
                return (
                  <div key={peerId} className="flex items-center justify-between text-sm">
                    <span>
                      You sent {count} leaf exchange(s) to {peer?.name}
                    </span>
                    <div className="flex">
                      {Array.from({ length: count }).map((_, i) => (
                        <Leaf key={i} className="h-4 w-4 text-green-500 animate-leaf-float" />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
