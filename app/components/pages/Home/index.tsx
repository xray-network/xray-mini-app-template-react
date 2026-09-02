import { DocumentDuplicateIcon } from "@heroicons/react/24/outline"
import { platformV1 } from "@xray-network/xray-js/mini-app-bridge/react"
import Copy from "@/components/common/Copy"
import CardanoHome from "./Cardano"
import CardanoContext from "./Cardano/Context"
import EmptyHome from "./Empty"
import styles from "./style.module.css"

const repositoryUrl = "https://github.com/xray-network/xray-mini-app-template-react.git"

const supportedBlockchains = [
  { id: "cardano", name: "Cardano", status: "Supported" },
] as const

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

  const cardanoContext = status.data?.account?.blockchain === "cardano" ? status.data.account : null

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>XRAY MINI APP TEMPLATE</span>
          <h1 id="home-title">A React template for XRAY mini apps.</h1>
          <p className={styles.heroLead}>XRAY host status and versioned Cardano tooling are ready to use.</p>
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
          <h2 id="supported-chains-title">One template. Multiple blockchains.</h2>
          <p className={styles.supportCopy}>
            Clone and run the template, then open it inside XRAY App. Read the active host context and use the
            console below to test available bridge requests.
          </p>
          <h3 className={styles.availableTitle}>Curently available</h3>
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
      {cardanoContext ? (
        <>
          <CardanoContext />
          <CardanoHome />
        </>
      ) : (
        <EmptyHome />
      )}
    </main>
  )
}
