import React from "react"
import { HomeIcon, WindowIcon } from "@heroicons/react/24/outline"

/**
 * Menu Item Type Definition
 * Represents a single item in the navigation menu.
 * @property {string} key - Unique identifier for the menu item.
 * @property {string} label - Display text for the menu item.
 * @property {string} [link] - URL or path the menu item points to. Optional for parent items.
 * @property {"internal" | "external" | "parent"} type - Type of link (internal, external or non-link parent).
 * @property {MenuItem[]} [links] - Optional array of sub-menu items.
 */

export type MenuItem = {
  key: string
  icon?: React.ReactNode
  label: string | null
  link: string
  type: "internal" | "external" | "parent"
  links?: MenuItem[]
}

/**
 * Menu Configuration
 * Defines the structure of the application's navigation menu.
 * Each menu item includes a key, label, link, type, and optional sub-links.
 * @type {MenuItem[]}
 */

export const menuItems: MenuItem[] = [
  {
    key: "home",
    icon: <HomeIcon className="size-5" strokeWidth={2} />,
    label: null,
    link: "/",
    type: "internal",
  },
  {
    key: "components",
    label: "Components",
    link: "",
    type: "parent",
    links: [
      { key: "typography", label: "Typography", link: "/components/typography", type: "internal" },
      { key: "buttons", label: "Buttons", link: "/components/buttons", type: "internal" },
      { key: "form", label: "Form", link: "/components/form", type: "internal" },
      { key: "table", label: "Table", link: "/components/table", type: "internal" },
      { key: "informers", label: "Informers", link: "/components/informers", type: "internal" },
      { key: "loading", label: "Loading", link: "/components/loading", type: "internal" },
      { key: "modals", label: "Modals", link: "/components/modals", type: "internal" },
    ],
  },
  {
    key: "docs",
    label: "Docs",
    link: "https://xray.app/wiki/dev/mini-apps/",
    type: "external",
  },
]
