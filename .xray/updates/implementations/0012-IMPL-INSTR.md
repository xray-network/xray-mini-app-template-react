# xray-mini-app-template-react implementation 0012 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0012
Created: 20260811T185345Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input                                  | Kind    | Required | Purpose                                                             |
| -------------------------------------- | ------- | -------- | ------------------------------------------------------------------- |
| Human request on 2026-08-11            | `LOCAL` | Yes      | Standardize clipboard behavior and upgrade all Ant Design projects. |
| `app/components/common/Copy/index.tsx` | `LOCAL` | Yes      | Owns reusable clipboard behavior.                                   |
| `app/components/pages/Home/index.tsx`  | `LOCAL` | Yes      | Contains a direct clipboard package consumer.                       |
| `app/theme/` and `package.json`        | `LOCAL` | Yes      | Own Ant Design integration and dependencies.                        |

## Objective

Adopt the XRAY App clipboard implementation and Ant Design 6.6.0.

## Changes to implement

| Change ID | Requirement                                                                                                      | Compatibility                                       | Local owner           | Validation           |
| --------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | --------------------- | -------------------- |
| C01       | Replace `react-copy-to-clipboard` with the native Clipboard API plus embedded-webview fallback used by XRAY App. | Preserve child click handlers and tooltip feedback. | Shared Copy and home  | Verify.              |
| C02       | Upgrade Ant Design to 6.6.0 and remove the React 19 v5 patch.                                                    | Keep React 19 and current theme providers.          | Dependencies and root | Verify.              |
| C03       | Retain `EscapeAntd` because component examples still export context-bound message APIs.                          | Continue mounting it inside Ant Design App.         | Theme                 | Typecheck and build. |

## Implementation steps

1. Replace shared/direct copy package usage and remove package/type dependencies.
2. Upgrade Ant Design and remove the v5 React patch import/dependency.
3. Validate EscapeAntd consumers against the App provider.
4. Run full verification.

## Validation

- `npm run verify`
- `git diff --check`
- Static dependency/usage audit.

## Compatibility and human review

Review clipboard fallback behavior, Ant Design component styling, and message context after the v6 upgrade.

## Completion criteria

All changes pass full verification and implementation 0012 has a result in `REVIEW`.

## Out of scope

Unrelated dependency upgrades and UI redesign.

## Blockers

None.
