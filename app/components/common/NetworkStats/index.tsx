import React, { useState, useEffect } from "react"
import { Statistic } from "antd"
import * as utils from "@/utils"
import packageInfo from "../../../../package.json"
import classnames from "classnames"
import { useAppStore } from "@/store/app"

const Sidebar = ({ variant }: { variant: "v1" | "v2" }) => {
  const tip = useAppStore((state) => state.tip)
  const network = useAppStore((state) => state.network)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
    const int = setInterval(() => {
      setAnimate(false)
    }, 700)
    return () => {
      clearInterval(int)
    }
  }, [tip?.blockNo])

  return (
    <div className="flex flex-col justify-center text-xs text-gray-500">
      <div>
        <span
          className={classnames("shared-dot", {
            "shared-dot-animate": animate,
          })}
        />{" "}
        <span className="ms-1">Block: {utils.quantityWithCommas(tip?.blockNo || 0)}</span>{" "}
        {variant === "v1" && <span>· Network: {network ? utils.capitalizeFirstLetter(network) : "—"}</span>}
        {variant === "v2" && <span>· Slot: {utils.quantityWithCommas(tip?.absSlot || 0)}</span>}
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
      {}
      {variant === "v1" && (
        <div className="mb-3 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mt-2">
          <div
            className="h-1.5 bg-green-500 rounded-full"
            style={{ width: `${tip?.epochNo && network ? utils.epochProgress(tip.epochNo, network) : 0}%` }}
          ></div>
        </div>
      )}
      {variant === "v2" && (
        <div>
          Network: {network ? utils.capitalizeFirstLetter(network) : "—"} · App Version: {packageInfo.version}
        </div>
      )}
    </div>
  )
}

export default Sidebar
