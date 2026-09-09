import { TrashIcon } from "@heroicons/react/24/outline"
import type { LogEntry } from "../bridge"
import styles from "../style.module.css"

export default function BridgeLog({ logs, onClear }: { logs: LogEntry[]; onClear: () => void }) {
  return (
    <div className={styles.simpleLog} aria-live="polite">
      <div className={styles.simpleLogHeader}>
        <span className={styles.simpleLogTitle}>Bridge log</span>
        <button
          className={styles.clearButton}
          type="button"
          aria-label="Clear bridge log"
          disabled={logs.length === 0}
          onClick={onClear}
        >
          <TrashIcon aria-hidden="true" />
          <span>Clear</span>
        </button>
      </div>
      {logs.length > 0 ? (
        <div>
          {logs.map((entry) => (
            <div className={styles.simpleLogEntry} key={entry.id} data-tone={entry.tone}>
              <div className={styles.simpleLogMeta}>
                <time>{entry.time}</time>
                <span aria-hidden="true">{entry.direction}</span>
              </div>
              <div className={styles.simpleLogData}>
                <strong>{entry.method}</strong>
                <code>{entry.data}</code>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.simpleLogEmpty}>No bridge activity.</div>
      )}
    </div>
  )
}
