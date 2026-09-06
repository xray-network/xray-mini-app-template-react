# xray-mini-app-template-react implementation 0006 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0006
Created: 20260811T093220Z
Evidence-Mode: LOCAL
Depends-On: xray-mini-app-template-react/0005
Provider-Evidence: NONE

## Objective

Adopt direct bridge module namespace imports after removal of wrapper entrypoints.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Replace named client wrapper imports with namespace imports. | Coordinated pre-release change. | Template bridge consumers | Typecheck and build. |

## Validation

- `npm run typecheck`
- `npm run build`
