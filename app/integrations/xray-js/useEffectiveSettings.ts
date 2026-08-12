import { useEffect, useState } from "react"
import { usePreferencesStore } from "@/store/preferences"
import type { App } from "@/types"

const getSystemTheme = (): App.Theme =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"

const useSystemTheme = (enabled: boolean): App.Theme => {
  const [theme, setTheme] = useState<App.Theme>(getSystemTheme)

  useEffect(() => {
    if (!enabled || typeof window.matchMedia !== "function") return
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const update = () => setTheme(media.matches ? "dark" : "light")
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [enabled])

  return theme
}

export const useEffectiveTheme = (): App.Theme => {
  const localThemePreference = usePreferencesStore((state) => state.themePrefer)
  const systemTheme = useSystemTheme(localThemePreference === "system")
  return localThemePreference === "system" ? systemTheme : localThemePreference
}

export const useEffectiveCurrency = () => usePreferencesStore((state) => state.currency)

export const useEffectiveHideBalances = () => usePreferencesStore((state) => state.hideBalances)
