# xray-mini-app-template-react implementation 0027 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0027
Created: 20260812T095240Z
Evidence-Mode: LOCAL
Depends-On: xray-mini-app-template-react/0026
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Cardano console, xray-js Cardano exports, and human request | `LOCAL` | Yes | Define a minimal direct-method demo. |

## Objective

Replace the detailed Cardano request console with simple buttons that directly fire exported xray-js methods.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Remove action registries, request/response logging, tabs, helpers, and the separate Cardano Page wrapper. | Cardano becomes a compact method launcher. | Home/Cardano | Source audit and full verify. |
| C02 | Expose direct Cardano bridge and CIP-30 method buttons, using dummy values where arguments are required. | CIP-30 methods remain disabled until Enable succeeds. | Home/Cardano | Typecheck and build. |

## Implementation steps

1. Collapse Cardano into one component.
2. Add direct bridge and CIP-30 method buttons.
3. Remove the old Page implementation.
4. Run full verification.

## Validation

- `npm run verify`
- Cardano complexity/direct-call audit
- `git diff --check`

## Compatibility and human review

Review button coverage and intentionally minimal behavior.

## Completion criteria

Cardano consists of direct method buttons with no detailed console machinery and verification passes.

## Out of scope

Displaying request or response details.

## Blockers

None.
