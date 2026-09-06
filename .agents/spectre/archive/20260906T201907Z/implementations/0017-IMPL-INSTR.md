# xray-mini-app-template-react implementation 0017 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0017
Created: 20260811T211000Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| `package.json` and `package-lock.json` | `LOCAL` | Yes | Define the template dependency contract. |
| Human request to restore `@react-router/serve` | `LOCAL` | Yes | Authorize restoring the server adapter. |

## Objective

Restore the React Router server adapter as a direct runtime dependency.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Declare `@react-router/serve` at the matching React Router version. | Preserve existing SPA scripts and builds. | Manifest | Verify. |
| C02 | Synchronize the npm lockfile and installed tree. | Preserve reproducible installation. | Lockfile | Audit. |

## Implementation steps

1. Restore the dependency.
2. Refresh npm state.
3. Run project validation.

## Validation

- `npm run verify`
- `npm ls @react-router/serve --depth=0`
- `git diff --check`

## Compatibility and human review

Review dependency restoration without changing preview behavior.

## Completion criteria

The dependency is declared, locked, installed, and the project validates.

## Out of scope

Changing server or preview scripts.

## Blockers

None.
