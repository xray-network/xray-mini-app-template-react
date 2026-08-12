# xray-mini-app-template-react implementation 0008 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0008
Created: 20260811T094814Z
Evidence-Mode: LOCAL
Depends-On: xray-mini-app-template-react/0007
Provider-Evidence: NONE

## Objective

Make the template identify and follow the selected Cardano, Bitcoin, or Midnight host context without activating Cardano-only UI on other blockchains.

## Changes to implement

| Change ID | Requirement                                                                                                 | Compatibility                                              | Local owner             | Validation           |
| --------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ----------------------- | -------------------- |
| C01       | Display the host blockchain and network and gate Cardano bridge actions by context and advertised protocol. | Platform actions remain blockchain-neutral.                | Template bridge example | Typecheck and build. |
| C02       | Initialize Cardano runtime and connector only for Cardano or standalone context.                            | Standalone development remains Cardano mainnet by default. | XRAY JS integration     | Typecheck and build. |
| C03       | Make Cardano-only examples and settings clearly unavailable under Bitcoin or Midnight hosts.                | No Bitcoin or Midnight protocol adapter is added.          | Template UI             | Typecheck and build. |

## Validation

- `npm run verify`
- `git diff --check`

## Completion criteria

One template build follows all three host contexts and does not present Cardano functionality as active under Bitcoin or Midnight.
