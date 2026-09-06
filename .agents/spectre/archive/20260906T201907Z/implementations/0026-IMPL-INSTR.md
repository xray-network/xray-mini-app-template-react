# xray-mini-app-template-react implementation 0026 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0026
Created: 20260812T094703Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Cardano CIP-30 console and human request | `LOCAL` | Yes | Define dummy error-path requests without input UI. |

## Objective

Remove the Cardano CIP-30 input modal and immediately invoke parameterized methods with dummy values that exercise host errors.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Remove modal/form state, inputs, imports, and styles. | Actions become one-click console requests. | Home/Cardano | Lint and source audit. |
| C02 | Send `dummy` values for collateral, signing, and submission methods and retain error logging. | Invalid payloads intentionally produce logged errors. | Home/Cardano | Typecheck and build. |

## Implementation steps

1. Replace modal-opening actions with direct dummy calls.
2. Remove modal state, handlers, markup, imports, and styles.
3. Run full verification.

## Validation

- `npm run verify`
- modal/dummy source audit
- `git diff --check`

## Compatibility and human review

Review one-click error-path behavior.

## Completion criteria

No CIP-30 input modal remains, dummy calls compile, and verification passes.

## Out of scope

Changing host-side error behavior.

## Blockers

None.
