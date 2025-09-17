export type MenuItem = {
  key: string
  label: string
  link: string
  type: "internal" | "external"
  links?: MenuItem[]
}

export const menuItems: MenuItem[] = [
  {
    key: "home",
    label: "Home",
    link: "/",
    type: "internal",
  },
  {
    key: "components",
    label: "Components",
    link: "/components",
    type: "internal",
    links: [
      { key: "patterns", label: "Patterns", link: "/components/patterns", type: "internal" },
      { key: "typography", label: "Typography", link: "/components/typography", type: "internal" },
      { key: "buttons", label: "Buttons", link: "/components/buttons", type: "internal" },
      { key: "form", label: "Form", link: "/components/form", type: "internal" },
      { key: "table", label: "Table", link: "/components/table", type: "internal" },
      { key: "breakdown", label: "Breakdown", link: "/components/breakdown", type: "internal" },
      { key: "loading", label: "Loading", link: "/components/loading", type: "internal" },
    ],
  },
  {
    key: "1",
    label: "Wiki",
    link: "https://xray.app/wiki",
    type: "external",
  },
]
