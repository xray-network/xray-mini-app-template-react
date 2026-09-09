export type LogEntry = {
  id: string
  time: string
  direction: "←" | "→" | "×"
  method: string
  data: string
  tone: "request" | "success" | "error"
}

export type FireRequest = <Result>(method: string, request: () => Promise<Result>) => Promise<Result | undefined>
