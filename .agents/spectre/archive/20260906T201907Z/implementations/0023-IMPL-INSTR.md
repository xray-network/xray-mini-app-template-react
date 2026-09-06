# xray-mini-app-template-react implementation 0023 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0023
Created: 20260812T093427Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Shared Copy component, Home hero, and human request | `LOCAL` | Yes | Define canonical copy ownership. |

## Objective

Use the shared Copy component as the sole owner of repository URL copying and success feedback.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Remove duplicate Home copy state/timer and retain the shared Copy wrapper. | Clipboard fallback and tooltip success remain canonical. | Home hero | Lint and source audit. |

## Implementation steps

1. Remove custom copy state and click handling.
2. Keep the repository button wrapped by the shared Copy component.
3. Validate lint and source.

## Validation

- `npm run lint`
- source audit
- `git diff --check`

## Compatibility and human review

Review the simplified static button label and shared tooltip feedback.

## Completion criteria

No page-level clipboard feedback logic remains and validation passes.

## Out of scope

Changing the shared Copy component.

## Blockers

None.
