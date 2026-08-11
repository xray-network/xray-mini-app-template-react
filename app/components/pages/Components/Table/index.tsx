import { useEffect, useMemo, useRef, useState } from "react"
import { Button, Input, Radio, Space, Table } from "antd"
import type { InputRef, TableProps } from "antd"
import { ArrowDownIcon, ArrowUpIcon, FunnelIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline"
import Informers from "@/components/informers"

type CarStatus = "Available" | "Reserved" | "Sold"

type Car = {
  id: number
  make: string
  model: string
  year: number
  type: string
  horsepower: number
  price: number
  status: CarStatus
}

type SortField = "make" | "year" | "horsepower" | "price"
type SortOrder = "ascend" | "descend"

const cars: readonly Car[] = [
  {
    id: 1,
    make: "Alfa Romeo",
    model: "Giulia",
    year: 2023,
    type: "Sedan",
    horsepower: 280,
    price: 43800,
    status: "Available",
  },
  { id: 2, make: "Audi", model: "RS 3", year: 2024, type: "Sedan", horsepower: 401, price: 62900, status: "Reserved" },
  { id: 3, make: "BMW", model: "M2", year: 2024, type: "Coupe", horsepower: 453, price: 64200, status: "Available" },
  {
    id: 4,
    make: "Ford",
    model: "Mustang GT",
    year: 2022,
    type: "Coupe",
    horsepower: 450,
    price: 39900,
    status: "Sold",
  },
  {
    id: 5,
    make: "Honda",
    model: "Civic Type R",
    year: 2023,
    type: "Hatchback",
    horsepower: 315,
    price: 44795,
    status: "Available",
  },
  {
    id: 6,
    make: "Hyundai",
    model: "Ioniq 5 N",
    year: 2025,
    type: "Electric SUV",
    horsepower: 641,
    price: 66100,
    status: "Reserved",
  },
  {
    id: 7,
    make: "Land Rover",
    model: "Defender 110",
    year: 2021,
    type: "SUV",
    horsepower: 395,
    price: 58400,
    status: "Sold",
  },
  {
    id: 8,
    make: "Mazda",
    model: "MX-5 Miata",
    year: 2024,
    type: "Roadster",
    horsepower: 181,
    price: 28985,
    status: "Available",
  },
  {
    id: 9,
    make: "Mercedes-AMG",
    model: "A 45 S",
    year: 2023,
    type: "Hatchback",
    horsepower: 416,
    price: 57800,
    status: "Available",
  },
  {
    id: 10,
    make: "Porsche",
    model: "718 Cayman",
    year: 2022,
    type: "Coupe",
    horsepower: 300,
    price: 68900,
    status: "Reserved",
  },
  { id: 11, make: "Subaru", model: "BRZ", year: 2023, type: "Coupe", horsepower: 228, price: 30300, status: "Sold" },
  {
    id: 12,
    make: "Volvo",
    model: "V60 Polestar",
    year: 2024,
    type: "Wagon",
    horsepower: 455,
    price: 71450,
    status: "Available",
  },
]

const sortOptions: { key: SortField; title: string }[] = [
  { key: "make", title: "Make" },
  { key: "year", title: "Year" },
  { key: "horsepower", title: "Horsepower" },
  { key: "price", title: "Price" },
]

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price)

