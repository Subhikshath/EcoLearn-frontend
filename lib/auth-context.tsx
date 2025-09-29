"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "student" | "teacher" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  school?: string
  ecoPoints?: number
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string, role: UserRole, school?: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("eco-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)

    // Mock authentication - replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data based on email
    let mockUser: User
    if (email.includes("admin")) {
      mockUser = {
        id: "1",
        name: "Admin User",
        email,
        role: "admin",
        ecoPoints: 0,
      }
    } else if (email.includes("teacher")) {
      mockUser = {
        id: "2",
        name: "Teacher User",
        email,
        role: "teacher",
        school: "Green Valley School",
        ecoPoints: 150,
      }
    } else {
      mockUser = {
        id: "3",
        name: "Student User",
        email,
        role: "student",
        school: "Green Valley School",
        ecoPoints: 250,
      }
    }

    setUser(mockUser)
    localStorage.setItem("eco-user", JSON.stringify(mockUser))
    setLoading(false)
    return true
  }

  const signup = async (
    name: string,
    email: string,
    password: string,
    role: UserRole,
    school?: string,
  ): Promise<boolean> => {
    setLoading(true)

    // Mock signup - replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role,
      school,
      ecoPoints: role === "student" ? 0 : role === "teacher" ? 50 : 0,
    }

    setUser(newUser)
    localStorage.setItem("eco-user", JSON.stringify(newUser))
    setLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("eco-user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
