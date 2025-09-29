"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useI18n } from "@/lib/i18n-context"
import { Globe } from "lucide-react"

interface LanguageSwitcherProps {
  variant?: "button" | "select" | "mobile"
  size?: "sm" | "md" | "lg"
}

export function LanguageSwitcher({ variant = "select", size = "md" }: LanguageSwitcherProps) {
  const { language, setLanguage, languages } = useI18n()

  if (variant === "mobile") {
    return (
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700 mb-2">Language / भाषा</p>
        <div className="grid grid-cols-2 gap-2">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={language === lang.code ? "default" : "outline"}
              size="sm"
              onClick={() => setLanguage(lang.code)}
              className="justify-start text-xs h-10"
            >
              {lang.nativeName}
            </Button>
          ))}
        </div>
      </div>
    )
  }

  if (variant === "button") {
    return (
      <div className="flex items-center gap-1">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={language === lang.code ? "default" : "ghost"}
            size={size === "sm" ? "sm" : "default"}
            onClick={() => setLanguage(lang.code)}
            className="text-xs px-2"
          >
            {lang.nativeName}
          </Button>
        ))}
      </div>
    )
  }

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
      <SelectTrigger className={`w-auto ${size === "sm" ? "h-8" : "h-10"}`}>
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <div className="flex items-center gap-2">
              <span>{lang.nativeName}</span>
              <span className="text-xs text-muted-foreground">({lang.name})</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
