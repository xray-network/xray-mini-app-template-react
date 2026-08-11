import { Outlet } from "react-router"
import Header from "@/components/common/Header"
import ModalSettings from "@/components/modals/Settings"

export default function LayoutMain() {
  return (
    <>
      <Header />
      <div className="px-3 py-5 sm:p-6 mx-auto max-w-354">
        <Outlet />
      </div>
      <ModalSettings />
    </>
  )
}
