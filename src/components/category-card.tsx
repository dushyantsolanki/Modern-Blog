import * as React from "react"
import Link from "next/link"
import { LucideIcon } from "lucide-react"

interface CategoryCardProps {
  title: string
  count: number
  icon: LucideIcon
  color: string
}

export function CategoryCard({ title, count, icon: Icon, color }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${title.toLowerCase()}`}
      className="group flex flex-col items-center text-center p-8 bg-surface border border-border rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all"
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${color}15`, color }}
      >
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-muted-foreground text-sm">{count} Articles</p>
    </Link>
  )
}
