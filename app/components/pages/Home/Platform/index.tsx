import { clientPlatformV1 } from "@xray-network/xray-js/mini-app-bridge"
import type { FireRequest } from "../bridge"
import styles from "../style.module.css"

export default function PlatformMethods({ fire }: { fire: FireRequest }) {
  return (
    <section className={styles.methodsPanel} aria-label="Platform methods">
      <div className={styles.requestBar}>
        <span>platform/v1 protocol</span>
        <div className={styles.requestTags}>
          <button
            className={styles.requestTag}
            type="button"
            onClick={() => void fire("platform.getStatus", () => clientPlatformV1.getStatus())}
          >
            Get status
          </button>
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
            onClick={() => void fire("platform.getLocale", () => clientPlatformV1.getLocale())}
          >
            Get locale
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
    </section>
  )
}
