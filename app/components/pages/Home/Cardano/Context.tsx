import { SignalIcon } from "@heroicons/react/24/outline"
import { cardanoV1, platformV1 } from "@xray-network/xray-js/mini-app-bridge/react"
import * as utils from "@/utils"
import styles from "../style.module.css"

export default function CardanoContext() {
  const status = platformV1.useStatus()
  const tip = cardanoV1.useTip()
  const context = status.data?.account

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
              Block {tip.data ? utils.quantityWithCommas(tip.data.blockNo) : "—"} · Epoch{" "}
              {tip.data ? utils.quantityWithCommas(tip.data.epochNo) : "—"} · Slot{" "}
              {tip.data ? utils.quantityWithCommas(tip.data.absSlot) : "—"}
            </p>
          </div>
        </div>

        <dl className={styles.contextDetails}>
          <div>
            <dt>Blockchain</dt>
            <dd>Cardano</dd>
          </div>
          <div>
            <dt>Network</dt>
            <dd>{context.network}</dd>
          </div>
          <div>
            <dt>Account available</dt>
            <dd>Yes</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
