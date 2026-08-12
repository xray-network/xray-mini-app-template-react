# xray-mini-app-template-react implementation 0034 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0034
Created: 20260812T110024Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Local bridge imports/documentation and the human-approved compact xray-js API | `LOCAL` | Yes | Migrate the template without changing bridge behavior. |

## Objective

Adopt compact Mini App Bridge client and React namespaces throughout the React template.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Replace deep client imports with root `client` namespaces. | Preserve Host, Cardano Bridge, CIP-30, connector, and routing behavior. | app | Full verify. |
| C02 | Replace Cardano React subpath imports with `react.cardano.bridge` usage and update guidance. | Preserve hook behavior and standalone fallbacks. | app/docs | Lint, typecheck, build, and import audit. |

## Implementation steps

1. Migrate imports and namespace references.
2. Update template contributor guidance.
3. Run full verification and diff checks.

## Validation

- `npm run verify`
- obsolete-import audit
- `git diff --check`

## Compatibility and human review

Review unchanged Home actions, logger, settings, stats, and route synchronization.

## Completion criteria

No obsolete bridge-role imports remain and the full template verifies.

## Out of scope

UI, wire protocol, or authorization behavior changes.

## Blockers

None.
