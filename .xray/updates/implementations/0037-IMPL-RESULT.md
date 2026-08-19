# xray-mini-app-template-react implementation 0037 result

Result-Version: v1
Implementation-ID: xray-mini-app-template-react/0037
Instruction: ./0037-IMPL-INSTR.md
Evidence-Mode: LOCAL

## Change dispositions

| Change ID | Disposition | Implementation | Validation |
| --- | --- | --- | --- |
| C01 | `IMPLEMENTED` | Migrated the template to direct platform, Cardano, and Cardano CIP-30 v1 client/React namespaces and removed the retired Cardano protocol subpath type. | Typecheck and export/import audit passed. |
| C02 | `REVISED` | Removed the Provider and handshake state; platform status now distinguishes loading, selected Cardano, responding accountless XRAY App, unavailable embedded host, and standalone modes. Selected and empty context summaries consistently expose only blockchain, network, and account availability. | UI state audit, lint, typecheck, and build passed. |
| C03 | `IMPLEMENTED` | Theme, currency, hide-balances, and routes initialize and update through direct platform v1 hooks/events without connection gating. | Hook lifecycle audit and full verification passed. |
| C04 | `REVISED` | The Cardano launcher/logger uses direct v1 native and CIP-30 calls/events while preserving the displayed inventory, dummy inputs, and lifecycle logging. Event entries now use scope-qualified names and retain their complete event, payload, and context envelope; correlated request responses retain payload, context, and request ID. | Method inventory, event-envelope audit, typecheck, and production build passed. |
| C05 | `IMPLEMENTED` | README and SKILLS teach only the no-handshake versioned API; stale Provider, capability, grouped-role, wire-family, and protocol-subpath APIs were removed. | ESLint, stale scan, diff check, and production verification passed. |

## Outcome

The React template is a canonical direct-versioned bridge example with no Provider or handshake
prerequisite and clear selected, accountless, unavailable, and standalone states.

The logger now makes the transport distinction explicit: request responses retain their correlation
ID, while unsolicited events retain their scope, event name, payload, and context without inventing
a request ID.

## Validation

- `npm run verify` — passed: ESLint, React Router type generation, TypeScript, and production build.
- Direct Cardano/CIP-30 method inventory and stale-contract scan — passed.
- `git diff --check` — passed.

## Deviations from instruction

The components demo referenced `Informer.Ada` and `Informer.Explorer`, which are absent from the
linked current xray-js facade and blocked the required verification independently of the bridge.
Those examples now use the existing Text informer with the same visible values and layout.

## Remaining human review

Open the template standalone and inside XRAY App with and without a selected Cardano account, then
exercise platform routes/preferences and every displayed Cardano/CIP-30 action.
