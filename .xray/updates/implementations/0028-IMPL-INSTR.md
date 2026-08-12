# xray-mini-app-template-react implementation 0028 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0028
Created: 20260812T095922Z
Evidence-Mode: LOCAL
Depends-On: xray-mini-app-template-react/0027
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Minimal Cardano method launcher and human request | `LOCAL` | Yes | Define lightweight method logging. |

## Objective

Add a simple on-page logger to direct Cardano method calls, with each method-group bar above its buttons, without restoring the detailed request console.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Record request, response, and error lines through one small fire helper. | Direct method buttons retain their current coverage and gating. | Home/Cardano | Source audit and full verify. |
| C02 | Render a compact bounded text log. | Avoid action metadata, tabs, correlation cards, or modal UI. | Home/Cardano | Lint and build. |
| C03 | Place each protocol method bar above its button row. | Preserve compact responsive layout. | Home styles | Layout source audit. |

## Implementation steps

1. Add bounded string log state and formatting.
2. Route each button through the fire helper.
3. Render the text log and run verification.

## Validation

- `npm run verify`
- logger simplicity audit
- `git diff --check`

## Compatibility and human review

Review log readability and method coverage.

## Completion criteria

All methods log basic lifecycle lines and verification passes.

## Out of scope

Restoring detailed request/response records.

## Blockers

None.
