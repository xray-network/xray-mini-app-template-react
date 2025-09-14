import { useEffect, useState } from "react"
import { Button, Tooltip, Dropdown, Input } from "antd"
import { NavLink } from "react-router"
import {
  PlusIcon,
  Cog6ToothIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  Squares2X2Icon,
  Bars3BottomRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"
import { useAppStore } from "@/store/app"
import style from "./style.module.css"
import * as utils from "@/utils"

export default function Header() {
  const [showSettingsTooltip, setShowSettingsTooltip] = useState(false)

  const modalSettingsSet = useAppStore((state) => state.modalSettingsSet)
  const hideBalancesSet = useAppStore((state) => state.hideBalancesSet)
  const network = useAppStore((state) => state.network)

  return (
    <div className="flex px-6 py-4 items-center text-nowrap border-b border-gray-200 dark:border-gray-800">
      <div className="me-3 md:me-7">
        <div className="font-bold text-lg leading-5">Mini App Base</div>
        <div className="text-sm text-gray-500">{utils.capitalizeFirstLetter(network || "")}</div>
      </div>
      <div className={style.menu}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/components">Components</NavLink>
      </div>
      <div className="ms-auto flex items-center">
        <Tooltip
          title="App Settings"
          open={showSettingsTooltip}
          onOpenChange={(open) => setShowSettingsTooltip(open)}
          placement="left"
        >
          <Button
            size="large"
            shape="round"
            type="default"
            onClick={() => {
              modalSettingsSet(true)
              setShowSettingsTooltip(false)
            }}
          >
            <Cog6ToothIcon className="size-5" strokeWidth={2} />
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}
