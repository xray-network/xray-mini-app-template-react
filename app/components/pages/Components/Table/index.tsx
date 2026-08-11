import { useState, useEffect, useRef } from "react"
import { Table, Input, Radio, Space, Button, Skeleton, Alert } from "antd"
import type { TableProps, InputRef } from "antd"
import { useTip } from "@xray-network/xray-js/mini-app-bridge/cardano/react"
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon, ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline"
import Informers from "@/components/informers"
import * as utils from "@/utils"
import { formatDistanceToNow } from "date-fns"
import { useCardano } from "@/integrations/xray-js/CardanoProvider"
import { useBlocks } from "./blocks/model/useBlocks"
import type { Block } from "./blocks/types"

const sortOptions = [
  { key: "block_height", title: "Block" },
  { key: "epoch_no", title: "Epoch, Slot" },
  { key: "block_time", title: "Timestamp" },
  { key: "tx_count", title: "TXs Count" },
  { key: "pool", title: "Pool" },
  { key: "total_fees", title: "Total Fees" },
  { key: "total_output", title: "Total Output" },
]

export default function TablePage() {
  const searchInput = useRef<InputRef>(null)

  const cardano = useCardano()
  const { tip } = useTip()

  const [searchTerm, setSearchTerm] = useState("")
  const [pageSize, setPageSize] = useState(25)
  const [currentPage, setCurrentPage] = useState(1)
  const [sorterField, setSorterField] = useState("block_height")
  const [sorterOrder, setSorterOrder] = useState("descend" as "descend" | "ascend")
  const [filterLastBlocks, setFilterLastBlocks] = useState<number | null>(null)
  const [filterCurrentEpoch, setFilterCurrentEpoch] = useState(false)
  const [currency, setCurrency] = useState("ada")

  const { blocks, blockInfo, total, loading, error } = useBlocks(cardano.status === "ready" ? cardano.client : null, {
    page: currentPage,
    pageSize,
    searchTerm,
    latestLimit: filterLastBlocks,
    currentEpoch: filterCurrentEpoch ? (tip?.epochNo ?? null) : null,
    sortField: sorterField,
    sortOrder: sorterOrder,
  })

  useEffect(() => {
    const handleSearchFocus = (event: KeyboardEvent) => {
      if (event.code === "Slash") searchInput.current?.focus()
    }
    window?.addEventListener("keyup", handleSearchFocus)
    return () => {
      window?.removeEventListener("keyup", handleSearchFocus)
    }
  }, [])

  const changeTableParams: NonNullable<TableProps<Block>["onChange"]> = (pagination, _filters, sorter) => {
    const activeSorter = Array.isArray(sorter) ? sorter[0] : sorter
    if (activeSorter?.columnKey) setSorterField(String(activeSorter.columnKey))
    if (activeSorter?.order) setSorterOrder(activeSorter.order)
    if (pagination.current) setCurrentPage(pagination.current)
    if (pagination.pageSize) setPageSize(pagination.pageSize)
  }

  const blocksColumns: TableProps<Block>["columns"] = [
    {
      title: "Block",
      dataIndex: "block_height",
      key: "block_height",
      width: "15%",
      render: (record, records) => (
        <span>
          <a>{utils.quantityWithCommas(records.block_height)}</a>
        </span>
      ),
    },
    {
      title: "Epoch, Slot",
      dataIndex: "epoch_no",
      key: "epoch_no",
      width: "15%",
      render: (record, records) => (
        <span>
          <a>{utils.quantityWithCommas(records.epoch_no)}</a>{" "}
          <small className="text-gray-500 text-xs">{utils.quantityWithCommas(records.epoch_slot)}</small>
        </span>
      ),
    },
    {
      title: "Timestamp",
      dataIndex: "block_time",
      key: "block_time",
      width: "16%",
      render: (record, records) => (
        <div className="leading-3 -my-2">
          <div>
            <small>{utils.timestampToDateTime(records.block_time || 0)}</small>
          </div>
          <div className="text-gray-500 text-xs">
            <small>
              {formatDistanceToNow((records.block_time || 0) * 1000, { addSuffix: true, includeSeconds: true })}
            </small>
          </div>
        </div>
      ),
    },
    {
      title: "TXs Count",
      dataIndex: "tx_count",
      key: "tx_count",
      width: "10%",
      render: (record, records) => <span>{utils.quantityWithCommas(records.tx_count)}</span>,
    },
    {
      title: "Pool",
      dataIndex: "pool",
      key: "pool",
      width: "15%",
      render: (record, records) => (
        <span>
          <a>{utils.truncate(records.pool || "")}</a>
        </span>
      ),
    },
    {
      title: "Total Fees",
      dataIndex: "total_fees",
      key: "total_fees",
      align: "right",
      width: "100px",
      render: (record, records) => {
        const info = blockInfo.find((block) => block.hash === records.hash)
        const { a, b } = utils.quantityFormat(info?.total_fees || 0, 6, true)
        return (
          <span>
            {!info && (
              <Skeleton active paragraph={{ rows: 1, width: "100%" }} title={false} className="inline-flex! w-20!" />
            )}
            {info && (
              <span>
                {a}
                <small className="text-gray-500">{b ? `.${b}` : ""} ADA</small>
              </span>
            )}
          </span>
        )
      },
    },
    {
      title: "Total Output",
      dataIndex: "total_output",
      key: "total_output",
      align: "right",
      width: "130px",
      render: (record, records) => {
        const info = blockInfo.find((block) => block.hash === records.hash)
        const { a, b } = utils.quantityFormat(info?.total_output || 0, 6, true)
        return (
          <span>
            {!info && (
              <Skeleton active paragraph={{ rows: 1, width: "100%" }} title={false} className="inline-flex! w-20!" />
            )}
            {info && (
              <span>
                {a}
                <small className="text-gray-500">{b ? `.${b}` : ""} ADA</small>
              </span>
            )}
          </span>
        )
      },
    },
  ]

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
            placeholder="Search by Block Number"
            onChange={(event) => {
              setSearchTerm(event.target.value)
              setCurrentPage(1)
            }}
            allowClear
          />
        </div>
        <div className="ms-auto">
          <Informers.Dropdown
            active={filterLastBlocks !== null || filterCurrentEpoch}
            placement="bottomRight"
            selector={<FunnelIcon className="size-5" strokeWidth={2} />}
            items={[
              {
                type: "title",
                children: "Fees",
              },
              {
                type: "item",
                children: (
                  <Radio.Group onChange={(e) => setFilterLastBlocks(e.target.value)} value={filterLastBlocks}>
                    <Space direction="vertical">
                      <Radio value={null}>
                        <span className="font-size-14">All Blocks</span>
                      </Radio>
                      <Radio value={10}>
                        <span className="font-size-14">Latest 10 Blocks</span>
                      </Radio>
                      <Radio value={30}>
                        <span className="font-size-14">Latest 30 Blocks</span>
                      </Radio>
                    </Space>
                  </Radio.Group>
                ),
              },
              {
                type: "divider",
              },
              {
                type: "title",
                children: "Saturation",
              },
              {
                type: "item",
                children: (
                  <Radio.Group onChange={(e) => setFilterCurrentEpoch(e.target.value)} value={filterCurrentEpoch}>
                    <Space direction="vertical">
                      <Radio value={false}>
                        <span className="font-size-14">All Epoch</span>
                      </Radio>
                      {tip?.epochNo && (
                        <Radio value={true}>
                          <span className="font-size-14">Current Epoch ({tip?.epochNo})</span>
                        </Radio>
                      )}
                    </Space>
                  </Radio.Group>
                ),
              },
              {
                type: "divider",
              },
              {
                type: "item",
                children: (
                  <Button
                    type="primary"
                    className="w-full"
                    disabled={filterLastBlocks === null && !filterCurrentEpoch}
                    onClick={() => {
                      setFilterLastBlocks(null)
                      setFilterCurrentEpoch(false)
                    }}
                  >
                    <XMarkIcon className="size-5 -me-1" strokeWidth={2} />
                    <span>Reset</span>
                  </Button>
                ),
              },
            ]}
          />
        </div>
        <div className="ms-2">
          <Informers.Dropdown
            placement="bottomRight"
            active={sorterOrder !== "descend" || sorterField !== "block_height"}
            selector={
              <div className="flex items-center">
                {sorterOrder === "ascend" && <ArrowUpIcon className="size-5" strokeWidth={2} />}
                {sorterOrder === "descend" && <ArrowDownIcon className="size-5" strokeWidth={2} />}
                <span className="font-size-14 lh-1 text-nowrap">
                  {sortOptions.find((item) => item.key === sorterField)?.title}
                </span>
              </div>
            }
            items={[
              {
                type: "title",
                children: "Sort Order",
              },
              {
                type: "item",
                children: (
                  <Radio.Group onChange={(e) => setSorterOrder(e.target.value)} value={sorterOrder}>
                    <Space direction="vertical">
                      <Radio value="descend">
                        <div className="flex">
                          <ArrowDownIcon className="size-5" strokeWidth={2} />
                          <span className="font-size-14">High to low</span>
                        </div>
                      </Radio>
                      <Radio value="ascend">
                        <div className="flex">
                          <ArrowUpIcon className="size-5" strokeWidth={2} />
                          <span className="font-size-14">Low to high</span>
                        </div>
                      </Radio>
                    </Space>
                  </Radio.Group>
                ),
              },
              {
                type: "divider",
              },
              {
                type: "title",
                children: "Sort By",
              },
              {
                type: "item",
                children: (
                  <Radio.Group onChange={(e) => setSorterField(e.target.value)} value={sorterField}>
                    <Space direction="vertical">
                      {sortOptions.map((item) => {
                        return (
                          <Radio key={item.key} value={item.key}>
                            <span className="font-size-14">{item.title}</span>
                          </Radio>
                        )
                      })}
                    </Space>
                  </Radio.Group>
                ),
              },
              {
                type: "divider",
              },
              {
                type: "item",
                children: (
                  <Button
                    type="primary"
                    className="w-full"
                    disabled={sorterOrder === "descend" && sorterField === "block_height"}
                    onClick={() => {
                      setSorterOrder("descend")
                      setSorterField("block_height")
                    }}
                  >
                    <XMarkIcon className="size-5 -me-1" strokeWidth={2} />
                    <span>Reset</span>
                  </Button>
                ),
              },
            ]}
          />
        </div>
        <div className="ms-2">
          <Informers.Switcher
            onChange={(key) => setCurrency(key)}
            value={currency}
            items={[
              {
                key: "ada",
                icon: "₳",
                tooltip: "In ADA",
              },
              {
                key: "currency",
                icon: "$",
                tooltip: "In USD",
              },
            ]}
          />
        </div>
      </div>
      {(error || cardano.status === "error") && (
        <Alert
          className="mb-4"
          type="error"
          showIcon
          message="Unable to load block data"
          description={(error ?? (cardano.status === "error" ? cardano.error : null))?.message}
        />
      )}
      <div className="shared-table">
        <Table<Block>
          onChange={changeTableParams}
          rowKey={(i) => i.block_height!}
          dataSource={blocks}
          columns={blocksColumns}
          sortDirections={["descend", "ascend", "descend"]}
          size="small"
          pagination={{
            // simple: true,
            position: ["bottomRight", "topRight"],
            size: "default",
            pageSize: pageSize,
            showSizeChanger: true,
            showPrevNextJumpers: false,
            total: total || 1,
            current: currentPage,
            pageSizeOptions: ["25", "50", "100"],
            showTotal: () => <div>{utils.quantityWithCommas(total)} Blocks</div>,
          }}
          loading={{
            spinning: loading || cardano.status === "loading",
            indicator: <span className="shared-spinner" />,
          }}
          locale={{
            emptyText: <div className="py-4 mb-1">No Blocks Found</div>,
          }}
        />
      </div>
    </section>
  )
}
