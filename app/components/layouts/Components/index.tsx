import { Outlet } from "react-router"
import { menuItems } from "@/config/menu"
import Menu from "@/components/common/MenuButtons"

export default function Components() {
  const items = menuItems.find((item) => item.key === "components")?.links || []

  return (
    <div>
      <section className="mb-14">
        <Menu items={items} />
      </section>
      <Outlet />
    </div>
  )
}
