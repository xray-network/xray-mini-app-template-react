import React, { useState, useRef } from "react"
import { Tooltip } from "antd"
import { message } from "@/utils/escapeAntd"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline"

const ExplorerLink = ({
  children,
  copy,
  tooltipMessage = "Copy to Clipboard",
  tooltipSuccess = "Copied",
}: {
  children: React.ReactNode
  copy: string
  tooltipMessage?: string
  tooltipSuccess?: string
}) => {
  return (
    <CopyToClipboard text={copy} onCopy={() => message.success(tooltipSuccess)}>
      <Tooltip title={tooltipMessage}>{children}</Tooltip>
    </CopyToClipboard>
  )
}

export default ExplorerLink
