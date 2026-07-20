import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { CardanoWeb3, CML, utils } from "cardano-web3-js"
import type { CW3Types } from "@/types"
import { useEffectiveNetwork } from "@/integrations/xray-mini-app-sdk/useEffectiveSettings"

type CardanoState =
  | { status: "loading"; network: CW3Types.NetworkName; client: null; CML: null; utils: null; error: null }
  | {
      status: "ready"
      network: CW3Types.NetworkName
      client: CardanoWeb3
      CML: typeof CML
      utils: typeof utils
      error: null
    }
  | { status: "error"; network: CW3Types.NetworkName; client: null; CML: null; utils: null; error: Error }

const CardanoContext = createContext<CardanoState | null>(null)

export function CardanoProvider({ children }: { children: React.ReactNode }) {
  const network = useEffectiveNetwork()
  const [state, setState] = useState<CardanoState>({
    status: "loading",
    network,
    client: null,
    CML: null,
    utils: null,
    error: null,
  })

  useEffect(() => {
    let current = true
    setState({ status: "loading", network, client: null, CML: null, utils: null, error: null })

    void import("cardano-web3-js")
      .then(({ CardanoWeb3, CML, utils }) => {
        if (!current) return
        setState({
          status: "ready",
          network,
          client: new CardanoWeb3({ network }),
          CML,
          utils,
          error: null,
        })
      })
      .catch((cause: unknown) => {
        if (!current) return
        const error = cause instanceof Error ? cause : new Error("Failed to initialize Cardano Web3")
        setState({ status: "error", network, client: null, CML: null, utils: null, error })
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
