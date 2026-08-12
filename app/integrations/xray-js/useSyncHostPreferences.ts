import { useEffect } from "react"
import {
  useCurrency as useHostCurrency,
  useHideBalances as useHostHideBalances,
  useTheme as useHostTheme,
} from "@xray-network/xray-js/mini-app-bridge/react"
import { usePreferencesStore } from "@/store/preferences"

export const useSyncHostPreferences = () => {
  const hostTheme = useHostTheme()
  const hostCurrency = useHostCurrency()
  const hostHideBalances = useHostHideBalances()

  useEffect(() => {
    if (hostTheme === null && hostCurrency === null && hostHideBalances === null) return

    usePreferencesStore.setState({
      ...(hostTheme !== null && { themePrefer: hostTheme }),
      ...(hostCurrency !== null && { currency: hostCurrency }),
      ...(hostHideBalances !== null && { hideBalances: hostHideBalances }),
    })
  }, [hostCurrency, hostHideBalances, hostTheme])
}
