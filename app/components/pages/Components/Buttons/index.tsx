import { Button } from "antd"
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline"

export default function ButtonsPage() {
  return (
    <section className="mb-10">
      <h2 className="text-5xl font-bold mb-14">Buttons</h2>
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
        <Button size="large" type="primary" shape="round">
          <ChatBubbleBottomCenterIcon className="size-5" strokeWidth={2} />
          <span>With Icon</span>
        </Button>
      </div>
    </section>
  )
}
