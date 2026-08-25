# XRAY Mini App Template — Project Skills

Use this guide when changing the template. Keep it consistent with the repository's actual module boundaries and the
public contracts documented by `xray-js`.

## Stack and constraints

- React 19 and React Router 8 in SPA mode
- TypeScript 5 and Vite 7
- Ant Design 6 and Tailwind CSS 4
- Zustand 5 for persisted preferences and ephemeral UI state
- `@xray-network/xray-js` explicit subpaths for Cardano and XRAY Mini App Bridge APIs
- Cloudflare Pages and Wrangler for preview and deployment

Use npm and preserve `package-lock.json`. Do not add another package-manager lockfile. The runtime requirement is
Node.js 22.22 or newer with npm 10.8.x.

## Commands

```sh
npm run dev
npm run lint
npm run typecheck
npm run build
npm run verify
npm run preview
```

Run `npm run verify` after implementation work. It runs linting, React Router type generation, TypeScript, and the
production build. The repository currently has no automated test script.

## Architecture

Keep route modules thin and colocate private code with the feature that owns it.

| Path                       | Responsibility                                                      |
| -------------------------- | ------------------------------------------------------------------- |
| `app/root.tsx`             | HTML shell and application-wide composition                         |
| `app/routes.ts`            | Route tree, nested layouts, and route boundaries                    |
| `app/routes`               | Thin route modules that render page components                      |
| `app/components/pages`     | Page features and feature-private modules                           |
| `app/components/layouts`   | Shared nested route layouts                                         |
| `app/components/common`    | Reusable application components                                     |
| `app/components/informers` | Reusable display and control components                             |
| `app/components/modals`    | Application-level dialogs                                           |
| `app/integrations/xray-js` | XRAY-specific preference and settings adapters                      |
| `app/shared/routing`       | Host route synchronization and navigation progress                  |
| `app/store/preferences`    | Persisted theme, currency, and balance-privacy preferences          |
| `app/store/ui`             | Ephemeral menu and dialog state                                     |
| `app/theme`                | Ant Design themes, palette, CSS variables, and document theme state |
| `app/styles`               | Global, shared, Ant Design, and Tailwind styles                     |
| `app/types`, `app/utils`   | Shared types and small broadly reused helpers                       |

Do not create a top-level directory for one file. Keep a module inside its page or component while it has one consumer;
move it to an existing shared boundary only when multiple features use it. Use the `@/` alias across architecture
boundaries and relative imports within a colocated feature.

## Application shell

`app/root.tsx` composes the current application shell directly:

```tsx
<Theme>
  <HostRouteSync />
  <NavigationProgress />
  <Outlet />
</Theme>
```

`Theme` owns Ant Design and document theme composition and calls `useSyncHostPreferences()`. Do not add a Cardano
Provider or a generic `AppProviders` wrapper: the Mini App Bridge React adapters already own shared lazy stores and
need no Provider.

Declare routes in `app/routes.ts`. Route modules in `app/routes` should remain small composition points; page behavior
belongs under `app/components/pages`, and shared nested shells belong under `app/components/layouts`.

## XRAY JavaScript SDK boundaries

The `@xray-network/xray-js` package root intentionally exports nothing. Import only the subpath that owns the API:

- `@xray-network/xray-js/mini-app-bridge/react` for `platformV1`, `cardanoV1`, and optional
  `cardanoCip30V1` React bindings.
- `@xray-network/xray-js/mini-app-bridge` for `clientPlatformV1`, `clientCardanoV1`,
  `clientCardanoCip30V1`, events, and direct requests.
- `@xray-network/xray-js/cardano` for public Cardano configuration, helpers, and types.

Do not add a handshake, connection state machine, capability discovery, adapter factory, or iframe-wide version lock.
Each request, response, and event carries its own adapter scope and version. Host identity, scope, and version are
routing metadata; XRAY App remains responsible for iframe trust, origin validation, account access, and authorization.

### Platform v1

- `clientPlatformV1.getStatus()` returns a correlated `{ payload, context, requestId }` envelope or `null` on timeout.
- `platformV1.useStatus()` projects the envelope to `{ host, account: context }` and exposes
  `{ data, loading, error, refresh }`.
- `data.account: null` means the host answered without a selected account; `data: undefined` means it has not loaded.
- `getLocale()` is request-only. Do not add a locale event or React hook without a protocol change in `xray-js`.
- Keep bidirectional route propagation in `app/shared/routing/HostRouteSync.tsx` and avoid echoing an unchanged route.

### Cardano v1

- Use `cardanoV1.useTip()`, `useAccountState()`, and `useExplorer()` for shared remote state.
- Handle hook loading and error states. Account snapshots must also branch on `balanceStatus`: `initializing`, `ready`,
  or `error`. Only `ready` has non-null `state`; the SDK owns the bounded initialization retry sequence.
- Use the Cardano v1 interactive hooks or `clientCardanoV1` for signing and submission. Do not build a second Cardano
  client or add polling around `useAccountState()`.
- Native `signTx` returns complete signed transaction CBOR plus its hash. Submit the returned CBOR, not the hash.
- SDK account quantities are `bigint`; convert them before JSON serialization or display formatting.

### Cardano CIP-30 v1

- `clientCardanoCip30V1.enable()` is the authorization request and returns the enabled wallet API.
- `installConnector()` provides the optional `window.cardano.xrayBridge` compatibility connector. Clean it up only if
  the installed global still refers to this instance.
- The XRAY connector must call XRAY App through the iframe bridge and must not delegate to another browser wallet.
- CIP-30 `signTx` returns a witness set, unlike native Cardano v1 `signTx`; callers must merge it into the original
  transaction before submission.

## State and settings

- `app/store/preferences` owns the persisted `themePrefer`, `currency`, and `hideBalances` values.
- `useSyncHostPreferences()` updates those values when Platform v1 supplies host settings.
- Read settings through the effective-setting hooks in `app/integrations/xray-js` rather than duplicating host reads in
  components.
- Keep menus, dialogs, and other temporary UI state in local component state or `app/store/ui`.
- Prefer local state when no other component consumes a value, select only required Zustand fields, and derive values
  instead of synchronizing duplicates with effects.

## UI and styling

- Reuse Ant Design and existing components before adding a new primitive.
- Use tokens from `app/theme` instead of duplicating palette values.
- Keep global CSS in `app/styles` and component-specific CSS beside its component.
- Preserve light and dark themes and the loading, empty, and error states of asynchronous views.
- Guard browser-only globals when code can run during React Router generation or server-side tooling.

## Completion checklist

1. Remove dead imports, helpers, and files introduced by the change.
2. Confirm effects clean up listeners, timers, and installed globals.
3. Confirm asynchronous work cannot commit stale results after dependency changes or unmount.
4. Run `npm run verify`.
5. Run `git diff --check`.
6. Report warnings or behavior that could not be verified.
