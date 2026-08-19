import { useEffect } from "react"
import { platformV1 } from "@xray-network/xray-js/mini-app-bridge/react"
import { usePreferencesStore } from "@/store/preferences"

export const useSyncHostPreferences = () => {
  const hostTheme = platformV1.useTheme()
  const hostCurrency = platformV1.useCurrency()
  const hostHideBalances = platformV1.useHideBalances()

  useEffect(() => {
    usePreferencesStore.setState({
      ...(hostTheme.data !== undefined && { themePrefer: hostTheme.data }),
      ...(hostCurrency.data !== undefined && { currency: hostCurrency.data }),
      ...(hostHideBalances.data !== undefined && { hideBalances: hostHideBalances.data }),
    })
  }, [hostCurrency.data, hostHideBalances.data, hostTheme.data])
}
