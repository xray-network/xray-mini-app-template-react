import { useEffect, useState } from "react"
import { Button, Tooltip, Dropdown, Input } from "antd"
import { NavLink } from "react-router"
import { ArrowUpRightIcon } from "@heroicons/react/24/outline"
import style from "./style.module.css"
import { menuItems } from "@/config/menu"
import type { MenuItem } from "@/config/menu"

export default function MenuDesktop() {
  return (
    <div className={style.menu}>
      {menuItems.map((item) => {
        const renderInternalItem = (menuItem: MenuItem, level = 0) => {
          return (
            <NavLink to={menuItem.link} key={menuItem.key} style={!!level ? { paddingLeft: `${level * 0.5}rem` } : {}}>
              {menuItem.label}
            </NavLink>
          )
        }
        const renderItemExternal = (menuItem: MenuItem, level = 0) => {
          return (
            <a
              href={menuItem.link}
              key={menuItem.key}
              target="_blank"
              rel="noreferrer"
              style={!!level ? { paddingLeft: `${level * 16}px` } : {}}
            >
              <span>{menuItem.label}</span> <ArrowUpRightIcon className="size-4 ms-1" strokeWidth={2} />
            </a>
          )
        }
        const buildFlatDropdownItems = (items: MenuItem[], level = 0): any[] => {
          const acc: any[] = []
          items.forEach((sub) => {
            const label = sub.type === "internal" ? renderInternalItem(sub, level) : renderInternalItem(sub, level)
            acc.push({ key: sub.key, label })
            if (sub.links && sub.links.length > 0) {
              acc.push(...buildFlatDropdownItems(sub.links, level + 1))
            }
          })
          return acc
        }
        return !!(item.links && item.links.length > 0) ? (
          <Dropdown
            menu={{ items: buildFlatDropdownItems(item.links!, 0) }}
            key={item.key}
            placement="bottom"
            trigger={["hover"]}
            arrow
          >
            {item.type === "internal" ? renderInternalItem(item) : renderItemExternal(item)}
          </Dropdown>
        ) : (
          <span key={item.key}>{item.type === "internal" ? renderInternalItem(item) : renderItemExternal(item)}</span>
        )
      })}
    </div>
  )
}
