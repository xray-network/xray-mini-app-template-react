import { useCallback, useEffect, useState } from "react"
import { ArrowRightIcon, SignalIcon, SignalSlashIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Checkbox, Input, Modal, Tabs } from "antd"
import * as miniAppClient from "@xray-network/xray-js/mini-app-bridge/client"
import * as cardanoClient from "@xray-network/xray-js/mini-app-bridge/cardano/client"
import * as cardanoCip30Client from "@xray-network/xray-js/mini-app-bridge/cardano/cip30/client"
import { useBlockchain, useMiniApp, useNetwork, useTheme } from "@xray-network/xray-js/mini-app-bridge/react"
import type { PlatformHostMessage } from "@xray-network/xray-js/mini-app-bridge"
import type { CardanoHostMessage } from "@xray-network/xray-js/mini-app-bridge/cardano"
import styles from "../style.module.css"

const maxOperations = 20

type BridgeMessage = PlatformHostMessage | CardanoHostMessage
type OperationStatus = "pending" | "success" | "error" | "timeout"
type RequestTab = "host" | "cardano.native" | "cardano.cip30"

type ResponseRecord = {
  type: string
  payload: unknown
  context?: unknown
}

type BridgeOperation = {
  id: string
  label: string
  requestType: string
  requestPayload: unknown
  requestedAt: string
  completedAt?: string
  status: OperationStatus
  response?: ResponseRecord
  error?: string
}

type BridgeAction = {
  label: string
  tab: RequestTab
  requestType: string
  available: boolean
  unavailableReason: string
  run: () => void
}

type Cip30InputMethod = "getCollateral" | "signTx" | "signData" | "submitTx"

type Cip30Inputs = {
  amount: string
  tx: string
  address: string
  data: string
  partialSign: boolean
}

const emptyCip30Inputs: Cip30Inputs = {
  amount: "",
  tx: "",
  address: "",
  data: "",
  partialSign: false,
}

const createRequestId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const requestTabs: { id: RequestTab; label: string }[] = [
  { id: "host", label: "Host" },
  { id: "cardano.native", label: "cardano.native" },
  { id: "cardano.cip30", label: "cardano.cip30" },
]

const cip30InputTitles: Record<Cip30InputMethod, string> = {
  getCollateral: "Get collateral",
  signTx: "Sign transaction",
  signData: "Sign data",
  submitTx: "Submit transaction",
}

const getRequestTab = (requestType: string): RequestTab => {
  if (requestType.startsWith("xray.cardano.cip30.")) return "cardano.cip30"
  if (requestType.startsWith("xray.cardano.")) return "cardano.native"
  return "host"
}

const formatPayload = (value: unknown) =>
  JSON.stringify(
    value,
    (_, nestedValue) => (typeof nestedValue === "bigint" ? nestedValue.toString() : nestedValue),
    2
  ) ?? "undefined"

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message
  if (typeof error === "string") return error
  return formatPayload(error)
}

const getConnectionState = (connecting: boolean, connected: boolean | null) => {
  if (connecting) {
    return {
      label: "Connecting",
      detail: "Waiting for the XRAY/App host handshake.",
      tone: "pending",
    } as const
  }
  if (connected) {
    return {
      label: "Host connected",
      detail: "Bridge context is live and ready for requests.",
      tone: "online",
    } as const
  }
  return {
    label: "Standalone mode",
    detail: "Open this mini app inside XRAY/App to activate the bridge.",
    tone: "offline",
  } as const
}

