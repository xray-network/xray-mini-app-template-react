# xray-mini-app-template-react implementation 0014 result

Result-Version: v1
Implementation-ID: xray-mini-app-template-react/0014
Instruction: ./0014-IMPL-INSTR.md
Evidence-Mode: LOCAL

## Change dispositions

| Change ID | Disposition   | Implementation                                                                                               | Validation                                    |
| --------- | ------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| C01       | `IMPLEMENTED` | Renamed the Cardano Bridge request tab, active default, discovery check, support guard, and action grouping. | Lint, typecheck, and production build passed. |
| C02       | `IMPLEMENTED` | Removed active `cardano.native` references while preserving Cardano request and response wire message names. | Repository-wide stale-contract audit passed.  |

## Outcome

The React template discovers and presents XRAY's Cardano API as `cardano.bridge`, consistently with the SDK and host.

## Inputs consumed

- Human request on 2026-08-11.
- `app/components/pages/Home/blockchains/Cardano.tsx`.
- Renamed SDK and XRAY App handshake contracts.

## Project changes

- Renamed the protocol tab and default request tab to `cardano.bridge`.
- Routed Cardano bridge requests into the renamed tab.
- Renamed and migrated the Cardano availability guard.
- Updated the unavailable explanation to say Cardano bridge protocol.

## Exported change contract

| Change ID | Semantic change                                    | Compatibility                                       | Downstream action |
| --------- | -------------------------------------------------- | --------------------------------------------------- | ----------------- |
| C01       | The template checks and displays `cardano.bridge`. | Requires the coordinated XRAY App handshake rename. | None.             |
| C02       | Wire message types retain `xray.cardano.client.*`. | Request/response transport remains unchanged.       | None.             |

## Validation

- `npm run verify` — passed ESLint, typecheck, and production build; Vite reported only the existing large Cardano chunk warning.
- Active `/Users/claude/Desktop/xray` product-source audit found no remaining `cardano.native` or `CARDANO_NATIVE_PROTOCOL` references.
- Prettier audit and `git diff --check` — passed.

## Deviations from instruction

None.

## Remaining human review

Confirm the Requests and responses tab reads `cardano.bridge` and its actions enable after a matching host handshake.

## Reproducibility

Run `npm run verify`, then open the template in XRAY App and inspect the Cardano protocol tab and handshake tags.
