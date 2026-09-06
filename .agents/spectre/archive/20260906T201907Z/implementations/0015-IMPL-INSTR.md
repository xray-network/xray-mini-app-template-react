# xray-mini-app-template-react implementation 0015 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0015
Created: 20260811T200807Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Objective

Remove the rem transformation pipeline and use explicit pixel dimensions throughout active template source.

## Changes to implement

| Change ID | Requirement                                                                       | Compatibility                                                                    | Local owner       | Validation    |
| --------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------- | ------------- |
| C01       | Remove `StyleProvider`, `px2remTransformer`, and the exported transformer.        | Preserve the remaining Ant Design provider stack.                                | Theme             | Verify.       |
| C02       | Remove the direct css-in-js dependency and root lock declaration.                 | Keep transitive Ant Design packages intact.                                      | Dependencies      | Verify.       |
| C03       | Convert active `rem` dimensions to equivalent pixels at the configured 14px root. | Preserve rendered dimensions and nesting scale.                                  | Styles/components | Static audit. |
| C04       | Set Tailwind's spacing base to `3.5px`.                                           | Preserve the former 0.25rem scale under the 14px root.                           | Tailwind theme    | Verify.       |
| C05       | Canonicalize arbitrary pixel spacing and sizing utilities.                        | Round direct values to the nearest Tailwind token; retain composite expressions. | Components        | Static audit. |

## Validation

- `npm run verify`
- Pixel/rem source audit
- `git diff --check`

## Out of scope

Visual redesign or removal of Ant Design's internal css-in-js implementation.

## Blockers

None.
