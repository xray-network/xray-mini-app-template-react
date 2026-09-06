# xray-mini-app-template-react implementation 0016 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0016
Created: 20260811T205459Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input                                       | Kind    | Required | Purpose                                         |
| ------------------------------------------- | ------- | -------- | ----------------------------------------------- |
| `package.json` and active repository source | `LOCAL` | Yes      | Define current dependency and script ownership. |
| Human-approved dependency audit             | `LOCAL` | Yes      | Authorize the reported cleanup.                 |

## Objective

Remove unused direct dependencies from the SPA template.

## Changes to implement

| Change ID | Requirement                                                                                         | Compatibility                                    | Local owner | Validation |
| --------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------- | ---------- |
| C01       | Remove the unused Jazzicon declaration while retaining React Router's generated-entry dependencies. | Preserve SPA type generation and build behavior. | Manifest    | Verify.    |
| C02       | Refresh the npm lockfile without changing active source behavior.                                   | Preserve reproducible installation.              | Lockfile    | Verify.    |

## Implementation steps

1. Update package ownership and SPA scripts.
2. Refresh the npm lockfile.
3. Audit installed and declared dependencies.
4. Run project validation.

## Validation

- `npm run verify`
- `npm ls --depth=0`
- `Manifest/import audit`
- `git diff --check`

## Compatibility and human review

Review dependency classification and preview/deployment behavior.

## Completion criteria

All declared changes are implemented, lockfiles are synchronized, and validation passes.

## Out of scope

Feature changes and dependency version upgrades.

## Blockers

None.
