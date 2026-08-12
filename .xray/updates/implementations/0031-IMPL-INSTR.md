# xray-mini-app-template-react implementation 0031 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0031
Created: 20260812T100547Z
Evidence-Mode: LOCAL
Depends-On: xray-mini-app-template-react/0029
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Cardano logger placement/order and human clarification | `LOCAL` | Yes | Correct the intended log layout. |

## Objective

Place the Cardano log below method buttons and show newest entries first.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Move logger markup below both protocol method groups. | Preserve two-column entry layout. | Home/Cardano | Source-order audit. |
| C02 | Prepend new bounded entries rather than append them. | Latest request/result/error remains immediately visible. | Home/Cardano | State-order audit and full verify. |

## Implementation steps

1. Change log insertion order.
2. Move the logger below methods.
3. Run verification.

## Validation

- `npm run verify`
- logger order audit
- `git diff --check`

## Compatibility and human review

Review log placement and newest-first ordering.

## Completion criteria

Methods precede the log, newest entries render first, and verification passes.

## Out of scope

Changing logger row styling.

## Blockers

None.
