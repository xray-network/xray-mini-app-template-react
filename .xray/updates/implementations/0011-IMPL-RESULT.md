# xray-mini-app-template-react implementation 0011 result

Result-Version: v1
Implementation-ID: xray-mini-app-template-react/0011
Instruction: ./0011-IMPL-INSTR.md
Evidence-Mode: LOCAL

## Change dispositions

| Change ID | Disposition   | Implementation                                                                                                                                                            | Validation                                    |
| --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| C01       | `IMPLEMENTED` | Enable is now the first CIP-30 action and is available whenever the handshake advertises `cardano.cip30` in the connected Cardano context.                                | Lint, typecheck, and production build passed. |
| C02       | `IMPLEMENTED` | Every subsequent CIP-30 action, including Is enabled, is disabled until explicit Enable succeeds and stores the returned API. Method helpers no longer enable implicitly. | Lint, typecheck, and production build passed. |
| C03       | `IMPLEMENTED` | Current blockchain protocols render directly from the handshake `protocols` array as plain tags, with no enabled-state marker or hardcoded protocol inventory.            | Lint, typecheck, and production build passed. |

## Outcome

The Cardano CIP-30 console now demonstrates the intended consumer lifecycle: discover `cardano.cip30` in the handshake, click Enable, then call the returned API. Protocol discovery remains a direct representation of host advertisement and does not change based on whether this page has enabled CIP-30.

## Inputs consumed

- Human request on 2026-08-11.
- `app/components/pages/Home/blockchains/Cardano.tsx`.
- `app/components/pages/Home/style.module.css`.

## Project changes

- Separated advertised CIP-30 support from locally enabled API state.
- Reordered Enable before every other CIP-30 action.
- Added explicit availability and unavailable-reason inputs to CIP-30 request logging.
- Removed implicit enable behavior from the API method helper.
- Replaced the hardcoded protocol inventory/status dots with direct handshake protocol tags.

## Exported change contract

| Change ID | Semantic change                                                                       | Compatibility                                                                   | Downstream action   |
| --------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------- |
| C01       | Protocol advertisement makes Enable available but does not unlock API methods.        | Standalone or non-CIP-30 hosts leave all CIP-30 actions disabled.               | Click Enable first. |
| C02       | A successful explicit Enable stores the API and unlocks all remaining CIP-30 actions. | Losing advertised CIP-30 support clears the stored API and locks methods again. | None.               |
| C03       | Protocol tags equal the current handshake protocol array.                             | No unavailable protocols or authorization states are shown in this list.        | None.               |

## Validation

- `npm run typecheck` — passed.
- `npm run verify` — passed ESLint, typecheck, and production build. Vite reported only the existing large Cardano chunk warning.
- `git diff --check` — passed.

## Deviations from instruction

None.

## Remaining human review

- Confirm Enable is the first and only initially active CIP-30 action.
- Confirm successful Enable activates every following CIP-30 action.
- Confirm protocol tags remain unchanged when Enable or Is enabled is called.

## Reproducibility

From the repository root, run `npm run verify` and `git diff --check`, then open the Cardano CIP-30 tab against XRAY App and exercise Enable followed by the remaining methods.
