"use client"

import * as React from "react"
import { Languages, Check, ChevronDown, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

/* ---------- TypeScript shims for Google Translate on window ---------- */
declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string
            autoDisplay: boolean
          },
          elementId: string
        ) => unknown
      }
    }
  }
}

/* ---------- All Google Translate supported languages ---------- */
const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "af", label: "Afrikaans", flag: "🇿🇦" },
  { code: "sq", label: "Albanian", flag: "🇦🇱" },
  { code: "am", label: "Amharic", flag: "🇪🇹" },
  { code: "ar", label: "Arabic", flag: "🇸🇦" },
  { code: "hy", label: "Armenian", flag: "🇦🇲" },
  { code: "az", label: "Azerbaijani", flag: "🇦🇿" },
  { code: "eu", label: "Basque", flag: "🇪🇸" },
  { code: "be", label: "Belarusian", flag: "🇧🇾" },
  { code: "bn", label: "Bengali", flag: "🇧🇩" },
  { code: "bs", label: "Bosnian", flag: "🇧🇦" },
  { code: "bg", label: "Bulgarian", flag: "🇧🇬" },
  { code: "ca", label: "Catalan", flag: "🇪🇸" },
  { code: "ceb", label: "Cebuano", flag: "🇵🇭" },
  { code: "ny", label: "Chichewa", flag: "🇲🇼" },
  { code: "zh-CN", label: "Chinese (Simplified)", flag: "🇨🇳" },
  { code: "zh-TW", label: "Chinese (Traditional)", flag: "🇹🇼" },
  { code: "co", label: "Corsican", flag: "🇫🇷" },
  { code: "hr", label: "Croatian", flag: "🇭🇷" },
  { code: "cs", label: "Czech", flag: "🇨🇿" },
  { code: "da", label: "Danish", flag: "🇩🇰" },
  { code: "nl", label: "Dutch", flag: "🇳🇱" },
  { code: "eo", label: "Esperanto", flag: "🌍" },
  { code: "et", label: "Estonian", flag: "🇪🇪" },
  { code: "tl", label: "Filipino", flag: "🇵🇭" },
  { code: "fi", label: "Finnish", flag: "🇫🇮" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "fy", label: "Frisian", flag: "🇳🇱" },
  { code: "gl", label: "Galician", flag: "🇪🇸" },
  { code: "ka", label: "Georgian", flag: "🇬🇪" },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "el", label: "Greek", flag: "🇬🇷" },
  { code: "gu", label: "Gujarati", flag: "🇮🇳" },
  { code: "ht", label: "Haitian Creole", flag: "🇭🇹" },
  { code: "ha", label: "Hausa", flag: "🇳🇬" },
  { code: "haw", label: "Hawaiian", flag: "🇺🇸" },
  { code: "iw", label: "Hebrew", flag: "🇮🇱" },
  { code: "hi", label: "Hindi", flag: "🇮🇳" },
  { code: "hmn", label: "Hmong", flag: "🌏" },
  { code: "hu", label: "Hungarian", flag: "🇭🇺" },
  { code: "is", label: "Icelandic", flag: "🇮🇸" },
  { code: "ig", label: "Igbo", flag: "🇳🇬" },
  { code: "id", label: "Indonesian", flag: "🇮🇩" },
  { code: "ga", label: "Irish", flag: "🇮🇪" },
  { code: "it", label: "Italian", flag: "🇮🇹" },
  { code: "ja", label: "Japanese", flag: "🇯🇵" },
  { code: "jw", label: "Javanese", flag: "🇮🇩" },
  { code: "kn", label: "Kannada", flag: "🇮🇳" },
  { code: "kk", label: "Kazakh", flag: "🇰🇿" },
  { code: "km", label: "Khmer", flag: "🇰🇭" },
  { code: "rw", label: "Kinyarwanda", flag: "🇷🇼" },
  { code: "ko", label: "Korean", flag: "🇰🇷" },
  { code: "ku", label: "Kurdish", flag: "🌍" },
  { code: "ky", label: "Kyrgyz", flag: "🇰🇬" },
  { code: "lo", label: "Lao", flag: "🇱🇦" },
  { code: "la", label: "Latin", flag: "🏛️" },
  { code: "lv", label: "Latvian", flag: "🇱🇻" },
  { code: "lt", label: "Lithuanian", flag: "🇱🇹" },
  { code: "lb", label: "Luxembourgish", flag: "🇱🇺" },
  { code: "mk", label: "Macedonian", flag: "🇲🇰" },
  { code: "mg", label: "Malagasy", flag: "🇲🇬" },
  { code: "ms", label: "Malay", flag: "🇲🇾" },
  { code: "ml", label: "Malayalam", flag: "🇮🇳" },
  { code: "mt", label: "Maltese", flag: "🇲🇹" },
  { code: "mi", label: "Maori", flag: "🇳🇿" },
  { code: "mr", label: "Marathi", flag: "🇮🇳" },
  { code: "mn", label: "Mongolian", flag: "🇲🇳" },
  { code: "my", label: "Myanmar (Burmese)", flag: "🇲🇲" },
  { code: "ne", label: "Nepali", flag: "🇳🇵" },
  { code: "no", label: "Norwegian", flag: "🇳🇴" },
  { code: "or", label: "Odia (Oriya)", flag: "🇮🇳" },
  { code: "ps", label: "Pashto", flag: "🇦🇫" },
  { code: "fa", label: "Persian", flag: "🇮🇷" },
  { code: "pl", label: "Polish", flag: "🇵🇱" },
  { code: "pt", label: "Portuguese", flag: "🇵🇹" },
  { code: "pa", label: "Punjabi", flag: "🇮🇳" },
  { code: "ro", label: "Romanian", flag: "🇷🇴" },
  { code: "ru", label: "Russian", flag: "🇷🇺" },
  { code: "sm", label: "Samoan", flag: "🇼🇸" },
  { code: "gd", label: "Scots Gaelic", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  { code: "sr", label: "Serbian", flag: "🇷🇸" },
  { code: "st", label: "Sesotho", flag: "🇱🇸" },
  { code: "sn", label: "Shona", flag: "🇿🇼" },
  { code: "sd", label: "Sindhi", flag: "🇵🇰" },
  { code: "si", label: "Sinhala", flag: "🇱🇰" },
  { code: "sk", label: "Slovak", flag: "🇸🇰" },
  { code: "sl", label: "Slovenian", flag: "🇸🇮" },
  { code: "so", label: "Somali", flag: "🇸🇴" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "su", label: "Sundanese", flag: "🇮🇩" },
  { code: "sw", label: "Swahili", flag: "🇰🇪" },
  { code: "sv", label: "Swedish", flag: "🇸🇪" },
  { code: "tg", label: "Tajik", flag: "🇹🇯" },
  { code: "ta", label: "Tamil", flag: "🇮🇳" },
  { code: "tt", label: "Tatar", flag: "🇷🇺" },
  { code: "te", label: "Telugu", flag: "🇮🇳" },
  { code: "th", label: "Thai", flag: "🇹🇭" },
  { code: "tr", label: "Turkish", flag: "🇹🇷" },
  { code: "tk", label: "Turkmen", flag: "🇹🇲" },
  { code: "uk", label: "Ukrainian", flag: "🇺🇦" },
  { code: "ur", label: "Urdu", flag: "🇵🇰" },
  { code: "ug", label: "Uyghur", flag: "🇨🇳" },
  { code: "uz", label: "Uzbek", flag: "🇺🇿" },
  { code: "vi", label: "Vietnamese", flag: "🇻🇳" },
  { code: "cy", label: "Welsh", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" },
  { code: "xh", label: "Xhosa", flag: "🇿🇦" },
  { code: "yi", label: "Yiddish", flag: "🌍" },
  { code: "yo", label: "Yoruba", flag: "🇳🇬" },
  { code: "zu", label: "Zulu", flag: "🇿🇦" },
]

type LangCode = string

/* ---------- Cookie helpers ---------- */

function getGoogTransCookie(): LangCode {
  if (typeof document === "undefined") return "en"

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("googtrans="))

  if (!match) return "en"

  const value = decodeURIComponent(match.split("=")[1] || "")
  const targetLang = value.split("/").filter(Boolean)[1]

  if (targetLang && LANGUAGES.some((l) => l.code === targetLang)) {
    return targetLang
  }
  return "en"
}

