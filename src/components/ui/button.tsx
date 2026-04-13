import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass"
  size?: "sm" | "default" | "lg" | "icon"
  asChild?: boolean
}

const VARIANTS = {
  primary: "bg-foreground text-background shadow-md hover:shadow-lg hover:shadow-foreground/20 hover:scale-[1.02]",
  secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:scale-[1.02]",
  outline: "border border-border/50 bg-transparent hover:bg-muted/50 hover:text-foreground",
  ghost: "hover:bg-muted/50 hover:text-foreground",
  glass: "bg-surface/50 backdrop-blur-md border border-border/50 shadow-sm hover:bg-surface hover:scale-[1.02] text-foreground",
}

const SIZES = {
  default: "h-11 px-6 py-2 rounded-full",
  sm: "h-9 px-4 rounded-full text-xs",
  lg: "h-14 px-8 rounded-full text-base",
  icon: "h-11 w-11 rounded-full",
}

const BASE_CLASS = "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] select-none touch-manipulation"

export function getButtonClasses({ variant = "primary", size = "default", className }: { variant?: keyof typeof VARIANTS, size?: keyof typeof SIZES, className?: string } = {}) {
  return cn(BASE_CLASS, VARIANTS[variant], SIZES[size], className)
}
// Simple Slot implementation since @radix-ui/react-slot is not available
const Slot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>(
  ({ children, ...props }, ref) => {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ...(children.props as any),
        ref: (children as any).ref || ref,
      } as any)
    }
    return null
  }
)
Slot.displayName = "Slot"

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref as any}
        className={getButtonClasses({ variant, size, className })}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
