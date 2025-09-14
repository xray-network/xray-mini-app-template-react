import { type RouteConfig, index, layout, route } from "@react-router/dev/routes"

export default [
  layout("components/layouts/Main/index.tsx", [
    index("routes/index.tsx"),
    route("components", "routes/components.tsx"),
    route("*", "routes/404.tsx"),
  ]),
] satisfies RouteConfig
