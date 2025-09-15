import { HappyProvider } from "@ant-design/happy-work-theme"
import Homepage from "@/components/pages/Homepage"

export default function IndexPage() {
  return (
    <>
      <HappyProvider /> {/* Hotfix: Provides global styles for Ant Design Happy Theme component */}
      <Homepage />
    </>
  )
}
