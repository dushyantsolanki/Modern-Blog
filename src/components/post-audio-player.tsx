"use client"

import React, { useState, useEffect, useRef } from "react"
import { Play, Pause, Square, Volume2, X, ChevronUp, ChevronDown, ListMusic } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PostAudioPlayerProps {
  contentSelector?: string
  title: string
}

export const PostAudioPlayer = ({ contentSelector = "article", title }: PostAudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [rate, setRate] = useState(1)
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)

  const synth = useRef<SpeechSynthesis | null>(null)
  const [blocks, setBlocks] = useState<{ text: string; element: HTMLElement }[]>([])
  const currentBlockIndex = useRef(0)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Ref for heartbeat to prevent Chrome from stopping long speech
  const heartbeatTimer = useRef<NodeJS.Timeout | null>(null)

  // Initialize Speech Synthesis and Extract Article Blocks
  useEffect(() => {
    synth.current = window.speechSynthesis

    // Warm up voices and clear queue
    if (synth.current) {
      synth.current.cancel()
      synth.current.getVoices()
    }

    const handleVoicesChanged = () => {
      if (synth.current) synth.current.getVoices()
    }
    window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged)

    const parseArticle = () => {
      const article = document.querySelector(contentSelector)
      if (!article) return

      // Find all readable blocks in order
      const elements = Array.from(article.querySelectorAll("p, h2, h3, li, blockquote")) as HTMLElement[]
      const extractedBlocks = elements
        .map(el => ({
          text: el.innerText.trim(),
          element: el
        }))
        .filter(block => block.text.length > 5) // Ignore very short elements

      if (extractedBlocks.length > 0) {
        setBlocks(extractedBlocks)
      }
    }

    // Delay parsing slightly to ensure dynamic content is loaded
    const timer = setTimeout(parseArticle, 1000)

    return () => {
      clearTimeout(timer)
      window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged)
      if (synth.current) synth.current.cancel()
      if (heartbeatTimer.current) clearInterval(heartbeatTimer.current)
      clearHighlights()
    }
  }, [contentSelector])

  const clearHighlights = () => {
    blocks.forEach(b => {
      b.element.classList.remove("reading-highlight")
      b.element.style.transition = "all 0.3s ease"
    })
  }

  const highlightBlock = (index: number) => {
    clearHighlights()
    const block = blocks[index]
    if (block) {
      block.element.classList.add("reading-highlight")
      block.element.scrollIntoView({ behavior: "smooth", block: "center" })

      // Update global progress based on blocks
      setProgress(((index + 1) / blocks.length) * 100)
    }
  }

  const startHeartbeat = () => {
    if (heartbeatTimer.current) clearInterval(heartbeatTimer.current)
    heartbeatTimer.current = setInterval(() => {
      if (synth.current && isPlaying && !isPaused) {
        synth.current.pause()
        synth.current.resume()
      }
    }, 10000) // Heartbeat every 10 seconds to keep engine alive
  }

  const isPlayingRef = useRef(false)
  const isPausedRef = useRef(false)

  const playBlock = (index: number) => {
    if (!synth.current || index >= blocks.length || !isPlayingRef.current) {
      if (index >= blocks.length) handleStop()
      return
    }

    currentBlockIndex.current = index
    const block = blocks[index]

    // Create new utterance
    const u = new SpeechSynthesisUtterance(block.text)

    // Explicitly set a voice to prevent missing voice errors
    const voices = synth.current.getVoices()
    const preferredVoice = voices.find(v => v.lang.startsWith("en-") && v.localService) ||
      voices.find(v => v.lang.startsWith("en"))
    if (preferredVoice) u.voice = preferredVoice

    u.rate = rate
    u.pitch = 1
    u.volume = 1

    u.onstart = () => {
      highlightBlock(index)
    }

    u.onend = () => {
      // Small pause between blocks for more natural flow
      setTimeout(() => {
        if (isPlayingRef.current && !isPausedRef.current) {
          playBlock(index + 1)
        }
      }, 300)
    }

    u.onerror = (e: SpeechSynthesisErrorEvent) => {
      // Only stop if it's a real error (not just interrupted by a new request)
      if (e.error !== "interrupted") {
        handleStop()
      }
    }

    utteranceRef.current = u
    synth.current.speak(u)
  }

  const handlePlay = () => {
    if (!synth.current || blocks.length === 0) return
    setIsVisible(true)

    if (isPaused) {
      synth.current.resume()
      setIsPaused(false)
      isPausedRef.current = false
      setIsPlaying(true)
      isPlayingRef.current = true
      startHeartbeat()
      return
    }

    synth.current.cancel()

    // Brief timeout to let the cancel() clear the internal buffer
    setTimeout(() => {
      setIsPlaying(true)
      isPlayingRef.current = true
      isPausedRef.current = false
      startHeartbeat()
      playBlock(currentBlockIndex.current)
    }, 50)
  }

  const handlePause = () => {
    if (synth.current) {
      synth.current.pause()
      setIsPaused(true)
      isPausedRef.current = true
      setIsPlaying(false)
      isPlayingRef.current = false
      if (heartbeatTimer.current) clearInterval(heartbeatTimer.current)
    }
  }

  const handleStop = () => {
    if (synth.current) {
      synth.current.cancel()
      setIsPlaying(false)
      isPlayingRef.current = false
      setIsPaused(false)
      isPausedRef.current = false
      setProgress(0)
      currentBlockIndex.current = 0
      clearHighlights()
      if (heartbeatTimer.current) clearInterval(heartbeatTimer.current)
    }
  }

  const toggleRate = () => {
    const rates = [1, 1.25, 1.5, 2]
    const nextRate = rates[(rates.indexOf(rate) + 1) % rates.length]
    setRate(nextRate)

    if (isPlaying || isPaused) {
      const wasPlaying = isPlaying
      const currentIndex = currentBlockIndex.current
      handleStop()
      setTimeout(() => {
        setIsVisible(true)
        if (wasPlaying) playBlock(currentIndex)
      }, 100)
    }
  }

  return (
    <>
      <AnimatePresence>
        {(isVisible || isPlaying) && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className={cn(
              "fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] sm:w-[90%] max-w-2xl",
              !isExpanded ? "scale-95" : "scale-100"
            )}
          >
            <div className="glass p-3 sm:p-4 rounded-[32px] sm:rounded-[40px] border border-white/40 dark:border-white/10 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
                {!isExpanded ? (
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shrink-0 shadow-lg">
                      <Volume2 className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-bold truncate">{title}</h4>
                      <p className="text-[10px] text-muted-foreground">Reading Article...</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsExpanded(true)}>
                      <ChevronUp className="w-5 h-5" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-[20px] bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-xl shrink-0">
                        {isPlaying ? (
                          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                            <Volume2 className="w-6 h-6 sm:w-8 sm:h-8" />
                          </motion.div>
                        ) : <Volume2 className="w-6 h-6 sm:w-8 sm:h-8" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-black text-foreground truncate max-w-[200px] tracking-tight">{title}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] font-bold text-primary uppercase tracking-widest px-1.5 py-0.5 bg-primary/10 rounded-md">Voice AI</span>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Section {currentBlockIndex.current + 1}/{blocks.length}</span>
                        </div>
                      </div>

                      <div className="flex sm:hidden items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => setIsExpanded(false)} className="w-8 h-8 rounded-full">
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => { handleStop(); setIsVisible(false); }} className="w-8 h-8 rounded-full text-error/60">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Progress Bar Inside The Flow */}
                    <div className="flex-1 w-full mx-1 sm:mx-4">
                      <div className="w-full h-1.5 bg-muted/40 dark:bg-white/5 rounded-full overflow-hidden mb-1">
                        <motion.div
                          className="h-full bg-primary relative"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                        >
                          <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/20 blur-sm" />
                        </motion.div>
                      </div>
                      <div className="flex justify-between items-center text-[8px] font-bold tracking-widest text-muted-foreground uppercase italic px-1">
                        <span>{isPlaying ? "Reading" : isPaused ? "Paused" : "Ready"}</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={toggleRate}
                        className="h-9 rounded-full px-3 text-[10px] font-bold bg-muted/50 hover:bg-muted"
                      >
                        {rate}x
                      </Button>

                      <div className="flex items-center gap-2 bg-muted/30 dark:bg-white/5 rounded-full p-1 border border-border/50">
                        {isPlaying ? (
                          <Button onClick={handlePause} size="icon" className="w-10 h-10 rounded-full shadow-lg">
                            <Pause className="w-5 h-5 fill-current" />
                          </Button>
                        ) : (
                          <Button onClick={handlePlay} size="icon" className="w-10 h-10 rounded-full shadow-lg">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" onClick={handleStop} className="w-10 h-10 rounded-full text-muted-foreground">
                          <Square className="w-4 h-4 fill-current" />
                        </Button>
                      </div>

                      <div className="hidden sm:flex flex-col gap-1">
                        <Button variant="ghost" size="icon" onClick={() => setIsExpanded(false)} className="h-8 w-8 rounded-full">
                          <ChevronDown className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => { handleStop(); setIsVisible(false); }} className="h-8 w-8 rounded-full text-error/40 hover:text-error transition-colors">
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isVisible && (
        <button
          onClick={handlePlay}
          className="flex items-center gap-4 px-6 py-4 glass border border-primary/20 hover:border-primary/40 transition-all group my-8 w-fit rounded-2xl"
        >
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 fill-current ml-1" />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-foreground">Listen with Insight</div>
            <div className="text-[11px] text-muted-foreground">Immersive high-quality AI audio experience</div>
          </div>
        </button>
      )}
    </>
  )
}