# xray-mini-app-template-react implementation 0014 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0014
Created: 20260811T195803Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input                                               | Kind    | Required | Purpose                                   |
| --------------------------------------------------- | ------- | -------- | ----------------------------------------- |
| Human request on 2026-08-11                         | `LOCAL` | Yes      | Rename the Cardano protocol identifier.   |
| `app/components/pages/Home/blockchains/Cardano.tsx` | `LOCAL` | Yes      | Owns protocol discovery and presentation. |

## Objective

Adopt and expose `cardano.bridge` throughout the React template.

## Changes to implement

| Change ID | Requirement                                                              | Compatibility                                     | Local owner  | Validation    |
| --------- | ------------------------------------------------------------------------ | ------------------------------------------------- | ------------ | ------------- |
| C01       | Rename the Cardano request tab, discovery check, and action association. | Coordinated pre-release breaking contract rename. | Cardano home | Verify.       |
| C02       | Remove all active template references to `cardano.native`.               | Preserve existing request message types.          | Cardano home | Static audit. |

## Implementation steps

1. Migrate protocol tabs and support checks to `cardano.bridge`.
2. Keep Cardano request/response wire types unchanged.
3. Run full template verification.

## Validation

- `npm run verify`
- `git diff --check`

## Compatibility and human review

Review against an XRAY App host advertising the renamed protocol.

## Completion criteria

The template uses only `cardano.bridge`, validation passes, and implementation 0014 has a result in `REVIEW`.

## Out of scope

Unified multi-chain client architecture or visual redesign.

## Blockers

None.
