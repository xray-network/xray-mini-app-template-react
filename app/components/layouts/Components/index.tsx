import { Outlet } from "react-router"
import { menuItems } from "@/config/menu"
import MenuMain from "@/components/common/MenuMain"

export default function Components() {
  const items = menuItems.find((item) => item.key === "components")?.links || []

  return (
    <div>
      <section className="mb-14">
        <MenuMain items={items} />
      </section>
      <Outlet />
    </div>
  )
}
