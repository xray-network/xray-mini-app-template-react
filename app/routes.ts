import { type RouteConfig, index, layout } from "@react-router/dev/routes"

export default [
  layout("components/layouts/Main/index.tsx", [index("routes/index.tsx")]),
] satisfies RouteConfig
