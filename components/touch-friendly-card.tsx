"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"

interface TouchFriendlyCardProps {
  title?: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  interactive?: boolean
  icon?: React.ReactNode
}

export function TouchFriendlyCard({
  title,
  children,
  className = "",
  onClick,
  interactive = false,
  icon,
}: TouchFriendlyCardProps) {
  const cardClasses = [
    "transition-all duration-200",
    interactive && "hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
    onClick && "cursor-pointer",
    "touch-manipulation", // Improves touch responsiveness
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <Card
      className={cardClasses}
      onClick={onClick}
      style={{ minHeight: "44px" }} // Minimum touch target size
    >
      {title && (
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={title ? "pt-0" : "p-6"}>{children}</CardContent>
    </Card>
  )
}
