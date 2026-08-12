import { create } from "zustand"

interface UiState {
  settingsOpen: boolean
  setSettingsOpen: (open: boolean) => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

/** Ephemeral interface state; intentionally excluded from persistence. */
export const useUiStore = create<UiState>((set) => ({
  settingsOpen: false,
  setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
  menuOpen: false,
  setMenuOpen: (menuOpen) => set({ menuOpen }),
}))
