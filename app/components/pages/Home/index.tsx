import { useCallback, useEffect, useState } from "react"
import { SignalIcon, SignalSlashIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline"
import { useMiniAppClientMessaging, type HostMessage } from "xray-mini-app-sdk-react"
import Copy from "@/components/common/Copy"
import { useAppStore } from "@/store/app"
import { Button } from "antd"

export default function HomePage() {
  const network = useAppStore((state) => state.network)
  const theme = useAppStore((state) => state.theme)
  const connectedToSDK = useAppStore((state) => state.connectedToSDK)

  const [log, setLog] = useState<HostMessage[]>([])

  const { sendMessage } = useMiniAppClientMessaging((message) => {
    setLog((prevLog) => [message, ...prevLog])
  })

  return (
    <div className="text-center">
      <div className="text-center mt-20">
        {connectedToSDK && (
          <div className="mb-10">
            <SignalIcon className="size-20 mx-auto mb-5 text-green-500" strokeWidth={1.5} />
            <h1 className="text-3xl font-black mb-5">Connected</h1>
            <p className="text-gray-500">
              This Mini App is connected to the XRAY/App and operates in accordance with the protocols.
            </p>
          </div>
        )}
        {!connectedToSDK && (
          <div className="mb-10">
            <SignalSlashIcon className="size-20 mx-auto mb-5 text-red-500" strokeWidth={1.5} />
            <h1 className="text-3xl font-black mb-5">Disconnected</h1>
            <p className="text-gray-500">
              This Mini App is not connected to the XRAY/App. Open it in the XRAY/App to enable full functionality.
            </p>
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
        <pre className="overflow-y-auto max-w-full">https://github.com/xray-network/xray-mini-app-template-react.git</pre>
      </div>
      <div className="text-center mt-10 text-sm text-gray-500 mb-10">
        <p>Host Network: {(connectedToSDK && network) || "—"}</p>
        <p>Host Theme: {(connectedToSDK && theme) || "—"}</p>
      </div>
      <div className="shared-line my-20" />
      <div className="max-w-100 mx-auto flex flex-wrap gap-2 mb-10">
        <Button disabled={!connectedToSDK} onClick={() => sendMessage("xray.client.getTip")}>
          Get Tip
        </Button>
        <Button disabled={!connectedToSDK} onClick={() => sendMessage("xray.client.getAccountState")}>
          Get Accoount State
        </Button>
        <Button disabled={!connectedToSDK} onClick={() => sendMessage("xray.client.getNetwork")}>
          Get Network
        </Button>
        <Button disabled={!connectedToSDK} onClick={() => sendMessage("xray.client.getTheme")}>
          Get Theme
        </Button>
        <Button disabled={!connectedToSDK} onClick={() => sendMessage("xray.client.getCurrency")}>
          Get Currency
        </Button>
        <Button disabled={!connectedToSDK} onClick={() => sendMessage("xray.client.getHideBalances")}>
          Get Hide Balances
        </Button>
        <Button disabled={!connectedToSDK} onClick={() => sendMessage("xray.client.getExplorer")}>
          Get Explorer
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
