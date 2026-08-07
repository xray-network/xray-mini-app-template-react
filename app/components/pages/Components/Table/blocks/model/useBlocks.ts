import { useEffect, useState } from "react"
import type { Cardano } from "@xray-network/xray-js/cardano"
import { fetchBlocks } from "../api/blocks.api"
import type { Block, BlockInfo, BlocksQuery } from "../types"

interface BlocksState {
  blocks: Block[]
  blockInfo: BlockInfo[]
  total: number
  loading: boolean
  error: Error | null
}

export function useBlocks(client: Cardano | null, query: BlocksQuery): BlocksState {
  const { page, pageSize, searchTerm, latestLimit, currentEpoch, sortField, sortOrder } = query
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm)
  const [state, setState] = useState<BlocksState>({
    blocks: [],
    blockInfo: [],
    total: 0,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(searchTerm), 500)
    return () => clearTimeout(timeout)
  }, [searchTerm])

  useEffect(() => {
    if (!client) return
    const controller = new AbortController()
    setState((previous) => ({ ...previous, loading: true, error: null }))

    void fetchBlocks(
      client,
      {
        page,
        pageSize,
        searchTerm: debouncedSearch,
        latestLimit,
        currentEpoch,
        sortField,
        sortOrder,
      },
      controller.signal
    )
      .then((result) => {
        if (!controller.signal.aborted) setState({ ...result, loading: false, error: null })
      })
      .catch((cause: unknown) => {
        if (controller.signal.aborted) return
        const error = cause instanceof Error ? cause : new Error("Failed to load blocks")
        setState((previous) => ({ ...previous, loading: false, error }))
      })

    return () => {
      controller.abort()
    }
  }, [client, debouncedSearch, page, pageSize, latestLimit, currentEpoch, sortField, sortOrder])

  return state
}
