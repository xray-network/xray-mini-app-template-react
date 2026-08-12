import { NavLink } from "react-router"
import { Drawer } from "antd"
import style from "./style.module.css"
import { ArrowUpRightIcon } from "@heroicons/react/24/outline"
import type { MenuItem } from "@/config/menu"
import { useUiStore } from "@/store/ui"

export default function MenuMobile({ items }: { items: MenuItem[] }) {
  const menuOpen = useUiStore((state) => state.menuOpen)
  const setMenuOpen = useUiStore((state) => state.setMenuOpen)

  return (
    <Drawer
      open={menuOpen}
      onClose={() => setMenuOpen(false)}
      closeIcon={null}
      width="238px"
      placement="left"
      className={style.container}
    >
      <div className={style.menu}>
        {items.map((item) => {
          const renderInternalItem = (menuItem: MenuItem, level = 0) => (
            <NavLink
              to={menuItem.link}
              key={menuItem.key}
              style={level ? { marginLeft: `${level * 14}px` } : {}}
              className={style.link}
              onClick={() => {
                setMenuOpen(false)
              }}
            >
              {menuItem.icon}
              {menuItem.label}
            </NavLink>
          )

          const renderExternalItem = (menuItem: MenuItem, level = 0) => (
            <a
              href={menuItem.link}
              key={menuItem.key}
              target="_blank"
              rel="noreferrer"
              style={level ? { marginLeft: `${level * 14}px` } : {}}
              className={style.link}
              onClick={() => {
                setMenuOpen(false)
              }}
            >
              {menuItem.icon}
              {menuItem.label}
              <ArrowUpRightIcon className="size-4 ms-1" strokeWidth={2} />
            </a>
          )

          const renderParentItem = (menuItem: MenuItem, level = 0) => (
            <div key={menuItem.key} style={level ? { marginLeft: `${level * 14}px` } : {}} className={style.link}>
              {menuItem.icon}
              {menuItem.label}
            </div>
          )

          const renderBranch = (node: MenuItem, level = 0) => {
            return (
              <div className="flex flex-col gap-1" key={`branch-${node.key}`}>
                {node.type === "internal"
                  ? renderInternalItem(node, level)
                  : node.type === "external"
                    ? renderExternalItem(node, level)
                    : renderParentItem(node, level)}
                {node.links && node.links.length > 0 && (
                  <div className="flex flex-col gap-1">{node.links.map((child) => renderBranch(child, level + 1))}</div>
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
