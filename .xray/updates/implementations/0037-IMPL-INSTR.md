# xray-mini-app-template-react implementation 0037 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0037
Created: 20260819T091039Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input                                                                                                  | Kind    | Required | Purpose                                                                                                            |
| ------------------------------------------------------------------------------------------------------ | ------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| Human-approved scope-versioned bridge contract dated 2026-08-19                                        | `LOCAL` | Yes      | Define the compact no-handshake client, status semantics, and exact adapter versions demonstrated by the template. |
| `package.json`, `package-lock.json`, `README.md`, and `SKILLS.md`                                      | `LOCAL` | Yes      | Preserve linked SDK resolution, template guidance, and full verification commands.                                 |
| `app/root.tsx`, `app/components/pages/Home/`, and `app/integrations/xray-js/useSyncHostPreferences.ts` | `LOCAL` | Yes      | Own the template's host state UI, platform synchronization, and Cardano method logger.                             |
| `app/shared/routing/HostRouteSync.tsx` and `app/types/index.ts`                                        | `LOCAL` | Yes      | Own route synchronization and exported SDK types.                                                                  |

## Objective

Adopt and demonstrate the scope-versioned bridge client in the React template without a Provider or handshake.

## Changes to implement

| Change ID | Requirement                                                                                                                                                                                                                                          | Compatibility                                              | Local owner                                       | Validation                                                                       |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------- |
| C01       | Replace grouped/legacy and `/cardano` imports/types with direct `clientPlatformV1`, `clientCardanoV1`, `clientCardanoCip30V1`, `platformV1`, `cardanoV1`, and `cardanoCip30V1` surfaces actually demonstrated.                                       | Remove old APIs without aliases.                           | Manifest/lockfile, root, app types, integrations. | Typecheck and exact export audit pass.                                           |
| C02       | Remove `MiniAppProvider`, handshake loaders, protocol lists, and generic connection hooks. Use `useStatus` to render unavailable/standalone, responding accountless XRAY App, and selected Cardano states; show `host: "xray.app"` only as identity. | Do not turn status into a trust or permission claim.       | Root and Home/Empty context UI.                   | UI state review and full verify pass.                                            |
| C03       | Migrate initial and live theme/currency/hide-balances synchronization and bidirectional routing to platform/v1 hooks/events with no handshake ordering.                                                                                              | Preserve standalone preferences and route-loop prevention. | Preference sync and HostRouteSync.                | Hook lifecycle, route behavior, typecheck, and build pass.                       |
| C04       | Migrate the complete Cardano and CIP-30 method launcher/logger to direct v1 clients/hooks, preserving method inventory, dummy inputs, request/result/error logs, and nullable tip/account behavior.                                                  | No capability discovery or bridge grouping.                | `app/components/pages/Home/Cardano/`.             | Every displayed method maps to a current direct SDK call and full verify passes. |
| C05       | Update template README/SKILLS guidance and remove obsolete Provider, handshake, capability, generic message, grouped role, and protocol-subpath references from active source/docs.                                                                  | Template teaches only the new architecture.                | README, SKILLS, source, and types.                | Lint, typecheck, build, formatting, link, and stale-contract scans pass.         |

## Implementation steps

1. Align the linked SDK and replace bridge imports/types.
2. Remove the Provider and rebuild the Home state around platform status.
3. Migrate preferences and routes to direct platform/v1 hooks/events.
4. Migrate every logged Cardano/CIP-30 method and remove retired code.
5. Update template guidance and run complete verification plus stale scans.

## Validation

- Run `npm run verify`.
- Run `git diff --check`.
- Scan active source, README, and SKILLS for `MiniAppProvider`, `useMiniApp`, `useHostMessage`, handshake/capability APIs, grouped bridge roles, legacy wire names, and `/mini-app-bridge/cardano` imports.
- Verify the method launcher inventory against the direct Cardano v1 and Cardano CIP-30 v1 clients.

## Compatibility and human review

Implement after XRAY App host support. Human review must verify that the template remains a clear canonical example in standalone, accountless XRAY, and selected Cardano modes, and that every method log still reports request lifecycle and errors clearly.

## Completion criteria

- The template demonstrates only the new direct versioned bridge API.
- No Provider, handshake, capability list, or connection prerequisite remains.
- Platform status/preferences/routes and all Cardano method examples work under the new contract.
- Full verify and stale-contract audits pass.

## Out of scope

- XRAY App host or xray-js SDK changes.
- New blockchains, template redesign, or new method demonstrations.
- Legacy bridge fallback.

## Blockers

None.
