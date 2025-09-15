import { Outlet } from "react-router"
import Header from "@/components/common/Header"
import ModalSettings from "@/components/modals/Settings"

export default function LayoutMain() {
  return (
    <>
      <Header />
      <div className="p-6 mx-auto max-w-[100rem]">
        <Outlet />
      </div>
      <ModalSettings />
    </>
  )
}
