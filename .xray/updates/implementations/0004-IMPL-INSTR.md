# xray-mini-app-template-react implementation 0004 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0004
Created: 20260811T082930Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Current human request | `LOCAL` | Yes | Consume the iframe bridge host context in every mini app. |
| `app/integrations/xray-js/useEffectiveSettings.ts` | `LOCAL` | Yes | Template bridge integration used by generated mini apps. |

## Objective

Adopt host context in the React mini-app template integration.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Expose effective host context and derive the hosted Cardano network from its discriminated context. | Standalone preferences remain the fallback. | `app/integrations/xray-js/` | Typecheck and build. |

## Implementation steps

Update the XRAY integration, typecheck, and build.

## Validation

- `npm run typecheck`
- `npm run build`

## Compatibility and human review

Review standalone fallback and hosted Cardano narrowing.

## Completion criteria

The template exposes host context and passes validation.

## Out of scope

UI redesign.

## Blockers

None.
