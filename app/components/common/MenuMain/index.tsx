import { Dropdown } from "antd"
import type { MenuProps } from "antd"
import { NavLink } from "react-router"
import { ArrowUpRightIcon, ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline"
import type { MenuItem } from "@/config/menu"
import style from "./style.module.css"

const buildDropdownItems = (nodes: MenuItem[]): MenuProps["items"] =>
  nodes.map((node) => {
    const hasChildren = !!(node.links && node.links.length)
    const childLinks = node.links ?? []
    return {
      key: node.key,
      label:
        node.type === "internal" ? (
          <NavLink to={node.link} className={style.link}>
            {node.icon}
            {node.label}
          </NavLink>
        ) : (
          <a href={node.link} target="_blank" rel="noreferrer" className={style.link}>
            {node.icon}
            {node.label}
            <ArrowUpRightIcon className="size-4" strokeWidth={2} />
          </a>
        ),
      children: hasChildren ? buildDropdownItems(childLinks) : undefined,
    }
  })

const renderMenu = (items: MenuItem[], depth = 0) => {
  return (
    <>
      {items.map((item) => {
        const hasChildren = !!(item.links && item.links.length)
        if (hasChildren) {
          return (
            <Dropdown
              key={item.key}
              menu={{
                items: buildDropdownItems(item.links ?? []),
                expandIcon: (
                  <ChevronRightIcon className="size-4 self-center text-gray-400 dark:text-gray-600" strokeWidth={2.5} />
                ),
              }}
              trigger={["click", "hover"]}
              placement="bottomLeft"
              arrow
            >
              {item.type === "internal" ? (
                <NavLink to={item.link} className={style.button}>
                  {item.icon}
                  {item.label}
                  <ChevronDownIcon className={style.downIcon} strokeWidth={2.5} />
                </NavLink>
              ) : (
                <a href={item.link} target="_blank" rel="noreferrer" className={style.button}>
                  {item.icon}
                  {item.label}
                  <ArrowUpRightIcon className="size-4" strokeWidth={2} />
                  <ChevronDownIcon className={style.downIcon} strokeWidth={2.5} />
                </a>
              )}
            </Dropdown>
          )
        }

        if (item.type === "internal") {
          return (
            <NavLink key={item.key} to={item.link} className={style.button}>
              {item.icon}
              {item.label}
            </NavLink>
          )
        }

        return (
          <a key={item.key} href={item.link} target="_blank" rel="noreferrer" className={style.button}>
            {item.icon}
            {item.label}
            <ArrowUpRightIcon className="size-4" strokeWidth={2} />
          </a>
        )
      })}
    </>
  )
}

export default function MenuMain({ items }: { items: MenuItem[] }) {
  return <div className="flex flex-wrap gap-1">{renderMenu(items)}</div>
}
