# xray-mini-app-template-react implementation 0036 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0036
Created: 20260812T134833Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Current human request | `LOCAL` | Yes | Synchronize the mini-app preferences imperatively from host state after handshake. |
| `app/integrations/xray-js/useEffectiveSettings.ts` | `LOCAL` | Yes | Owns host integration and current derived host/local setting selection. |
| `app/store/preferences/index.ts` | `LOCAL` | Yes | Owns mutable persisted settings and setter actions. |
| `app/theme/index.tsx` | `LOCAL` | Yes | Owns root initialization and routed-content readiness. |
| Settings and informer consumers under `app/components` | `LOCAL` | Yes | Consume the synchronized preferences. |
| `package.json` | `LOCAL` | Yes | Defines complete validation. |

## Objective

Synchronize host settings into the template's existing preference store through one imperative
integration effect after handshake, then let application consumers read a single local state owner.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Add one root integration hook that performs the handshake-selected host reads and imperatively copies available theme, currency, balance privacy, Cardano network, and explorer values into their existing preference setters. Repeat synchronization when those host values later change. | Keep xray-js as the message/cache owner, preserve exact schemas and listener behavior, and do not add polling. Non-Cardano contexts must not wait for or write Cardano explorer. | `app/integrations/xray-js/useEffectiveSettings.ts` | Typecheck, effect/setter source audit, and no-poller audit. |
| C02 | Gate routed content until standalone resolution or the expected embedded host snapshot has been copied, and derive effective setting hooks directly from the synchronized preference store instead of choosing host/local values during every consumer render. | Preserve system-theme resolution, standalone defaults/persistence, Cardano protocol availability guards, and existing root theme behavior. | `app/theme/index.tsx`, `app/integrations/xray-js/useEffectiveSettings.ts` | Lint, typecheck, production build, and readiness/consumer audit. |
| C03 | Update preference-store documentation to reflect imperative host synchronization without changing its schema, actions, controls, or persistence version. | Existing user controls remain writable; a later host change is authoritative while embedded. | `app/store/preferences/index.ts` | Diff audit and complete verification. |

## Implementation steps

1. Select the host context, platform values, and compatible Cardano explorer at the root integration boundary.
2. Wait for the expected initial embedded values, then call existing Zustand setters in one effect.
3. Re-run that effect on later host changes and expose a synchronization-ready flag.
4. Make effective setting hooks read the synchronized store and retain standalone/system behavior.
5. Update root readiness, documentation, and run complete verification.

## Validation

- `npm run verify`
- Confirm handshake precedes platform getters through the existing xray-js lifecycle.
- Confirm one integration effect calls existing setters for theme, currency, balance privacy, network, and compatible explorer.
- Confirm later host changes overwrite the corresponding stored setting while embedded.
- Confirm standalone mode uses existing persisted/default settings without host writes.
- Confirm no interval, timeout-based polling, protocol, or store-schema change is introduced.
- `git diff --check`

## Compatibility and human review

Open the template in XRAY App, verify its controls match host values after initialization, change a
host value, and confirm the corresponding control and consumer update. Change a mini-app value,
then change that host value and confirm the host becomes authoritative again.

## Completion criteria

One root effect synchronizes every available host-owned setting into the existing preference
store, consumers read that store, standalone behavior remains intact, and verification passes.

## Out of scope

- Reintroducing source-tagged host/local overrides.
- Changing bridge protocols, host publication, or xray-js cache ownership.
- Adding periodic polling or changing settings controls and persistence schema.
- Adding Bitcoin or Midnight-specific settings.

## Blockers

None.
