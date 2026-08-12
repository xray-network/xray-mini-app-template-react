import { useCallback, useEffect, useState } from "react"
import { client } from "@xray-network/xray-js/mini-app-bridge"
import styles from "../style.module.css"

const miniAppClient = client.platform
const cardanoClient = client.cardano.bridge
const cardanoCip30Client = client.cardano.cip30

const format = (value: unknown) => {
  if (value instanceof Error) return value.message
  try {
    return JSON.stringify(value, (_, item) => (typeof item === "bigint" ? item.toString() : item)) ?? String(value)
  } catch {
    return String(value)
  }
}

type LogEntry = {
  id: string
  time: string
  direction: "←" | "→" | "×"
  method: string
  data: string
  tone: "request" | "success" | "error"
}

export default function CardanoHome() {
  const [cip30Enabled, setCip30Enabled] = useState(false)
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
    const connector = cardanoCip30Client.installConnector()
    return () => {
      const cardano = (window as unknown as { cardano?: Record<string, unknown> }).cardano
      if (cardano?.xrayBridge === connector) delete cardano.xrayBridge
    }
  }, [])

  useEffect(() => {
    return client.cardano.listenAll((message) => {
      log({
        direction: "→",
        method: message.type,
        data: format(message.payload),
        tone: message.type.endsWith(".error") ? "error" : "success",
      })
    })
  }, [log])

  const fire = async <Result,>(method: string, request: () => Promise<Result>) => {
    log({ direction: "←", method, data: "Request sent", tone: "request" })
    try {
      return await request()
    } catch {
      return undefined
    }
  }

  return (
    <section className={styles.logSection} aria-labelledby="cardano-methods-title">
      <div className={styles.logHeader}>
        <div>
          <span className={styles.eyebrow}>CARDANO</span>
          <h2 id="cardano-methods-title">Methods</h2>
          <p>Fire Host, Cardano bridge, and CIP-30 requests directly.</p>
        </div>
      </div>

      <div className={styles.methodsPanel}>
        <div className={styles.requestBar}>
          <span>host</span>
          <div className={styles.requestTags}>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() => void fire("host.getTheme", () => miniAppClient.getTheme())}
            >
              Get theme
            </button>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() => void fire("host.getCurrency", () => miniAppClient.getCurrency())}
            >
              Get currency
            </button>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() => void fire("host.getHideBalances", () => miniAppClient.getHideBalances())}
            >
              Get balance privacy
            </button>
          </div>
        </div>

        <div className={styles.requestBar}>
          <span>cardano.bridge</span>
          <div className={styles.requestTags}>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() => void fire("cardano.bridge.getTip", () => cardanoClient.getTip())}
            >
              Get tip
            </button>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() => void fire("cardano.bridge.getAccountState", () => cardanoClient.getAccountState())}
            >
              Get account state
            </button>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() => void fire("cardano.bridge.getExplorer", () => cardanoClient.getExplorer())}
            >
              Get explorer
            </button>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() => void fire("cardano.bridge.signTx", () => cardanoClient.signTx("dummy"))}
            >
              Sign transaction
            </button>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() => void fire("cardano.bridge.submitTx", () => cardanoClient.submitTx("dummy"))}
            >
              Submit transaction
            </button>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() => void fire("cardano.bridge.signAndSubmitTx", () => cardanoClient.signAndSubmitTx("dummy"))}
            >
              Sign and submit
            </button>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() => void fire("cardano.bridge.signData", () => cardanoClient.signData("dummy", "dummy"))}
            >
              Sign data
            </button>
          </div>
        </div>

        <div className={styles.requestBar}>
          <span>cardano.cip30</span>
          <div className={styles.requestTags}>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() =>
                void fire("cardano.cip30.enable", () => cardanoCip30Client.enable()).then((api) => {
                  if (api) setCip30Enabled(true)
                })
              }
            >
              Enable
            </button>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() => void fire("cardano.cip30.isEnabled", () => cardanoCip30Client.isEnabled())}
            >
              Is enabled
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() => void fire("cardano.cip30.getExtensions", () => cardanoCip30Client.api.getExtensions())}
            >
              Get extensions
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() => void fire("cardano.cip30.getNetworkId", () => cardanoCip30Client.api.getNetworkId())}
            >
              Get network ID
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() => void fire("cardano.cip30.getUtxos", () => cardanoCip30Client.api.getUtxos())}
            >
              Get UTxOs
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() =>
                void fire("cardano.cip30.getCollateral", () =>
                  cardanoCip30Client.api.getCollateral({ amount: "dummy" })
                )
              }
            >
              Get collateral
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() => void fire("cardano.cip30.getBalance", () => cardanoCip30Client.api.getBalance())}
            >
              Get balance
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() =>
                void fire("cardano.cip30.getUsedAddresses", () => cardanoCip30Client.api.getUsedAddresses())
              }
            >
              Get used addresses
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() =>
                void fire("cardano.cip30.getUnusedAddresses", () => cardanoCip30Client.api.getUnusedAddresses())
              }
            >
              Get unused addresses
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() =>
                void fire("cardano.cip30.getChangeAddress", () => cardanoCip30Client.api.getChangeAddress())
              }
            >
              Get change address
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() =>
                void fire("cardano.cip30.getRewardAddresses", () => cardanoCip30Client.api.getRewardAddresses())
              }
            >
              Get reward addresses
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() => void fire("cardano.cip30.signTx", () => cardanoCip30Client.api.signTx("dummy"))}
            >
              Sign transaction
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() =>
                void fire("cardano.cip30.signData", () => cardanoCip30Client.api.signData("dummy", "dummy"))
              }
            >
              Sign data
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() => void fire("cardano.cip30.submitTx", () => cardanoCip30Client.api.submitTx("dummy"))}
            >
              Submit transaction
            </button>
          </div>
        </div>

        <div className={styles.simpleLog} aria-live="polite">
          <div className={styles.simpleLogTitle}>Log</div>
          {logs.length > 0 ? (
            <div>
              {logs.map((entry) => (
                <div className={styles.simpleLogEntry} key={entry.id} data-tone={entry.tone}>
                  <div className={styles.simpleLogMeta}>
                    <time>{entry.time}</time>
                    <span aria-hidden="true">{entry.direction}</span>
                  </div>
                  <div className={styles.simpleLogData}>
                    <strong>{entry.method}</strong>
                    <code>{entry.data}</code>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.simpleLogEmpty}>No methods fired.</div>
          )}
        </div>
      </div>
    </section>
  )
}
