# xray-mini-app-template-react implementation 0025 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0025
Created: 20260812T094502Z
Evidence-Mode: LOCAL
Depends-On: xray-mini-app-template-react/0024
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Home and Cardano page context presentation plus human request | `LOCAL` | Yes | Define one generic host-context owner. |

## Objective

Render HOST CONTEXT only in Home using the generic handshake context and remove all host-context presentation from Cardano.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Make Home render the same context block for connected and disconnected states using `context` and protocols. | Supports Cardano, Bitcoin, Midnight, and standalone presentation. | Home | Source audit and full verify. |
| C02 | Remove connection-state UI, context hooks, and related icons from Cardano. | Cardano retains only protocol requests/responses. | Home/Cardano | Lint, typecheck, and build. |

## Implementation steps

1. Generalize the Home context block.
2. Remove the duplicate Cardano context section and unused state.
3. Run full verification and ownership audit.

## Validation

- `npm run verify`
- HOST CONTEXT ownership audit
- `git diff --check`

## Compatibility and human review

Review connected/disconnected generic context rendering.

## Completion criteria

Home is the sole HOST CONTEXT owner and verification passes.

## Out of scope

Protocol behavior changes.

## Blockers

None.
