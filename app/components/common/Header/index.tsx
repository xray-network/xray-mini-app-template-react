import { useEffect, useState } from "react"
import { Button, Tooltip } from "antd"
import { NavLink } from "react-router"
import { Cog6ToothIcon, Bars3Icon } from "@heroicons/react/24/outline"
import { useUiStore } from "@/store/ui"
import Menu from "@/components/common/MenuMain"
import MenuMobile from "@/components/common/MenuMobile"
import { menuItems } from "@/config/menu"
import { version } from "../../../../package.json"

const useIsMobileView = (breakpoint = 1023) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const update = () => setIsMobile(mediaQuery.matches)
    update()
    mediaQuery.addEventListener("change", update)
    return () => mediaQuery.removeEventListener("change", update)
  }, [breakpoint])

  return isMobile
}

export default function Header() {
  const [showSettingsTooltip, setShowSettingsTooltip] = useState(false)
  const setSettingsOpen = useUiStore((state) => state.setSettingsOpen)
  const setMenuOpen = useUiStore((state) => state.setMenuOpen)
  const isMobileView = useIsMobileView()

  return (
    <div className="flex px-6 py-4 items-center text-nowrap">
      <NavLink to="/" className="pe-3 md:pe-7">
        <div className="text-black dark:text-white font-black text-lg leading-5">Mini App Template</div>
        <div className="text-sm text-gray-500">React Version {version}</div>
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
            type="text"
            onClick={() => {
              setSettingsOpen(true)
              setShowSettingsTooltip(false)
            }}
          >
            <Cog6ToothIcon className="size-5" strokeWidth={2} />
          </Button>
        </Tooltip>
        <Button
          className="ms-2 lg:hidden!"
          size="large"
          shape="round"
          type="text"
          onClick={() => {
            setMenuOpen(true)
          }}
        >
          <Bars3Icon className="size-5" strokeWidth={2} />
        </Button>
      </div>
    </div>
  )
}
