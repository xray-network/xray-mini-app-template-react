# xray-mini-app-template-react implementation 0019 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0019
Created: 20260812T090427Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input                                                                  | Kind    | Required | Purpose                                                                         |
| ---------------------------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------------------- |
| Root runtime, home composition, Cardano integration, and human request | `LOCAL` | Yes      | Define the requested one-time handshake and blockchain-specific home ownership. |

## Objective

Keep the application root blockchain-neutral and mount Cardano-specific runtime support from the home page after the initial handshake, falling back to standalone Cardano when no host context is available.

## Changes to implement

| Change ID | Requirement                                                                                                           | Compatibility                                                                                         | Local owner              | Validation                      |
| --------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------ | ------------------------------- |
| C01       | Make the generic mini-app provider, theme, route sync, and navigation progress the root runtime.                      | Standard host features remain available for every blockchain.                                         | `app/root.tsx`           | Typecheck and build.            |
| C02       | Select home blockchain content once after handshake and place Cardano provider/connector ownership with Cardano home. | Missing or disconnected context uses standalone Cardano; later blockchain changes may reload the app. | Home/Cardano integration | Typecheck, build, source audit. |

## Implementation steps

1. Remove Cardano-specific ownership from the root and mount an explicit generic mini-app provider.
2. Add a home handshake gate and Cardano runtime wrapper.
3. Make Cardano SDK initialization accept an explicit network.
4. Run full template verification.

## Validation

- `npm run verify`
- `git diff --check`

## Compatibility and human review

Review standalone fallback and initial blockchain selection.

## Completion criteria

The root is chain-neutral, Cardano is mounted only for Cardano/standalone home, and full verification passes.

## Out of scope

Live blockchain switching and Bitcoin or Midnight implementations.

## Blockers

None.
