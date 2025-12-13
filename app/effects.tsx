import { useEffect, useRef, useCallback } from "react"
import { useAppStore } from "@/store/app"
import { useWeb3Store } from "@/store/web3"
import { useNavigate, useNavigation, useLocation } from "react-router"
import NProgress from "nprogress"
import { useMiniAppClientMessaging, type HostMessage, type Network, type Theme } from "xray-mini-app-sdk-react"

const Effects = () => {
  const navigate = useNavigate()
  const navigation = useNavigation()
  const location = useLocation()
  const route = location.pathname + location.search + location.hash

  const currLocation = useRef(location.pathname)
  const nprogressDoneTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const initWeb3 = useWeb3Store((state) => state.initWeb3)
  const network = useAppStore((state) => state.network)

  const connectedToSDKSet = useAppStore((state) => state.connectedToSDKSet)
  const initTheme = useAppStore((state) => state.initTheme)

  const updateTip = useAppStore((state) => state.updateTip)
  const accountStateSet = useAppStore((state) => state.accountStateSet)
  const networkSet = useAppStore((state) => state.networkSet)
  const changeTheme = useAppStore((state) => state.changeTheme)
  const currencySet = useAppStore((state) => state.currencySet)
  const hideBalancesSet = useAppStore((state) => state.hideBalancesSet)
  const explorerSet = useAppStore((state) => state.explorerSet)

  const handleXRAYMessage = useCallback(
    (message: HostMessage) => {
      switch (message.type) {
        case "xray.host.routeChanged": {
          if (route !== message.payload.route) {
            navigate(message.payload.route)
          }
          break
        }
        case "xray.host.tip": {
          updateTip(message.payload.tip)
          break
        }
        case "xray.host.accountState": {
          accountStateSet(message.payload.accountState)
          break
        }
        case "xray.host.network": {
          networkSet(message.payload.network)
          break
        }
        case "xray.host.theme": {
          changeTheme(message.payload.theme)
          break
        }
        case "xray.host.currency": {
          currencySet(message.payload.currency)
          break
        }
        case "xray.host.hideBalances": {
          hideBalancesSet(message.payload.hideBalances)
          break
        }
        case "xray.host.explorer": {
          explorerSet(message.payload.explorer)
          break
        }
        default:
          break
      }
    },
    [route]
  )

  const { sendMessage: sendMessageToXRAY, isConnected } = useMiniAppClientMessaging(handleXRAYMessage)

  useEffect(() => {
    if (isConnected) {
      connectedToSDKSet(true)
      sendMessageToXRAY("xray.client.getTip")
      sendMessageToXRAY("xray.client.getAccountState")
      sendMessageToXRAY("xray.client.getNetwork")
      sendMessageToXRAY("xray.client.getTheme")
      sendMessageToXRAY("xray.client.getCurrency")
      sendMessageToXRAY("xray.client.getHideBalances")
      sendMessageToXRAY("xray.client.getExplorer")
    }
  }, [isConnected])

  useEffect(() => {
    sendMessageToXRAY("xray.client.routeChanged", { route })
  }, [route])

  // Handle navigation state changes for NProgress
  useEffect(() => {
    const clearTimeouts = () => {
      if (nprogressDoneTimeout.current) clearTimeout(nprogressDoneTimeout.current)
    }
    clearTimeouts()
    const isNewRoute = location.pathname !== currLocation.current
    const isLoading = navigation.state === "loading"
    if (isNewRoute || isLoading) {
      NProgress.start()
    }
    if (navigation.state === "idle") {
      nprogressDoneTimeout.current = setTimeout(() => {
        NProgress.done()
        currLocation.current = location.pathname
      }, 200)
    }
  }, [location.pathname, navigation.state])

  // Initialize theme on first render
  useEffect(() => {
    initTheme()
  }, [])

  // Initialize CardanoWeb3js
  useEffect(() => {
    if (network) {
      initWeb3(network)
    }
  }, [network])

  return null
}

export default Effects
