"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle({ mobile = false }: { mobile?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark")

  if (mobile) {
    return (
      <button
        onClick={toggle}
        aria-label="Toggle theme"
        className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted transition-all"
      >
        {mounted && resolvedTheme === "dark" ? (
          <Sun className="h-4 w-4 flex-shrink-0" />
        ) : (
          <Moon className="h-4 w-4 flex-shrink-0" />
        )}
        <span>{mounted && resolvedTheme === "dark" ? "Light mode" : "Dark mode"}</span>
      </button>
    )
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative flex items-center justify-center w-9 h-9 rounded-lg text-foreground/60 hover:text-foreground hover:bg-muted transition-all"
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  )
}
