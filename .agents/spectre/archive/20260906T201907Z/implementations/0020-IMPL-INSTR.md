# xray-mini-app-template-react implementation 0020 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0020
Created: 20260812T090719Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Home hero and human copy request | `LOCAL` | Yes | Define the requested template-focused heading. |

## Objective

Make the hero heading explicitly identify the repository as a React template for XRAY mini apps.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Replace the existing hero heading with concise React-template wording. | Copy-only change. | Home page | Source audit and lint. |

## Implementation steps

1. Update the hero heading.
2. Validate source and lint.

## Validation

- `npm run lint`
- `git diff --check`

## Compatibility and human review

Review the revised wording.

## Completion criteria

The hero clearly says this is a React template and validation passes.

## Out of scope

Layout or styling changes.

## Blockers

None.
