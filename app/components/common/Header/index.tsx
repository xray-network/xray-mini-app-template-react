import { useEffect, useState } from "react"
import { Button, Tooltip, Dropdown, Input } from "antd"
import { NavLink } from "react-router"
import { Cog6ToothIcon, Bars3Icon } from "@heroicons/react/24/outline"
import { useAppStore } from "@/store/app"
import { useIsMobileView } from "@/utils/hooks"
import MenuDesktop from "@/components/common/MenuDesktop"
import MenuMobile from "@/components/common/MenuMobile"

export default function Header() {
  const [showSettingsTooltip, setShowSettingsTooltip] = useState(false)
  const modalSettingsSet = useAppStore((state) => state.modalSettingsSet)
  const menuDrawerOpenSet = useAppStore((state) => state.menuDrawerOpenSet)
  const isMobileView = useIsMobileView()

  return (
    <div className="flex px-6 py-4 items-center text-nowrap border-b border-gray-200 dark:border-gray-800">
      <div className="me-3 md:me-7">
        <div className="font-black text-lg leading-5">Mini Apps Base</div>
        <div className="text-sm text-gray-500">XRAY Extenstion</div>
      </div>
      {!isMobileView ? <MenuDesktop /> : <MenuMobile />}
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
      <Button
        className="ms-2 lg:!hidden"
        size="large"
        shape="round"
        type="default"
        onClick={() => {
          menuDrawerOpenSet(true)
        }}
      >
        <Bars3Icon className="size-5" strokeWidth={2} />
      </Button>
    </div>
  )
}
