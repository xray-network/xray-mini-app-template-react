import { SignalSlashIcon } from "@heroicons/react/24/outline"
import styles from "../style.module.css"

export default function NotConnected() {
  return (
    <div className={styles.notConnected} role="status">
      <SignalSlashIcon className={styles.notConnectedIcon} aria-hidden="true" />
      <strong>Not Connected</strong>
      <p>Open this mini app inside XRAY App to access blockchain accounts and bridge methods.</p>
    </div>
  )
}
