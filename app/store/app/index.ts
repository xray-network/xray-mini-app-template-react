import { create } from "zustand"
import { persist } from "zustand/middleware"
import { useWeb3Store } from "@/store/web3"
import * as config from "@/config"
import * as Types from "@/types"

interface AppStoreState {
  // XRAY Connection
  connectedToSDK: boolean
  connectedToSDKSet: (connected: boolean) => void

  // Theme
  themePrefer: Types.App.ThemePrefer
  theme: Types.App.Theme
  initTheme: () => void
  changeTheme: (theme: Types.App.ThemePrefer) => void

  // Modals
  modalSettings: boolean
  modalSettingsSet: (open: boolean) => void

  // Menu
  menuDrawerOpen: boolean
  menuDrawerOpenSet: (open: boolean) => void

  // Settings
  currency: Types.App.Currencies
  currencySet: (currency: Types.App.Currencies) => void
  hideBalances: boolean
  hideBalancesSet: (hide: boolean) => void
  explorer: Types.App.Explorer
  explorerSet: (explorer: Types.App.Explorer) => void

  // Tip
  tip: Types.CW3Types.Tip | null
  updateTip: (tip: Types.CW3Types.Tip | null) => Promise<void>

  // Network
  network: Types.CW3Types.NetworkName | null
  networkSet: (network: Types.CW3Types.NetworkName) => void

  // Account State
  accountState: Types.SDK.HostAccountStatePayload["accountState"] | null
  accountStateSet: (accountState: Types.SDK.HostAccountStatePayload["accountState"] | null) => void
}

const getSystemTheme = (): Types.App.Theme => {
  if (typeof window === "undefined") return "dark" // fallback for SSR
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export const useAppStore = create<AppStoreState>()(
  persist(
    (set, get) => ({
      // XRAY Connection
      connectedToSDK: false,
      connectedToSDKSet: (connected) => set({ connectedToSDK: connected }),

      // Theme
      theme: "light",
      themePrefer: "system",
      initTheme: () => {
        const preferredTheme = get().themePrefer
        get().changeTheme(preferredTheme)
      },
      changeTheme: async (theme) => {
        const themeCurrent = theme === "system" ? getSystemTheme() : theme
        const themePrefer = theme
        set({ theme: themeCurrent, themePrefer: themePrefer })
      },

      // Modals
      modalSettings: false,
      modalSettingsSet: (open) => set({ modalSettings: open }),

      // Menu
      menuDrawerOpen: false,
      menuDrawerOpenSet: (open) => set({ menuDrawerOpen: open }),

      // Settings
      currency: "usd",
      currencySet: (currency) => set({ currency }),
      hideBalances: false,
      hideBalancesSet: (hide) => set({ hideBalances: hide }),
      explorer: "cardanoscan",
      explorerSet: (explorer) => set({ explorer }),

      // Tip
      tip: null,
      updateTip: async (tip) => {
        set({ tip })
      },

      // Network
      network: "mainnet",
      networkSet: (network) => {
        set({ network })
      },

      // Account State
      accountState: null,
      accountStateSet: (accountState) => set({ accountState }),
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
