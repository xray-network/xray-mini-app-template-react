# xray-mini-app-template-react implementation 0038 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0038
Created: 20260819T131657Z
Evidence-Mode: LOCAL
Depends-On: mini-app-bridge/0014
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Human-approved normalized status response and linked SDK | `LOCAL` | Yes | Define direct logger and React status behavior. |
| Home status UI/logger, README, and SKILLS | `LOCAL` | Yes | Own the canonical example. |

## Objective

Demonstrate the normalized low-level status envelope while preserving the current React `{ host, account }` UI state.

## Changes to implement

| Change ID | Requirement | Compatibility | Validation |
| --- | --- | --- | --- |
| C01 | Align direct `getStatus` logging with `{ payload: { host }, context, requestId }`; keep hooks and account UI unchanged through the SDK React projection. | No UI regression or duplicate account field. | Logger audit and full verify pass. |
| C02 | Update README/SKILLS examples if they show status wire/client shapes. | No unrelated redesign. | Docs/stale scan and diff check pass. |

## Implementation steps

1. Align example types/logs/docs.
2. Run full template verification.

## Validation

- `npm run verify` and `git diff --check`.

## Compatibility and human review

Review direct status response, status events, selected account, accountless, unavailable, and standalone states.

## Completion criteria

The template shows the normalized envelope and retains compact React status consumption.

## Out of scope

Layout redesign or other adapter changes.

## Blockers

Implement after SDK plan `mini-app-bridge/0014`.
