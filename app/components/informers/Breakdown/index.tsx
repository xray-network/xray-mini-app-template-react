import React, { useState, useEffect } from "react"
import classNames from "classnames"
import { Tooltip } from "antd"

const InformerBreakdown = ({
  items,
  wide,
}: {
  items: {
    title?: React.ReactElement | string
    children?: React.ReactElement | string
    help?: string
    hideDots?: boolean
  }[]
  wide?: boolean
}) => {
  return (
    <div className={classNames({ "xray-breakdown-wide": wide })}>
      {items.map((item, index) => (
        <div key={index} className="xray-breakdown-item">
          {item.title && (
            <div className="xray-breakdown-title">
              {item.title}
              {item.help && (
                <Tooltip title={item.help}>
                  <i className="xi xi-info ms-2 text-muted" />
                </Tooltip>
              )}
            </div>
          )}
          {!item.hideDots && <div className="xray-breakdown-dots" />}
          <div className="xray-breakdown-quantity">{item.children}</div>
        </div>
      ))}
    </div>
  )
}

export default InformerBreakdown
