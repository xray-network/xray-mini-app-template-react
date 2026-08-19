import { SignalIcon, SignalSlashIcon } from "@heroicons/react/24/outline"
import { platformV1 } from "@xray-network/xray-js/mini-app-bridge/react"
import styles from "../style.module.css"

export default function EmptyHome() {
  const status = platformV1.useStatus()
  const connected = status.data?.host === "xray.app"
  const standalone = typeof window !== "undefined" && window.parent === window
  const unavailable = !connected && !standalone

  return (
    <section className={styles.contextSection} aria-labelledby="context-title">
      <div className={styles.sectionHeading}>
        <div>
          <span className={styles.eyebrow}>HOST CONTEXT</span>
          <h2 id="context-title">Current blockchain</h2>
        </div>
        <span className={`${styles.stateTag} ${connected ? styles.online : styles.offline}`}>
          <span className={styles.statusDot} aria-hidden="true" />
          {connected ? "XRAY App detected" : unavailable ? "Host unavailable" : "Standalone"}
        </span>
      </div>

      <div className={styles.currentContext}>
        <div className={styles.contextIdentity}>
          <span className={styles.chainAvatar} data-state={connected ? "connected" : "disconnected"} aria-hidden="true">
            {connected ? <SignalIcon /> : <SignalSlashIcon />}
          </span>
          <div>
            <strong>
              {connected ? "No selected Cardano account" : unavailable ? "XRAY App did not respond" : "Standalone mode"}
            </strong>
            <p>
              {connected
                ? "XRAY App responded, but no Cardano account is currently selected."
                : unavailable
                  ? "The template is embedded, but no supported XRAY App host responded."
                  : "Open this template inside XRAY App to use its versioned bridge adapters."}
            </p>
          </div>
        </div>

        <dl className={styles.contextDetails}>
          <div>
            <dt>Blockchain</dt>
            <dd>{status.data?.account?.blockchain ?? "—"}</dd>
          </div>
          <div>
            <dt>Network</dt>
            <dd>{status.data?.account?.network ?? "—"}</dd>
          </div>
          <div>
            <dt>Account available</dt>
            <dd>No</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
