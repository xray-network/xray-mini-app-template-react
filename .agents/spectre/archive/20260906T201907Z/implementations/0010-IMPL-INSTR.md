# xray-mini-app-template-react implementation 0010 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0010
Created: 20260811T103803Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input                                                                                                                                                                                                                      | Kind    | Required | Purpose                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------- |
| `Current human request: recreate the home page with a richer hero, copyable repository URL, current blockchain context with other chains disabled, paired request/response logs, and the XRAY Design v1 visual reference.` | `LOCAL` | Yes      | Defines the requested experience, behavior, and visual direction.                              |
| `app/components/pages/Home/index.tsx`                                                                                                                                                                                      | `LOCAL` | Yes      | Owns the existing host status, bridge actions, repository URL, and response-only log behavior. |
| `app/components/pages/Home/style.module.css`                                                                                                                                                                               | `LOCAL` | Yes      | Owns home-page-specific styling.                                                               |
| `app/components/layouts/Main/index.tsx`                                                                                                                                                                                    | `LOCAL` | Yes      | Owns the content width and page gutters surrounding the home experience.                       |
| `app/theme/palette.ts`                                                                                                                                                                                                     | `LOCAL` | Yes      | Supplies existing XRAY palette and semantic theme values.                                      |
| `app/theme/css.ts`                                                                                                                                                                                                         | `LOCAL` | Yes      | Exposes theme values as reusable CSS custom properties.                                        |
| `app/styles/tailwind.css`                                                                                                                                                                                                  | `LOCAL` | Yes      | Maps repository theme tokens into the utility classes used by the home page.                   |
| `package.json`                                                                                                                                                                                                             | `LOCAL` | Yes      | Declares the bridge, UI, icon, and verification dependencies available to the implementation.  |

## Objective

Rebuild the home page as a rich XRAY-styled bridge playground that clearly communicates host connection and blockchain context, provides a copyable repository URL, and pairs every user-triggered bridge request with its response or error.

## Changes to implement

| Change ID | Requirement                                                                                                                                                                                                                                                                                                                                                                  | Compatibility                                                                                                                                                                                                                          | Local owner                    | Validation                                                                |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------- |
| C01       | Replace the centered connection placeholder with a responsive hero that has concise template messaging, explicit connecting/connected/disconnected status, and a keyboard-accessible copy control for `https://github.com/xray-network/xray-mini-app-template-react.git` with visible copied feedback.                                                                       | Preserve the repository URL and all three connection states; copy must work with the existing copy dependency and must not require host connection.                                                                                    | Home page                      | Typecheck, build, manual keyboard and copy review.                        |
| C02       | Add a blockchain-context panel for Cardano, Bitcoin, and Midnight. Mark only the current host blockchain as active, render every other chain as visibly disabled/unavailable, and show the authoritative network, theme, and advertised protocols without inventing fallback host data.                                                                                      | Derive active state from the existing bridge hooks. During connecting, disconnected, or context-free states, no chain is presented as active.                                                                                          | Home page                      | Typecheck and manual review across host states.                           |
| C03       | Recompose the existing bridge calls as a scannable action panel. Generic platform calls remain available for every connected host; Cardano native and CIP-30 calls are enabled only when the matching Cardano protocol is advertised; unavailable actions expose a clear disabled reason.                                                                                    | Preserve Get Tip, Get Account State, Get Explorer, Get Theme, Get Currency, Get Hide Balances, and CIP-30 Get Balance behavior. No Bitcoin- or Midnight-specific API is fabricated.                                                    | Home page                      | Typecheck, build, host-context and disabled-state review.                 |
| C04       | Replace the response-only message dump with a bounded request/response operation log. Insert an outbound entry immediately with timestamp, request type, payload, and correlation ID; update or pair it with the matching host response; capture rejected, unavailable, and timed-out operations; safely serialize bigint values; provide an empty state and a Clear action. | Use explicit request IDs where the current clients support them. Represent the CIP-30 balance sequence as one logical operation even though its internal client calls generate their own IDs. Host-initiated messages remain excluded. | Home page                      | Lint, typecheck, manual paired-log, error, empty, and clear-state review. |
| C05       | Apply the XRAY Design v1 visual language within the rebuilt home: exact white/black canvas compatibility, flat 20px hairline panels, pill controls and status tags, compact system type, monospace for URLs/protocols/payloads, electric blue only for actions/selections, semantic green/red/yellow state color, and no gradients, glows, illustrations, or shadows.        | Reuse repository theme tokens and preserve both existing light and dark theme behavior. Keep unrelated component demo pages out of scope.                                                                                              | Home CSS and theme consumption | Build plus visual review in both themes.                                  |
| C06       | Make the page responsive and accessible at phone, tablet, and desktop widths: no horizontal page overflow, stacked panels on narrow screens, scroll-contained payloads, minimum 40px interactive targets, semantic headings and status labels, visible focus, usable disabled explanations, and live-region feedback for copy/log updates.                                   | Preserve the shared header and route structure.                                                                                                                                                                                        | Home page and layout           | Manual 375px, 768px, and 1280px review; keyboard review.                  |
| C07       | Expand the main content container only as needed to support the XRAY reference's dense two-column desktop composition while retaining safe responsive gutters for every route.                                                                                                                                                                                               | Do not restructure navigation or alter route ownership. Existing component pages must remain usable within the adjusted container.                                                                                                     | Main layout                    | Build and route smoke review.                                             |

