import { SVGXray } from "@/svg"
import style from "./style.module.css"
import { useAppStore } from "@/store/app"
import { NavLink } from "react-router"
import Copy from "@/components/common/Copy"
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline"

export default function HomePage() {
  const network = useAppStore((state) => state.network)

  return (
    <div className="text-center">
      [home]
      <div className="text-center mt-10 text-sm text-gray-500">
        <p>Mini Apps SDK: not connected</p>
        <p>SDK Version: v1.0.0, Network: {network || ""}</p>
      </div>
    </div>
  )
}
