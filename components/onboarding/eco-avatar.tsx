"use client"

interface EcoAvatarProps {
  mood?: "happy" | "excited" | "thinking" | "celebrating"
  size?: "sm" | "md" | "lg"
  animate?: boolean
}

export function EcoAvatar({ mood = "happy", size = "md", animate = true }: EcoAvatarProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  const moodColors = {
    happy: "from-green-400 to-emerald-500",
    excited: "from-yellow-400 to-orange-500",
    thinking: "from-blue-400 to-indigo-500",
    celebrating: "from-pink-400 to-purple-500",
  }

  return (
    <div className={`relative ${sizeClasses[size]} mx-auto`}>
      {/* Main Avatar Body */}
      <div
        className={`
        w-full h-full rounded-full bg-gradient-to-br ${moodColors[mood]}
        shadow-lg relative overflow-hidden
        ${animate ? "animate-pulse" : ""}
      `}
      >
        {/* Leaf Pattern */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-green-300/30 to-emerald-400/30">
          <div className="absolute top-2 left-2 w-3 h-3 bg-green-200 rounded-full opacity-60" />
          <div className="absolute top-4 right-3 w-2 h-2 bg-emerald-200 rounded-full opacity-80" />
          <div className="absolute bottom-3 left-3 w-2 h-2 bg-green-300 rounded-full opacity-70" />
        </div>

        {/* Eyes */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div className="w-2 h-2 bg-white rounded-full">
            <div className="w-1 h-1 bg-gray-800 rounded-full mt-0.5 ml-0.5" />
          </div>
          <div className="w-2 h-2 bg-white rounded-full">
            <div className="w-1 h-1 bg-gray-800 rounded-full mt-0.5 ml-0.5" />
          </div>
        </div>

        {/* Mouth */}
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
          {mood === "happy" && <div className="w-4 h-2 border-b-2 border-white rounded-full" />}
          {mood === "excited" && <div className="w-3 h-3 bg-white rounded-full" />}
          {mood === "thinking" && <div className="w-2 h-1 bg-white rounded-full" />}
          {mood === "celebrating" && <div className="w-4 h-2 border-b-2 border-white rounded-full animate-bounce" />}
        </div>
      </div>

      {/* Floating Elements */}
      {animate && (
        <>
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-100" />
          <div className="absolute -bottom-1 -left-2 w-2 h-2 bg-green-400 rounded-full animate-bounce delay-300" />
          <div className="absolute top-1/2 -right-3 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-500" />
        </>
      )}

      {/* Glow Effect */}
      {animate && (
        <div
          className={`
          absolute inset-0 rounded-full bg-gradient-to-br ${moodColors[mood]} 
          opacity-20 animate-pulse scale-110 -z-10
        `}
        />
      )}
    </div>
  )
}
