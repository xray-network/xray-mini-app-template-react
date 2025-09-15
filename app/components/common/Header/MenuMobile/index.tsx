import { NavLink } from "react-router"
import { Drawer } from "antd"
import style from "./style.module.css"
import { ArrowUpRightIcon } from "@heroicons/react/24/outline"
import { menuItems } from "@/config/menu"
import type { MenuItem } from "@/config/menu"
import { useAppStore } from "@/store/app"

export default function MenuMobile() {
  const menuDrawerOpen = useAppStore((state) => state.menuDrawerOpen)
  const menuDrawerOpenSet = useAppStore((state) => state.menuDrawerOpenSet)

  return (
    <Drawer
      open={menuDrawerOpen}
      onClose={() => menuDrawerOpenSet(false)}
      closeIcon={null}
      width="17rem"
      placement="left"
      className="!bg-white dark:!bg-gray-900 border-r border-gray-200 dark:border-gray-800"
    >
      <div className={style.menu}>
        {menuItems.map((item) => {
          const renderInternalItem = (menuItem: MenuItem, level = 0) => (
            <NavLink
              to={menuItem.link}
              key={menuItem.key}
              style={level ? { paddingLeft: `${level + 0.5 * 1}rem` } : {}}
            >
              {menuItem.label}
            </NavLink>
          )

          const renderExternalItem = (menuItem: MenuItem, level = 0) => (
            <a
              href={menuItem.link}
              key={menuItem.key}
              target="_blank"
              rel="noreferrer"
              style={level ? { paddingLeft: `${level * 1}rem` } : {}}
            >
              <span>{menuItem.label}</span> <ArrowUpRightIcon className="size-4 ms-1" strokeWidth={2} />
            </a>
          )

          const renderBranch = (node: MenuItem, level = 0) => {
            return (
              <div key={`branch-${node.key}`}>
                {node.type === "internal" ? renderInternalItem(node, level) : renderExternalItem(node, level)}
                {node.links && node.links.length > 0 && (
                  <div>{node.links.map((child) => renderBranch(child, level + 1))}</div>
                )}
              </div>
            )
          }

          return renderBranch(item, 0)
        })}
      </div>
    </Drawer>
  )
}