## Implementation steps

1. Define typed home-page models for supported chain presentation and correlated bridge operations, plus safe JSON serialization and request lifecycle helpers.
2. Wrap each existing action so it appends a pending request before invoking the bridge, supplies an explicit request ID when supported, correlates listener responses, and records null, rejection, or logical CIP-30 completion states.
3. Build the hero, repository clone control, connection badge, blockchain context selector, context metadata, action panel, and request/response log with semantic markup and accessible labels.
4. Replace the unused home CSS with locally scoped XRAY Design v1 layout, surface, type, state, focus, breakpoint, and overflow rules using existing theme variables.
5. Adjust the shared main content width/gutters only if required by the composed page and smoke-check the other routes.
6. Exercise interaction and host-state variants, then run all repository validation commands.

## Validation

- `npm run verify`
- `git diff --check`
- Manual light and dark theme review at 375px, 768px, and 1280px widths.
- Manual keyboard review of copy, actions, disabled explanations, clear-log control, and visible focus.
- Manual bridge review for connecting, disconnected, Cardano, Bitcoin, and Midnight contexts; verify active/disabled chain presentation and paired success/error log entries.

## Compatibility and human review

- The public route, shared header, settings modal, bridge hooks, and existing action set remain available.
- The home page must remain useful outside the XRAY host: the repository URL is copyable, context is explicitly unavailable, actions are disabled, and the log starts in a clear empty state.
- Human review should confirm the information hierarchy, the exact terse copy, whether newest operations appear first, and whether the disabled chain cards communicate context without implying future support commitments.

## Completion criteria

- The home page renders a polished, responsive XRAY-styled hero and bridge workspace in both themes.
- The repository clone URL provides accessible copy confirmation.
- Exactly one of Cardano, Bitcoin, or Midnight is active only when supplied by connected host context; all others are disabled.
- Every user-triggered bridge action creates a visible request record and settles into a paired response, error, unavailable, or timeout state without bigint serialization failures.
- All required automated validation passes and the documented manual states are ready for human review.

## Out of scope

- Adding Bitcoin- or Midnight-specific bridge request APIs.
- Changing the sibling `xray-js` runtime or bridge protocol.
- Restyling the shared header, settings modal, component demonstration pages, or all global Ant Design surfaces.
- Persisting or exporting request logs.
- Installing the remote XRAY Design standard as repository governance.

## Blockers

None.
