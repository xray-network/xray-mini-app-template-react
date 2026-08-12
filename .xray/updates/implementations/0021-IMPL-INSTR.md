# xray-mini-app-template-react implementation 0021 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0021
Created: 20260812T092922Z
Evidence-Mode: LOCAL
Depends-On: xray-mini-app-template-react/0019
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Home/Cardano source layout and human request | `LOCAL` | Yes | Define the requested Cardano feature colocation. |

## Objective

Create a dedicated Home/Cardano feature folder and colocate all Home-specific Cardano page, runtime, connector, and provider code there.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Move the Cardano home implementation into `app/components/pages/Home/Cardano/`. | Preserve UI and bridge behavior. | Home/Cardano | Source audit and full verify. |
| C02 | Move Cardano runtime, connector, and SDK provider ownership out of Home index and generic integrations. | Home index retains only blockchain selection and shared hero composition. | Home/Cardano and Home index | Typecheck and build. |

## Implementation steps

1. Create the Cardano feature folder and move the page.
2. Extract runtime/connector and provider into colocated files.
3. Update imports and remove obsolete paths.
4. Run full template verification.

## Validation

- `npm run verify`
- source-layout audit
- `git diff --check`

## Compatibility and human review

Review file ownership and unchanged runtime behavior.

## Completion criteria

All Home-specific Cardano code is colocated and the template validates.

## Out of scope

Behavior, copy, or styling changes.

## Blockers

None.
