import { useCallback, useEffect, useState } from "react"
import { useAppStore } from "@/store/app"
import { Button, theme } from "antd"
import { ArrowUpRightIcon, SignalIcon, SignalSlashIcon } from "@heroicons/react/24/outline"
import {
  useMiniAppClientMessaging,
  type HostMessage,
  type Network,
  type Theme,
} from "xray-mini-app-sdk-react"

export default function HomePage() {
  const changeTheme = useAppStore((state) => state.changeTheme)
  const networkSet = useAppStore((state) => state.networkSet)
  const [hostNetwork, setHostNetwork] = useState<Network | null>(null)
  const [hostTheme, setHostTheme] = useState<Theme | null>(null)

  const handleIframeMessage = useCallback((message: HostMessage) => {
    switch (message.type) {
      case "networkChanged": {
        setHostNetwork(message.payload.network)
        networkSet(message.payload.network)
        break
      }
      case "themeChanged": {
        setHostTheme(message.payload.theme)
        changeTheme(message.payload.theme)
        break
      }
      default:
        break
    }
  }, [])

  const { sendMessage, isConnected } = useMiniAppClientMessaging(handleIframeMessage)

  return (
    <div className="text-center">
      <div className="text-center mt-20">
        {isConnected && <SignalIcon className="size-20 mx-auto mb-5 text-green-500" strokeWidth={1.5} />}
        {!isConnected && <SignalSlashIcon className="size-20 mx-auto mb-5 text-red-500" strokeWidth={1.5} />}
        <h1 className="text-3xl font-black mb-10">{isConnected ? "Connected" : "Disconnected"}</h1>
      </div>
      <div className="text-center mt-10 text-sm text-gray-500">
        <p>Host Network: {hostNetwork || "—"}</p>
        <p>Host Theme: {hostTheme || "—"}</p>
      </div>
    </div>
  )
}
