import { useState } from "react"
import { Button, Modal } from "antd"
import { message } from "@/utils/escapeAntd"
import { BookOpenIcon } from "@heroicons/react/24/outline"

export default function ModalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="mb-10">
      <h2 className="text-5xl font-bold mb-14">Modals</h2>
      <Button type="primary" shape="round" size="large" onClick={() => setIsModalOpen(true)}>
        <BookOpenIcon className="size-5" strokeWidth={2} />
        <span>Open Modal</span>
      </Button>
      <Modal
        title="Modal Title"
        open={isModalOpen}
        onOk={() => {
          message.success("Confirmed!")
          setIsModalOpen(false)
        }}
        onCancel={() => {
          message.info("Cancelled")
          setIsModalOpen(false)
        }}
        okText="Confirm"
        cancelText="Cancel"
        okButtonProps={{ size: "large", shape: "round" }}
        cancelButtonProps={{ size: "large", shape: "round" }}
        centered
      >
        <div className="p-20 text-gray-500">
          <p>
            This is the content of the modal. You can put any information you want here. Click Confirm or Cancel to
            close the modal.
          </p>
        </div>
      </Modal>
    </section>
  )
}
