import { useEffect, useState } from "react"
import { Button, Tooltip, Dropdown, Input } from "antd"
import { NavLink } from "react-router"
import { Cog6ToothIcon, Bars3Icon } from "@heroicons/react/24/outline"
import { useAppStore } from "@/store/app"
import { useIsMobileView } from "@/utils/hooks"
import Menu from "@/components/common/MenuButtons"
import MenuMobile from "@/components/common/MenuMobile"
import { menuItems } from "@/config/menu"

export default function Header() {
  const [showSettingsTooltip, setShowSettingsTooltip] = useState(false)
  const modalSettingsSet = useAppStore((state) => state.modalSettingsSet)
  const menuDrawerOpenSet = useAppStore((state) => state.menuDrawerOpenSet)
  const isMobileView = useIsMobileView()

  return (
    <div className="flex px-6 py-4 items-center text-nowrap">
      <NavLink to="/" className="pe-3 md:pe-7">
        <div className="text-black dark:text-white font-black text-lg leading-5">Mini App Template</div>
        <div className="text-sm text-gray-500">React Version</div>
      </NavLink>
      {!isMobileView ? <Menu items={menuItems} /> : <MenuMobile items={menuItems} />}
      <div className="flex items-center ms-auto ps-3 md:ps-7">
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
    </div>
  )
}
