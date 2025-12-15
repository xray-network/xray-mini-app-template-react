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

    const label = (() => {
      if (node.type === "internal") {
        return (
          <NavLink to={node.link} className={style.link}>
            {node.icon}
            {node.label}
          </NavLink>
        )
      }

      if (node.type === "external") {
        return (
          <a href={node.link} target="_blank" rel="noreferrer" className={style.link}>
            {node.icon}
            {node.label}
            <ArrowUpRightIcon className="size-4" strokeWidth={2} />
          </a>
        )
      }

      return (
        <div className={style.link}>
          {node.icon}
          {node.label}
        </div>
      )
    })()

    return {
      key: node.key,
      label,
      children: hasChildren ? buildDropdownItems(childLinks) : undefined,
    }
  })

const renderMenu = (items: MenuItem[], depth = 0) => {
  const renderDropdownTrigger = (item: MenuItem) => {
    if (item.type === "internal") {
      return (
        <NavLink to={item.link} className={style.button}>
          {item.icon}
          {item.label}
          <ChevronDownIcon className={style.downIcon} strokeWidth={2.5} />
        </NavLink>
      )
    }

    if (item.type === "external") {
      return (
        <a href={item.link} target="_blank" rel="noreferrer" className={style.button}>
          {item.icon}
          {item.label}
          <ArrowUpRightIcon className="size-4" strokeWidth={2} />
          <ChevronDownIcon className={style.downIcon} strokeWidth={2.5} />
        </a>
      )
    }

    return (
      <div className={style.button} role="button" tabIndex={0}>
        {item.icon}
        {item.label}
        <ChevronDownIcon className={style.downIcon} strokeWidth={2.5} />
      </div>
    )
  }

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
              {renderDropdownTrigger(item)}
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

        if (item.type === "external") {
          return (
            <a key={item.key} href={item.link} target="_blank" rel="noreferrer" className={style.button}>
              {item.icon}
              {item.label}
              <ArrowUpRightIcon className="size-4" strokeWidth={2} />
            </a>
          )
        }

        return (
          <div key={item.key} className={style.button}>
            {item.icon}
            {item.label}
          </div>
        )
      })}
    </>
  )
}

export default function MenuMain({ items }: { items: MenuItem[] }) {
  return <div className="flex flex-wrap gap-1">{renderMenu(items)}</div>
}
