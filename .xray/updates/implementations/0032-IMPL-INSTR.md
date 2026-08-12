# xray-mini-app-template-react implementation 0032 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0032
Created: 20260812T100915Z
Evidence-Mode: LOCAL
Depends-On: xray-mini-app-template-react/0031
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Cardano method groups/logger and human visual request | `LOCAL` | Yes | Define a unified panel matching other Home blocks. |

## Objective

Unify Cardano method buttons and logger inside one rounded panel using the same outer radius as other Home blocks.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Wrap both method groups and logger in one bordered panel. | Preserve method order and newest-first logging. | Home/Cardano | Source structure audit. |
| C02 | Apply the shared 20px block radius only to the outer panel and use internal separators. | Match Current blockchain and other Home panels. | Home styles | Style audit and full verify. |

## Implementation steps

1. Add one methods panel wrapper.
2. Move outer border/radius/overflow styling to the wrapper.
3. Remove separate logger outer treatment.
4. Run verification.

## Validation

- `npm run verify`
- panel/radius source audit
- `git diff --check`

## Compatibility and human review

Review unified panel boundaries and radius consistency.

## Completion criteria

Buttons and log share one correctly rounded panel and verification passes.

## Out of scope

Changing method or logger behavior.

## Blockers

None.
