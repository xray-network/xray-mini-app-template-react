import { useEffect, useRef, useState } from "react"
import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline"
import Copy from "@/components/common/Copy"
import CardanoHome from "./blockchains/Cardano"
import styles from "./style.module.css"

const repositoryUrl = "https://github.com/xray-network/xray-mini-app-template-react.git"

const supportedBlockchains = [
  { id: "cardano", name: "Cardano", status: "Supported" },
  { id: "bitcoin", name: "Bitcoin", status: "Coming soon" },
  { id: "midnight", name: "Midnight", status: "Coming soon" },
] as const

export default function HomePage() {
  const [copied, setCopied] = useState(false)
  const [announcement, setAnnouncement] = useState("")
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current)
    },
    []
  )

  const processCopy = () => {
    setCopied(true)
    setAnnouncement("Repository URL copied.")
    if (copyTimer.current) clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopied(false), 1600)
  }

  return (
    <main className={styles.page}>
      <p className={styles.srOnly} aria-live="polite">
        {announcement}
      </p>

      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>XRAY MINI APP TEMPLATE</span>
          <h1 id="home-title">Build XRAY mini apps with React.</h1>
          <p className={styles.heroLead}>
            Host context, Cardano CIP-30, and request/response tooling are ready to use.
          </p>
          <div className={styles.cloneBlock}>
            <code>{repositoryUrl}</code>
            <Copy copy={repositoryUrl} tooltipMessage="Copy repository URL" tooltipSuccess="Repository URL copied">
              <button
                className={styles.copyButton}
                type="button"
                onClick={processCopy}
                aria-label={copied ? "Repository URL copied" : "Copy repository URL"}
              >
                {copied ? <CheckIcon aria-hidden="true" /> : <DocumentDuplicateIcon aria-hidden="true" />}
                <span>{copied ? "Copied" : "Copy"}</span>
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

      <CardanoHome />
    </main>
  )
}
