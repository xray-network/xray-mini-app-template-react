import type { KoiosTypes } from "cardano-web3-js"

export type Block = KoiosTypes.paths["/blocks"]["get"]["responses"]["200"]["content"]["application/json"][number]
export type BlockInfo =
  KoiosTypes.paths["/block_info"]["post"]["responses"]["200"]["content"]["application/json"][number]

export interface BlocksQuery {
  page: number
  pageSize: number
  searchTerm: string
  latestLimit: number | null
  currentEpoch: number | null
  sortField: string
  sortOrder: "ascend" | "descend"
}
