import { SVGXray } from "@/svg"
import style from "./style.module.css"
import { useAppStore } from "@/store/app"
import { NavLink } from "react-router"
import Copy from "@/components/common/Copy"
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline"

export default function HomePage() {
  const network = useAppStore((state) => state.network)

  return (
    <div>
      <div className="text-center mt-20 mb-5">
        <div className={style.logo}>
          <SVGXray />
        </div>
      </div>
      <div className="text-center mb-10 max-w-200 mx-auto">
        This project is a lightweight React starter template designed for quickly building and deploying Mini Apps
        within the XRAY ecosystem. It provides a minimal setup with the essential tooling and structure already in
        place, so you can focus on developing features rather than configuration.
      </div>
      <div className="px-10 py-5 mb-5 rounded-2xl max-w-160 mx-auto text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
        <p className="mb-2 font-bold text-black dark:text-white">Plug and Play:</p>
        <ol className="list-decimal ms-5 space-y-2">
          <li>
            <span>Clone the template repository:</span>
            <br />
            <strong>
              <code className="me-2">git clone https://github.com/xray-network/xray-mini-app-template-react.git</code>
              <Copy copy="git clone https://github.com/xray-network/xray-mini-app-template-react.git">
                <DocumentDuplicateIcon className="inline-flex size-5 text-gray-500 cursor-pointer" strokeWidth={2} />
              </Copy>
            </strong>
          </li>
          <li>
            <span>Install dependencies:</span>
            <br />
            <strong>
              <code className="me-2">yarn install</code>
            </strong>
            <Copy copy="yarn install clone https://github.com/xray-network/xray-mini-app-template-react.git">
              <DocumentDuplicateIcon className="inline-flex size-5 text-gray-500  cursor-pointer" strokeWidth={2} />
            </Copy>
          </li>
          <li>
            <span>Run the development server:</span>
            <br />
            <strong>
              <code className="me-2">yarn dev</code>
              <Copy copy="yarn install clone https://github.com/xray-network/xray-mini-app-template-react.git">
                <DocumentDuplicateIcon className="inline-flex size-5 text-gray-500 cursor-pointer" strokeWidth={2} />
              </Copy>
            </strong>
          </li>
          <li>Copy the local URL (usually http://localhost:5173/)</li>
          <li>
            Paste the URL into the <strong>Mini App Builder</strong>
          </li>
          <li>🎉 Enjoy your first Mini App!</li>
        </ol>
      </div>
      <div className="px-10 py-5 rounded-2xl max-w-160 mx-auto text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
        <p className="mb-2 font-bold text-black dark:text-white">Next Steps:</p>
        <ol className="list-decimal ms-5 space-y-2">
          <li>
            Read the{" "}
            <a className="text-blue-500" href="https://xray.app/wiki/" target="_blank" rel="noreferrer">
              Mini Apps SDK documentation
            </a>
          </li>
          <li>
            Run the sample app in <strong>Mini App Builder</strong>
          </li>
          <li>Start building your own Mini App</li>
          <li>
            Explore and use <NavLink to="/components">example components</NavLink>
          </li>
          <li>
            🚀 Publish your app to the XRAY <strong>Mini Apps Catalog</strong>
          </li>
        </ol>
      </div>
      <div className="text-center mt-10 text-sm text-gray-500">
        <p>Mini Apps SDK: not connected</p>
        <p>SDK Version: v1.0.0, Network: {network || ""}</p>
      </div>
    </div>
  )
}
