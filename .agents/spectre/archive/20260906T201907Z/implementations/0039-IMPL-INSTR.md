# xray-mini-app-template-react implementation 0039 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0039
Created: 20260822T072729Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Human-requested React-template exposure of Platform v1 `getLocale` dated 2026-08-22 | `LOCAL` | Yes | Define the direct method demonstration and its bounded UI scope. |
| `app/components/pages/Home/Cardano/index.tsx` | `LOCAL` | Yes | Own the existing Platform v1 method launcher and shared request/result logger. |
| Template README, SKILLS, package manifest, and verification scripts | `LOCAL` | Yes | Define SDK guidance and completion checks. |

## Objective

Expose Platform v1 `getLocale` in the React template's existing host-method launcher so developers can request and
inspect the XRAY App locale through the shared logger.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Add a `Get locale` action beside the existing Platform v1 actions that calls `clientPlatformV1.getLocale()` through the shared `fire` logger as `platform.getLocale`. | Preserve the existing button style, order, request/response logging, error handling, Cardano gating, and layout; do not create a second logger or request abstraction. | Home Cardano method launcher. | Lint/typecheck/build prove the SDK method resolves and the action uses the existing logger. |
| C02 | Update README/SKILLS bridge guidance only where needed to list the direct locale request and clarify that the template displays its response rather than localizing itself. | No locale preference store, Settings control, React hook, host-preference synchronization, translated copy, or standalone fallback is introduced. | Template documentation. | Documentation/stale scan and full verification pass. |

## Implementation steps

1. Add the direct `getLocale` button to the existing Platform v1 request group.
2. Update concise bridge documentation for the new request-only example.
3. Run full template verification and audit for accidental locale state, UI, or localization scope.

## Validation

- `npm run verify`.
- `git diff --check`.
- Source/documentation scan confirming the action calls `clientPlatformV1.getLocale()` and no locale setting, hook, store, event listener, or translation system was added.

## Compatibility and human review

Review the Platform v1 action row inside XRAY App, click `Get locale`, and confirm the logger records the request and
the correlated response containing `payload: "en"`, context, and request ID. Also confirm existing actions and the
standalone/unavailable-host error path remain unchanged.

## Completion criteria

- The template exposes a visible `Get locale` action in the existing Platform v1 method launcher.
- The action uses the SDK client method and shared logger without duplicating state or request handling.
- Documentation describes request inspection without claiming application localization.
- Full verification, scans, and diff checks pass.

## Out of scope

- Locale Settings UI or persisted locale state in the template.
- `platformV1.useLocale`, preference synchronization, locale events, automatic formatting, translation catalogs, or text direction.
- SDK/XRAY App implementation, package publishing, UI redesign, or deployment.

## Blockers

None.
