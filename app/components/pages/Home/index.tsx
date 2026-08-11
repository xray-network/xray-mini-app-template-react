import { useEffect, useState } from "react"
import { SignalIcon, SignalSlashIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline"
import * as miniAppClient from "@xray-network/xray-js/mini-app-bridge/client"
import * as cardanoClient from "@xray-network/xray-js/mini-app-bridge/cardano/client"
import * as cardanoCip30Client from "@xray-network/xray-js/mini-app-bridge/cardano/cip30/client"
import { useMiniApp, useNetwork, useTheme } from "@xray-network/xray-js/mini-app-bridge/react"
import type { PlatformHostMessage } from "@xray-network/xray-js/mini-app-bridge"
import type { CardanoHostMessage } from "@xray-network/xray-js/mini-app-bridge/cardano"
import Copy from "@/components/common/Copy"
import { Button } from "antd"

export default function HomePage() {
  const { connected, connecting, protocols } = useMiniApp()
  const network = useNetwork()
  const theme = useTheme()
  const [log, setLog] = useState<(PlatformHostMessage | CardanoHostMessage)[]>([])
  const supportsCardano = protocols.includes("cardano.native")
  const supportsCip30 = protocols.includes("cardano.cip30")

  useEffect(() => {
    // Only log responses to requests made by this app (buttons below), not initiated by host
    const receive = (message: PlatformHostMessage | CardanoHostMessage) => {
      if (message.requestId) {
        setLog((prevLog) => [message, ...prevLog])
      }
    }
    const stopPlatform = miniAppClient.listenAll(receive)
    const stopCardano = cardanoClient.listenAll(receive)
    return () => {
      stopPlatform()
      stopCardano()
    }
  }, [])

  return (
    <div className="text-center">
      <div className="text-center mt-20">
        {connecting && (
          <div className="mb-10">
            <SignalIcon className="size-20 mx-auto mb-5 text-gray-400 animate-pulse" strokeWidth={1.5} />
            <h1 className="text-3xl font-bold mb-5">Connecting…</h1>
            <p className="text-gray-500">Waiting for the XRAY/App host to respond.</p>
          </div>
        )}
        {connected === true && (
          <div className="mb-10">
            <SignalIcon className="size-20 mx-auto mb-5 text-green-500" strokeWidth={1.5} />
            <h1 className="text-3xl font-bold mb-5">Connected</h1>
            <p className="text-gray-500">
              This Mini App is connected to the XRAY/App and operates in accordance with the protocols.
            </p>
          </div>
        )}
        {connected === false && (
          <div className="mb-10">
            <SignalSlashIcon className="size-20 mx-auto mb-5 text-red-500" strokeWidth={1.5} />
            <h1 className="text-3xl font-bold mb-5">Disconnected</h1>
            <p className="text-gray-500">Open it in the XRAY/App to enable full functionality.</p>
          </div>
        )}
      </div>
      <div className="text-left max-w-170 mx-auto bg-gray-100 dark:bg-gray-950 p-4 pt-8 rounded-lg relative">
        <Copy copy="https://github.com/xray-network/xray-mini-app-template-react.git">
          <div className="absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
            <DocumentDuplicateIcon className="size-5" strokeWidth={2} />
          </div>
        </Copy>
        <span className="absolute top-2 left-4 text-gray-500 font-mono text-sm">git clone</span>
        <pre className="overflow-y-auto max-w-full font-mono font-bold">
          https://github.com/xray-network/xray-mini-app-template-react.git
        </pre>
      </div>
      <div className="text-center mt-10 text-sm text-gray-500 mb-10">
        <p>Host Network: {(connected && network) || "—"}</p>
        <p>Host Theme: {(connected && theme) || "—"}</p>
      </div>
      <div className="shared-line my-20" />
      <div className="max-w-100 mx-auto flex flex-wrap gap-2 mb-10">
        <Button disabled={!connected || !supportsCardano} onClick={() => cardanoClient.getTip()}>
          Get Tip
        </Button>
        <Button disabled={!connected || !supportsCardano} onClick={() => cardanoClient.getAccountState()}>
          Get Account State
        </Button>
        <Button disabled={!connected} onClick={() => miniAppClient.getTheme()}>
          Get Theme
        </Button>
        <Button disabled={!connected} onClick={() => miniAppClient.getCurrency()}>
          Get Currency
        </Button>
        <Button disabled={!connected} onClick={() => miniAppClient.getHideBalances()}>
          Get Hide Balances
        </Button>
        <Button disabled={!connected || !supportsCardano} onClick={() => cardanoClient.getExplorer()}>
          Get Explorer
        </Button>
        <Button
          disabled={!connected || !supportsCip30}
          onClick={async () => {
            const api = await cardanoCip30Client.enable()
            const balance = await api.getBalance()
            console.log(`CIP-30 Balance: ${balance}`)
          }}
        >
          CIP-30 Get Balance
        </Button>
      </div>
      <div className="max-w-160 mx-auto flex flex-wrap gap-2">
        {log.map((message, index) => {
          const payload = JSON.stringify(message, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2)
          return (
            <div
              key={index}
              className="text-left w-full max-h-33 overflow-scroll p-4 border border-gray-200 dark:border-gray-900 rounded-lg mb-2"
            >
              <pre className="text-xs text-gray-600 dark:text-gray-400">{payload}</pre>
            </div>
          )
        })}
      </div>
    </div>
  )
}
