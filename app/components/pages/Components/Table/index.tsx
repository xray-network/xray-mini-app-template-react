import { useState, useEffect, useRef } from "react"
import { Table, Input, Radio, Space, Button, Skeleton } from "antd"
import type { TableProps, InputRef } from "antd"
import type { KoiosTypes } from "cardano-web3-js"
import { useWeb3Store } from "@/store/web3"
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon, ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline"
import Informers from "@/components/informers"
import * as utils from "@/utils"
import { formatDistanceToNow } from "date-fns"
import { useAppStore } from "@/store/app"
import { debounce } from "lodash"

type Block = KoiosTypes.paths["/blocks"]["get"]["responses"]["200"]["content"]["application/json"][number]
type BlockInfo = KoiosTypes.paths["/block_info"]["post"]["responses"]["200"]["content"]["application/json"][number]

export default function TablePage() {
  const searchInput = useRef<InputRef>(null)

  const web3 = useWeb3Store((state) => state.web3)
  const tip = useAppStore((state) => state.tip)

  const [loading, setLoading] = useState(true)
  const [blockList, setBlockList] = useState<Block[]>([])
  const [blockInfo, setBlockInfo] = useState<BlockInfo[]>([])
  const [searchString, setSearchString] = useState("")
  const [totalResults, setTotalResults] = useState(0)
  const [pageSize, setPageSize] = useState(25)
  const [currentPage, setCurrentPage] = useState(1)
  const [sorterField, setSorterField] = useState("block_height")
  const [sorterOrder, setSorterOrder] = useState("descend" as "descend" | "ascend")
  const [filterLastBlocks, setFilterLastBlocks] = useState("")
  const [filterCurrentEpoch, setFilterCurrentEpoch] = useState("")
  const [currency, setCurrency] = useState("ada")

  const loadBlocks = async () => {
    setLoading(true)

    const blockLatestResponse = await web3?.explorers.koios.GET("/blocks?limit=1" as "/blocks")
    const blockLatest = blockLatestResponse?.data?.[0].block_height || 0
    setTotalResults(blockLatest)

    const paramsString =
      `?limit=${pageSize}` +
      // `&offset=${pageSize * (currentPage - 1)}` + // Keyset pagination is preferred (next line), use only for small datasets
      `&block_height=lte.${blockLatest - pageSize * (currentPage - 1)}` +
      `${searchString}` +
      // `&order=${sorterField}.${sorterOrder === "ascend" ? "asc" : "desc"}` + // Too expensive query
      // `${filterLastBlocks}` +
      // `${filterCurrentEpoch}` + // Too expensive query
      ``

    const blockListResponse = await web3?.explorers.koios.GET(`/blocks${paramsString}` as "/blocks", {
      headers: {
        "Content-Type": "application/json",
        // Prefer: "count=estimated", // Too expensive query (returns total count in "Content-Range" response header)
        Range: `items=${utils.pageSizeToContentRange(currentPage - 1, pageSize)}`,
      },
    })
    setBlockList(blockListResponse?.data || [])

    setBlockInfo([])
    const blockInfoRespone = await web3?.explorers.koios.POST("/block_info", {
      body: {
        _block_hashes: blockListResponse?.data?.map((i) => i.hash) || [],
      },
    })
    setBlockInfo(blockInfoRespone?.data || [])

    setLoading(false)
  }

  useEffect(() => {
    if (web3) {
      loadBlocks()
    }
  }, [web3, searchString, pageSize, currentPage])
  // }, [web3, searchString, pageSize, currentPage, sorterField, sorterOrder, filterLastBlocks, filterCurrentEpoch])

  useEffect(() => {
    const handleSearchFocus = (e: any) => {
      try {
        if (e.code === "Slash") searchInput.current?.focus()
      } catch {}
    }
    window?.addEventListener("keyup", handleSearchFocus)
    return () => {
      window?.removeEventListener("keyup", handleSearchFocus)
    }
  }, [])

  const changeTableParams = (pagination: any, filters: any, sorter: any) => {
    sorter?.columnKey && setSorterField(sorter.columnKey)
    sorter?.order && setSorterOrder(sorter.order)
    pagination?.current && setCurrentPage(pagination.current || 0)
    pagination?.pageSize && setPageSize(pagination.pageSize || 25)
  }

  const changeSearchString = debounce((value: string) => {
    setSearchString(value ? `&block_height=eq.${value}` : "")
    setCurrentPage(1)
  }, 500)

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
      width: "10%",
      render: (record, records) => {
        const info = blockInfo.find((block) => block.hash === records.hash)
        const { a, b } = utils.quantityFormat(info?.total_fees || 0, 6, true)
        return (
          <span>
            {!info && (
              <Skeleton active paragraph={{ rows: 1, width: "100%" }} title={false} className="!inline-flex !w-20" />
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
      width: "16%",
      render: (record, records) => {
        const info = blockInfo.find((block) => block.hash === records.hash)
        const { a, b } = utils.quantityFormat(info?.total_output || 0, 6, true)
        return (
          <span>
            {!info && (
              <Skeleton active paragraph={{ rows: 1, width: "100%" }} title={false} className="!inline-flex !w-20" />
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
      <div className="px-6 py-5 rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-semibold mb-5">Antd Table</h2>
        <div className="flex mb-4">
          <div className="grow-1 max-w-120 min-w-20 me-2">
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
              onChange={(e) => changeSearchString(e.target.value)}
              allowClear
            />
          </div>
          <div className="ms-auto">
            <Informers.Dropdown
              active={filterLastBlocks !== "" || filterCurrentEpoch !== ""}
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
                        <Radio value="">
                          <span className="font-size-14">All Blocks</span>
                        </Radio>
                        <Radio value="&limit=10">
                          <span className="font-size-14">Latest 10 Blocks</span>
                        </Radio>
                        <Radio value="&limit=30">
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
                        <Radio value="">
                          <span className="font-size-14">All Epoch</span>
                        </Radio>
                        {tip?.epochNo && (
                          <Radio value={`&epoch_no=eq.${tip?.epochNo}`}>
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
                      disabled={filterLastBlocks === "" && filterCurrentEpoch === ""}
                      onClick={() => {
                        setFilterLastBlocks("")
                        setFilterCurrentEpoch("")
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
                    {(blocksColumns as any[]).find((item) => item.key === sorterField)?.title}
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
                        {(blocksColumns as any[])
                          .filter((item) => item.key)
                          .map((item) => {
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
        <div className="shared-table">
          <Table<Block>
            onChange={(pagination, filters, sorter) => changeTableParams(pagination, filters, sorter)}
            rowKey={(i) => i.block_height!}
            dataSource={blockList}
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
              total: totalResults || 1,
              current: currentPage,
              pageSizeOptions: ["25", "50", "100"],
              showTotal: () => <div>{utils.quantityWithCommas(totalResults)} Blocks</div>,
            }}
            loading={{
              spinning: loading,
              indicator: <span className="shared-spinner" />,
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
