# xray-mini-app-template-react implementation 0029 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0029
Created: 20260812T100310Z
Evidence-Mode: LOCAL
Depends-On: xray-mini-app-template-react/0028
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Simple Cardano logger and human layout request | `LOCAL` | Yes | Define revised logger placement and alignment. |

## Objective

Move the logger above method buttons and render separated two-column entries with time/direction on the left and aligned method data on the right.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Replace text lines with structured bounded log entries. | Retain request/success/error lifecycle information. | Home/Cardano | Source audit and full verify. |
| C02 | Place the log above method bars, add row/column separators, and align time plus arrow in the left column. | Keep data vertically aligned in the right column and responsive. | Home styles | Layout audit and build. |

## Implementation steps

1. Store structured log entries.
2. Render the logger before buttons.
3. Add two-column and separator styling.
4. Run full verification.

## Validation

- `npm run verify`
- logger structure/order audit
- `git diff --check`

## Compatibility and human review

Review log scanability and alignment.

## Completion criteria

Logger placement and two-column layout match the request and verification passes.

## Out of scope

Restoring detailed request metadata.

## Blockers

None.
