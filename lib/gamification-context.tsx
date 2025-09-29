"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: "learning" | "social" | "environmental" | "streak"
  points: number
  unlocked: boolean
  unlockedAt?: Date
  progress: number
  maxProgress: number
}

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  earned: boolean
  earnedAt?: Date
}

interface LeaderboardEntry {
  id: string
  name: string
  avatar: string
  points: number
  level: number
  badges: number
  streak: number
}

interface GamificationContextType {
  achievements: Achievement[]
  badges: Badge[]
  leaderboard: LeaderboardEntry[]
  userStats: {
    totalPoints: number
    level: number
    currentLevelProgress: number
    nextLevelPoints: number
    streak: number
    badgesEarned: number
    rank: number
  }
  unlockAchievement: (achievementId: string) => void
  earnBadge: (badgeId: string) => void
  addPoints: (points: number, reason: string) => void
  updateStreak: () => void
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined)

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "first-login",
      title: "Welcome to EcoLearn",
      description: "Complete your first login",
      icon: "🌱",
      category: "learning",
      points: 50,
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      unlockedAt: new Date(),
    },
    {
      id: "week-streak",
      title: "Eco Warrior",
      description: "Maintain a 7-day learning streak",
      icon: "🔥",
      category: "streak",
      points: 200,
      unlocked: false,
      progress: 3,
      maxProgress: 7,
    },
    {
      id: "quiz-master",
      title: "Quiz Master",
      description: "Complete 10 environmental quizzes",
      icon: "🧠",
      category: "learning",
      points: 300,
      unlocked: false,
      progress: 4,
      maxProgress: 10,
    },
    {
      id: "social-butterfly",
      title: "Social Butterfly",
      description: "Help 5 classmates with challenges",
      icon: "🦋",
      category: "social",
      points: 150,
      unlocked: false,
      progress: 2,
      maxProgress: 5,
    },
    {
      id: "tree-hugger",
      title: "Tree Hugger",
      description: "Complete all forest conservation modules",
      icon: "🌳",
      category: "environmental",
      points: 500,
      unlocked: false,
      progress: 0,
      maxProgress: 8,
    },
  ])

  const [badges, setBadges] = useState<Badge[]>([
    {
      id: "early-bird",
      name: "Early Bird",
      description: "Login before 8 AM for 5 consecutive days",
      icon: "🐦",
      rarity: "common",
      earned: true,
      earnedAt: new Date(),
    },
    {
      id: "night-owl",
      name: "Night Owl",
      description: "Complete challenges after 10 PM",
      icon: "🦉",
      rarity: "rare",
      earned: false,
    },
    {
      id: "eco-champion",
      name: "Eco Champion",
      description: "Reach the top of the monthly leaderboard",
      icon: "🏆",
      rarity: "legendary",
      earned: false,
    },
    {
      id: "knowledge-seeker",
      name: "Knowledge Seeker",
      description: "Read 50 environmental articles",
      icon: "📚",
      rarity: "epic",
      earned: false,
    },
  ])

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    { id: "1", name: "Arjun Sharma", avatar: "👦", points: 2450, level: 12, badges: 8, streak: 15 },
    { id: "2", name: "Priya Patel", avatar: "👧", points: 2380, level: 11, badges: 7, streak: 12 },
    { id: "3", name: "Rahul Singh", avatar: "👦", points: 2200, level: 10, badges: 6, streak: 8 },
    { id: "4", name: "Ananya Gupta", avatar: "👧", points: 2100, level: 10, badges: 5, streak: 10 },
    { id: "5", name: "Vikram Kumar", avatar: "👦", points: 1950, level: 9, badges: 4, streak: 6 },
  ])

  const [userStats, setUserStats] = useState({
    totalPoints: 1850,
    level: 9,
    currentLevelProgress: 350,
    nextLevelPoints: 500,
    streak: 5,
    badgesEarned: 3,
    rank: 6,
  })

  const unlockAchievement = (achievementId: string) => {
    setAchievements((prev) =>
      prev.map((achievement) =>
        achievement.id === achievementId ? { ...achievement, unlocked: true, unlockedAt: new Date() } : achievement,
      ),
    )
  }

  const earnBadge = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((badge) => (badge.id === badgeId ? { ...badge, earned: true, earnedAt: new Date() } : badge)),
    )
  }

  const addPoints = (points: number, reason: string) => {
    setUserStats((prev) => {
      const newPoints = prev.totalPoints + points
      const newLevel = Math.floor(newPoints / 200) + 1
      const currentLevelProgress = newPoints % 200

      return {
        ...prev,
        totalPoints: newPoints,
        level: newLevel,
        currentLevelProgress,
        nextLevelPoints: 200 - currentLevelProgress,
      }
    })
  }

  const updateStreak = () => {
    setUserStats((prev) => ({ ...prev, streak: prev.streak + 1 }))
  }

  return (
    <GamificationContext.Provider
      value={{
        achievements,
        badges,
        leaderboard,
        userStats,
        unlockAchievement,
        earnBadge,
        addPoints,
        updateStreak,
      }}
    >
      {children}
    </GamificationContext.Provider>
  )
}

export function useGamification() {
  const context = useContext(GamificationContext)
  if (context === undefined) {
    throw new Error("useGamification must be used within a GamificationProvider")
  }
  return context
}
