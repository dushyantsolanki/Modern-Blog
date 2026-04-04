"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20 lg:py-32">
        <div className="container mx-auto px-6 text-center">
          <div className="relative mb-12">
            <h1 className="text-[10rem] lg:text-[15rem] font-black text-slate-900 dark:text-white/5 select-none leading-none">
              404
            </h1>
            {/* <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-background/80 backdrop-blur-md px-8 py-4 rounded-3xl border border-border shadow-2xl">
                <p className="text-2xl font-bold tracking-tight">Page Not Found</p>
              </div>
            </div> */}
          </div>

          <h2 className="text-3xl font-extrabold mb-6">Lost in the insights?</h2>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-12">
            The article or page you're looking for doesn't exist or has been moved.
            Don't worry, you can always find your way back.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-8 py-4 bg-surface-alt border border-border rounded-2xl font-bold hover:bg-muted transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Previous Page
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
