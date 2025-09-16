import { useState, useEffect } from "react"
import { Table, Tag, Space } from "antd"
import type { TableProps } from "antd"
import type { KoiosTypes } from "cardano-web3-js"
import { useWeb3Store } from "@/store/web3"
import * as utils from "@/utils"

type Block = KoiosTypes.paths["/blocks"]["get"]["responses"]["200"]["content"]["application/json"][number]

const blocksColumns: TableProps<Block>["columns"] = [
  {
    title: "Block",
    dataIndex: "block_height",
    key: "block_height",
    render: (record, records) => <span className="font-medium">{records.block_height}</span>,
  },
  {
    title: "Epoch / Slot",
    dataIndex: "epoch_no",
    key: "epoch_no",
    render: (record, records) => <span className="font-medium">{records.epoch_no}</span>,
  },
  {
    title: "Timestamp",
    dataIndex: "block_time",
    key: "block_time",
    render: (record, records) => <span className="font-medium">{records.block_time}</span>,
  },
  {
    title: "TXs Count",
    dataIndex: "tx_count",
    key: "tx_count",
    render: (record, records) => <span className="font-medium">{records.tx_count}</span>,
  },
  {
    title: "Pool",
    dataIndex: "pool",
    key: "pool",
    render: (record, records) => <span className="font-medium">{records.pool}</span>,
  },
  {
    title: "Total Fees",
    dataIndex: "total_fees",
    key: "total_fees",
    // @ts-ignore
    render: (record, records) => <span className="font-medium">0</span>,
  },
  {
    title: "Total Output",
    dataIndex: "total_fees",
    key: "total_fees",
    align: "right",
    render: (record, records) => <span className="font-medium">0</span>,
  },
]

export default function TableComp() {
  const web3 = useWeb3Store((state) => state.web3)

  const [loading, setLoading] = useState(true)
  const [blockList, setBlockList] = useState<Block[]>([])
  const [totalResults, setTotalResults] = useState(0)
  const [pageSize, setPageSize] = useState(25)
  const [currentPage, setCurrentPage] = useState(1)

  const getBlocks = async () => {
    setLoading(true)
    const blockLatest = (await web3?.explorers.koios.GET("/tip"))?.data?.[0]?.block_no
    setTotalResults(blockLatest || 0)
    const blocksResponse = await web3?.explorers.koios.GET("/blocks", {
      headers: {
        "Content-Type": "application/json",
        Range: utils.pageSizeToContentRange(currentPage - 1, pageSize),
      }
    })
    setBlockList(blocksResponse?.data || [])
    setLoading(false)
  }

  useEffect(() => {
    if (web3) {
      getBlocks()
    }
  }, [web3])

  const changeTableParams = (pagination: any, filters: any, sorter: any) => {
    // sorter?.columnKey && setSorterField(sorter.columnKey)
    // sorter?.order && setSorterOrder(sorter.order)
    // pagination?.current && setCurrentPage(pagination.current || 0)
    // pagination?.pageSize && setPageSize(pagination.pageSize || 25)
  }

  return (
    <section className="mb-10">
      <div className="px-6 py-5 rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-semibold mb-5">Antd Table</h2>
        <div className="shared-table">
          <Table<Block>
            onChange={(pagination, filters, sorter) => changeTableParams(pagination, filters, sorter)}
            rowKey={(i) => i.block_height!}
            dataSource={blockList}
            columns={blocksColumns}
            sortDirections={["descend", "ascend", "descend"]}
            size="large"
            pagination={{
              position: ["bottomRight", "topRight"],
              size: "default",
              pageSize: pageSize,
              showSizeChanger: true,
              showPrevNextJumpers: false,
              total: totalResults || 1,
              current: currentPage,
              pageSizeOptions: ["25", "50", "100"],
              showTotal: () => <div>{utils.quantityWithCommas(totalResults)} Blocks</div>,
            }}
            loading={{
              spinning: loading,
              indicator: <i className="xray-spinner" />,
            }}
            locale={{
              emptyText: <div className="py-4 mb-1">No Blocks Found</div>,
            }}
          />
        </div>
      </div>
    </section>
  )
}
