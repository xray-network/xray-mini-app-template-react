import { useCallback, useEffect, useState } from "react"
import { Tabs } from "antd"
import { clientCardanoCip30V1, clientCardanoV1, clientPlatformV1 } from "@xray-network/xray-js/mini-app-bridge"
import CardanoMethods from "../Cardano"
import CardanoContext from "../Cardano/Context"
import BridgeLog from "../Log"
import NotConnected from "../NotConnected"
import PlatformMethods from "../Platform"
import type { FireRequest, LogEntry } from "../bridge"
import styles from "../style.module.css"

const format = (value: unknown) => {
  if (value instanceof Error) return value.message
  try {
    return JSON.stringify(value, (_, item) => (typeof item === "bigint" ? item.toString() : item)) ?? String(value)
  } catch {
    return String(value)
  }
}

type Props<Blockchain extends string> = {
  hostConnected: boolean
  cardanoConnected: boolean
  blockchains: readonly Blockchain[]
  blockchainLabels: Record<Blockchain, string>
}

export default function BridgeWorkspace<Blockchain extends string>({
  hostConnected,
  cardanoConnected,
  blockchains,
  blockchainLabels,
}: Props<Blockchain>) {
  const [logs, setLogs] = useState<LogEntry[]>([])

  const log = useCallback((entry: Omit<LogEntry, "id" | "time">) => {
    setLogs((current) =>
      [
        {
          ...entry,
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          time: new Date().toLocaleTimeString([], { hour12: false }),
        },
        ...current,
      ].slice(0, 40)
    )
  }, [])

  useEffect(() => {
    if (!hostConnected) return
    const connector = clientCardanoCip30V1.installConnector()
    return () => {
      const cardano = (window as unknown as { cardano?: Record<string, unknown> }).cardano
      if (cardano?.xrayBridge === connector) delete cardano.xrayBridge
    }
  }, [hostConnected])

  useEffect(() => {
    const receive = (scope: string) => (message: { event: string; payload: unknown; context: unknown }) => {
      log({ direction: "→", method: `${scope}.${message.event}`, data: format(message), tone: "success" })
    }
    const stopPlatform = clientPlatformV1.listenAll(receive("platform"))
    const stopCardano = clientCardanoV1.listenAll(receive("cardano"))
    const stopCip30 = clientCardanoCip30V1.listenAll(receive("cardano-cip30"))
    return () => {
      stopPlatform()
      stopCardano()
      stopCip30()
    }
  }, [log])

  const fire: FireRequest = async (method, request) => {
    log({ direction: "←", method, data: "Request sent", tone: "request" })
    try {
      const result = await request()
      const failed = typeof result === "object" && result !== null && "ok" in result && result.ok === false
      log({ direction: failed ? "×" : "→", method, data: format(result), tone: failed ? "error" : "success" })
      return result
    } catch (error) {
      log({ direction: "×", method, data: format(error), tone: "error" })
      return undefined
    }
  }

  const items = [
    {
      key: "platform",
      label: "Platform",
      disabled: !hostConnected,
      children: hostConnected ? <PlatformMethods fire={fire} /> : null,
    },
    ...blockchains.map((blockchain) => ({
      key: blockchain,
      label: blockchainLabels[blockchain],
      disabled: blockchain !== "cardano" || !hostConnected,
      children:
        blockchain === "cardano" && hostConnected ? (
          <section
            className={styles.cardanoPanel}
            data-has-context={cardanoConnected}
            aria-label="Cardano account and methods"
          >
            {cardanoConnected && <CardanoContext />}
            <CardanoMethods fire={fire} />
          </section>
        ) : null,
    })),
  ]

  return (
    <>
      <Tabs
        key={hostConnected ? "connected" : "disconnected"}
        size="large"
        className={styles.blockchainTabs}
        defaultActiveKey={hostConnected ? "platform" : undefined}
        items={items}
      />
      {hostConnected ? <BridgeLog logs={logs} onClear={() => setLogs([])} /> : <NotConnected />}
    </>
  )
}
