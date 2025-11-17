import { useCallback, useEffect, useState } from "react"
import { useAppStore } from "@/store/app"
import { Button, theme } from "antd"
import { ArrowUpRightIcon, SignalIcon, SignalSlashIcon } from "@heroicons/react/24/outline"
import {
  useMiniAppClientMessaging,
  type HostMessage,
  type HostInitialDataPayload,
  type HostThemeChangedPayload,
  type Network,
  type Theme,
} from "xray-mini-app-sdk-react"

export default function HomePage() {
  const changeTheme = useAppStore((state) => state.changeTheme)
  const [connected, setConnected] = useState(false)
  const [hostNetwork, setHostNetwork] = useState<Network | null>(null)
  const [hostTheme, setHostTheme] = useState<Theme | null>(null)

  const handleIframeMessage = useCallback((message: HostMessage) => {
    switch (message.type) {
      case "host:handshake": {
        setConnected(true)
        break
      }
      case "host:initialData": {
        const payload = message.payload as HostInitialDataPayload
        setHostNetwork(payload.network)
        setHostTheme(payload.theme)
        changeTheme(payload.theme)
        break
      }
      case "host:themeChanged": {
        const payload = message.payload as HostThemeChangedPayload
        setHostTheme(payload.theme)
        changeTheme(payload.theme)
        break
      }
      default:
        break
    }
  }, [])

  const { sendMessage } = useMiniAppClientMessaging(handleIframeMessage)

  return (
    <div className="text-center">
      <div className="text-center mt-20">
        {connected && <SignalIcon className="size-20 mx-auto mb-5 text-green-500" strokeWidth={1.5} />}
        {!connected && <SignalSlashIcon className="size-20 mx-auto mb-5 text-red-500" strokeWidth={1.5} />}
        <h1 className="text-3xl font-black mb-10">{connected ? "Connected" : "Disconnected"}</h1>
      </div>
      <div className="text-center mt-10 text-sm text-gray-500">
        <p>Host Network: {hostNetwork || "—"}</p>
        <p>Host Theme: {hostTheme || "—"}</p>
      </div>
    </div>
  )
}
