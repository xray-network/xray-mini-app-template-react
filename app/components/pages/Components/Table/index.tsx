import { Table, Tag, Space } from "antd"
import type { TableProps } from "antd"

type User = {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

const tableColumns: TableProps<User>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <span className="font-medium">{text}</span>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: 90,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    responsive: ["sm"],
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <Space size={[6, 6]} wrap>
        {tags.map((tag) => (
          <Tag
            key={tag}
            color={tag === "nice" ? "green" : tag === "dev" ? "blue" : tag === "warn" ? "orange" : "default"}
          >
            {tag.toUpperCase()}
          </Tag>
        ))}
      </Space>
    ),
  },
]

const tableData: User[] = [
  { key: "1", name: "John Brown", age: 32, address: "New York No. 1 Lake Park", tags: ["nice", "dev"] },
  { key: "2", name: "Jim Green", age: 42, address: "London No. 1 Lake Park", tags: ["pro", "warn"] },
  { key: "3", name: "Joe Black", age: 28, address: "Sydney No. 1 Lake Park", tags: ["new"] },
]

export default function Typography() {
  return (
    <section className="mb-10">
      <div className="px-6 py-5 rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-semibold mb-10">Antd Table</h2>
        <Table<User>
          columns={tableColumns}
          dataSource={tableData}
          pagination={{ pageSize: 5, position: ["bottomRight", "topRight"] }}
        />
      </div>
    </section>
  )
}
