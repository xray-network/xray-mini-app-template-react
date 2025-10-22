import { useAppStore } from "@/store/app"
import { Button } from "antd"
import { ArrowUpRightIcon } from "@heroicons/react/24/outline"

export default function HomePage() {
  const network = useAppStore((state) => state.network)

  return (
    <div className="text-center">
      <div className="text-center mt-20">
        <img src="/connected.png" alt="Connected" className="mx-auto mb-5 w-80 max-w-[80%]" />
        <h1 className="text-5xl font-black mb-10">Connected!</h1>
        <a href="https://xray.app/wiki/dev/mini-apps/" target="_blank" rel="noreferrer">
          <Button type="primary" shape="round" size="large" className="!px-10">
            <span>Docs</span>
            <ArrowUpRightIcon className="size-5" strokeWidth={2} />
          </Button>
        </a>
      </div>
      <div className="text-center mt-10 text-sm text-gray-500">
        <p>Mini App SDK Version: —</p>
        <p>Network: {network || ""}</p>
      </div>
    </div>
  )
}
