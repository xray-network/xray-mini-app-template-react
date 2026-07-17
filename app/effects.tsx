import { useEffect, useRef } from "react"
import { useNavigate, useNavigation, useLocation } from "react-router"
import NProgress from "nprogress"
import { miniAppClient } from "@xray-network/mini-app-sdk/client"
import {
  useHostMessage,
  useMiniApp,
  useTheme as useHostTheme,
  useNetwork as useHostNetwork,
  useCurrency as useHostCurrency,
  useHideBalances as useHostHideBalances,
  useExplorer as useHostExplorer,
} from "@xray-network/mini-app-sdk/react"
import { useAppStore } from "@/store/app"
import { useWeb3Store } from "@/store/web3"

/**
 * Mirror live host settings into the local store. The SDK hooks fetch each
 * value once after the handshake and stay live via host pushes, so the local
 * (persisted) settings follow the host while connected and remain the last
 * known values when the app runs standalone.
 */
const HostSettingsSync = () => {
  const hostTheme = useHostTheme()
  const hostNetwork = useHostNetwork()
  const hostCurrency = useHostCurrency()
  const hostHideBalances = useHostHideBalances()
  const hostExplorer = useHostExplorer()

  const changeTheme = useAppStore((state) => state.changeTheme)
  const networkSet = useAppStore((state) => state.networkSet)
  const currencySet = useAppStore((state) => state.currencySet)
  const hideBalancesSet = useAppStore((state) => state.hideBalancesSet)
  const explorerSet = useAppStore((state) => state.explorerSet)

  useEffect(() => {
    if (hostTheme !== null) changeTheme(hostTheme)
  }, [hostTheme])
  useEffect(() => {
    if (hostNetwork !== null) networkSet(hostNetwork)
  }, [hostNetwork])
  useEffect(() => {
    if (hostCurrency !== null) currencySet(hostCurrency)
  }, [hostCurrency])
  useEffect(() => {
    if (hostHideBalances !== null) hideBalancesSet(hostHideBalances)
  }, [hostHideBalances])
  useEffect(() => {
    if (hostExplorer !== null) explorerSet(hostExplorer)
  }, [hostExplorer])

  return null
}

/**
 * Bidirectional route sync with the host: notify the host when the router
 * navigates, follow the host when it pushes a route (guarding echo loops).
 */
const RouteSync = () => {
  const { connected } = useMiniApp()
  const navigate = useNavigate()
  const location = useLocation()
  const route = location.pathname + location.search + location.hash

  useEffect(() => {
    if (connected) {
      void miniAppClient.routeChanged(route)
    }
  }, [connected, route])

  useHostMessage("xray.host.routeChanged", (newRoute) => {
    if (newRoute !== route) navigate(newRoute)
  })

  return null
}

/** Top loading bar on route transitions */
const ProgressBar = () => {
  const navigation = useNavigation()
  const location = useLocation()
  const currLocation = useRef(location.pathname)
  const nprogressDoneTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (nprogressDoneTimeout.current) clearTimeout(nprogressDoneTimeout.current)
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

  return null
}

/** Apply the persisted theme preference on first render, init CardanoWeb3js per network */
const AppInit = () => {
  const initTheme = useAppStore((state) => state.initTheme)
  const network = useAppStore((state) => state.network)
  const initWeb3 = useWeb3Store((state) => state.initWeb3)

  useEffect(() => {
    initTheme()
  }, [])

  useEffect(() => {
    initWeb3(network)
  }, [network])

  return null
}

const Effects = () => {
  return (
    <>
      <AppInit />
      <HostSettingsSync />
      <RouteSync />
      <ProgressBar />
    </>
  )
}

export default Effects
