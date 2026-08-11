# xray-mini-app-template-react implementation 0010 result

Result-Version: v1
Implementation-ID: xray-mini-app-template-react/0010
Instruction: ./0010-IMPL-INSTR.md
Evidence-Mode: LOCAL

## Change dispositions

| Change ID | Disposition   | Implementation                                                                                                                                                                                                                                            | Validation                                                                                                                                                                     |
| --------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| C01       | `IMPLEMENTED` | Replaced the placeholder with a responsive status-led hero, concise template copy, persistent repository clone URL, native copy button, visible Copied state, and polite live-region announcements.                                                       | Typecheck/build passed; standalone light/dark screenshots and keyboard focus traversal passed.                                                                                 |
| C02       | `IMPLEMENTED` | Added Cardano, Bitcoin, and Midnight context rows; only the connected host blockchain becomes active, while other or context-free rows remain disabled. Network, theme, and advertised protocol values render only from authoritative host hooks.         | Mock Cardano preview context activated Cardano alone and exposed its network, light theme, and two advertised protocols.                                                       |
| C03       | `IMPLEMENTED` | Rebuilt all seven existing platform, Cardano native, and CIP-30 calls as grouped action rows with protocol-aware availability and visible disabled explanations.                                                                                          | Mock Cardano context enabled all seven actions; standalone mode disabled them with connection guidance.                                                                        |
| C04       | `IMPLEMENTED` | Added a capped correlated operation model with generated request IDs, pending/success/error/timeout settlement, bigint-safe payload rendering, logical CIP-30 sequencing, request/response panes, empty state, live announcements, and Clear log control. | Mock host paired Get theme, Get tip, and CIP-30 balance operations with their responses; lint/typecheck/build passed.                                                          |
| C05       | `IMPLEMENTED` | Introduced stable action, danger, and caution semantic tokens and a scoped XRAY-style page using flat hairline panels, capsules, compact system/mono type, functional accent and state colors, and no gradients or shadows.                               | Light and dark screenshots at desktop/tablet/mobile breakpoints passed visual review.                                                                                          |
| C06       | `IMPLEMENTED` | Added responsive one/two-column layouts, scroll-contained payloads, 40px controls, native semantics, focus-visible outlines, live-region feedback, and mobile-specific card and exchange stacking.                                                        | Exact 375px emulation reported `innerWidth`, document `scrollWidth`, and body `scrollWidth` all equal to 375; Tab traversal reached the copy control with a 3px focus outline. |
| C07       | `IMPLEMENTED` | Expanded the shared content container to 1240px and changed its smallest gutter to 12px while preserving the header, routing, and responsive padding.                                                                                                     | Production build and route shell smoke review passed.                                                                                                                          |

## Outcome

The home route is now a complete XRAY bridge workspace: its hero remains useful standalone, its blockchain and protocol presentation follows live host context, its actions expose capability boundaries, and every user-triggered bridge call can be inspected as a correlated request/response exchange.

## Inputs consumed

- Current human request recorded in the instruction.
- `app/components/pages/Home/index.tsx`
- `app/components/pages/Home/style.module.css`
- `app/components/layouts/Main/index.tsx`
- `app/theme/palette.ts`
- `app/theme/css.ts`
- `app/styles/tailwind.css`
- `package.json`

## Project changes

- `app/components/pages/Home/index.tsx`: rebuilt home content, host capability rules, request lifecycle, accessible copy interaction, and operation log.
- `app/components/pages/Home/style.module.css`: added the responsive XRAY home visual system for both themes.
- `app/components/layouts/Main/index.tsx`: expanded the shared content width and refined responsive gutters.
- `app/theme/palette.ts`: added theme-stable action accent and semantic danger/caution tokens.
- `.xray/updates/implementations/0010-IMPL-INSTR.md`: retained the implementation instruction.
- `.xray/updates/implementations/0010-IMPL-RESULT.md`: recorded this result.
- `.xray/updates/XRAY-UPDATES-STATUS.md`: moved implementation 0010 to `REVIEW`.

## Exported change contract

| Change ID | Semantic change                                                                                                                 | Compatibility                                                                                                                       | Downstream action                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| C01       | The home hero reports connection state and exposes a copyable repository URL with accessible confirmation.                      | Repository URL and connecting/connected/disconnected semantics remain available.                                                    | None.                                                                                              |
| C02       | Home presents Cardano, Bitcoin, and Midnight as a host-controlled context set with at most one active chain.                    | Existing bridge hooks remain the only source of active blockchain, network, theme, and protocols.                                   | Hosts should continue supplying valid bridge context during handshake.                             |
| C03       | Existing bridge examples are capability-gated rows rather than an undifferentiated button group.                                | Request types and client functions are unchanged.                                                                                   | None.                                                                                              |
| C04       | User-triggered calls are locally correlated and retained for the newest 20 operations; logs are neither persisted nor exported. | Platform/Cardano calls use explicit public request IDs; CIP-30 is represented as one logical operation without changing its client. | None.                                                                                              |
| C05       | Home uses theme-stable action/state semantics and scoped XRAY Design v1 presentation.                                           | Global Ant Design behavior and unrelated demo pages remain unchanged.                                                               | New home additions should consume the scoped semantic tokens and avoid shadow/gradient treatments. |
| C06       | Home is responsive without page-level horizontal overflow and exposes native keyboard semantics and visible focus.              | Shared header and route structure are preserved.                                                                                    | None.                                                                                              |
| C07       | Main routed content may use up to 1240px with 12px mobile and 24px larger gutters.                                              | Existing child routes continue inside the same layout.                                                                              | Visually check unusually wide future component examples against the larger container.              |

## Validation

- `npm run verify`: PASS; ESLint, React Router type generation, TypeScript, client production build, and SPA production build completed. Vite retained its existing informational large-chunk warning for the Cardano bundle.
- `git diff --check`: PASS.
- Standalone visual review: PASS at exact 375px mobile, 500px mobile breakpoint, 768px tablet, and 1280px desktop sizes.
- Theme review: PASS in dark standalone views and light standalone/connected views.
- Exact 375px overflow check: PASS with `{ innerWidth: 375, scrollWidth: 375, bodyWidth: 375 }`.
- Keyboard review: PASS for native Tab traversal to the repository copy control and its 3px focus-visible outline; action and clear controls use the same native-button and focus-visible pattern, while unavailable actions correctly leave the tab order.
- Mock host review: PASS for Cardano/preview/light context, Cardano-only activation, disabled Bitcoin/Midnight rows, protocol chips, all seven enabled actions, and paired successful platform, native Cardano, and logical CIP-30 operations.
- Temporary mock-host and screenshot infrastructure was created only under ignored build or temporary paths and was removed by the clean production build.

## Deviations from instruction

None. The local Vite watcher could not start because the environment had exhausted file watcher handles (`EMFILE`), so visual validation used the successful production build on a temporary static server instead; all required states and breakpoints were still exercised.

## Remaining human review

- Confirm the hero voice and the newest-first operation ordering.
- Confirm the disabled chain treatment does not imply product commitments for Bitcoin or Midnight adapters.
- Exercise the actions once in the real XRAY/App host to review production payload sizes and host-specific response content.

## Reproducibility

From the repository root, run `npm run verify` and `git diff --check`. Run `npm run preview` in an environment with available watcher handles, then review `/` in standalone mode and inside XRAY/App with Cardano native and CIP-30 protocols advertised. Switch between light and dark themes, test at 375px, 768px, and 1280px, copy the repository URL, run each available action, inspect paired request/response entries, and clear the log.
