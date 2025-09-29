"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  success?: boolean
}

export function FloatingInput({ label, error, success, className, ...props }: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      setHasValue(!!inputRef.current.value)
    }
  }, [props.value])

  const isFloating = isFocused || hasValue || props.placeholder

  return (
    <div className="relative">
      <div className="relative">
        <Input
          ref={inputRef}
          {...props}
          className={cn(
            "peer pt-6 pb-2 transition-all duration-200",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            success && "border-green-500 focus:border-green-500 focus:ring-green-500/20",
            className,
          )}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            setHasValue(!!e.target.value)
            props.onBlur?.(e)
          }}
          onChange={(e) => {
            setHasValue(!!e.target.value)
            props.onChange?.(e)
          }}
        />
        <Label
          className={cn(
            "absolute left-3 transition-all duration-200 pointer-events-none text-muted-foreground",
            isFloating ? "top-1 text-xs font-medium" : "top-1/2 -translate-y-1/2 text-sm",
            isFocused && "text-primary",
            error && "text-red-500",
            success && "text-green-500",
          )}
        >
          {label}
        </Label>
      </div>
      {error && <div className="mt-1 text-xs text-red-500 animate-in slide-in-from-top-1 duration-200">{error}</div>}
    </div>
  )
}
