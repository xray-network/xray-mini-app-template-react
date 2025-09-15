import { Button, Checkbox, DatePicker, Form, Input, Radio, Select, Space, Switch } from "antd"

type User = {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

export default function ButtonsTabs() {
  const [form] = Form.useForm()

  return (
    <section className="mb-10">
      <div className="px-6 py-5 rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-semibold mb-10">Antd Form</h2>
        <div className="max-w-160 mx-auto">
          <Form
            name="example-form"
            layout="vertical"
            form={form}
            size="large"
            onFinish={(values) => {
              console.log("Form submitted:", values)
            }}
          >
            <Form.Item name="name" label="Full Name" rules={[{ required: true, message: "Please enter your name" }]}>
              <Input placeholder="John Doe" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ type: "email", required: true }]}>
              <Input placeholder="name@example.com" />
            </Form.Item>
            <Form.Item name="role" label="Role" initialValue="dev">
              <Select
                options={[
                  { label: "Developer", value: "dev" },
                  { label: "Designer", value: "design" },
                  { label: "Product", value: "pm" },
                ]}
              />
            </Form.Item>
            <Form.Item name="date" label="Start Date">
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item name="newsletter" label="Preferences">
              <Space direction="vertical">
                <Checkbox value="news">Subscribe to newsletter</Checkbox>
                <Radio.Group defaultValue="daily">
                  <Radio value="daily">Daily updates</Radio>
                  <Radio value="weekly">Weekly updates</Radio>
                </Radio.Group>
                <Space align="center">
                  <span>Enable notifications</span>
                  <Form.Item name="notify" noStyle valuePropName="checked" initialValue>
                    <Switch />
                  </Form.Item>
                </Space>
              </Space>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" onClick={() => form.resetFields()}>
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  )
}
