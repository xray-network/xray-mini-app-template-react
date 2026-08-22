# XRAY Mini App Template React

A React Router template for XRAY mini apps with Cardano integration, Ant Design, Tailwind CSS, and Zustand.

The template uses the direct `platformV1`, `cardanoV1`, and `cardanoCip30V1` bridge adapters. There is no bridge
Provider or handshake: low-level platform status returns `{ payload: { host: "xray.app" }, context, requestId }`, while
every request and event carries its own scope and version. The React status hook projects `context` to `data.account`.
The Home method launcher exposes direct Platform v1 requests, including request-only `getLocale`, and logs the host's
correlated response without localizing or persisting locale in the template.

## Development

```sh
npm install
npm run dev
```

Use `npm run verify` before committing. It runs linting, TypeScript, and the production build. Use `npm run preview`
to build and serve the Cloudflare Pages output locally.

## Architecture

- `app/root.tsx` composes application-wide providers around the route outlet.
- Page components may colocate private API, model, and test modules when those modules have no other consumers.
- `app/integrations` adapts external XRAY and Cardano APIs to the application.
- `app/store/preferences` persists standalone defaults; host settings are derived at runtime and are never persisted.
- `app/store/ui` contains transient interface state.
- `app/shared` contains application-agnostic UI and routing behavior.
- `app/routes` stays thin and defines route-level composition and lazy-loading boundaries.

Cardano Web3 is initialized by the application-wide provider. Consumers must handle the `loading`, `ready`, and `error`
states returned by `useCardano()`. Data access belongs in a feature API module and asynchronous UI state belongs in a
feature hook, as demonstrated by the colocated `app/components/pages/Components/Table/blocks` modules.
