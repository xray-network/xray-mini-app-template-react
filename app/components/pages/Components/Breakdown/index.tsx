import { useState, useEffect, useRef } from "react"
import { Table, Input, Radio, Space, Button } from "antd"
import type { TableProps, InputRef } from "antd"
import type { KoiosTypes } from "cardano-web3-js"
import { useWeb3Store } from "@/store/web3"
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon, ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline"
import Informers from "@/components/informers"
import * as utils from "@/utils"
import { formatDistanceToNow } from "date-fns"
import { useAppStore } from "@/store/app"

export default function BreakdownComp() {
  return (
    <section className="mb-10">
      <div className="px-6 py-5 rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-semibold mb-5">Breakdown</h2>
        [list]
      </div>
    </section>
  )
}
