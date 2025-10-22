import { Button, Checkbox, DatePicker, Form, Input, Radio, Select, Space, Switch } from "antd"
import { SunIcon, MoonIcon, Cog6ToothIcon } from "@heroicons/react/24/outline"

type User = {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

export default function FormPage() {
  const [form] = Form.useForm()

  return (
    <section className="mb-10">
      <h2 className="text-5xl font-bold mb-14">Form</h2>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div className="mb-8">Basic Typography</div>
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
                  <span>Submit</span>
                </Button>
                <Button htmlType="button" onClick={() => form.resetFields()}>
                  <span>Reset</span>
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
        <div>
          <div className="mb-8">Settings Form</div>
          <div className="mb-4">
            <span className="flex items-center">
              <span>Color Theme</span>
              <span className="ms-auto text-nowrap">
                <Radio.Group
                  defaultValue="system"
                  optionType="button"
                  buttonStyle="solid"
                  size="large"
                  options={[
                    {
                      label: (
                        <span className="inline-flex items-center">
                          <SunIcon className="size-5 me-1" strokeWidth={2} />
                          <span>Light</span>
                        </span>
                      ),
                      value: "light",
                    },
                    {
                      label: (
                        <span className="inline-flex items-center">
                          <MoonIcon className="size-5 me-1" strokeWidth={2} />
                          <span>Dark</span>
                        </span>
                      ),
                      value: "dark",
                    },
                    {
                      label: (
                        <span className="inline-flex items-center">
                          <Cog6ToothIcon className="size-5 me-1" strokeWidth={2} />
                          <span>System</span>
                        </span>
                      ),
                      value: "system",
                    },
                  ]}
                />
              </span>
            </span>
          </div>
          <div className="mb-4">
            <span className="flex items-center">
              <span>Default Currency</span>
              <span className="ms-auto">
                <Select size="large" defaultValue="usd">
                  <Select.Option value="usd">$ USD</Select.Option>
                  <Select.Option value="eur">€ EUR</Select.Option>
                  <Select.Option value="gbp">£ GBP</Select.Option>
                  <Select.Option value="jpy">¥ JPY</Select.Option>
                  <Select.Option value="cny">¥ CNY</Select.Option>
                </Select>
              </span>
            </span>
          </div>
          <div className="mb-4">
            <span className="flex items-center">
              <span>Explorer</span>
              <span className="ms-auto">
                <Select defaultValue="cardanoscan" popupMatchSelectWidth={false} size="large">
                  <Select.Option value="cardanoscan">Cardanoscan</Select.Option>
                  <Select.Option value="cexplorer">Cexplorer</Select.Option>
                  <Select.Option value="adastat">AdaStat</Select.Option>
                </Select>
              </span>
            </span>
          </div>
          <div className="mb-4">
            <span className="flex items-center">
              <span>Hide Balances</span>
              <span className="ms-auto">
                <Switch />
              </span>
            </span>
          </div>
          <div className="shared-line-dashed my-5" />
          <div className="mb-4">
            <span className="flex items-center">
              <span>Cardano Network</span>
              <span className="ms-auto">
                <Select size="large" defaultValue="mainnet">
                  <Select.Option value="mainnet">Mainnet</Select.Option>
                  <Select.Option value="preprod">Preprod</Select.Option>
                  <Select.Option value="preview">Preview</Select.Option>
                </Select>
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
