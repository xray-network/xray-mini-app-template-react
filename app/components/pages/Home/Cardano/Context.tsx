import { cardanoV1, platformV1 } from "@xray-network/xray-js/mini-app-bridge/react"
import * as utils from "@/utils"
import styles from "../style.module.css"

export default function CardanoContext() {
  const status = platformV1.useStatus()
  const account = cardanoV1.useAccountState()
  const tip = cardanoV1.useTip()
  const context = status.data?.account

  if (context?.blockchain !== "cardano") return null

  const accountState = account.data
  const balance = accountState?.state?.balance.value
  const assets = accountState?.state?.balance.assets.length ?? 0
  const accountSummary = accountState
    ? `${utils.quantityFormat(balance).final} ADA · ${utils.quantityWithCommas(assets)} native assets`
    : account.loading
      ? "Loading account details…"
      : "Account details are unavailable"

  return (
    <div className={styles.currentContext} aria-label="Current account state">
      <div className={styles.contextIdentity}>
        <div>
          <strong>{utils.capitalizeFirstLetter(context.blockchain)} account</strong>
          <p className={styles.accountAddress} title={accountState?.paymentAddress}>
            Payment address · {accountState?.paymentAddress ?? "—"}
          </p>
          <p className={styles.accountSummary} aria-live="polite">
            {accountSummary}
          </p>
        </div>
      </div>

      <dl className={styles.contextDetails}>
        <div>
          <dt>Blockchain</dt>
          <dd>{context.blockchain}</dd>
        </div>
        <div>
          <dt>Network</dt>
          <dd>{context.network}</dd>
        </div>
        <div>
          <dt>Tip</dt>
          <dd className={styles.tipValue}>
            Block {tip.data ? utils.quantityWithCommas(tip.data.blockNo) : "—"} · Epoch{" "}
            {tip.data ? utils.quantityWithCommas(tip.data.epochNo) : "—"} · Slot{" "}
            {tip.data ? utils.quantityWithCommas(tip.data.absSlot) : "—"}
          </dd>
        </div>
      </dl>
    </div>
  )
}