function setGoogTransCookie(lang: LangCode) {
  if (typeof document === "undefined") return

  const value = lang === "en" ? "" : `/en/${lang}`

  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`

  if (value) {
    document.cookie = `googtrans=${value}; path=/;`
    document.cookie = `googtrans=${value}; path=/; domain=${window.location.hostname};`
  }
}

/* ---------- Dispatch language change with retries ---------- */

function changeLanguageWithRetry(lang: string, attempt = 0, maxAttempts = 15) {
  const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null

  if (select) {
    select.value = lang
    select.dispatchEvent(new Event("change"))
    return
  }

  if (attempt < maxAttempts) {
    const delay = Math.min(100 + attempt * 100, 800)
    setTimeout(() => changeLanguageWithRetry(lang, attempt + 1, maxAttempts), delay)
  }
}

/* ================================================================== */

export function GoogleTranslate() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeLang, setActiveLang] = React.useState<LangCode>("en")
  const [searchQuery, setSearchQuery] = React.useState("")
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  /* ---- 1. Load script & restore cookie on mount ---- */
  React.useEffect(() => {
    const saved = getGoogTransCookie()
    setActiveLang(saved)

    if (document.getElementById("google-translate-script")) {
      if (saved !== "en") {
        setTimeout(() => changeLanguageWithRetry(saved), 500)
      }
      return
    }

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      )

      if (saved !== "en") {
        setTimeout(() => changeLanguageWithRetry(saved), 300)
      }
    }

    const script = document.createElement("script")
    script.id = "google-translate-script"
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    script.async = true
    document.body.appendChild(script)
  }, [])

  /* ---- 2. Close dropdown on outside click ---- */
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setSearchQuery("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  /* ---- 3. Close dropdown on Escape key ---- */
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false)
        setSearchQuery("")
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  /* ---- 4. Auto-focus search when dropdown opens ---- */
  React.useEffect(() => {
    if (isOpen && searchInputRef.current) {
      // Small delay to let animation start
      setTimeout(() => searchInputRef.current?.focus(), 50)
    }
  }, [isOpen])

  /* ---- Filtered languages ---- */
  const filteredLanguages = React.useMemo(() => {
    if (!searchQuery.trim()) return LANGUAGES

    const q = searchQuery.toLowerCase()
    return LANGUAGES.filter((l) => l.label.toLowerCase().includes(q))
  }, [searchQuery])

  /* ---- Handlers ---- */
  const handleSelect = (code: LangCode) => {
    if (code === activeLang) {
      setIsOpen(false)
      setSearchQuery("")
      return
    }

    setActiveLang(code)
    setIsOpen(false)
    setSearchQuery("")

    setGoogTransCookie(code)
    window.location.reload()
  }

  const activeItem = LANGUAGES.find((l) => l.code === activeLang) || LANGUAGES[0]

  return (
    <>
      {/* Hidden container for the Google Translate widget */}
      <div id="google_translate_element" className="hidden" />

      {/* Custom language picker */}
      <div ref={dropdownRef} className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen((v) => !v)}
          className={cn(
            "relative flex h-9 items-center gap-1.5 rounded-full px-2.5 transition-all duration-300",
            "bg-transparent hover:bg-muted/50 focus:outline-none text-muted-foreground hover:text-foreground",
            isOpen && "bg-muted/50 text-foreground"
          )}
          aria-label="Change language"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <Languages className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.5} />
          <span className="hidden sm:inline text-xs font-medium tracking-tight">
            {activeItem.flag}
          </span>
          <ChevronDown
            className={cn(
              "h-3 w-3 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
            strokeWidth={2}
          />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              className={cn(
                "absolute right-0 top-full mt-2 z-50 w-[220px] overflow-hidden rounded-xl",
                "border border-border/60 bg-surface/90 shadow-xl shadow-black/10",
                "dark:shadow-black/30 dark:border-border/40"
              )}
              role="listbox"
              aria-label="Select language"
            >
              {/* Search input */}
              <div className="p-2 border-b border-border/40">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" strokeWidth={2} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search language..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      "w-full rounded-lg bg-muted/30 border border-border/40 py-1.5 pl-8 pr-3",
                      "text-xs text-foreground placeholder:text-muted-foreground/50",
                      "focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20",
                      "transition-colors"
                    )}
                  />
                </div>
              </div>

              {/* Language list */}
              <div className="max-h-[280px] overflow-y-auto overscroll-contain p-1">
                {filteredLanguages.length > 0 ? (
                  filteredLanguages.map((lang) => {
                    const isActive = lang.code === activeLang
                    return (
                      <button
                        key={lang.code}
                        onClick={() => handleSelect(lang.code)}
                        role="option"
                        aria-selected={isActive}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        )}
                      >
                        <span className="text-base leading-none shrink-0">{lang.flag}</span>
                        <span className="flex-1 text-left truncate">{lang.label}</span>
                        {isActive && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className="shrink-0"
                          >
                            <Check className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
                          </motion.span>
                        )}
                      </button>
                    )
                  })
                ) : (
                  <div className="px-3 py-6 text-center">
                    <p className="text-xs text-muted-foreground">No languages found</p>
                  </div>
                )}
              </div>

              <div className="border-t border-border/40 px-3 py-1.5">
                <p className="text-[10px] text-muted-foreground/60 text-center">
                  Powered by Google Translate
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
