"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n-context"
import { ChevronDown, ChevronUp, Globe } from "lucide-react"

interface SlidingLanguageBarProps {
  position?: "top-right" | "bottom-fixed"
  className?: string
}

export function SlidingLanguageBar({ position = "top-right", className = "" }: SlidingLanguageBarProps) {
  const { language, setLanguage, languages } = useI18n()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const currentLanguage = languages.find((lang) => lang.code === language)

  const baseClasses = `
    fixed z-50 transition-all duration-300 ease-in-out
    ${position === "top-right" ? "top-4 right-4" : "bottom-4 left-1/2 transform -translate-x-1/2"}
    ${className}
  `

  const containerClasses = `
    ${baseClasses}
    ${isExpanded ? (position === "top-right" ? "w-64" : "w-80") : "w-auto"}
  `

  if (isMobile && position === "top-right") {
    // Mobile: Use bottom-fixed position
    return (
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isExpanded ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg">
          {/* Mobile toggle button */}
          <div className="flex justify-center py-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm"
            >
              <Globe className="h-4 w-4" />
              <span>
                {currentLanguage?.flag} {currentLanguage?.nativeName}
              </span>
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
          </div>

          {/* Mobile language grid */}
          {isExpanded && (
            <div className="p-4 animate-in slide-in-from-bottom-2 duration-300">
              <div className="grid grid-cols-3 gap-2">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={language === lang.code ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setLanguage(lang.code)
                      setIsExpanded(false)
                    }}
                    className="flex flex-col items-center gap-1 h-auto py-3 text-xs"
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="font-medium">{lang.nativeName}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={containerClasses}>
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 overflow-hidden">
        {/* Collapsed state - current language button */}
        {!isExpanded && (
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 px-3 py-2 h-auto hover:bg-gray-100/50 transition-colors duration-200"
          >
            <Globe className="h-4 w-4 text-gray-600" />
            <span className="text-lg">{currentLanguage?.flag}</span>
            <span className="text-sm font-medium text-gray-700">{currentLanguage?.nativeName}</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </Button>
        )}

        {/* Expanded state - all languages */}
        {isExpanded && (
          <div className="animate-in slide-in-from-top-2 duration-300">
            {/* Header with close button */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200/50">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Select Language</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="h-6 w-6 p-0 hover:bg-gray-100/50"
              >
                <ChevronUp className="h-4 w-4 text-gray-500" />
              </Button>
            </div>

            {/* Language options */}
            <div className="p-2 space-y-1">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={language === lang.code ? "default" : "ghost"}
                  onClick={() => {
                    setLanguage(lang.code)
                    setIsExpanded(false)
                  }}
                  className={`
                    w-full justify-start gap-3 h-auto py-2 px-3 text-left
                    ${
                      language === lang.code ? "bg-green-100 text-green-800 hover:bg-green-200" : "hover:bg-gray-100/50"
                    }
                    transition-all duration-200
                  `}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{lang.nativeName}</span>
                    <span className="text-xs text-gray-500">{lang.name}</span>
                  </div>
                  {language === lang.code && <div className="ml-auto w-2 h-2 bg-green-600 rounded-full" />}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
