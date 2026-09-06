# xray-mini-app-template-react implementation 0033 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0033
Created: 20260812T101716Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Cardano methods/logger panel, platform bridge client exports, and human revision request | `LOCAL` | Yes | Restore host actions alongside the Cardano protocol actions. |

## Objective

Add host actions to the Cardano methods/logger panel so their requests and responses use the same visible log.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Add a Host method group for theme, currency, and balance-privacy requests. | Preserve automatic handshake and route synchronization. | Home/Cardano | Source audit and full verify. |
| C02 | Send Host actions through the existing method logger. | Preserve Cardano Bridge and CIP-30 action behavior and newest-first logging. | Home/Cardano | Typecheck, build, and source audit. |

## Implementation steps

1. Import the chain-neutral mini-app client.
2. Add the Host request row before the Cardano protocol rows.
3. Route each Host request through the existing `fire` logger.
4. Run full verification and diff checks.

## Validation

- `npm run verify`
- host-action source audit
- `git diff --check`

## Compatibility and human review

Review Host button placement and request/response logging inside XRAY App.

## Completion criteria

All three Host getters are available in the methods panel, share its logger, and verification passes.

## Out of scope

Adding buttons for automatic handshake or route synchronization.

## Blockers

None.
