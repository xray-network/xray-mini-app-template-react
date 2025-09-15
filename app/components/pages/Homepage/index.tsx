import { SVGXray } from "@/svg"
import style from "./style.module.css"
import { useAppStore } from "@/store/app"
import { NavLink } from "react-router"

export default function Homepage() {
  const network = useAppStore((state) => state.network)

  return (
      <div>
        <div className="text-center mt-20 mb-5">
          <div className={style.logo}>
            <SVGXray />
            <span>Mini Apps Base</span>
          </div>
        </div>
        <div className="text-center mb-10">
          This is a minimalistic React base project for building Mini Apps for XRAY.
        </div>
        <div className="px-10 py-5 rounded-2xl max-w-120 mx-auto text-gray-500 bg-gray-100 dark:bg-gray-800">
          <p>Next steps:</p>
          <ul>
            <li>1. Read the <a className="text-blue-500" href="https://xray.app/wiki/" target="_blank" rel="noreferrer">Mini Apps SDK documentation</a></li>
            <li>2. Run the sample app in XRAY Mini App Dev</li>
            <li>3. Start building your own Mini App</li>
            <li>4. Explore and use <NavLink to="/components">example components</NavLink></li>
            <li>5. Publish your app to the XRAY Mini Apps Catalog</li>
          </ul>
        </div>
        <div className="text-center mt-10 text-sm text-gray-500">
          <p>Mini Apps SDK: not connected</p>
          <p>SDK Version: v1.0.0, Network: {network || ""}</p>
        </div>
      </div>
  )
}
