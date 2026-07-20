import type { CardanoWeb3 } from "cardano-web3-js"
import type { Block, BlockInfo, BlocksQuery } from "../types"

export interface BlocksResult {
  blocks: Block[]
  blockInfo: BlockInfo[]
  total: number
}

export async function fetchBlocks(client: CardanoWeb3, query: BlocksQuery, signal: AbortSignal): Promise<BlocksResult> {
  const latestResponse = await client.explorers.koios.GET("/blocks?limit=1" as "/blocks", { signal })
  const latestHeight = latestResponse.data?.[0]?.block_height ?? 0
  const limit = query.latestLimit ?? query.pageSize
  const params = new URLSearchParams({ limit: String(limit) })
  const searchedHeight = query.searchTerm.trim()

  if (searchedHeight) {
    params.set("block_height", `eq.${searchedHeight}`)
  } else {
    const pageHeight = Math.max(0, latestHeight - limit * (query.page - 1))
    params.set("block_height", `lte.${pageHeight}`)
  }
  if (query.currentEpoch !== null) params.set("epoch_no", `eq.${query.currentEpoch}`)

  const usesDefaultOrder = query.sortField === "block_height" && query.sortOrder === "descend"
  if (!usesDefaultOrder) {
    params.set("order", `${query.sortField}.${query.sortOrder === "ascend" ? "asc" : "desc"}`)
  }

  const blocksResponse = await client.explorers.koios.GET(`/blocks?${params}` as "/blocks", { signal })
  const blocks = blocksResponse.data ?? []
  const hashes = blocks.flatMap((block) => (block.hash ? [block.hash] : []))
  if (hashes.length === 0) {
    return { blocks, blockInfo: [], total: query.latestLimit ?? latestHeight }
  }

  const infoResponse = await client.explorers.koios.POST("/block_info", {
    body: { _block_hashes: hashes },
    signal,
  })
  return {
    blocks,
    blockInfo: infoResponse.data ?? [],
    total: query.latestLimit ?? latestHeight,
  }
}
