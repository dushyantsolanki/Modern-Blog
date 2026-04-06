"use client"

import React, { useState, useEffect, useRef } from "react"
import { Play, Pause, Square, Volume2, X, ChevronUp, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

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
  const utterance = useRef<SpeechSynthesisUtterance | null>(null)
  
  const [fullText, setFullText] = useState("")
  const wordSpans = useRef<HTMLSpanElement[]>([])
  const currentHighlightRef = useRef<HTMLSpanElement | null>(null)
  const lastCharIndex = useRef<number>(0)
  
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null)

  // Fallback progress state for mobile browsers that don't fire onboundary
  const fallbackTimer = useRef<number | null>(null)
  const startTime = useRef<number | null>(null)
  const startCharIndex = useRef<number>(0)
  
  // Track user manual scrolling to prevent auto-scrolling conflicts on mobile
  const isUserScrolling = useRef(false)
  const isSwitching = useRef(false)

  const clearHighlights = () => {
    wordSpans.current.forEach(span => span.classList.remove("highlight-word"))
    currentHighlightRef.current = null
  }

  const stopFallbackTimer = () => {
    if (fallbackTimer.current) {
        cancelAnimationFrame(fallbackTimer.current)
        fallbackTimer.current = null
    }
  }

  // Initialization & Global Event Listeners
  useEffect(() => {
    synth.current = window.speechSynthesis
    
    if (synth.current) {
      synth.current.cancel()
    }

    const updateVoices = () => {
      if (!synth.current) return
      const availableVoices = synth.current.getVoices()
      const enVoices = availableVoices.filter(v => v.lang.startsWith("en"))
      setVoices(enVoices)
      
      const savedVoiceName = localStorage.getItem('audio-voice-pref')
      if (savedVoiceName) {
        const pref = enVoices.find(v => v.name === savedVoiceName)
        if (pref) setSelectedVoice(pref)
      }

      if (!selectedVoice && enVoices.length > 0 && !savedVoiceName) {
        const premium = enVoices.find(v => v.name.includes("Siri") || v.name.includes("Samantha") || v.name.includes("Google US English"))
        setSelectedVoice(premium || enVoices[0])
      }
    }

    updateVoices()
    if (synth.current) synth.current.onvoiceschanged = updateVoices

    const savedProgress = localStorage.getItem(`audio-progress-${title}`)
    const content = document.querySelector(contentSelector)
    if (content) {
      const text = content.textContent || ""
      setFullText(text)
      if (savedProgress) {
        const index = parseInt(savedProgress)
        lastCharIndex.current = index
        setProgress((index / (text.length || 1)) * 100)
        setIsVisible(true)
      }
    }

    const handleTouchStart = () => { isUserScrolling.current = true }
    const handleTouchEnd = () => { 
      setTimeout(() => { isUserScrolling.current = false }, 2000) 
    }
    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      if (synth.current) {
        synth.current.cancel()
        synth.current.onvoiceschanged = null
      }
      stopFallbackTimer()
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
      clearHighlights()
    }
  }, [contentSelector, title])

  const instrumentContent = () => {
    const article = document.querySelector(contentSelector)
    if (!article || (wordSpans.current.length > 0 && article.querySelectorAll('.reader-word').length > 0)) {
        if (wordSpans.current.length === 0) {
           wordSpans.current = Array.from(article?.querySelectorAll('.reader-word') || []) as HTMLSpanElement[]
        }
        return article?.textContent || fullText
    }

    const spans: HTMLSpanElement[] = []
    let accumulatedText = ""

    const walk = (node: Node) => {
      if (node instanceof HTMLElement && (
        node.tagName === "SCRIPT" || node.tagName === "STYLE" || 
        node.tagName === "BUTTON" || node.tagName === "NAV" ||
        node.tagName === "HEADER" || node.classList.contains("no-read")
      )) return

      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue || ""
        if (!text.trim()) {
           accumulatedText += text
           return
        }

        const fragment = document.createDocumentFragment()
        const parts = text.split(/(\b)/g) 

        parts.forEach(part => {
          if (/\w+/.test(part)) {
            const span = document.createElement("span")
            span.className = "reader-word transition-all duration-200"
            span.textContent = part
            span.dataset.start = accumulatedText.length.toString()
            accumulatedText += part
            span.dataset.end = accumulatedText.length.toString()
            fragment.appendChild(span)
            spans.push(span)
          } else {
            const textNode = document.createTextNode(part)
            accumulatedText += part
            fragment.appendChild(textNode)
          }
        })
        node.parentNode?.replaceChild(fragment, node)
      } else {
        Array.from(node.childNodes).forEach(child => walk(child))
      }
    }

    walk(article)
    wordSpans.current = spans
    const final = article.textContent || ""
    setFullText(final)
    return final
  }

  // Instrumentation: Resilient trigger
  useEffect(() => {
    if (isVisible || isPlaying) {
      const runInstrument = () => {
        instrumentContent()
        if (wordSpans.current.length === 0 && (isVisible || isPlaying)) {
           setTimeout(runInstrument, 200)
        }
      }
      runInstrument()
      
      const observer = new MutationObserver(() => {
        wordSpans.current = []
        runInstrument()
      })
      
      const article = document.querySelector(contentSelector)
      if (article) observer.observe(article, { childList: true, subtree: true, characterData: true })
      return () => observer.disconnect()
    }
  }, [isVisible, isPlaying, contentSelector])

  const startFallbackTracking = (startIndex: number, currentRate: number) => {
    stopFallbackTimer()
    startTime.current = performance.now()
    startCharIndex.current = startIndex
    
    const charsPerMs = (18 / 1000) * currentRate 

    const step = (now: number) => {
      if (!startTime.current || !isPlaying) return

      const elapsed = now - startTime.current
      const estimatedCharsRead = Math.floor(elapsed * charsPerMs)
      const currentIdx = Math.min(startCharIndex.current + estimatedCharsRead, fullText.length)
      
      if (fullText.length > 0) {
        const p = (currentIdx / fullText.length) * 100
        setProgress(p)
        lastCharIndex.current = currentIdx
        localStorage.setItem(`audio-progress-${title}`, currentIdx.toString())
      }

      const targetSpan = wordSpans.current.find(span => {
        const start = parseInt(span.dataset.start || "0")
        const end = parseInt(span.dataset.end || "0")
        return currentIdx >= start && currentIdx < end
      })

      if (targetSpan && targetSpan !== currentHighlightRef.current) {
        clearHighlights()
        targetSpan.classList.add("highlight-word")
        currentHighlightRef.current = targetSpan
        if (!isUserScrolling.current) {
          targetSpan.scrollIntoView({ behavior: window.innerWidth < 640 ? "auto" : "smooth", block: "center" })
        }
      }

      if (currentIdx < fullText.length && isPlaying) {
        fallbackTimer.current = requestAnimationFrame(step)
      }
    }
    fallbackTimer.current = requestAnimationFrame(step)
  }

  const speakFromIndex = (startIndex: number, currentRate: number) => {
    if (!synth.current) return
    instrumentContent()

    const totalText = fullText
    const textToRead = totalText.substring(startIndex)
    if (!textToRead) return

    const u = new SpeechSynthesisUtterance(textToRead)
    u.rate = currentRate
    u.pitch = 1
    u.volume = 1
    if (selectedVoice) u.voice = selectedVoice

    startFallbackTracking(startIndex, currentRate)

    u.onboundary = (event) => {
      if (event.name === "word") {
        const absoluteCharIndex = startIndex + event.charIndex
        startTime.current = performance.now()
        startCharIndex.current = absoluteCharIndex
        
        lastCharIndex.current = absoluteCharIndex
        setProgress((absoluteCharIndex / totalText.length) * 100)

        const targetSpan = wordSpans.current.find(span => {
          const start = parseInt(span.dataset.start || "0")
          const end = parseInt(span.dataset.end || "0")
          return (absoluteCharIndex >= start - 1 && absoluteCharIndex < end)
        })

        if (targetSpan && targetSpan !== currentHighlightRef.current) {
          clearHighlights()
          targetSpan.classList.add("highlight-word")
          currentHighlightRef.current = targetSpan
          if (!isUserScrolling.current) {
            targetSpan.scrollIntoView({ behavior: window.innerWidth < 640 ? "auto" : "smooth", block: "center" })
          }
        }
      }
    }

    u.onend = () => {
      // Don't reset if we are just switching voices/rates
      if (isSwitching.current) return

      if (synth.current && !synth.current.paused) {
        setIsPlaying(false)
        setIsPaused(false)
        setProgress(0)
        lastCharIndex.current = 0
        localStorage.removeItem(`audio-progress-${title}`)
        clearHighlights()
        stopFallbackTimer()
      }
    }

    utterance.current = u
    synth.current.speak(u)
    setIsPlaying(true)
    setIsVisible(true)
  }

  const handlePlay = () => {
    if (!synth.current) return
    if (isPaused) {
      synth.current.resume()
      setIsPaused(false)
      setIsPlaying(true)
      startFallbackTracking(lastCharIndex.current, rate)
      return
    }
    const textReady = instrumentContent()
    if (!textReady) return

    // Small delay for mobile browsers to finalize DOM layout after instrumentation
    setTimeout(() => {
      speakFromIndex(lastCharIndex.current, rate)
    }, 100)
  }

  const handlePause = () => {
    if (synth.current) {
      synth.current.pause()
      setIsPaused(true)
      setIsPlaying(false)
      stopFallbackTimer()
    }
  }

  const handleStop = () => {
    if (synth.current) {
      synth.current.cancel()
      setIsPlaying(false)
      setIsPaused(false)
      setProgress(0)
      lastCharIndex.current = 0
      localStorage.removeItem(`audio-progress-${title}`)
      clearHighlights()
      stopFallbackTimer()
    }
  }

  // Soft stop for switching voices/rates without resetting progress UI
  const softStop = () => {
    if (synth.current) {
      synth.current.cancel()
      stopFallbackTimer()
    }
  }

  const toggleRate = () => {
    const rates = [1, 1.25, 1.5, 2]
    const nextRate = rates[(rates.indexOf(rate) + 1) % rates.length]
    setRate(nextRate)
    
    if (isPlaying || isPaused) {
      const savedIndex = lastCharIndex.current
      isSwitching.current = true
      softStop()
      // Increased timeout for mobile stability to let cancel() finish
      setTimeout(() => {
        speakFromIndex(savedIndex, nextRate)
        isSwitching.current = false
      }, 150)
    }
  }

  const selectVoice = (voice: SpeechSynthesisVoice) => {
    setSelectedVoice(voice)
    localStorage.setItem('audio-voice-pref', voice.name)
    
    if (isPlaying || isPaused) {
      const savedIndex = lastCharIndex.current
      isSwitching.current = true
      softStop()
      setTimeout(() => {
        speakFromIndex(savedIndex, rate)
        isSwitching.current = false
      }, 150)
    }
  }

  const handleNextVoice = () => {
    if (voices.length === 0) return
    const currentIndex = voices.findIndex(v => v.name === selectedVoice?.name)
    const nextIndex = (currentIndex + 1) % voices.length
    selectVoice(voices[nextIndex])
  }

  const handlePrevVoice = () => {
    if (voices.length === 0) return
    const currentIndex = voices.findIndex(v => v.name === selectedVoice?.name)
    const prevIndex = (currentIndex - 1 + voices.length) % voices.length
    selectVoice(voices[prevIndex])
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
              "fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] sm:w-[90%] max-w-2xl transition-all duration-300 ease-apple",
              !isExpanded ? "scale-90" : "scale-100"
            )}
          >
            <div className="glass p-3 sm:p-4 rounded-[32px] sm:rounded-[40px] border border-white/40 dark:border-white/10 shadow-2xl relative">
               <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
                  {!isExpanded ? (
                      <div className="flex items-center gap-4 w-full">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                           <Volume2 className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0 pr-4">
                           <h4 className="text-[13px] font-bold truncate tracking-tight">{title}</h4>
                        </div>
                        <button onClick={() => setIsExpanded(true)} className="p-2 hover:bg-muted font-bold rounded-full transition-colors">
                           <ChevronUp className="w-5 h-5" />
                        </button>
                      </div>
                  ) : (
                      <>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-[20px] sm:rounded-[24px] bg-gradient-to-br from-primary to-accent-light flex items-center justify-center text-white shadow-xl shadow-primary/10 shrink-0">
                               {isPlaying ? (
                                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
                                     <Volume2 className="w-6 h-6 sm:w-8 sm:h-8" />
                                  </motion.div>
                               ) : <Volume2 className="w-6 h-6 sm:w-8 sm:h-8" />}
                            </div>

                            <div className="flex-1 min-w-0">
                               <div className="flex flex-col">
                                  <h4 className="text-[13px] sm:text-sm font-black text-foreground truncate max-w-[140px] tracking-tight">{title}</h4>
                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    <button onClick={handlePrevVoice} className="p-1 hover:bg-muted rounded-full transition-colors text-primary">
                                      <ChevronUp className="w-3 h-3 -rotate-90" />
                                    </button>
                                    <AnimatePresence mode="wait">
                                      <motion.span 
                                        key={selectedVoice?.name}
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 5 }}
                                        className="text-[10px] font-bold text-primary truncate max-w-[90px]"
                                      >
                                        {selectedVoice?.name.split(' ')[0] || "Select Voice"}
                                      </motion.span>
                                    </AnimatePresence>
                                    <button onClick={handleNextVoice} className="p-1 hover:bg-muted rounded-full transition-colors text-primary">
                                      <ChevronUp className="w-3 h-3 rotate-90" />
                                    </button>
                                  </div>
                               </div>
                            </div>

                            <div className="flex sm:hidden items-center gap-1">
                                <button onClick={() => setIsExpanded(false)} className="p-2 hover:bg-muted rounded-full">
                                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                </button>
                                <button onClick={() => { handleStop(); setIsVisible(false); }} className="p-2 hover:bg-error/10 text-error/60 rounded-full">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 w-full mx-1">
                           <div className="w-full h-2 sm:h-2.5 bg-muted/40 dark:bg-white/5 rounded-full overflow-hidden mb-1 sm:mb-0">
                              <motion.div className="h-full bg-primary relative" initial={{ width: 0 }} animate={{ width: `${progress}%` }}>
                                 <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/20 blur-sm" />
                              </motion.div>
                           </div>
                           <div className="flex justify-between items-center sm:hidden mt-1 px-1">
                               <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Post Reader</span>
                               <span className="text-[8px] font-bold text-primary animate-pulse">{isPlaying ? "Live Tracking" : "Paused"}</span>
                           </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto mt-1 sm:mt-0">
                           <button onClick={toggleRate} className="w-10 h-10 sm:w-11 sm:h-11 rounded-full hover:bg-muted font-bold flex items-center justify-center text-[10px] border border-border/50 transition-all shrink-0">
                             {rate}x
                           </button>
                           <div className="flex items-center gap-2 bg-muted/40 dark:bg-white/5 rounded-full p-1.5 border border-border/50 flex-1 sm:flex-none justify-center">
                              {isPlaying ? (
                                 <button onClick={handlePause} className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 active:scale-90 transition-transform">
                                    <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                                 </button>
                              ) : (
                                 <button onClick={handlePlay} className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 active:scale-90 transition-transform">
                                    <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-1" />
                                 </button>
                              )}
                              <button onClick={handleStop} className="w-10 h-10 sm:w-11 sm:h-11 rounded-full hover:bg-muted text-muted-foreground flex items-center justify-center transition-colors">
                                 <Square className="w-4 h-4 fill-current" />
                              </button>
                           </div>
                           <div className="hidden sm:flex flex-col gap-1.5">
                              <button onClick={() => setIsExpanded(false)} className="p-1.5 hover:bg-muted rounded-full transition-colors">
                                 <ChevronDown className="w-5 h-5 text-muted-foreground" />
                              </button>
                              <button onClick={() => { handleStop(); setIsVisible(false); }} className="p-1.5 hover:bg-error/10 text-error/60 rounded-full transition-colors">
                                 <X className="w-5 h-5" />
                              </button>
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
          className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl glass border border-primary/20 hover:border-primary/40 transition-all group my-6 sm:my-8 w-fit"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-1" />
          </div>
          <div className="text-left">
            <div className="text-[13px] sm:text-sm font-bold text-foreground">Listen to this article</div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">High-quality AI voice with real-time tracking</div>
          </div>
        </button>
      )}
    </>
  )
}
