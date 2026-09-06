# xray-mini-app-template-react implementation 0030 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0030
Created: 20260812T100509Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Home hero copy and human request | `LOCAL` | Yes | Define blockchain-neutral template messaging. |

## Objective

Replace the Cardano-specific hero lead with concise multi-blockchain wording.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Describe generic host context and multi-blockchain protocol tooling. | Copy-only change. | Home | Source audit and lint. |

## Implementation steps

1. Update the hero lead.
2. Run lint and diff checks.

## Validation

- `npm run lint`
- `git diff --check`

## Compatibility and human review

Review the revised multi-blockchain wording.

## Completion criteria

The lead is blockchain-neutral and validation passes.

## Out of scope

Layout or feature changes.

## Blockers

None.
