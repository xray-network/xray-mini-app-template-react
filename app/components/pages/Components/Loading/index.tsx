import { Spin, Alert, Skeleton } from "antd"

export default function LoadingComp() {
  return (
    <section className="mb-10">
      <div className="px-6 py-5 rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-semibold mb-5">Loading</h2>
        <div>
          <div className="mb-10 flex items-center">
            <span className="shared-spinner !me-3" /> Inline spinner
          </div>
          <div className="mb-10">
            <Spin spinning={true} indicator={<span className="shared-spinner shared-spinner-centered" />}>
              <Alert
                type="info"
                message="Alert message title"
                description="Further details about the context of this alert."
              />
            </Spin>
          </div>
          <div className="mb-10">
            <Skeleton active paragraph={{ rows: 2 }} />
          </div>
          <div>
            <Skeleton active paragraph={{ rows: 2 }} title={false} />
          </div>
        </div>
      </div>
    </section>
  )
}
