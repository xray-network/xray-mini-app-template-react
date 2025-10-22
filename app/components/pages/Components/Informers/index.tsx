import { Statistic, Progress } from "antd"
import Informers from "@/components/informers"

export default function InformersPage() {
  return (
    <section className="mb-10">
      <h2 className="text-5xl font-bold mb-14">Informers</h2>
      <div className="mb-20">
        <div className="mb-8">Informers Set</div>
        <div className="flex flex-wrap items-center gap-10 text-xl">
          <Informers.Ada
            value={"12451251251"}
            title="Balance"
            help="Total funds currently available in this address."
          />
          <Informers.Explorer
            type="paymentAddress"
            value={
              "addr1q8af8kfmj6avkhewp8zq8m3ls6f0tumz489zqn04d9lpynrx4npdh4qrzesqpsypyxd7j9sqt4yjr28z9n7379hnu5zs83czmw"
            }
            title="Receiving Address"
            help="Your main address for sending and receiving funds"
          />
          <Informers.Text value="588" title="Current Epoch" help="Current Cardano epoch" />
          <Informers.Element
            value={
              <div className="flex items-center gap-2">
                <Progress type="circle" percent={50} size={20} strokeWidth={25} />
                <span className="shared-countdown font-bold">
                  <Statistic.Timer
                    type="countdown"
                    value={new Date().getTime() + 100000000}
                    format="D[d] HH[h] mm[m] ss[s]"
                  />
                </span>
              </div>
            }
            title="Current Epoch"
            help="Current Cardano epoch"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div className="mb-8">Breakdown Default</div>
          <Informers.Breakdown
            items={[
              {
                title: "Tx Hash",
                children: (
                  <Informers.Text
                    value="1d12...0dd4"
                    copy="1d12394aebbf78eeb3f37f3164bae7865737f9934e2d63d9f8250dc9e64e0dd4"
                  />
                ),
              },
              {
                title: "Tx Index",
                children: <Informers.Text value="0" copy="0" />,
              },
              {
                title: "TTL",
                children: <Informers.Text value="Sep 17, 2025 12:10:54 PM" />,
              },
              {
                title: "Size (Bytes)",
                children: <Informers.Text value="1,242 bytes" />,
              },
              {
                title: "Total Output",
                children: <Informers.Ada value={"24125.252622"} />,
              },
              {
                title: "Fee",
                children: <Informers.Ada value={"12452.511123"} />,
              },
            ]}
          />
        </div>
        <div>
          <div className="mb-8">Breakdown Compact</div>
          <Informers.Breakdown
            compact
            items={[
              {
                title: "Tx Hash",
                children: (
                  <Informers.Text
                    value="1d12...0dd4"
                    copy="1d12394aebbf78eeb3f37f3164bae7865737f9934e2d63d9f8250dc9e64e0dd4"
                  />
                ),
              },
              {
                title: "Tx Index",
                children: <Informers.Text value="0" copy="0" />,
              },
              {
                title: "TTL",
                children: <Informers.Text value="Sep 17, 2025 12:10:54 PM" />,
              },
              {
                title: "Size (Bytes)",
                children: <Informers.Text value="1,242 bytes" />,
              },
              {
                title: "Total Output",
                children: <Informers.Ada value={"24125.252622"} />,
              },
              {
                title: "Fee",
                children: <Informers.Ada value={"12452.511123"} />,
              },
            ]}
          />
        </div>
        <div>
          <div className="mb-8">Breakdown Card</div>
          <div className="shared-box">
            <div className="shared-box-inner !bg-gray-100 dark:!bg-gray-950">
              <Informers.Breakdown
                items={[
                  {
                    title: "Tx Hash",
                    children: (
                      <Informers.Text
                        value="1d12...0dd4"
                        copy="1d12394aebbf78eeb3f37f3164bae7865737f9934e2d63d9f8250dc9e64e0dd4"
                      />
                    ),
                  },
                  {
                    title: "Tx Index",
                    children: <Informers.Text value="0" copy="0" />,
                  },
                  {
                    title: "TTL",
                    children: <Informers.Text value="Sep 17, 2025 12:10:54 PM" />,
                  },
                  {
                    title: "Size (Bytes)",
                    children: <Informers.Text value="1,242 bytes" />,
                  },
                  {
                    title: "Total Output",
                    children: <Informers.Ada value={"24125.252622"} />,
                  },
                  {
                    title: "Fee",
                    children: <Informers.Ada value={"12452.511123"} />,
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="mb-8">Breakdown Card</div>
          <div className="shared-box">
            <div className="shared-box-inner">
              <Informers.Breakdown
                items={[
                  {
                    title: "Tx Hash",
                    children: (
                      <Informers.Text
                        value="1d12...0dd4"
                        copy="1d12394aebbf78eeb3f37f3164bae7865737f9934e2d63d9f8250dc9e64e0dd4"
                      />
                    ),
                  },
                  {
                    title: "Tx Index",
                    children: <Informers.Text value="0" copy="0" />,
                  },
                  {
                    title: "TTL",
                    children: <Informers.Text value="Sep 17, 2025 12:10:54 PM" />,
                  },
                  {
                    title: "Size (Bytes)",
                    children: <Informers.Text value="1,242 bytes" />,
                  },
                  {
                    title: "Total Output",
                    children: <Informers.Ada value={"24125.252622"} />,
                  },
                  {
                    title: "Fee",
                    children: <Informers.Ada value={"12452.511123"} />,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
