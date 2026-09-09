import React from "react"

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
    key: "wiki",
    label: "Wiki",
    link: "https://wiki.xraynetwork.io",
    type: "external",
  },
]