export default function CardanoHome() {
  const { connected, connecting, protocols } = useMiniApp()
  const blockchain = useBlockchain()
  const network = useNetwork()
  const theme = useTheme()
  const [announcement, setAnnouncement] = useState("")
  const [operations, setOperations] = useState<BridgeOperation[]>([])
  const [activeRequestTab, setActiveRequestTab] = useState<RequestTab>("cardano.native")
  const [cip30Api, setCip30Api] = useState<typeof cardanoCip30Client.api | null>(null)
  const [cip30InputMethod, setCip30InputMethod] = useState<Cip30InputMethod | null>(null)
  const [cip30Inputs, setCip30Inputs] = useState<Cip30Inputs>(emptyCip30Inputs)
  const supportsCardano = connected === true && blockchain === "cardano" && protocols.includes("cardano.native")
  const supportsCip30 = connected === true && blockchain === "cardano" && protocols.includes("cardano.cip30")
  const cip30Enabled = cip30Api !== null
  const connection = getConnectionState(connecting, connected)

  const addOperation = (operation: BridgeOperation) => {
    setOperations((current) => [operation, ...current].slice(0, maxOperations))
    setAnnouncement(`${operation.label} request sent.`)
  }

  const settleOperation = useCallback(
    (requestId: string, status: Exclude<OperationStatus, "pending">, response?: ResponseRecord, error?: string) => {
      setOperations((current) =>
        current.map((operation) => {
          if (operation.id !== requestId) return operation
          return {
            ...operation,
            status,
            response: response ?? operation.response,
            error,
            completedAt: new Date().toISOString(),
          }
        })
      )
      setAnnouncement(`Bridge operation ${status === "success" ? "completed" : status}.`)
    },
    []
  )

  const receiveResponse = useCallback(
    (message: BridgeMessage) => {
      settleOperation(message.requestId, "success", {
        type: message.type,
        payload: message.payload,
        ...(Object.hasOwn(message, "context") ? { context: (message as CardanoHostMessage).context } : {}),
      })
    },
    [settleOperation]
  )

  useEffect(() => {
    const stopPlatform = miniAppClient.listenAll(receiveResponse)
    const stopCardano = cardanoClient.listenAll(receiveResponse)
    return () => {
      stopPlatform()
      stopCardano()
    }
  }, [receiveResponse])

  useEffect(() => {
    if (!supportsCip30) setCip30Api(null)
  }, [supportsCip30])

  const runRequest = async (
    label: string,
    requestType: string,
    available: boolean,
    unavailableReason: string,
    invoke: (requestId: string) => Promise<BridgeMessage | null>
  ) => {
    const requestId = createRequestId()
    addOperation({
      id: requestId,
      label,
      requestType,
      requestPayload: null,
      requestedAt: new Date().toISOString(),
      status: available ? "pending" : "error",
      ...(available ? {} : { completedAt: new Date().toISOString(), error: unavailableReason }),
    })
    if (!available) return

    try {
      const response = await invoke(requestId)
      if (response) {
        receiveResponse(response)
      } else {
        settleOperation(requestId, "timeout", undefined, "No host response was received before the request closed.")
      }
    } catch (error) {
      settleOperation(requestId, "error", undefined, getErrorMessage(error))
    }
  }

  const runCip30Request = async (
    label: string,
    requestType: string,
    requestPayload: unknown,
    responseType: string,
    available: boolean,
    unavailableReason: string,
    invoke: () => Promise<unknown>
  ) => {
    const requestId = createRequestId()
    addOperation({
      id: requestId,
      label,
      requestType,
      requestPayload,
      requestedAt: new Date().toISOString(),
      status: available ? "pending" : "error",
      ...(available ? {} : { completedAt: new Date().toISOString(), error: unavailableReason }),
    })
    if (!available) return

    try {
      const payload = await invoke()
      settleOperation(requestId, "success", {
        type: responseType,
        payload,
      })
    } catch (error) {
      settleOperation(requestId, "error", undefined, getErrorMessage(error))
    }
  }

  const platformUnavailable = connected
    ? "This platform request is temporarily unavailable."
    : "Connect to XRAY/App first."
  const cardanoUnavailable = connected
    ? "Available only when the host advertises the Cardano native protocol."
    : "Connect to XRAY/App first."
  const cip30ProtocolUnavailable = connected
    ? "Available only when the host advertises Cardano CIP-30."
    : "Connect to XRAY/App first."
  const cip30MethodUnavailable = supportsCip30 ? "Enable Cardano CIP-30 first." : cip30ProtocolUnavailable

  const getCip30Api = () => {
    if (!cip30Api) throw new Error("Enable Cardano CIP-30 first.")
    return cip30Api
  }

  const runCip30ApiMethod = (
    label: string,
    method: keyof typeof cardanoCip30Client.api,
    requestPayload: unknown,
    responseType: string,
    invoke: (api: typeof cardanoCip30Client.api) => Promise<unknown>
  ) =>
    runCip30Request(
      label,
      `xray.cardano.cip30.client.${method}`,
      requestPayload,
      `xray.cardano.cip30.host.${responseType}`,
      cip30Enabled,
      cip30MethodUnavailable,
      async () => invoke(getCip30Api())
    )

  const openCip30Input = (method: Cip30InputMethod) => {
    setCip30Inputs(emptyCip30Inputs)
    setCip30InputMethod(method)
  }

  const submitCip30Input = () => {
    switch (cip30InputMethod) {
      case "getCollateral":
        void runCip30ApiMethod("Get collateral", "getCollateral", { amount: cip30Inputs.amount }, "collateral", (api) =>
          api.getCollateral({ amount: cip30Inputs.amount })
        )
        break
      case "signTx":
        void runCip30ApiMethod(
          "Sign transaction",
          "signTx",
          { tx: cip30Inputs.tx, partialSign: cip30Inputs.partialSign },
          "signTx",
          (api) => api.signTx(cip30Inputs.tx, cip30Inputs.partialSign)
        )
        break
      case "signData":
        void runCip30ApiMethod(
          "Sign data",
          "signData",
          { address: cip30Inputs.address, data: cip30Inputs.data },
          "signData",
          (api) => api.signData(cip30Inputs.address, cip30Inputs.data)
        )
        break
      case "submitTx":
        void runCip30ApiMethod("Submit transaction", "submitTx", cip30Inputs.tx, "submitTx", (api) =>
          api.submitTx(cip30Inputs.tx)
        )
        break
    }
    setCip30InputMethod(null)
  }

  const cip30InputIsValid =
    cip30InputMethod === "getCollateral"
      ? cip30Inputs.amount.trim().length > 0
      : cip30InputMethod === "signData"
        ? cip30Inputs.address.trim().length > 0 && cip30Inputs.data.trim().length > 0
        : cip30InputMethod === "signTx" || cip30InputMethod === "submitTx"
          ? cip30Inputs.tx.trim().length > 0
          : false

  const actions: BridgeAction[] = [
    {
      label: "Theme",
      tab: "host",
      requestType: "xray.client.getTheme",
      available: connected === true,
      unavailableReason: platformUnavailable,
      run: () =>
        void runRequest(
          "Get theme",
          "xray.client.getTheme",
          connected === true,
          platformUnavailable,
          miniAppClient.getTheme
        ),
    },
    {
      label: "Currency",
      tab: "host",
      requestType: "xray.client.getCurrency",
      available: connected === true,
      unavailableReason: platformUnavailable,
      run: () =>
        void runRequest(
          "Get currency",
          "xray.client.getCurrency",
          connected === true,
          platformUnavailable,
          miniAppClient.getCurrency
        ),
    },
    {
      label: "Balance privacy",
      tab: "host",
      requestType: "xray.client.getHideBalances",
      available: connected === true,
      unavailableReason: platformUnavailable,
      run: () =>
        void runRequest(
          "Get balance privacy",
          "xray.client.getHideBalances",
          connected === true,
          platformUnavailable,
          miniAppClient.getHideBalances
        ),
    },
    {
      label: "Chain tip",
      tab: "cardano.native",
      requestType: "xray.cardano.client.getTip",
      available: supportsCardano,
      unavailableReason: cardanoUnavailable,
      run: () =>
        void runRequest(
          "Get tip",
          "xray.cardano.client.getTip",
          supportsCardano,
          cardanoUnavailable,
          cardanoClient.getTip
        ),
    },
    {
      label: "Account state",
      tab: "cardano.native",
      requestType: "xray.cardano.client.getAccountState",
      available: supportsCardano,
      unavailableReason: cardanoUnavailable,
      run: () =>
        void runRequest(
          "Get account state",
          "xray.cardano.client.getAccountState",
          supportsCardano,
          cardanoUnavailable,
          cardanoClient.getAccountState
        ),
    },
    {
      label: "Explorer",
      tab: "cardano.native",
      requestType: "xray.cardano.client.getExplorer",
      available: supportsCardano,
      unavailableReason: cardanoUnavailable,
      run: () =>
        void runRequest(
          "Get explorer",
          "xray.cardano.client.getExplorer",
          supportsCardano,
          cardanoUnavailable,
          cardanoClient.getExplorer
        ),
    },
    {
      label: "Enable",
      tab: "cardano.cip30",
      requestType: "xray.cardano.cip30.client.enable",
      available: supportsCip30,
      unavailableReason: cip30ProtocolUnavailable,
      run: () =>
        void runCip30Request(
          "Enable access",
          "xray.cardano.cip30.client.enable",
          { extensions: [] },
          "xray.cardano.cip30.host.enable",
          supportsCip30,
          cip30ProtocolUnavailable,
          async () => {
            const api = await cardanoCip30Client.enable()
            setCip30Api(api)
            return true
          }
        ),
    },
    {
      label: "Is enabled",
      tab: "cardano.cip30",
      requestType: "xray.cardano.cip30.client.isEnabled",
      available: cip30Enabled,
      unavailableReason: cip30MethodUnavailable,
      run: () =>
        void runCip30Request(
          "Check access",
          "xray.cardano.cip30.client.isEnabled",
          null,
          "xray.cardano.cip30.host.isEnabled",
          cip30Enabled,
          cip30MethodUnavailable,
          cardanoCip30Client.isEnabled
        ),
    },
    {
      label: "Extensions",
      tab: "cardano.cip30",
      requestType: "xray.cardano.cip30.client.getExtensions",
      available: cip30Enabled,
      unavailableReason: cip30MethodUnavailable,
      run: () =>
        void runCip30ApiMethod("Get extensions", "getExtensions", null, "extensions", (api) => api.getExtensions()),
    },
    {
      label: "Network ID",
      tab: "cardano.cip30",
      requestType: "xray.cardano.cip30.client.getNetworkId",
      available: cip30Enabled,
      unavailableReason: cip30MethodUnavailable,
      run: () =>
        void runCip30ApiMethod("Get network ID", "getNetworkId", null, "networkId", (api) => api.getNetworkId()),
    },
    {
      label: "UTxOs",
      tab: "cardano.cip30",
      requestType: "xray.cardano.cip30.client.getUtxos",
      available: cip30Enabled,
      unavailableReason: cip30MethodUnavailable,
      run: () => void runCip30ApiMethod("Get UTxOs", "getUtxos", {}, "utxos", (api) => api.getUtxos()),
    },
    {
      label: "Collateral",
      tab: "cardano.cip30",
      requestType: "xray.cardano.cip30.client.getCollateral",
      available: cip30Enabled,
      unavailableReason: cip30MethodUnavailable,
      run: () => openCip30Input("getCollateral"),
    },
    {
      label: "Balance",
      tab: "cardano.cip30",
      requestType: "xray.cardano.cip30.client.getBalance",
      available: cip30Enabled,
      unavailableReason: cip30MethodUnavailable,
      run: () => void runCip30ApiMethod("Get balance", "getBalance", null, "balance", (api) => api.getBalance()),
    },
    {
      label: "Used addresses",
      tab: "cardano.cip30",
      requestType: "xray.cardano.cip30.client.getUsedAddresses",
      available: cip30Enabled,
      unavailableReason: cip30MethodUnavailable,
      run: () =>
        void runCip30ApiMethod("Get used addresses", "getUsedAddresses", {}, "usedAddresses", (api) =>
          api.getUsedAddresses()
        ),
    },
    {
      label: "Unused addresses",
      tab: "cardano.cip30",
      requestType: "xray.cardano.cip30.client.getUnusedAddresses",
      available: cip30Enabled,
      unavailableReason: cip30MethodUnavailable,
      run: () =>
        void runCip30ApiMethod("Get unused addresses", "getUnusedAddresses", null, "unusedAddresses", (api) =>
          api.getUnusedAddresses()
        ),
    },
    {
      label: "Change address",
      tab: "cardano.cip30",
      requestType: "xray.cardano.cip30.client.getChangeAddress",
      available: cip30Enabled,
      unavailableReason: cip30MethodUnavailable,
      run: () =>
        void runCip30ApiMethod("Get change address", "getChangeAddress", null, "changeAddress", (api) =>
          api.getChangeAddress()
        ),
    },
    {
      label: "Reward addresses",
      tab: "cardano.cip30",
      requestType: "xray.cardano.cip30.client.getRewardAddresses",
      available: cip30Enabled,
      unavailableReason: cip30MethodUnavailable,
      run: () =>
        void runCip30ApiMethod("Get reward addresses", "getRewardAddresses", null, "rewardAddresses", (api) =>
          api.getRewardAddresses()
        ),
    },
    {
      label: "Sign transaction",
      tab: "cardano.cip30",
      requestType: "xray.cardano.cip30.client.signTx",
      available: cip30Enabled,
      unavailableReason: cip30MethodUnavailable,
      run: () => openCip30Input("signTx"),
    },
    {
      label: "Sign data",
      tab: "cardano.cip30",
      requestType: "xray.cardano.cip30.client.signData",
      available: cip30Enabled,
      unavailableReason: cip30MethodUnavailable,
      run: () => openCip30Input("signData"),
    },
    {
      label: "Submit transaction",
      tab: "cardano.cip30",
      requestType: "xray.cardano.cip30.client.submitTx",
      available: cip30Enabled,
      unavailableReason: cip30MethodUnavailable,
      run: () => openCip30Input("submitTx"),
    },
  ]

  const visibleActions = actions.filter((action) => action.tab === activeRequestTab)
  const visibleOperations = operations.filter((operation) => getRequestTab(operation.requestType) === activeRequestTab)

  const clearLog = () => {
    setOperations((current) => current.filter((operation) => getRequestTab(operation.requestType) !== activeRequestTab))
    setAnnouncement(`${activeRequestTab} request log cleared.`)
  }

  return (
    <>
      <p className={styles.srOnly} aria-live="polite">
        {announcement}
      </p>

      <section className={styles.contextSection} aria-labelledby="context-title">
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.eyebrow}>HOST CONTEXT</span>
            <h2 id="context-title">Current blockchain</h2>
          </div>
          <span className={`${styles.stateTag} ${styles[connection.tone]}`}>
            <span className={styles.statusDot} aria-hidden="true" />
            {connection.label}
          </span>
        </div>

        <div className={styles.currentContext}>
          <div className={styles.contextIdentity}>
            <span
              className={styles.chainAvatar}
              data-state={connected ? "connected" : "disconnected"}
              aria-hidden="true"
            >
              {connected ? <SignalIcon /> : <SignalSlashIcon />}
            </span>
            <div>
              <strong>{connected && blockchain === "cardano" ? "Cardano" : "No blockchain context"}</strong>
              <p>{connection.detail}</p>
            </div>
          </div>

          <dl className={styles.contextDetails}>
            <div>
              <dt>Network</dt>
              <dd>{connected && network ? network : "—"}</dd>
            </div>
            <div>
              <dt>Theme</dt>
              <dd>{connected && theme ? theme : "—"}</dd>
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

      <section className={styles.logSection} aria-labelledby="request-log-title">
        <div className={styles.logHeader}>
          <div>
            <span className={styles.eyebrow}>BRIDGE CONSOLE</span>
            <h2 id="request-log-title">Requests and responses</h2>
            <p>Run a request, then inspect the correlated exchange below.</p>
          </div>
          <button
            className={styles.clearButton}
            type="button"
            disabled={visibleOperations.length === 0}
            onClick={clearLog}
          >
            <TrashIcon aria-hidden="true" />
            Clear
          </button>
        </div>

        <div className={styles.consolePanel}>
          <Tabs
            className={styles.protocolTabs}
            activeKey={activeRequestTab}
            aria-label="Bridge request protocols"
            items={requestTabs.map((tab) => ({ key: tab.id, label: tab.label }))}
            onChange={(key) => setActiveRequestTab(key as RequestTab)}
          />

          <div
            className={styles.requestBar}
            id="bridge-request-panel"
            role="tabpanel"
            aria-label={`${activeRequestTab} requests`}
          >
            <span>Run request</span>
            <div className={styles.requestTags}>
              {visibleActions.map((action) => (
                <button
                  className={styles.requestTag}
                  type="button"
                  key={action.requestType}
                  disabled={!action.available}
                  title={action.available ? `Run ${action.label}` : action.unavailableReason}
                  aria-label={action.available ? `Run ${action.label}` : `${action.label}: ${action.unavailableReason}`}
                  onClick={action.run}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.logBody}>
            {visibleOperations.length === 0 ? (
              <div className={styles.emptyLog}>
                <strong>No {activeRequestTab} requests yet</strong>
                <p>Run an available action to inspect its request and response pair.</p>
              </div>
            ) : (
              <div className={styles.operationList}>
                {visibleOperations.map((operation) => (
                  <article className={styles.operation} key={operation.id}>
                    <header className={styles.operationHeader}>
                      <div>
                        <strong>{operation.label}</strong>
                        <code>{operation.id.slice(0, 8)}</code>
                      </div>
                      <span className={`${styles.operationStatus} ${styles[operation.status]}`}>
                        {operation.status}
                      </span>
                    </header>
                    <div className={styles.exchangeGrid}>
                      <div className={styles.exchangePane}>
                        <span className={styles.exchangeLabel}>REQUEST</span>
                        <code className={styles.messageType}>{operation.requestType}</code>
                        <pre>{formatPayload(operation.requestPayload)}</pre>
                        <time dateTime={operation.requestedAt}>
                          {new Date(operation.requestedAt).toLocaleTimeString()}
                        </time>
                      </div>
                      <div className={styles.exchangeDirection} aria-hidden="true">
                        <ArrowRightIcon />
                      </div>
                      <div className={styles.exchangePane}>
                        <span className={styles.exchangeLabel}>RESPONSE</span>
                        {operation.response ? (
                          <>
                            <code className={styles.messageType}>{operation.response.type}</code>
                            <pre>{formatPayload(operation.response.payload)}</pre>
                            {operation.completedAt && (
                              <time dateTime={operation.completedAt}>
                                {new Date(operation.completedAt).toLocaleTimeString()}
                              </time>
                            )}
                          </>
                        ) : (
                          <div className={styles.responseState}>
                            <span className={styles.responseMark} aria-hidden="true" />
                            <div>
                              <strong>{operation.status === "pending" ? "Waiting for host" : operation.status}</strong>
                              <p>{operation.error ?? "Response pending."}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Modal
        title={cip30InputMethod ? cip30InputTitles[cip30InputMethod] : "CIP-30 parameters"}
        open={cip30InputMethod !== null}
        okText="Run request"
        okButtonProps={{ disabled: !cip30InputIsValid }}
        destroyOnHidden
        onCancel={() => setCip30InputMethod(null)}
        onOk={submitCip30Input}
      >
        <div className={styles.cip30Fields}>
          {cip30InputMethod === "getCollateral" && (
            <label className={styles.cip30Field}>
              <span>Amount (CBOR hex)</span>
              <Input
                value={cip30Inputs.amount}
                placeholder="1a4c4b40"
                onChange={(event) => setCip30Inputs((current) => ({ ...current, amount: event.target.value }))}
              />
            </label>
          )}
          {(cip30InputMethod === "signTx" || cip30InputMethod === "submitTx") && (
            <label className={styles.cip30Field}>
              <span>Transaction (CBOR hex)</span>
              <Input.TextArea
                value={cip30Inputs.tx}
                autoSize={{ minRows: 3, maxRows: 8 }}
                onChange={(event) => setCip30Inputs((current) => ({ ...current, tx: event.target.value }))}
              />
            </label>
          )}
          {cip30InputMethod === "signTx" && (
            <Checkbox
              checked={cip30Inputs.partialSign}
              onChange={(event) => setCip30Inputs((current) => ({ ...current, partialSign: event.target.checked }))}
            >
              Partial sign
            </Checkbox>
          )}
          {cip30InputMethod === "signData" && (
            <>
              <label className={styles.cip30Field}>
                <span>Address (hex)</span>
                <Input
                  value={cip30Inputs.address}
                  onChange={(event) => setCip30Inputs((current) => ({ ...current, address: event.target.value }))}
                />
              </label>
              <label className={styles.cip30Field}>
                <span>Payload (hex)</span>
                <Input.TextArea
                  value={cip30Inputs.data}
                  autoSize={{ minRows: 3, maxRows: 8 }}
                  onChange={(event) => setCip30Inputs((current) => ({ ...current, data: event.target.value }))}
                />
              </label>
            </>
          )}
        </div>
      </Modal>
    </>
  )
}
