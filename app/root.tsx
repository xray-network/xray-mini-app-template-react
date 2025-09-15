import "@/styles/tailwind.css"
import "nprogress/nprogress.css"
import "@/styles/style.css"

import "@ant-design/v5-patch-for-react-19"
import type { Route } from "./+types/root"
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router"
import Effects from "@/effects"
import Theme from "@/theme"

export const links: Route.LinksFunction = () => [
  { rel: "manifest", href: "/manifest.webmanifest", crossOrigin: "anonymous" },
  {
    rel: "icon",
    href: "/favicon.png",
    type: "image/png",
    sizes: "512x512",
  },
  {
    rel: "preload",
    href: "https://cdn.xray.app/fonts/satoshi/Satoshi-Medium.ttf",
    as: "font",
    type: "font/ttf",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "https://cdn.xray.app/fonts/satoshi/Satoshi-Bold.ttf",
    as: "font",
    type: "font/ttf",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "https://cdn.xray.app/fonts/satoshi/Satoshi-Black.ttf",
    as: "font",
    type: "font/ttf",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://cdn.xray.app/fonts/satoshi.css",
  },
  {
    rel: "stylesheet",
    href: "https://cdn.xray.app/fonts/archivo.css",
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="font-sans antialiased">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,viewport-fit=cover,initial-scale=1,shrink-to-fit=no,maximum-scale=1,user-scalable=0"
        />
        <meta name="theme-color" content="#ffffff" />
        <title>Mini App Template</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export function HydrateFallback() {
  return (
    <div style={{ width: "100%vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg
        width="64px"
        height="64px"
        viewBox="0 0 512 512"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g stroke="none" fill="none">
          <rect fill="#1940ED" fillRule="evenodd" x="1" y="0" width="512" height="512" rx="89.9723053"></rect>
          <path
            d="M246.807332,223.281525 L320.267551,151 L419.48986,151 L288.128705,278.483871 L271.294072,284.888563 L195.793292,359 L93.7652106,359 L225.636505,233.651026 L246.807332,223.281525 Z M93,151 L196.303432,151 L268.233229,222.671554 L290.169267,233.956012 L420,359 L315.676287,359 L239.665367,283.058651 L217.474259,271.469208 L93,151 Z"
            fill="#FFFFFF"
            fillRule="nonzero"
          ></path>
        </g>
      </svg>
    </div>
  )
}

export default function App() {
  return (
    <Effects>
      <Theme>
        <Outlet />
      </Theme>
    </Effects>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
