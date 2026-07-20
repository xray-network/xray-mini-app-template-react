import { useEffect } from "react"
import { ConfigProvider, App } from "antd"
import { HappyProvider } from "@ant-design/happy-work-theme"
import { StyleProvider, px2remTransformer } from "@ant-design/cssinjs"
import { useAppStore } from "@/store/app"
import EscapeAntd from "@/utils/escapeAntd"
import { lightTheme, darkTheme } from "./antd"
import { metaThemeColor } from "./palette"

export const px2rem = px2remTransformer({
  rootValue: 16,
  precision: 2,
})

const Theme = ({ children }: { children: React.ReactNode }) => {
  const theme = useAppStore((state) => state.theme)

  useEffect(() => {
    const html = document.documentElement
    html.setAttribute("data-disable-transitions", "true")
    html.setAttribute("data-theme", theme)
    html.querySelector("meta[name='theme-color']")?.setAttribute("content", metaThemeColor[theme])
    const enableTransitions = setTimeout(() => {
      html.removeAttribute("data-disable-transitions")
    }, 500)
    return () => clearTimeout(enableTransitions)
  }, [theme])

  return (
    <ConfigProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <App>
        <EscapeAntd />
      </App>
      <StyleProvider transformers={[px2rem]}>
        <HappyProvider>{children}</HappyProvider>
      </StyleProvider>
    </ConfigProvider>
  )
}

export default Theme
