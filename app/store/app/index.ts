import { create } from "zustand"
import { persist } from "zustand/middleware"
import * as config from "@/config"
import * as Types from "@/types"

/**
 * Local app state: UI state + user settings.
 *
 * Settings are the local defaults, persisted between sessions. While the app
 * is connected to the XRAY host, host pushes overwrite them (see
 * <HostSettingsSync /> in app/effects.tsx). Live host data (connection status,
 * chain tip, account state) is not stored here — read it directly from the
 * SDK hooks: useMiniApp(), useTip(), useAccountState().
 */
interface AppStoreState {
  // Theme
  themePrefer: Types.App.ThemePrefer
  theme: Types.App.Theme
  initTheme: () => void
  changeTheme: (theme: Types.App.ThemePrefer) => void

  // Modals & menus
  modalSettings: boolean
  modalSettingsSet: (open: boolean) => void
  menuDrawerOpen: boolean
  menuDrawerOpenSet: (open: boolean) => void

  // Settings
  network: Types.CW3Types.NetworkName
  networkSet: (network: Types.CW3Types.NetworkName) => void
  currency: Types.App.Currencies
  currencySet: (currency: Types.App.Currencies) => void
  hideBalances: boolean
  hideBalancesSet: (hide: boolean) => void
  explorer: Types.App.Explorer
  explorerSet: (explorer: Types.App.Explorer) => void
}

const getSystemTheme = (): Types.App.Theme => {
  if (typeof window === "undefined") return "dark" // fallback for SSR
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export const useAppStore = create<AppStoreState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: "light",
      themePrefer: "system",
      initTheme: () => {
        get().changeTheme(get().themePrefer)
      },
      changeTheme: (theme) => {
        set({
          theme: theme === "system" ? getSystemTheme() : theme,
          themePrefer: theme,
        })
      },

      // Modals & menus
      modalSettings: false,
      modalSettingsSet: (open) => set({ modalSettings: open }),
      menuDrawerOpen: false,
      menuDrawerOpenSet: (open) => set({ menuDrawerOpen: open }),

      // Settings
      network: "mainnet",
      networkSet: (network) => set({ network }),
      currency: "usd",
      currencySet: (currency) => set({ currency }),
      hideBalances: false,
      hideBalancesSet: (hide) => set({ hideBalances: hide }),
      explorer: "cardanoscan",
      explorerSet: (explorer) => set({ explorer }),
    }),
    // Persist configuration
    {
      name: `${config.ZUSTAND_STORE_PREFIX}.app`,
      version: 1,
      partialize: (state) => ({
        themePrefer: state.themePrefer,
        network: state.network,
        currency: state.currency,
        hideBalances: state.hideBalances,
        explorer: state.explorer,
      }),
    }
  )
)
