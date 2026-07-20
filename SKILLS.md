# XRAY Mini App Template — Project Skills

Use this document as the implementation guide for contributors and coding agents working in this repository.

## Project stack

- React 19 with React Router 7 in SPA mode
- TypeScript and Vite
- Ant Design 5 and Tailwind CSS 4
- Zustand for application state
- `@xray-network/mini-app-sdk` for XRAY host communication
- `cardano-web3-js` for Cardano access
- Cloudflare Pages for preview and deployment

Use Yarn for all package and project commands. Do not add npm or pnpm lockfiles.

## Commands

```sh
yarn dev
yarn lint
yarn typecheck
yarn build
yarn verify
yarn preview
```

Run `yarn verify` after implementation work. It runs linting, TypeScript generation and checking, and the production
build. This project intentionally has no test suite or test dependencies.

## Architecture

Keep route modules thin and colocate private feature code with its page or component.

| Path                       | Responsibility                                              |
| -------------------------- | ----------------------------------------------------------- |
| `app/root.tsx`             | Document shell and global provider composition              |
| `app/routes`               | Route definitions, composition, and lazy-loading boundaries |
| `app/components/pages`     | Page features and page-private API/model modules            |
| `app/components/layouts`   | Shared page layouts                                         |
| `app/components/common`    | Reusable application components                             |
| `app/components/informers` | Reusable display and control components                     |
| `app/integrations`         | Adapters for external SDKs and services                     |
| `app/store/preferences`    | Persisted standalone defaults                               |
| `app/store/ui`             | Transient interface state                                   |
| `app/shared`               | Application-agnostic shared behavior                        |
| `app/theme`                | Ant Design configuration, palette, and theme bridge         |
| `app/utils`                | Small, pure, broadly reused helpers                         |

Do not create a new top-level folder for a single file. A module used by only one feature belongs inside that feature.
Move code to `shared`, `utils`, or a global store only when it has multiple real consumers.

## Global providers

Compose application-wide providers directly in `app/root.tsx`. The current order is:

```tsx
<Theme>
  <CardanoProvider>
    <HostRouteSync />
    <NavigationProgress />
    <Outlet />
  </CardanoProvider>
</Theme>
```

Do not introduce another `AppProviders` wrapper unless provider composition becomes independently reusable.

## XRAY Mini App SDK

Import React hooks from `@xray-network/mini-app-sdk/react`. Hooks share the SDK store and initiate the host handshake;
an additional provider is not required.

Host values may be `null` while connecting or when the app runs outside the XRAY host. Use the effective-setting hooks
in `app/integrations/xray-mini-app-sdk/useEffectiveSettings.ts` so the app falls back to standalone preferences.

- Host-provided settings take precedence while connected.
- Host settings are runtime values and must not be persisted locally.
- Standalone defaults belong in `app/store/preferences`.
- Route synchronization belongs in `app/shared/routing/HostRouteSync.tsx`.
- Treat SDK account quantities as `bigint`; do not pass them directly to `JSON.stringify`.

## Cardano Web3

Access Cardano through `useCardano()` from `app/integrations/cardano-web-js/CardanoProvider.tsx`. Do not initialize a
second `CardanoWeb3` client inside a page.

Consumers must handle every provider state:

- `loading`: show a loading state.
- `ready`: use `client`, `CML`, and `utils`.
- `error`: show a useful error without crashing the application.

The provider is recreated when the effective network changes. Async consumers must ignore stale responses after their
dependencies change or their component unmounts.

## Feature data access

For non-trivial feature data, use this local structure:

```text
Feature/
├── index.tsx
└── domain/
    ├── api/
    ├── model/
    └── types.ts
```

Keep request construction in `api`, asynchronous UI state in `model`, and rendering in the component. Avoid placing
feature-specific request functions in global `utils` or `services` folders.

The blocks table in `app/components/pages/Components/Table/blocks` is the reference implementation. Its default
`block_height` descending request relies on the Koios endpoint default and deliberately omits the `order` parameter;
only non-default sorting should send `order`.

## State rules

- Persist only user-controlled standalone preferences.
- Keep menus, dialogs, and other temporary UI state in `app/store/ui` or local component state.
- Prefer local component state when no other component consumes the value.
- Select only the required Zustand fields to avoid unnecessary renders.
- Derive values when possible instead of synchronizing duplicate state with effects.

## UI and styling

- Reuse Ant Design and existing components before adding new primitives.
- Use the tokens in `app/theme` instead of duplicating theme colors.
- Keep global CSS under `app/styles`; keep component-specific styles beside the component.
- Support both light and dark themes.
- Preserve loading, empty, and error states for asynchronous views.
- Use the `@/` alias for imports across architecture boundaries and relative imports within a colocated feature.

## Change checklist

Before handing off a change:

1. Remove unused imports, dead helpers, and obsolete files introduced by the change.
2. Confirm browser-only APIs are guarded where necessary.
3. Confirm async effects clean up and cannot commit stale results.
4. Run `yarn verify`.
5. Run `git diff --check`.
6. Mention any remaining build warnings or behavior that could not be verified.
