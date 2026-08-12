import { create } from "zustand"
import { persist } from "zustand/middleware"
import { ZUSTAND_STORE_PREFIX } from "@/config"
import type { Currencies, ThemePrefer } from "@/types/app"

interface PreferencesState {
  themePrefer: ThemePrefer
  setThemePreference: (theme: ThemePrefer) => void
  currency: Currencies
  setCurrency: (currency: Currencies) => void
  hideBalances: boolean
  setHideBalances: (hide: boolean) => void
}

/** Standalone preferences; an embedding host synchronizes authoritative values into this store. */
export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      themePrefer: "system",
      setThemePreference: (themePrefer) => set({ themePrefer }),
      currency: "usd",
      setCurrency: (currency) => set({ currency }),
      hideBalances: false,
      setHideBalances: (hideBalances) => set({ hideBalances }),
    }),
    {
      name: `${ZUSTAND_STORE_PREFIX}.app`,
      version: 1,
      partialize: ({ themePrefer, currency, hideBalances }) => ({
        themePrefer,
        currency,
        hideBalances,
      }),
    }
  )
)
