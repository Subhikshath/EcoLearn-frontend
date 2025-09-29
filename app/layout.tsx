import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { I18nProvider } from "@/lib/i18n-context"
import { GamificationProvider } from "@/lib/gamification-context"
import { OnboardingProvider } from "@/lib/onboarding-context"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "EcoLearn - Environmental Education Platform",
  description: "Gamified environmental education for Indian schools and colleges",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <I18nProvider>
            <AuthProvider>
              <GamificationProvider>
                <OnboardingProvider>{children}</OnboardingProvider>
              </GamificationProvider>
            </AuthProvider>
          </I18nProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
