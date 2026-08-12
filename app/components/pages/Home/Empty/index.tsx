import { SignalIcon, SignalSlashIcon } from "@heroicons/react/24/outline"
import { useMiniApp } from "@xray-network/xray-js/mini-app-bridge/react"
import styles from "../style.module.css"

const blockchainNames = {
  cardano: "Cardano",
  bitcoin: "Bitcoin",
  midnight: "Midnight",
} as const

export default function EmptyHome() {
  const { context, protocols } = useMiniApp()

  return (
    <section className={styles.contextSection} aria-labelledby="context-title">
      <div className={styles.sectionHeading}>
        <div>
          <span className={styles.eyebrow}>HOST CONTEXT</span>
          <h2 id="context-title">Current blockchain</h2>
        </div>
        <span className={`${styles.stateTag} ${context ? styles.online : styles.offline}`}>
          <span className={styles.statusDot} aria-hidden="true" />
          {context ? "Host connected" : "Not connected"}
        </span>
      </div>

      <div className={styles.currentContext}>
        <div className={styles.contextIdentity}>
          <span className={styles.chainAvatar} data-state={context ? "connected" : "disconnected"} aria-hidden="true">
            {context ? <SignalIcon /> : <SignalSlashIcon />}
          </span>
          <div>
            <strong>{context ? blockchainNames[context.blockchain] : "No blockchain context"}</strong>
            <p>
              {context
                ? "This blockchain does not have a template feature yet."
                : "Open this template inside XRAY App to connect a blockchain and activate its protocols."}
            </p>
          </div>
        </div>

        <dl className={styles.contextDetails}>
          <div>
            <dt>Network</dt>
            <dd>{context?.network ?? "—"}</dd>
          </div>
          <div>
            <dt>Mode</dt>
            <dd>{context ? "Embedded" : "Standalone"}</dd>
          </div>
          <div>
            <dt>Protocols</dt>
            <dd className={styles.protocolList}>
              {protocols.length > 0 ? protocols.map((protocol) => <span key={protocol}>{protocol}</span>) : "—"}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
