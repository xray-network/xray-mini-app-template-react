import { Spin, Alert, Skeleton } from "antd"

export default function LoadingPage() {
  return (
    <section className="mb-10">
      <h2 className="text-5xl font-bold mb-14">Loading</h2>
      <div>
        <div className="mb-10 flex items-center">
          <div className="inline-flex items-center me-10">
            <span className="shared-spinner me-3!" /> Inline spinner
          </div>
          <div className="inline-flex items-center">
            <Skeleton active paragraph={{ rows: 1, width: "100%" }} title={false} className="me-5 w-20!" /> Inline
            skeleton
          </div>
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
    </section>
  )
}
