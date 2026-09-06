# xray-mini-app-template-react implementation 0039 result

Result-Version: v1
Implementation-ID: xray-mini-app-template-react/0039
Instruction: ./0039-IMPL-INSTR.md
Evidence-Mode: LOCAL

## Change dispositions

| Change ID | Disposition | Implementation | Validation |
| --- | --- | --- | --- |
| C01 | IMPLEMENTED | Added `Get locale` to the existing Platform v1 action group and routed it through `fire("platform.getLocale", () => clientPlatformV1.getLocale())`. | ESLint, strict typecheck, and production/prerender build pass against the linked SDK. |
| C02 | IMPLEMENTED | Documented request-only locale inspection and explicitly excluded template persistence, hooks/events, and localization claims. | Documentation/source scan and diff check pass. |

## Outcome

The React template now exposes Platform v1 `getLocale` beside the existing status, theme, currency, and balance-privacy
actions. Clicking it records the standard request and correlated response through the shared newest-first logger. No
locale state, preference synchronization, event subscription, React hook, translation system, or Settings UI was added.

## Inputs consumed

- Human-requested React-template `getLocale` exposure dated 2026-08-22.
- Existing Home Cardano Platform v1 action group and shared logger.
- Template README, SKILLS, package scripts, and linked SDK runtime.

## Project changes

- `app/components/pages/Home/Cardano/index.tsx`
- `README.md`
- `SKILLS.md`

## Exported change contract

| Change ID | Semantic change | Compatibility | Downstream action |
| --- | --- | --- | --- |
| C01 | The Home method launcher has a visible `Get locale` action using the direct Platform v1 client. | Existing button styling, action order, logger, error behavior, and Cardano gating are unchanged. | Open the template in XRAY App and click the action to inspect locale. |
| C02 | Template guidance identifies locale as request-only host data. | No template localization or persistence behavior is claimed or introduced. | None. |

## Validation

- `npm run lint` — passed.
- `npm run typecheck` — passed.
- `npm run build` — passed when rerun with permission for React Router's temporary local prerender preview server;
  client, SSR, and SPA prerender output completed.
- `git diff --check` — passed.
- `getLocale|useLocale|localeSet|locale:` scan — only the direct action and the two documentation notes match; no
  locale store, hook, setter, event listener, or translation system was added.
- The first sandboxed `npm run verify` completed lint, typecheck, client compilation, and SSR compilation, then failed
  only because the prerender server could not bind `::1`; the authorized build rerun passed.

## Deviations from instruction

None.

## Remaining human review

- Open the template inside the updated XRAY App and confirm `Get locale` logs `payload: "en"`, context, and request ID.
- Confirm existing Platform and Cardano actions retain their layout and behavior.
- Confirm standalone/unavailable-host errors still use the shared logger.

## Reproducibility

From the template root, run `npm run verify` in an environment that permits React Router's temporary prerender preview
listener, then run `git diff --check` and the locale scope scan from the instruction.
