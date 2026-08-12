import { useEffect, useState } from "react"
import {
  cardano,
  useCurrency as useHostCurrency,
  useHideBalances as useHostHideBalances,
  useHostContext,
  useMiniApp,
  useTheme as useHostTheme,
} from "@xray-network/xray-js/mini-app-bridge/react"
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

export const useEffectivePlatformSettings = () => {
  const { connected } = useMiniApp()
  const hostTheme = useHostTheme()
  const hostCurrency = useHostCurrency()
  const hostHideBalances = useHostHideBalances()
  const localThemePreference = usePreferencesStore((state) => state.themePrefer)
  const localCurrency = usePreferencesStore((state) => state.currency)
  const localHideBalances = usePreferencesStore((state) => state.hideBalances)
  const systemTheme = useSystemTheme(localThemePreference === "system")

  return {
    theme: connected && hostTheme ? hostTheme : localThemePreference === "system" ? systemTheme : localThemePreference,
    currency: connected && hostCurrency ? hostCurrency : localCurrency,
    hideBalances: connected && hostHideBalances !== null ? hostHideBalances : localHideBalances,
    ready:
      connected === false ||
      (connected === true && hostTheme !== null && hostCurrency !== null && hostHideBalances !== null),
  }
}

export const useEffectiveTheme = (): App.Theme => useEffectivePlatformSettings().theme

export const useEffectiveHostContext = () => {
  const { connected } = useMiniApp()
  const hostContext = useHostContext()
  return connected ? hostContext : null
}

export const useEffectiveNetwork = () => {
  const hostContext = useEffectiveHostContext()
  const localNetwork = usePreferencesStore((state) => state.network)
  return hostContext?.blockchain === "cardano" ? hostContext.network : localNetwork
}

export const useEffectiveCurrency = () => {
  return useEffectivePlatformSettings().currency
}

export const useEffectiveHideBalances = () => {
  return useEffectivePlatformSettings().hideBalances
}

export const useEffectiveExplorer = () => {
  const { connected } = useMiniApp()
  const hostExplorer = cardano.bridge.useExplorer()
  const localExplorer = usePreferencesStore((state) => state.explorer)
  return connected && hostExplorer ? hostExplorer : localExplorer
}
