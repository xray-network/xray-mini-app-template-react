import { Button, Tabs } from "antd"
import { HomeIcon, PlusIcon, PaperAirplaneIcon, ChevronDownIcon } from "@heroicons/react/24/outline"

export default function ButtonsPage() {
  return (
    <section className="mb-10">
      <h2 className="text-5xl font-bold mb-14">Buttons</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-8">
        <div>
          <div className="mb-8">Rounded Buttons</div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Button size="large" type="primary" shape="round">
              <strong>Dashboard</strong>
            </Button>
            <Button size="large" type="primary" shape="round">
              <div className="h-8 w-8 -ms-3 rounded-full bg-blue-500" />
              <strong>Wallet</strong>
              <ChevronDownIcon className="size-5 text-gray-400" strokeWidth={2} />
            </Button>
            <Button size="large" type="primary" shape="round" disabled>
              <strong>Disabled</strong>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Button size="large" shape="round">
              <strong>Dashboard</strong>
            </Button>
            <Button size="large" shape="round">
              <div className="h-8 w-8 -ms-3 rounded-full bg-gray-700" />
              <strong>Wallet</strong>
              <ChevronDownIcon className="size-5 text-gray-400 dark:text-gray-600" strokeWidth={2} />
            </Button>
            <Button size="large" shape="round" disabled>
              <strong>Disabled</strong>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Button size="large" type="primary" shape="round">
              <HomeIcon className="size-5" strokeWidth={2} />
            </Button>
            <Button size="large" type="primary" shape="round">
              <PlusIcon className="size-5" strokeWidth={2} />
              <strong>Add Icon</strong>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Button size="large" type="primary" shape="round" className="w-full">
              <PaperAirplaneIcon className="size-5" strokeWidth={2} />
              <strong>Send</strong>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Button size="large" type="primary" shape="round">
              <strong>Dashboard</strong>
              <ChevronDownIcon className="size-5 text-gray-400" strokeWidth={2} />
            </Button>
            <Button size="large" shape="round">
              <strong>Dashboard</strong>
              <ChevronDownIcon className="size-5 text-gray-400 dark:text-gray-600" strokeWidth={2} />
            </Button>
          </div>
          <div className="mt-14 mb-8">Small Size</div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Button size="small" type="primary" shape="round" className="!px-5">
              <strong>OPEN</strong>
            </Button>
            <Button size="small" shape="round" className="!px-5">
              <strong>OPEN</strong>
            </Button>
            <Button size="small" type="primary" shape="round" disabled className="!px-5">
              <strong>DISABLED</strong>
            </Button>
            <Button size="small" shape="round" disabled className="!px-5">
              <strong>DISABLED</strong>
            </Button>
          </div>
        </div>
        <div>
          <div className="mb-8">Form Buttons</div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Button size="large" type="primary">
              Send
            </Button>
            <Button size="large">Reset</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Button size="large" type="primary" className="w-full">
              <PaperAirplaneIcon className="size-5" strokeWidth={2} />
              <strong>Send</strong>
            </Button>
          </div>
          <div className="mt-14 mb-8">Colorful Buttons</div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Button
              size="large"
              type="primary"
              shape="round"
              className="!bg-green-500 !border-green-500 hover:!bg-green-600 hover:!border-green-600"
            >
              <strong>Green Button</strong>
            </Button>
            <Button
              size="large"
              type="primary"
              shape="round"
              className="!bg-yellow-500 !border-yellow-500 hover:!bg-yellow-600 hover:!border-yellow-600"
            >
              <strong>Yellow Button</strong>
            </Button>
            <Button
              size="large"
              type="primary"
              shape="round"
              className="!bg-red-500 !border-red-500 hover:!bg-red-600 hover:!border-red-600"
            >
              <strong>Red Button</strong>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-14 mb-8">
        <div>
          <div className="mb-8">Tabs</div>
        </div>
        <Tabs
          defaultActiveKey="developer"
          items={[
            {
              key: "developer",
              label: <strong>Developer</strong>,
              children: "",
            },
            {
              key: "registrar",
              label: <strong>Registrar</strong>,
              children: "",
            },
            {
              key: "id",
              label: <strong>ID</strong>,
              children: "",
            },
          ]}
        />
      </div>
    </section>
  )
}
