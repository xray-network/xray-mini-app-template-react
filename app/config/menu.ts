export type MenuItem = {
  key: string
  label: string
  link: string
  type: "internal" | "external"
  links?: MenuItem[]
}

export const menuItems: MenuItem[] = [
  {
    key: "1",
    label: "Home",
    link: "/",
    type: "internal",
  },
  {
    key: "2",
    label: "Components",
    link: "/components",
    type: "internal",
    links: [
      { key: "2-1", label: "Buttons", link: "/components/buttons", type: "internal" },
      { key: "2-2", label: "Cards", link: "/components/cards", type: "internal" },
      {
        key: "2-3",
        label: "Modals",
        link: "/components/modals",
        type: "internal",
      },
    ],
  },
  {
    key: "1",
    label: "Wiki",
    link: "https://xray.app/wiki",
    type: "external",
  },
]
