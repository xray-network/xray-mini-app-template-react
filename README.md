# XRAY Mini App Template React

A React Router SPA template for building XRAY mini apps. It includes React 19, TypeScript, Ant Design, Tailwind CSS,
Zustand, Cloudflare Pages configuration, and the public `@xray-network/xray-js` runtime.

The template demonstrates the scope-versioned XRAY Mini App Bridge for Platform v1, Cardano v1, and Cardano CIP-30
v1. Bridge adapters communicate directly with XRAY App: there is no Provider, handshake, session, capability list, or
iframe-wide version negotiation.

## Requirements

- Node.js 22.22 or newer
- npm 10.8.x

## Development

```sh
npm install
npm run dev
```

The development server runs on port `7220` by default.

```sh
npm run verify
npm run preview
```

`verify` runs ESLint, React Router type generation, TypeScript, and the production build. `preview` builds the app and
serves the Cloudflare Pages output from `build/client` locally.

## XRAY JavaScript SDK

Use the explicit runtime subpath that owns the API; the `@xray-network/xray-js` package root intentionally exports
nothing.

| Subpath                                       | Use in this template                                                     |
| --------------------------------------------- | ------------------------------------------------------------------------ |
| `@xray-network/xray-js/mini-app-bridge/react` | Shared Platform v1 and Cardano v1 remote-state hooks                     |
| `@xray-network/xray-js/mini-app-bridge`       | Direct requests, events, route synchronization, and the CIP-30 connector |
| `@xray-network/xray-js/cardano`               | Cardano configuration and public Cardano types                           |

The React adapters expose lazy shared stores and require no connection step. `platformV1.useStatus()` projects the
wire response to `{ host, account }`; an XRAY host may answer with `account: null`. Cardano data is loaded through
`cardanoV1` hooks, while direct and interactive methods use `clientCardanoV1` or `clientCardanoCip30V1`.

The Home page is a working bridge console. It displays the active account context, listens for Platform, Cardano, and
CIP-30 events, exercises direct requests, and installs `window.cardano.xrayBridge` for browser-wallet-compatible
CIP-30 access.

See the XRAY JavaScript SDK documentation for the complete
[Mini App Bridge](https://github.com/xray-network/xray-js/tree/dev/packages/mini-app-bridge),
[Platform v1](https://github.com/xray-network/xray-js/blob/dev/packages/mini-app-bridge/README-PLATFORM.md),
[Cardano v1](https://github.com/xray-network/xray-js/blob/dev/packages/mini-app-bridge/README-CARDANO.md), and
[Cardano CIP-30 v1](https://github.com/xray-network/xray-js/blob/dev/packages/mini-app-bridge/README-CARDANO-CIP30.md)
contracts.

## Architecture

| Path                       | Responsibility                                                                         |
| -------------------------- | -------------------------------------------------------------------------------------- |
| `app/root.tsx`             | Document shell, theme composition, host route synchronization, and navigation progress |
| `app/routes.ts`            | Route tree and layout boundaries                                                       |
| `app/routes`               | Thin route modules that select page components                                         |
| `app/components/pages`     | Page features and page-private modules                                                 |
| `app/components/layouts`   | Nested route layouts                                                                   |
| `app/components/common`    | Reusable application components                                                        |
| `app/components/informers` | Reusable display and control components                                                |
| `app/components/modals`    | Application-level dialogs                                                              |
| `app/integrations/xray-js` | XRAY host preference synchronization and effective settings                            |
| `app/shared/routing`       | Host route synchronization and navigation feedback                                     |
| `app/store`                | Persisted preferences and ephemeral UI state                                           |
| `app/theme`                | Ant Design themes, palette, CSS variables, and document theme updates                  |
| `app/styles`               | Global, shared, Ant Design, and Tailwind styles                                        |
| `app/types`, `app/utils`   | Shared types and small reusable helpers                                                |

Keep route files thin and colocate code that has only one feature consumer with that feature. Promote modules to a
shared directory only after they have multiple real consumers.

## Deployment

```sh
npm run deploy
```

The production build is a static React Router SPA in `build/client`; the deploy command publishes it to Cloudflare
Pages with Wrangler.
