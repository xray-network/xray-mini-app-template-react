import { SignalIcon } from "@heroicons/react/24/outline"
import { cardano, useMiniApp } from "@xray-network/xray-js/mini-app-bridge/react"
import * as utils from "@/utils"
import styles from "../style.module.css"

export default function CardanoContext() {
  const { context, protocols } = useMiniApp()
  const { tip } = cardano.bridge.useTip()

  if (context?.blockchain !== "cardano") return null

  return (
    <section className={styles.contextSection} aria-labelledby="context-title">
      <div className={styles.sectionHeading}>
        <div>
          <span className={styles.eyebrow}>HOST CONTEXT</span>
          <h2 id="context-title">Current blockchain</h2>
        </div>
        <span className={`${styles.stateTag} ${styles.online}`}>
          <span className={styles.statusDot} aria-hidden="true" />
          Host connected
        </span>
      </div>

      <div className={styles.currentContext}>
        <div className={styles.contextIdentity}>
          <span className={styles.chainAvatar} data-state="connected" aria-hidden="true">
            <SignalIcon />
          </span>
          <div>
            <strong>Cardano</strong>
            <p>Host context is live and ready for protocol requests.</p>
            <p className={styles.tipSummary} aria-live="polite">
              Block {tip ? utils.quantityWithCommas(tip.blockNo) : "—"} · Epoch{" "}
              {tip ? utils.quantityWithCommas(tip.epochNo) : "—"} · Slot{" "}
              {tip ? utils.quantityWithCommas(tip.absSlot) : "—"}
            </p>
          </div>
        </div>

        <dl className={styles.contextDetails}>
          <div>
            <dt>Network</dt>
            <dd>{context.network}</dd>
          </div>
          <div>
            <dt>Mode</dt>
            <dd>Embedded</dd>
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
