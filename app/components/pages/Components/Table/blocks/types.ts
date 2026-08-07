import type { providers } from "@xray-network/xray-js/cardano"

export type Block = providers.koios.Types.paths["/blocks"]["get"]["responses"]["200"]["content"]["application/json"][number]
export type BlockInfo =
  providers.koios.Types.paths["/block_info"]["post"]["responses"]["200"]["content"]["application/json"][number]

export interface BlocksQuery {
  page: number
  pageSize: number
  searchTerm: string
  latestLimit: number | null
  currentEpoch: number | null
  sortField: string
  sortOrder: "ascend" | "descend"
}
