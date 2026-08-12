# xray-mini-app-template-react implementation 0035 result

Result-Version: v1
Implementation-ID: xray-mini-app-template-react/0035
Instruction: ./0035-IMPL-INSTR.md
Evidence-Mode: LOCAL

## Change dispositions

| Change ID | Disposition | Implementation | Validation |
| --- | --- | --- | --- |
| C01 | `IMPLEMENTED` | The template integration layer selects theme, currency, and balance privacy after handshake, and the root theme boundary renders routed content only once all three embedded values arrive. Cardano Home uses one `client.cardano.listenAll` subscription for later typed platform, Cardano Bridge, and CIP-30 messages with one cleanup and no React platform hook. | ESLint, TypeScript, production build, single-facade-listener audit, integration ownership audit, Cardano import audit, and startup ordering audit passed. |
| C02 | `IMPLEMENTED` | The single facade callback is the only producer of incoming success/error entries. Method wrappers retain outgoing request entries and return results for control flow without logging the same response or host error again. | Complete template verification and single-incoming-path source audit passed. |

## Outcome

The React template's Cardano log receives platform, Cardano Bridge, and CIP-30 host envelopes
through `client.cardano.listenAll` and records every post-initialization incoming envelope once. The
template integration layer fetches theme, currency, and balance privacy after handshake, and the
root theme boundary waits for all three initialization responses before mounting routed content.
They therefore do not appear as default Cardano log entries, Home owns no platform getters, and
Cardano Home no longer depends on `useTheme`.

## Inputs consumed

- The original human request to log all host messages.
- The human revision request to use one incoming logger, remove duplicate incoming entries, and
  omit the startup theme response from the visible log.
- The human revision request to receive theme, currency, and balance privacy after handshake and
  remove `useTheme` from Cardano Home.
- `app/integrations/xray-js/useEffectiveSettings.ts`, `app/theme/index.tsx`,
  `app/components/pages/Home/index.tsx`, and `app/components/pages/Home/Cardano/index.tsx`.
- The installed xray-js `client.cardano.listenAll` and React platform value APIs declared through
  `package.json`.

## Project changes

- Replaced component-owned schema/context composition with the high-level
  `client.cardano.listenAll` facade.
- Centralized all three initial platform values in `useEffectivePlatformSettings` and made the root
  theme boundary wait for the embedded snapshot while retaining standalone local fallbacks.
- Removed page-level platform hooks and readiness checks from Home.
- Removed `useTheme` and all other React bridge hook dependencies from Cardano Home.
- Removed incoming success and error logging from the method wrapper while preserving its outgoing
  request log and return value.
- Retained the capped, newest-first log, safe payload formatting, CIP-30 connector lifecycle, and
  every existing action.

## Exported change contract

| Change ID | Semantic change | Compatibility | Downstream action |
| --- | --- | --- | --- |
| C01 | The template integration layer fetches theme, currency, and balance privacy after handshake; after that root-level initialization, Cardano Home observes later platform, Cardano Bridge, and CIP-30 host envelopes through `client.cardano.listenAll`. | Protocol validation, Cardano context validation, selected-value caching, later delta updates, standalone fallbacks, and connector lifecycle are unchanged; Home owns no platform-state initialization and Cardano Home imports no React bridge hook, schemas, context validators, or raw transport listener. | Mini apps should initialize shared platform state at an application boundary and use the aggregate listener for later Cardano-scoped traffic. |
| C02 | Each incoming host envelope creates at most one visible log entry, while startup theme synchronization creates none. | Existing actions, outgoing request entries, newest-first order, safe formatting, and 40-entry limit remain. | Reviewers can inspect host traffic without duplicate method-result entries or initialization noise. |

## Validation

- Single-listener audit — passed: one `client.cardano.listenAll` registration owns all incoming
  platform, Cardano Bridge, and CIP-30 logging and direct cleanup.
- Import audit — passed: Cardano Home no longer imports host schema maps,
  `cardanoHostContextSchema`, `listenAllHost`, or `useTheme`.
- Single-incoming-path audit — passed: only the Cardano facade callback creates incoming
  success/error entries; `fire` creates the outgoing request entry only.
- Startup audit — passed: the integration layer selects theme, currency, and balance privacy;
  xray-js sends those getters only after handshake, and the root boundary mounts routed content
  only once all three embedded values are non-null.
- `npm run verify` — passed with required local preview-server permission: ESLint, React Router
  type generation, TypeScript, client build, server build, and SPA prerender completed.
- `git diff --check` — passed.

## Deviations from instruction

The human revisions superseded the instruction's original three-subscription implementation and
three-stream audit first with one combined listener and finally with the high-level xray-js
`client.cardano.listenAll` facade. They also narrowed visible logging to post-initialization host
messages, centralized initial platform selection in the template integration/root boundary,
removed the Cardano component's `useTheme` dependency, and made the facade callback the sole
incoming log path.
These changes preserve the instruction's all-protocol logging objective while removing duplicate
and startup entries. Node 20.18.1 emitted the existing React Router Node 22.22+ and experimental
JSON-module warnings; verification still passed.

## Remaining human review

Open the template inside XRAY App and confirm its integration layer requests theme, currency, and
balance privacy after handshake while the Cardano log begins empty. Invoke platform,
Cardano Bridge, and CIP-30 methods and confirm every response or host error appears once. Then
change a host setting or wait for a Cardano tip advance and confirm its pushed envelope appears
once.

## Reproducibility

Run `npm run verify` in an environment that permits React Router's temporary localhost preview
server. Mount Cardano Home inside XRAY App, confirm no startup theme entry, then exercise each
protocol row and observe one incoming entry per host envelope. Confirm Cardano Home contains no
`useTheme` import or call and Home contains no platform value hooks.
