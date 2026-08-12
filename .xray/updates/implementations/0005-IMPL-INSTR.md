# xray-mini-app-template-react implementation 0005 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0005
Created: 20260811T085802Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Current human request | `LOCAL` | Yes | Adopt separated platform and Cardano bridge APIs. |
| `app/` bridge consumers | `LOCAL` | Yes | Template settings, examples, routing, and Cardano hooks. |

## Objective

Adopt the explicit Cardano mini-app bridge architecture in the React template.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Import platform APIs from shared paths and Cardano native/CIP-30 APIs from Cardano paths; update example actions. | Old mixed imports are removed. | Template application | Typecheck and build. |

## Implementation steps

Migrate imports/usages and validate.

## Validation

- `npm run typecheck`
- `npm run build`

## Compatibility and human review

Review the template as the canonical consumer example.

## Completion criteria

The template uses only explicit platform/Cardano boundaries and validates.

## Out of scope

Non-Cardano examples.

## Blockers

None.
