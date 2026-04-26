import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface AuthorAvatarProps {
  name: string
  avatar?: string
  size?: "sm" | "md" | "lg" | "xl" | "hero"
  className?: string
}

const sizeClasses = {
  sm: "w-8 h-8 text-[10px]",
  md: "w-10 h-10 text-xs",
  lg: "w-12 h-12 text-sm",
  xl: "w-24 h-24 text-xl",
  hero: "w-48 h-48 lg:w-64 lg:h-64 text-6xl"
}

export function AuthorAvatar({ name, avatar, size = "md", className }: AuthorAvatarProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  if (avatar && avatar.trim() !== "") {
    return (
      <div className={cn("relative rounded-full overflow-hidden flex-shrink-0", sizeClasses[size], className)}>
        <Image
          src={avatar}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div className={cn(
      "rounded-full bg-gradient-to-br from-primary to-accent overflow-hidden flex items-center justify-center font-bold text-white/80 flex-shrink-0",
      sizeClasses[size],
      className
    )}>
      {initials}
    </div>
  )
}

