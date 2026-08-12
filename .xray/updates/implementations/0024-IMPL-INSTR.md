# xray-mini-app-template-react implementation 0024 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0024
Created: 20260812T094207Z
Evidence-Mode: LOCAL
Depends-On: xray-mini-app-template-react/0022
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Home selection, Standalone/Cardano features, xray-js exports, and human request | `LOCAL` | Yes | Define the requested simplification. |

## Objective

Inline the disconnected connection block in Home and simplify Cardano to use xray-js exports directly without custom React context infrastructure.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Remove the Standalone component and render its connection state inline based on missing host context. | Preserve disconnected information in the Home flow. | Home | Source audit and full verify. |
| C02 | Remove Cardano provider/context/hook abstractions and keep only direct xray-js connector/page composition. | Cardano bridge behavior remains tied to Cardano host context. | Home/Cardano | Typecheck and build. |

## Implementation steps

1. Inline the disconnected context block in Home.
2. Delete the Standalone feature files.
3. Collapse Cardano runtime to direct xray-js setup and delete custom context files.
4. Run full verification.

## Validation

- `npm run verify`
- obsolete-abstraction audit
- `git diff --check`

## Compatibility and human review

Review simplified Home ownership and unchanged visible states.

## Completion criteria

No Standalone component or custom Cardano React context remains and verification passes.

## Out of scope

Changing Cardano protocol methods or adding other chains.

## Blockers

None.
