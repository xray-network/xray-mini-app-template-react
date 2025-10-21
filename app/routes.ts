import { type RouteConfig, index, layout, route } from "@react-router/dev/routes"

export default [
  layout("components/layouts/Main/index.tsx", [
    index("routes/index.tsx"),
    layout("components/layouts/Components/index.tsx", [
      route("components", "routes/components/index.tsx"),
      route("components/typography", "routes/components/typography.tsx"),
      route("components/buttons", "routes/components/buttons.tsx"),
      route("components/form", "routes/components/form.tsx"),
      route("components/table", "routes/components/table.tsx"),
      route("components/breakdown", "routes/components/breakdown.tsx"),
      route("components/informers", "routes/components/informers.tsx"),
      route("components/loading", "routes/components/loading.tsx"),
      route("components/modals", "routes/components/modals.tsx"),
    ]),
    route("*", "routes/404.tsx"),
  ]),
] satisfies RouteConfig
