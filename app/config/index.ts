import * as ConfigTypes from "@/types"

export const ZUSTAND_STORE_PREFIX = "xray-mini-app-template-react"

export const ADA_HANDLE_POLICY = "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"

export const SLOT_CONFIG_NETWORK: Record<ConfigTypes.CW3Types.NetworkName, ConfigTypes.CW3Types.SlotConfig> = {
  mainnet: { zeroTime: 1596059091000, zeroSlot: 4492800, slotDuration: 1000 },
  preview: { zeroTime: 1666656000000, zeroSlot: 0, slotDuration: 1000 },
  preprod: { zeroTime: 1654041600000 + 1728000000, zeroSlot: 86400, slotDuration: 1000 },
  custom: { zeroTime: 0, zeroSlot: 0, slotDuration: 0 },
}

export const SLOT_STARTING_EPOCH: Record<ConfigTypes.CW3Types.NetworkName, number> = {
  mainnet: 208,
  preprod: 4,
  preview: 0,
  custom: 0,
}

export const SLOT_EPOCH_DURATION: Record<ConfigTypes.CW3Types.NetworkName, number> = {
  mainnet: 432000,
  preprod: 432000,
  preview: 432000 / 5,
  custom: 0,
}
