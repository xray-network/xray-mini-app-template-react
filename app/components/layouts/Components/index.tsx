import { Tabs } from "antd"
import { NavLink, Outlet, useLocation } from "react-router"
import { menuItems } from "@/config/menu"

export default function Components() {
  const { pathname } = useLocation()
  const component = pathname.split("/")[2]
  const componentsMenu = menuItems.find((item) => item.key === "components")?.links || []

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-5">Example Components</h1>
        <p className="text-gray-500">
          This page showcases common UI patterns using Tailwind for typography and Ant Design for components. Use it as
          a quick reference and playground while building your Mini App.
        </p>
        <p className="text-gray-500">
          Links:{" "}
          <a href="https://tailwindcss.com/docs" target="_blank" rel="noreferrer">
            Tailwind Docs
          </a>
          ,{" "}
          <a href="https://ant.design/components/overview/" target="_blank" rel="noreferrer">
            Ant Design Docs
          </a>
        </p>
      </section>
      <Tabs
        activeKey={component}
        className="shared-tabs-link"
        items={componentsMenu.map((item) => ({
          key: item.key,
          label: (
            <NavLink to={item.link}>
              <strong>{item.label}</strong>
            </NavLink>
          ),
        }))}
      />
      <Outlet />
    </div>
  )
}
