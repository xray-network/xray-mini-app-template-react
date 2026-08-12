# xray-mini-app-template-react implementation 0018 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0018
Created: 20260811T213459Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Template manifests, lockfile, Router config, routes, and tooling | `LOCAL` | Yes | Define the React Router 7 application contract. |
| React Router 8.3.0 requirements and human migration request | `LOCAL` | Yes | Define the target dependency/runtime contract. |

## Objective

Apply the validated xray-app React Router 8 migration contract to the template.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Align all Router packages to 8.3.0, React/ReactDOM to 19.2.8, and Node to >=22.22.0. | Preserve SPA behavior and scripts. | Manifest and lockfile | Full verify and npm audit. |
| C02 | Apply only compatibility changes required by typecheck/build. | Preserve template routes and UI. | Source/config | Full verify. |

## Implementation steps

1. Apply the dependency/runtime alignment.
2. Refresh npm state and resolve compatibility failures.
3. Run complete validation.

## Validation

- `npm run verify`
- Router/React `npm ls --depth=0`
- React Router 7 active-reference audit
- `git diff --check`

## Compatibility and human review

Review parity with the xray-app reference migration.

## Completion criteria

The template builds and typechecks on the aligned v8 contract.

## Out of scope

Feature, design, or unrelated dependency changes.

## Blockers

None.
