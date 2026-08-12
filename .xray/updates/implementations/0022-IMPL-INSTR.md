# xray-mini-app-template-react implementation 0022 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0022
Created: 20260812T093251Z
Evidence-Mode: LOCAL
Depends-On: xray-mini-app-template-react/0021
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Home selection, Cardano feature, and human request | `LOCAL` | Yes | Define distinct standalone and Cardano presentation. |

## Objective

Add a dedicated Home/Standalone disconnected state and mount Cardano only when the handshake identifies Cardano.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Create `Home/Standalone` with a disconnected icon and explanatory host-context information. | Standalone mode remains useful without presenting Cardano tooling. | Home/Standalone | UI source audit and full verify. |
| C02 | Require a Cardano handshake context before mounting Cardano and require its host network. | Cardano and standalone modes become unambiguous. | Home and Home/Cardano | Typecheck and build. |

## Implementation steps

1. Add the standalone context component and styles.
2. Route disconnected/missing context to Standalone.
3. Remove the local-network fallback from Cardano runtime.
4. Run full template verification.

## Validation

- `npm run verify`
- source-selection audit
- `git diff --check`

## Compatibility and human review

Review standalone messaging and Cardano separation.

## Completion criteria

Standalone has its own disconnected block, Cardano requires Cardano context, and verification passes.

## Out of scope

Bitcoin and Midnight home implementations.

## Blockers

None.
