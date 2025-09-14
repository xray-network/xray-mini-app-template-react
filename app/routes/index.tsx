import { HappyProvider } from "@ant-design/happy-work-theme"

export default function HomePage() {
  return (
    <>
      <HappyProvider /> {/* Hotfix: Provides global styles for Ant Design Happy Theme component */}
      <div>[home page]</div>
    </>
  )
}
