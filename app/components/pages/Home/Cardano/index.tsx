import { useState } from "react"
import { clientCardanoCip30V1, clientCardanoV1 } from "@xray-network/xray-js/mini-app-bridge"
import type { FireRequest } from "../bridge"
import styles from "../style.module.css"

export default function CardanoMethods({ fire }: { fire: FireRequest }) {
  const [cip30Enabled, setCip30Enabled] = useState(false)

  return (
    <section className={styles.methodsPanel} aria-label="Cardano methods">
      <div className={styles.requestBar}>
        <span>cardano/v1 protocol</span>
        <div className={styles.requestTags}>
          <button
            className={styles.requestTag}
            type="button"
            onClick={() => void fire("cardano.getTip", () => clientCardanoV1.getTip())}
          >
            Get tip
          </button>
          <button
            className={styles.requestTag}
            type="button"
            onClick={() => void fire("cardano.getAccountState", () => clientCardanoV1.getAccountState())}
          >
            Get account state
          </button>
          <button
            className={styles.requestTag}
            type="button"
            onClick={() => void fire("cardano.getExplorer", () => clientCardanoV1.getExplorer())}
          >
            Get explorer
          </button>
          <button
            className={styles.requestTag}
            type="button"
            onClick={() => void fire("cardano.signTx", () => clientCardanoV1.signTx("dummy"))}
          >
            Sign transaction
          </button>
          <button
            className={styles.requestTag}
            type="button"
            onClick={() => void fire("cardano.submitTx", () => clientCardanoV1.submitTx("dummy"))}
          >
            Submit transaction
          </button>
          <button
            className={styles.requestTag}
            type="button"
            onClick={() => void fire("cardano.signData", () => clientCardanoV1.signData("dummy", "dummy"))}
          >
            Sign data
          </button>
        </div>
      </div>

      <div className={styles.requestBar}>
        <span>cardano-cip30/v1 protocol</span>
        <div className={styles.requestTags}>
          <button
            className={styles.requestTag}
            type="button"
            onClick={() =>
              void fire("cardano-cip30.enable", () => clientCardanoCip30V1.enable()).then((api) => {
                if (api) setCip30Enabled(true)
              })
            }
          >
            Enable
          </button>
          <button
            className={styles.requestTag}
            type="button"
            onClick={() => void fire("cardano-cip30.isEnabled", () => clientCardanoCip30V1.isEnabled())}
          >
            Is enabled
          </button>
          <button
            className={styles.requestTag}
            type="button"
            disabled={!cip30Enabled}
            onClick={() => void fire("cardano-cip30.getExtensions", () => clientCardanoCip30V1.api.getExtensions())}
          >
            Get extensions
          </button>
          <button
            className={styles.requestTag}
            type="button"
            disabled={!cip30Enabled}
            onClick={() => void fire("cardano-cip30.getNetworkId", () => clientCardanoCip30V1.api.getNetworkId())}
          >
            Get network ID
          </button>
          <button
            className={styles.requestTag}
            type="button"
            disabled={!cip30Enabled}
            onClick={() => void fire("cardano-cip30.getUtxos", () => clientCardanoCip30V1.api.getUtxos())}
          >
            Get UTxOs
          </button>
          <button
            className={styles.requestTag}
            type="button"
            disabled={!cip30Enabled}
            onClick={() =>
              void fire("cardano-cip30.getCollateral", () =>
                clientCardanoCip30V1.api.getCollateral({ amount: "dummy" })
              )
            }
          >
            Get collateral
          </button>
          <button
            className={styles.requestTag}
            type="button"
            disabled={!cip30Enabled}
            onClick={() => void fire("cardano-cip30.getBalance", () => clientCardanoCip30V1.api.getBalance())}
          >
            Get balance
          </button>
          <button
            className={styles.requestTag}
            type="button"
            disabled={!cip30Enabled}
            onClick={() =>
              void fire("cardano-cip30.getUsedAddresses", () => clientCardanoCip30V1.api.getUsedAddresses())
            }
          >
            Get used addresses
          </button>
          <button
            className={styles.requestTag}
            type="button"
            disabled={!cip30Enabled}
            onClick={() =>
              void fire("cardano-cip30.getUnusedAddresses", () => clientCardanoCip30V1.api.getUnusedAddresses())
            }
          >
            Get unused addresses
          </button>
          <button
            className={styles.requestTag}
            type="button"
            disabled={!cip30Enabled}
            onClick={() =>
              void fire("cardano-cip30.getChangeAddress", () => clientCardanoCip30V1.api.getChangeAddress())
            }
          >
            Get change address
          </button>
          <button
            className={styles.requestTag}
            type="button"
            disabled={!cip30Enabled}
            onClick={() =>
              void fire("cardano-cip30.getRewardAddresses", () => clientCardanoCip30V1.api.getRewardAddresses())
            }
          >
            Get reward addresses
          </button>
          <button
            className={styles.requestTag}
            type="button"
            disabled={!cip30Enabled}
            onClick={() => void fire("cardano-cip30.signTx", () => clientCardanoCip30V1.api.signTx("dummy"))}
          >
            Sign transaction
          </button>
          <button
            className={styles.requestTag}
            type="button"
            disabled={!cip30Enabled}
            onClick={() =>
              void fire("cardano-cip30.signData", () => clientCardanoCip30V1.api.signData("dummy", "dummy"))
            }
          >
            Sign data
          </button>
          <button
            className={styles.requestTag}
            type="button"
            disabled={!cip30Enabled}
            onClick={() => void fire("cardano-cip30.submitTx", () => clientCardanoCip30V1.api.submitTx("dummy"))}
          >
            Submit transaction
          </button>
        </div>
      </div>
    </section>
  )
}
