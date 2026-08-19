import { useCallback, useEffect, useState } from "react"
import { clientCardanoCip30V1, clientCardanoV1, clientPlatformV1 } from "@xray-network/xray-js/mini-app-bridge"
import styles from "../style.module.css"

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
    const connector = clientCardanoCip30V1.installConnector()
    return () => {
      const cardano = (window as unknown as { cardano?: Record<string, unknown> }).cardano
      if (cardano?.xrayBridge === connector) delete cardano.xrayBridge
    }
  }, [])

  useEffect(() => {
    const receive = (scope: string) => (message: { event: string; payload: unknown; context: unknown }) => {
      log({
        direction: "→",
        method: `${scope}.${message.event}`,
        data: format(message),
        tone: "success",
      })
    }
    const stopCardano = clientCardanoV1.listenAll(receive("cardano"))
    const stopCip30 = clientCardanoCip30V1.listenAll(receive("cardano-cip30"))
    return () => {
      stopCardano()
      stopCip30()
    }
  }, [log])

  const fire = async <Result,>(method: string, request: () => Promise<Result>) => {
    log({ direction: "←", method, data: "Request sent", tone: "request" })
    try {
      const result = await request()
      log({ direction: "→", method, data: format(result), tone: "success" })
      return result
    } catch (error) {
      log({ direction: "×", method, data: format(error), tone: "error" })
      return undefined
    }
  }

  return (
    <section className={styles.logSection} aria-labelledby="cardano-methods-title">
      <div className={styles.logHeader}>
        <div>
          <span className={styles.eyebrow}>CARDANO</span>
          <h2 id="cardano-methods-title">Methods</h2>
          <p>Fire platform v1, Cardano v1, and Cardano CIP-30 v1 requests directly.</p>
        </div>
      </div>

      <div className={styles.methodsPanel}>
        <div className={styles.requestBar}>
          <span>platform/v1</span>
          <div className={styles.requestTags}>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() => void fire("platform.getTheme", () => clientPlatformV1.getTheme())}
            >
              Get theme
            </button>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() => void fire("platform.getCurrency", () => clientPlatformV1.getCurrency())}
            >
              Get currency
            </button>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() => void fire("platform.getHideBalances", () => clientPlatformV1.getHideBalances())}
            >
              Get balance privacy
            </button>
          </div>
        </div>

        <div className={styles.requestBar}>
          <span>cardano/v1</span>
          <div className={styles.requestTags}>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() => void fire("cardano.getTip", () => clientCardanoV1.getTip())}
            >
              Get tip
            </button>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() => void fire("cardano.getAccountState", () => clientCardanoV1.getAccountState())}
            >
              Get account state
            </button>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() => void fire("cardano.getExplorer", () => clientCardanoV1.getExplorer())}
            >
              Get explorer
            </button>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() => void fire("cardano.signTx", () => clientCardanoV1.signTx("dummy"))}
            >
              Sign transaction
            </button>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() => void fire("cardano.submitTx", () => clientCardanoV1.submitTx("dummy"))}
            >
              Submit transaction
            </button>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() => void fire("cardano.signAndSubmitTx", () => clientCardanoV1.signAndSubmitTx("dummy"))}
            >
              Sign and submit
            </button>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() => void fire("cardano.signData", () => clientCardanoV1.signData("dummy", "dummy"))}
            >
              Sign data
            </button>
          </div>
        </div>

        <div className={styles.requestBar}>
          <span>cardano-cip30/v1</span>
          <div className={styles.requestTags}>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() =>
                void fire("cardano-cip30.enable", () => clientCardanoCip30V1.enable()).then((api) => {
                  if (api) setCip30Enabled(true)
                })
              }
            >
              Enable
            </button>
            <button
              className={styles.requestTag}
              type="button"
              onClick={() => void fire("cardano-cip30.isEnabled", () => clientCardanoCip30V1.isEnabled())}
            >
              Is enabled
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() => void fire("cardano-cip30.getExtensions", () => clientCardanoCip30V1.api.getExtensions())}
            >
              Get extensions
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() => void fire("cardano-cip30.getNetworkId", () => clientCardanoCip30V1.api.getNetworkId())}
            >
              Get network ID
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() => void fire("cardano-cip30.getUtxos", () => clientCardanoCip30V1.api.getUtxos())}
            >
              Get UTxOs
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() =>
                void fire("cardano-cip30.getCollateral", () =>
                  clientCardanoCip30V1.api.getCollateral({ amount: "dummy" })
                )
              }
            >
              Get collateral
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() => void fire("cardano-cip30.getBalance", () => clientCardanoCip30V1.api.getBalance())}
            >
              Get balance
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() =>
                void fire("cardano-cip30.getUsedAddresses", () => clientCardanoCip30V1.api.getUsedAddresses())
              }
            >
              Get used addresses
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() =>
                void fire("cardano-cip30.getUnusedAddresses", () => clientCardanoCip30V1.api.getUnusedAddresses())
              }
            >
              Get unused addresses
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() =>
                void fire("cardano-cip30.getChangeAddress", () => clientCardanoCip30V1.api.getChangeAddress())
              }
            >
              Get change address
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() =>
                void fire("cardano-cip30.getRewardAddresses", () => clientCardanoCip30V1.api.getRewardAddresses())
              }
            >
              Get reward addresses
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() => void fire("cardano-cip30.signTx", () => clientCardanoCip30V1.api.signTx("dummy"))}
            >
              Sign transaction
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() =>
                void fire("cardano-cip30.signData", () => clientCardanoCip30V1.api.signData("dummy", "dummy"))
              }
            >
              Sign data
            </button>
            <button
              className={styles.requestTag}
              type="button"
              disabled={!cip30Enabled}
              onClick={() => void fire("cardano-cip30.submitTx", () => clientCardanoCip30V1.api.submitTx("dummy"))}
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
