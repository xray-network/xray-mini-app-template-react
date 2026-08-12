# xray-mini-app-template-react implementation 0035 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0035
Created: 20260812T123456Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Current human request | `LOCAL` | Yes | Demonstrate logging every typed host message received by the Cardano component. |
| `app/components/pages/Home/Cardano/index.tsx` | `LOCAL` | Yes | Owns the platform, Cardano Bridge, and CIP-30 examples plus their visible request/event log. |
| `package.json` | `LOCAL` | Yes | Defines the installed xray-js bridge and repository validation commands. |

## Objective

Log every typed platform, Cardano Bridge, and Cardano CIP-30 host message received while the Cardano
Home component is mounted.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | While Cardano Home is mounted, subscribe to all typed platform and Cardano Bridge host messages through their namespace `listenAll` APIs and all typed CIP-30 host messages through the public transport listener with `cip30HostMessageSchemas`; release all three subscriptions together on unmount. | Preserve the connector lifecycle, validate messages against their protocol schemas, and do not add an unmanaged raw `window.message` listener. | `app/components/pages/Home/Cardano/index.tsx` | Lint, typecheck, build, and three-stream listener source audit. |
| C02 | Add every received host message to the existing newest-first log using its wire `type` as the event label and its `payload` as formatted data. | Preserve all Host/Cardano/CIP-30 actions, request and error entries, the 40-entry cap, and current safe value formatting. | `app/components/pages/Home/Cardano/index.tsx` | Full verification and log-behavior source audit. |

## Implementation steps

1. Import the public transport listener and Cardano CIP-30 host schema alongside the existing client namespaces.
2. Register platform, Cardano Bridge, and CIP-30 typed `listenAll` subscriptions in one Cardano Home effect.
3. Route each parsed host message through the existing logger using its wire type and formatted payload.
4. Return one effect cleanup that unsubscribes all three streams.
5. Run complete template validation and focused source audits.

## Validation

- `npm run verify`
- Confirm Cardano Home registers exactly one listener for each typed platform, Cardano Bridge, and CIP-30 host stream and cleans up all three.
- Confirm no raw `window.addEventListener("message", ...)` listener is added.
- Confirm incoming entries use the wire message type and formatted payload in the existing newest-first capped log.
- `git diff --check`

## Compatibility and human review

Review the template inside a Cardano host context and confirm platform, Cardano Bridge, and CIP-30
responses or pushed messages are visible as incoming events without changing the existing controls.

## Completion criteria

The mounted Cardano Home feature listens to all three typed host protocol streams, records every
received message in the shared log, releases every subscription on unmount, and passes complete
template verification.

## Out of scope

- Adding or changing host-side message publication in XRAY App.
- Adding a new xray-js namespace listener or changing any mini-app bridge protocol/schema.
- Changing Cardano network statistics, polling, logger layout, or existing method controls.

## Blockers

None.
