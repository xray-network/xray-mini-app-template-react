import { useState, useEffect } from "react"
import { Statistic } from "antd"
import { cardano, useMiniApp } from "@xray-network/xray-js/mini-app-bridge/react"
import * as utils from "@/utils"
import classnames from "classnames"
import { useEffectiveNetwork } from "@/integrations/xray-js/useEffectiveSettings"

const NetworkStats = () => {
  const { tip } = cardano.bridge.useTip()
  const { connected, context } = useMiniApp()
  const fallbackNetwork = useEffectiveNetwork()
  const network = context?.blockchain === "cardano" ? context.network : fallbackNetwork
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
    const timeout = setTimeout(() => {
      setAnimate(false)
    }, 700)
    return () => clearTimeout(timeout)
  }, [tip?.blockNo])

  if (connected && context && context.blockchain !== "cardano") {
    return (
      <div>
        Blockchain: {utils.capitalizeFirstLetter(context.blockchain)}
        <br />
        Network: {utils.capitalizeFirstLetter(context.network)}
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center text-xs text-gray-500">
      <div>
        <span
          className={classnames("shared-dot", {
            "shared-dot-animate": animate,
          })}
        />{" "}
        <span className="ms-1">Block: {utils.quantityWithCommas(tip?.blockNo || 0)}</span>{" "}
        <span>· Slot: {utils.quantityWithCommas(tip?.absSlot || 0)}</span>
      </div>
      <div>
        Epoch: {utils.quantityWithCommas(tip?.epochNo || 0)} ·{" "}
        {`${utils.epochProgress(tip?.epochNo || 0, network || "mainnet")}%`} ·{" "}
        <span className="shared-countdown">
          <Statistic.Timer
            type="countdown"
            value={new Date(utils.epochEndTime(tip?.epochNo || 0, network || "mainnet") || "0").getTime()}
            format="D[d] HH[h] mm[m] ss[s]"
          />
        </span>
      </div>
      <div>Network: {network ? utils.capitalizeFirstLetter(network) : "—"}</div>
    </div>
  )
}

export default NetworkStats
