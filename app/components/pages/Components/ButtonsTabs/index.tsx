import { Button, Tabs } from "antd"
import type { TabsProps } from "antd"

const tabItems: TabsProps["items"] = [
  {
    key: "1",
    label: "Transactions",
    children: (
      <div className="text-gray-500">
        <p>
          Tabs are a great way to organize content into separate views. Switch between tabs to see different content
          without leaving the page.
        </p>
      </div>
    ),
  },
  {
    key: "2",
    label: "Accounts",
    children: (
      <div className="text-gray-500">
        <p>
          Tabs make it easy to organize content into separate views. Switch between tabs to see different content
          without leaving the page.
        </p>
      </div>
    ),
  },
  {
    key: "3",
    label: "Analytics",
    children: (
      <div className="text-gray-500">
        <p>
          Use tabs to organize content into separate views. Switch between tabs to see different content without leaving
          the page.
        </p>
      </div>
    ),
  },
]

export default function ButtonsTabs() {
  return (
    <section className="mb-10">
      <div className="px-6 py-5 rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-semibold mb-10">Antd Buttons & Tabs</h2>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="text">Text</Button>
          <Button type="link">Link</Button>
          <Button danger>Danger</Button>
          <Button type="primary" disabled>
            Disabled
          </Button>
          <Button size="small">Small</Button>
          <Button size="large" type="primary">
            Large
          </Button>
          <Button size="large" type="primary" shape="round">
            Round
          </Button>
        </div>
        <Tabs items={tabItems} />
      </div>
    </section>
  )
}
