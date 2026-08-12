# xray-mini-app-template-react implementation 0036 result

Result-Version: v1
Implementation-ID: xray-mini-app-template-react/0036
Instruction: ./0036-IMPL-INSTR.md
Evidence-Mode: LOCAL

## Change dispositions

| Change ID | Disposition | Implementation | Validation |
| --- | --- | --- | --- |
| C01 | `REVISED` | `useSyncHostPreferences` owns live host theme, currency, and balance-privacy synchronization and atomically merges available changes into Zustand. `useEffectiveTheme` independently selects and resolves the stored theme. Cardano network and explorer remain blockchain context/features rather than app preferences. | ESLint, TypeScript, production build, responsibility audit, and no-poller audit passed. |
| C02 | `REVISED` | The root explicitly initializes `useSyncHostPreferences` and selects presentation through `useEffectiveTheme`, without gating routed content. It renders immediately from persisted/default preferences and updates as host settings arrive. | Complete verification and consumer source audit passed. |
| C03 | `REVISED` | Preference-store documentation describes host synchronization, while human review removed the network and explorer fields, setters, persisted projections, and Settings controls. The remaining schema, actions, controls, and persistence version are unchanged. | Dependency audit, diff audit, and complete verification passed. |

## Outcome

Embedded mini apps now have one imperative synchronization boundary. After xray-js completes the
handshake and fetches the selected host settings, that boundary copies them into the existing
Zustand preference store. Routed content renders immediately from persisted/default preferences;
later initial or pushed host values update it reactively. Standalone use retains the persisted
values and performs no host-driven writes.

## Inputs consumed

- The current human request to replace the reverted derived model with imperative host sync.
- `app/integrations/xray-js/useEffectiveSettings.ts`, `app/theme/index.tsx`, and
  `app/store/preferences/index.ts`.
- The installed xray-js handshake-selected React platform and Cardano explorer hooks.
- Implementation instruction `0036`.

## Project changes

- Separated the root integration into a dedicated `useSyncHostPreferences.ts` module, which owns
  the atomic Zustand merge, and `useEffectiveSettings.ts`, whose `useEffectiveTheme` export only
  selects and resolves theme presentation.
- Removed the unused `useEffectiveHostContext` wrapper; blockchain consumers use `useMiniApp`
  directly.
- Synchronized theme, currency, and hide-balances through existing setters.
- Removed Cardano network from the preference store and App Settings; embedded network comes from
  host context. Removed the Settings modal's network information block and its now-unused
  `NetworkStats` component.
- Removed Cardano explorer from the preference store and App Settings. The reusable Explorer
  informer reads the host Cardano explorer directly and falls back to CardanoScan when unavailable.
- Required Cardano explorer only when the host context is Cardano and advertises
  `cardano.bridge`, preventing unrelated blockchain contexts from waiting on it.
- Removed root readiness gating so the application renders while host synchronization completes.
- Simplified effective theme, network, currency, hide-balances, and explorer hooks to read the
  synchronized store; system theme remains resolved locally.
- Updated the preference-store ownership comment without changing persisted state.

## Exported change contract

| Change ID | Semantic change | Compatibility | Downstream action |
| --- | --- | --- | --- |
| C01 | A dedicated root hook copies available platform preferences into the existing store after handshake and on later host changes; the effective-theme selector has no host synchronization responsibility. | xray-js remains responsible for transport, validation, caching, and live listeners; no polling or protocol change was added. | Root theming initializes synchronization explicitly; consumers select preferences independently. |
| C02 | Routed content renders immediately and observes host values once synchronized into the store. | Standalone defaults and persistence, system-theme handling, Cardano protocol guards, and root theming remain. | Embedded consumers no longer need render-time host/local selection or a readiness gate. |
| C03 | Network and Cardano explorer are no longer configurable or persisted in App Settings, and network is no longer summarized there. | The storage key and version remain; stale persisted blockchain fields are ignored and omitted on subsequent preference writes. | Blockchain features receive network from host context and explorer from its Cardano bridge hook. |

## Validation

- `npm run verify` — passed: ESLint, React Router type generation, TypeScript, client build,
  server build, and SPA prerender completed.
- Responsibility audit — passed: `useSyncHostPreferences` owns all three host hooks and the atomic
  preference merge; `useEffectiveTheme` only reads theme preference and system color scheme.
- Ownership audit — passed: Cardano explorer is absent from App Settings and preferences; the
  Explorer informer reads its protocol-guarded bridge hook directly.
- Consumer audit — passed: no `useEffectivePlatformSettings` or readiness gate remains; `Theme`
  explicitly initializes synchronization and selects theme through separate hooks.
- Polling audit — passed: no interval or synchronization timeout was added. The existing theme
  transition timeout is unrelated.
- `git diff --check` — passed.

## Deviations from instruction

Human review removed the planned synchronization readiness gate and then removed network and
Cardano explorer from app preferences. The template renders its persisted/default state
immediately, applies platform preferences when available, and keeps blockchain values in their
context/hooks. Node 20.18.1 emitted the repository's existing React Router Node 22.22+ and
experimental JSON-module warnings; all verification commands still passed.

## Remaining human review

Open the template inside XRAY App and confirm its controls and visible consumers match the host
after startup. Change theme, currency, hide-balances, network, and explorer in the host and confirm
the corresponding persisted preference updates. Open it standalone and confirm no host write
occurs and the persisted settings remain usable.

## Reproducibility

Run `npm run verify` in an environment that permits React Router's temporary local preview server.
For runtime review, embed the built template in XRAY App, complete the handshake, and exercise each
host setting while observing the Zustand preferences and UI.
