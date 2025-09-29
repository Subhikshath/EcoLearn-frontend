"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Plus, Edit, Trash2, Users, UserCheck, UserX } from "lucide-react"
import type { UserRole } from "@/lib/auth-context"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  school?: string
  status: "active" | "inactive" | "pending"
  lastLogin: string
  ecoPoints: number
  joinDate: string
}

const usersData: User[] = [
  {
    id: "1",
    name: "Arjun Sharma",
    email: "arjun@greenvalley.edu",
    role: "student",
    school: "Green Valley High School",
    status: "active",
    lastLogin: "2 hours ago",
    ecoPoints: 320,
    joinDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Dr. Priya Patel",
    email: "priya.patel@greenvalley.edu",
    role: "teacher",
    school: "Green Valley High School",
    status: "active",
    lastLogin: "1 day ago",
    ecoPoints: 150,
    joinDate: "2023-08-20",
  },
  {
    id: "3",
    name: "Rahul Kumar",
    email: "rahul@riverside.edu",
    role: "student",
    school: "Riverside Academy",
    status: "inactive",
    lastLogin: "1 week ago",
    ecoPoints: 195,
    joinDate: "2024-02-01",
  },
  {
    id: "4",
    name: "Admin User",
    email: "admin@ecolearn.com",
    role: "admin",
    status: "active",
    lastLogin: "30 minutes ago",
    ecoPoints: 0,
    joinDate: "2023-06-01",
  },
]

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(usersData)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "student" as UserRole,
    school: "",
  })

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.school?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return

    const user: User = {
      id: Date.now().toString(),
      ...newUser,
      status: "pending",
      lastLogin: "Never",
      ecoPoints: 0,
      joinDate: new Date().toISOString().split("T")[0],
    }

    setUsers([user, ...users])
    setNewUser({ name: "", email: "", role: "student", school: "" })
    setIsAddingUser(false)
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleToggleStatus = (id: string) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "teacher":
        return "bg-blue-100 text-blue-800"
      case "student":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <UserCheck className="h-4 w-4 text-green-500" />
      case "inactive":
        return <UserX className="h-4 w-4 text-red-500" />
      default:
        return <Users className="h-4 w-4 text-yellow-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">User Management</h2>
        </div>
        <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
          <DialogTrigger asChild>
            <Button className="transition-all duration-200 hover:scale-105">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value: UserRole) => setNewUser({ ...newUser, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {(newUser.role === "student" || newUser.role === "teacher") && (
                <div>
                  <Label htmlFor="school">School</Label>
                  <Input
                    id="school"
                    value={newUser.school}
                    onChange={(e) => setNewUser({ ...newUser, school: e.target.value })}
                    placeholder="Enter school name"
                  />
                </div>
              )}
              <div className="flex gap-2">
                <Button onClick={handleAddUser} className="flex-1">
                  Add User
                </Button>
                <Button variant="outline" onClick={() => setIsAddingUser(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="student">Students</SelectItem>
                <SelectItem value="teacher">Teachers</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="transition-all duration-200 hover:shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    {user.school && <p className="text-xs text-muted-foreground">{user.school}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      {getStatusIcon(user.status)}
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-medium">{user.ecoPoints}</p>
                    <p className="text-xs text-muted-foreground">Eco-Points</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm">{user.lastLogin}</p>
                    <p className="text-xs text-muted-foreground">Last Login</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleStatus(user.id)}
                      className={
                        user.status === "active"
                          ? "text-red-500 hover:text-red-700"
                          : "text-green-500 hover:text-green-700"
                      }
                    >
                      {user.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No users found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
