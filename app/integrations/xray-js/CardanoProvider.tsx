import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { Cardano, addresses } from "@xray-network/xray-js/cardano"
import type { CardanoTypes } from "@/types"
import { useMiniApp } from "@xray-network/xray-js/mini-app-bridge/react"
import { usePreferencesStore } from "@/store/preferences"

type CardanoState =
  | { status: "inactive"; network: null; client: null; addresses: null; error: null }
  | { status: "loading"; network: CardanoTypes.NetworkName; client: null; addresses: null; error: null }
  | {
      status: "ready"
      network: CardanoTypes.NetworkName
      client: Cardano
      addresses: typeof addresses
      error: null
    }
  | { status: "error"; network: CardanoTypes.NetworkName; client: null; addresses: null; error: Error }

const CardanoContext = createContext<CardanoState | null>(null)

export function CardanoProvider({ children }: { children: React.ReactNode }) {
  const { connected, context } = useMiniApp()
  const localNetwork = usePreferencesStore((state) => state.network)
  const network = connected === false ? localNetwork : context?.blockchain === "cardano" ? context.network : null
  const [state, setState] = useState<CardanoState>({
    status: "inactive",
    network: null,
    client: null,
    addresses: null,
    error: null,
  })

  useEffect(() => {
    if (!network) {
      setState({ status: "inactive", network: null, client: null, addresses: null, error: null })
      return
    }

    let current = true
    setState({ status: "loading", network, client: null, addresses: null, error: null })

    void import("@xray-network/xray-js/cardano")
      .then(({ createCardano, addresses }) => {
        if (!current) return
        setState({ status: "ready", network, client: createCardano({ network }), addresses, error: null })
      })
      .catch((cause: unknown) => {
        if (!current) return
        const error = cause instanceof Error ? cause : new Error("Failed to initialize XRAY Cardano")
        setState({ status: "error", network, client: null, addresses: null, error })
      })

    return () => {
      current = false
    }
  }, [network])

  const value = useMemo(() => state, [state])
  return <CardanoContext.Provider value={value}>{children}</CardanoContext.Provider>
}

export function useCardano() {
  const context = useContext(CardanoContext)
  if (!context) throw new Error("useCardano must be used within CardanoProvider")
  return context
}
