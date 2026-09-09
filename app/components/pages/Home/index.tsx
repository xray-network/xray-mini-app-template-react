import { DocumentDuplicateIcon } from "@heroicons/react/24/outline"
import { platformV1 } from "@xray-network/xray-js/mini-app-bridge/react"
import Copy from "@/components/common/Copy"
import BridgeWorkspace from "./BridgeWorkspace"
import styles from "./style.module.css"

const repositoryUrl = "https://github.com/xray-network/xray-mini-app-template-react.git"

// Keep this aligned with XRAY/App's canonical blockchain registry.
const blockchains = ["cardano", "bitcoin", "midnight", "ethereum", "base", "solana", "ton"] as const
const blockchainLabels: Record<(typeof blockchains)[number], string> = {
  cardano: "Cardano",
  bitcoin: "Bitcoin",
  midnight: "Midnight",
  ethereum: "Ethereum",
  base: "Base",
  solana: "Solana",
  ton: "TON",
}

export default function HomePage() {
  const status = platformV1.useStatus()

  if (status.loading) {
    return (
      <main className={styles.page}>
        <div className={styles.statusLoader} role="status" aria-label="Checking for XRAY App">
          <span className="shared-spinner" aria-hidden="true" />
        </div>
      </main>
    )
  }

  const hostConnected = status.data?.host === "xray.app"
  const cardanoConnected = status.data?.account?.blockchain === "cardano"

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>XRAY MINI APP TEMPLATE</span>
          <h1 id="home-title">A React template for XRAY mini apps.</h1>
          <p className={styles.heroLead}>
            Build blockchain-powered mini apps with XRAY host integration, connected account context, and a versioned
            bridge designed for consistent interactions across networks.
          </p>
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

        <div className={styles.supportedChains} aria-labelledby="supported-chains-title">
          <h2 id="supported-chains-title">Supported blockchains</h2>
          <div className={styles.chainSupportList}>
            {blockchains.map((blockchain) => (
              <span className={styles.chainSupportItem} key={blockchain} data-supported={blockchain === "cardano"}>
                <span className={styles.supportDot} aria-hidden="true" />
                <strong>{blockchainLabels[blockchain]}</strong>
                <span className={styles.srOnly}>: {blockchain === "cardano" ? "Supported" : "Inactive"}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.workspace} aria-label="Blockchain tools">
        <BridgeWorkspace
          hostConnected={hostConnected}
          cardanoConnected={cardanoConnected}
          blockchains={blockchains}
          blockchainLabels={blockchainLabels}
        />
      </section>
    </main>
  )
}
