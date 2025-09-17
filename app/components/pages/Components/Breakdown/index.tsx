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

export default function BreakdownPage() {
  return (
    <section className="mb-10">
      <div className="px-6 py-5 rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-semibold mb-5">Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="font-bold mb-5">Default</div>
            <Informers.Breakdown
              items={[
                {
                  title: "Tx Hash",
                  children: (
                    <Informers.Text
                      text="1d12...0dd4"
                      copy="1d12394aebbf78eeb3f37f3164bae7865737f9934e2d63d9f8250dc9e64e0dd4"
                    />
                  ),
                },
                {
                  title: "Tx Index",
                  children: <Informers.Text text="0" copy="0" />,
                },
                {
                  title: "TTL",
                  children: <Informers.Text text="Sep 17, 2025 12:10:54 PM" />,
                },
                {
                  title: "Size (Bytes)",
                  children: <Informers.Text text="1,242 bytes" />,
                },
                {
                  title: "Total Output",
                  children: <Informers.Ada quantity={"24125.252622"} />,
                },
                {
                  title: "Fee",
                  children: <Informers.Ada quantity={"12452.511123"} />,
                },
              ]}
            />
          </div>
          <div>
            <div className="font-bold mb-5">Compact</div>
            <Informers.Breakdown
              compact
              items={[
                {
                  title: "Tx Hash",
                  children: (
                    <Informers.Text
                      text="1d12...0dd4"
                      copy="1d12394aebbf78eeb3f37f3164bae7865737f9934e2d63d9f8250dc9e64e0dd4"
                    />
                  ),
                },
                {
                  title: "Tx Index",
                  children: <Informers.Text text="0" copy="0" />,
                },
                {
                  title: "TTL",
                  children: <Informers.Text text="Sep 17, 2025 12:10:54 PM" />,
                },
                {
                  title: "Size (Bytes)",
                  children: <Informers.Text text="1,242 bytes" />,
                },
                {
                  title: "Total Output",
                  children: <Informers.Ada quantity={"24125.252622"} />,
                },
                {
                  title: "Fee",
                  children: <Informers.Ada quantity={"12452.511123"} />,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
