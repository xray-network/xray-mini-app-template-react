import { DocumentDuplicateIcon, SignalIcon, SignalSlashIcon } from "@heroicons/react/24/outline"
import { useMiniApp } from "@xray-network/xray-js/mini-app-bridge/react"
import Copy from "@/components/common/Copy"
import CardanoHome from "./Cardano"
import styles from "./style.module.css"

const repositoryUrl = "https://github.com/xray-network/xray-mini-app-template-react.git"

const supportedBlockchains = [
  { id: "cardano", name: "Cardano", status: "Supported" },
  { id: "bitcoin", name: "Bitcoin", status: "Coming soon" },
  { id: "midnight", name: "Midnight", status: "Coming soon" },
] as const

const blockchainNames = {
  cardano: "Cardano",
  bitcoin: "Bitcoin",
  midnight: "Midnight",
} as const

export default function HomePage() {
  const { connecting, context, protocols } = useMiniApp()

  if (connecting) {
    return (
      <main className={styles.page}>
        <div className={styles.handshakeLoader} role="status" aria-label="Connecting to XRAY App">
          <span className="shared-spinner" aria-hidden="true" />
        </div>
      </main>
    )
  }

  const cardanoContext = context?.blockchain === "cardano" ? context : null

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>XRAY MINI APP TEMPLATE</span>
          <h1 id="home-title">A React template for XRAY mini apps.</h1>
          <p className={styles.heroLead}>Host context and multi-blockchain protocol tooling are ready to use.</p>
          <div className={styles.cloneBlock}>
            <code>{repositoryUrl}</code>
            <Copy copy={repositoryUrl} tooltipMessage="Copy repository URL" tooltipSuccess="Repository URL copied">
              <button className={styles.copyButton} type="button" aria-label="Copy repository URL">
                <DocumentDuplicateIcon aria-hidden="true" />
                <span>Copy</span>
              </button>
            </Copy>
          </div>
        </div>

        <aside className={styles.supportedChains} aria-labelledby="supported-chains-title">
          <span className={styles.eyebrow}>BLOCKCHAIN SUPPORT</span>
          <h2 id="supported-chains-title">Cardano ready. More chains next.</h2>
          <p className={styles.supportCopy}>
            Clone and run the template, then open it inside XRAY App. Read the active host context, enable Cardano
            CIP-30, and use the console below to test wallet requests. Bitcoin and Midnight can follow the same bridge
            pattern.
          </p>
          <div className={styles.chainSupportList}>
            {supportedBlockchains.map((chain) => (
              <span className={styles.chainSupportItem} key={chain.id} data-supported={chain.status === "Supported"}>
                <span className={styles.supportDot} aria-hidden="true" />
                <strong>{chain.name}</strong>
                <span className={styles.srOnly}>: {chain.status}</span>
              </span>
            ))}
          </div>
        </aside>
      </section>

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
                  ? "Host context is live and ready for protocol requests."
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
      {cardanoContext && <CardanoHome />}
    </main>
  )
}
