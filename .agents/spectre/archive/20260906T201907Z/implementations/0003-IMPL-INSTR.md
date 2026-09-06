# xray-mini-app-template-react implementation 0003 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0003
Created: 20260807T105137Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Human request for the unreleased xray-js Cardano facade restructure | `LOCAL` | Yes | Authorizes migration to grouped exports. |
| Linked sibling xray-js runtime and active template Cardano imports | `LOCAL` | Yes | Define the new facade and affected consumers. |

## Objective

Adopt grouped Cardano SDK exports in the React template.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| `C01` | Migrate configuration and provider types to grouped xray-js Cardano namespaces. | Breaking sibling API migration; preserve template behavior. | Template source | Verify. |
| `C02` | Remove retired Cardano facade imports and update guidance where applicable. | No legacy aliases remain. | Source and guidance | Source scan and verify. |

## Implementation steps

Migrate imports, run verification, record the result, and move the row to `REVIEW`.

## Validation

- `npm run verify`
- Retired-export scan
- `git diff --check`

## Compatibility and human review

Review import ergonomics and unchanged template behavior.

## Completion criteria

The template validates against the grouped Cardano facade with no retired imports.

## Out of scope

- Template feature or visual changes

## Blockers

None.
