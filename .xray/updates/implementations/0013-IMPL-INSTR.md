# xray-mini-app-template-react implementation 0013 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0013
Created: 20260811T192845Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input                                        | Kind    | Required | Purpose                                                       |
| -------------------------------------------- | ------- | -------- | ------------------------------------------------------------- |
| Human request on 2026-08-11                  | `LOCAL` | Yes      | Tighten the hero copy, type scale, and blockchain support UI. |
| `app/components/pages/Home/index.tsx`        | `LOCAL` | Yes      | Owns hero content and support semantics.                      |
| `app/components/pages/Home/style.module.css` | `LOCAL` | Yes      | Owns hero layout, typography, and responsive presentation.    |

## Objective

Make the template hero smaller, shorter, more informative, and visually clearer about blockchain support.

## Changes to implement

| Change ID | Requirement                                                                                                                               | Compatibility                              | Local owner | Validation |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ----------- | ---------- |
| C01       | Reduce the main hero heading scale, keep the left copy concise, and place detailed usage guidance in the support panel.                   | Preserve the repository copy action.       | Home hero   | Verify.    |
| C02       | Match the support panel outer width to the Current blockchain details column, stretch it to full height, and use larger internal padding. | Stack cleanly at the existing breakpoint.  | Hero styles | Verify.    |
| C03       | Present supported blockchains in one compact inline group instead of rows.                                                                | Keep current/coming-soon state accessible. | Home hero   | Verify.    |

## Implementation steps

1. Rewrite the hero headline and lead, then place setup and bridge usage guidance only in the support panel.
2. Adjust heading scales, match the Current blockchain grid without a shrinking column gap, and stretch/pad the support panel.
3. Replace row-based blockchain support markup and styling with an inline group.
4. Run full template verification.

## Validation

- `npm run verify`
- `git diff --check`

## Compatibility and human review

Review the shared desktop right-column sizing, full-height panel, inline chain readability, and mobile wrapping.

## Completion criteria

The hero changes validate and implementation 0013 has a result in `REVIEW`.

## Out of scope

Changes below the hero or blockchain protocol behavior.

## Blockers

None.
