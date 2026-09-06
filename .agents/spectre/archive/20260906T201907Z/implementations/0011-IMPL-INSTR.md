# xray-mini-app-template-react implementation 0011 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0011
Created: 20260811T123212Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input                                               | Kind    | Required | Purpose                                                                                 |
| --------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| Human request on 2026-08-11                         | `LOCAL` | Yes      | Make explicit CIP-30 Enable the first action and unlock methods only after it succeeds. |
| `app/components/pages/Home/blockchains/Cardano.tsx` | `LOCAL` | Yes      | Owns protocol presentation, CIP-30 state, actions, and request logs.                    |
| `app/components/pages/Home/style.module.css`        | `LOCAL` | Yes      | Owns protocol-list and action presentation.                                             |

## Objective

Separate advertised CIP-30 protocol discovery from the template's explicit enable flow.

## Changes to implement

| Change ID | Requirement                                                                                                              | Compatibility                                                | Local owner              | Validation           |
| --------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------ | -------------------- |
| C01       | Put Enable first in the CIP-30 action list and keep it available whenever the host advertises CIP-30.                    | Host disconnection or protocol removal still disables it.    | Cardano home             | Typecheck and build. |
| C02       | Disable every other CIP-30 action until the user clicks Enable and it succeeds.                                          | Reset enabled API state when CIP-30 is no longer advertised. | Cardano home             | Typecheck and build. |
| C03       | Render only the protocols advertised by the handshake, without deriving protocol presentation from CIP-30 enabled state. | Show an empty placeholder when no protocol is advertised.    | Current blockchain block | Typecheck and build. |

## Implementation steps

1. Derive separate advertised and explicitly enabled CIP-30 states.
2. Reorder and gate CIP-30 request actions.
3. Prevent method helpers from implicitly enabling CIP-30.
4. Simplify protocol list rendering and styles.
5. Validate the template.

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Compatibility and human review

Human review must confirm Enable is the first active CIP-30 button, all later actions become active only after successful Enable, and the protocol list remains a direct handshake list.

## Completion criteria

All three changes are implemented, required validation passes, and implementation 0011 has a result in `REVIEW`.

## Out of scope

Changing XRAY App host authorization, bridge schemas, method payloads, or request/response log structure.

## Blockers

None.