const columns: TableProps<Car>["columns"] = [
  {
    title: "Car",
    key: "car",
    render: (_, car) => (
      <div>
        <div className="font-semibold">{car.make}</div>
        <div className="text-xs text-gray-500">{car.model}</div>
      </div>
    ),
  },
  { title: "Year", dataIndex: "year", key: "year", width: 90 },
  { title: "Type", dataIndex: "type", key: "type", width: 140 },
  {
    title: "Power",
    dataIndex: "horsepower",
    key: "horsepower",
    align: "right",
    width: 110,
    render: (horsepower: number) => `${horsepower} hp`,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    align: "right",
    width: 120,
    render: formatPrice,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 110,
    render: (status: CarStatus) => (
      <span
        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
          status === "Available"
            ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
            : status === "Reserved"
              ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
              : "bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400"
        }`}
      >
        {status}
      </span>
    ),
  },
]

export default function TablePage() {
  const searchInput = useRef<InputRef>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [status, setStatus] = useState<CarStatus | "All">("All")
  const [sortField, setSortField] = useState<SortField>("make")
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascend")

  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      if (event.code === "Slash" && !(event.target instanceof HTMLInputElement)) {
        event.preventDefault()
        searchInput.current?.focus()
      }
    }
    window.addEventListener("keyup", focusSearch)
    return () => window.removeEventListener("keyup", focusSearch)
  }, [])

  const data = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase()
    return cars
      .filter((car) => status === "All" || car.status === status)
      .filter(
        (car) => !query || [car.make, car.model, car.type].some((value) => value.toLocaleLowerCase().includes(query))
      )
      .sort((left, right) => {
        const a = left[sortField]
        const b = right[sortField]
        const comparison = typeof a === "string" ? a.localeCompare(String(b)) : a - Number(b)
        return sortOrder === "ascend" ? comparison : -comparison
      })
  }, [searchTerm, sortField, sortOrder, status])

  return (
    <section className="mb-10">
      <h2 className="text-5xl font-bold mb-14">Table</h2>
      <div className="flex mb-4">
        <div className="grow max-w-120 min-w-20 me-2">
          <Input
            ref={searchInput}
            prefix={<MagnifyingGlassIcon className="size-5 me-1" strokeWidth={2} />}
            suffix={
              <span className="w-6 h-6 rounded-lg text-gray-500 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                /
              </span>
            }
            size="large"
            placeholder="Search cars"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            allowClear
          />
        </div>
        <div className="ms-auto">
          <Informers.Dropdown
            active={status !== "All"}
            placement="bottomRight"
            selector={<FunnelIcon className="size-5" strokeWidth={2} />}
            items={[
              { type: "title", children: "Availability" },
              {
                type: "item",
                children: (
                  <Radio.Group value={status} onChange={(event) => setStatus(event.target.value)}>
                    <Space direction="vertical">
                      {(["All", "Available", "Reserved", "Sold"] as const).map((value) => (
                        <Radio key={value} value={value}>
                          <span className="font-size-14">{value}</span>
                        </Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                ),
              },
              { type: "divider" },
              {
                type: "item",
                children: (
                  <Button
                    type="primary"
                    className="w-full"
                    disabled={status === "All"}
                    onClick={() => setStatus("All")}
                  >
                    <XMarkIcon className="size-5 -me-1" strokeWidth={2} />
                    Reset
                  </Button>
                ),
              },
            ]}
          />
        </div>
        <div className="ms-2">
          <Informers.Dropdown
            placement="bottomRight"
            active={sortOrder !== "ascend" || sortField !== "make"}
            selector={
              <div className="flex items-center gap-1">
                {sortOrder === "ascend" ? (
                  <ArrowUpIcon className="size-5" strokeWidth={2} />
                ) : (
                  <ArrowDownIcon className="size-5" strokeWidth={2} />
                )}
                <span className="font-size-14 lh-1 text-nowrap">
                  {sortOptions.find((item) => item.key === sortField)?.title}
                </span>
              </div>
            }
            items={[
              { type: "title", children: "Sort Order" },
              {
                type: "item",
                children: (
                  <Radio.Group value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                    <Space direction="vertical">
                      <Radio value="ascend">Low to high</Radio>
                      <Radio value="descend">High to low</Radio>
                    </Space>
                  </Radio.Group>
                ),
              },
              { type: "divider" },
              { type: "title", children: "Sort By" },
              {
                type: "item",
                children: (
                  <Radio.Group value={sortField} onChange={(event) => setSortField(event.target.value)}>
                    <Space direction="vertical">
                      {sortOptions.map((option) => (
                        <Radio key={option.key} value={option.key}>
                          {option.title}
                        </Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                ),
              },
            ]}
          />
        </div>
      </div>
      <div className="shared-table">
        <Table<Car>
          rowKey="id"
          dataSource={data}
          columns={columns}
          size="small"
          pagination={{
            size: "default",
            position: ["bottomRight", "topRight"],
            defaultPageSize: 10,
            pageSizeOptions: ["5", "10", "20"],
            showSizeChanger: true,
            total: data.length,
            showTotal: (total) => `${total} cars`,
          }}
          locale={{ emptyText: <div className="py-4 mb-1">No Cars Found</div> }}
        />
      </div>
    </section>
  )
}
