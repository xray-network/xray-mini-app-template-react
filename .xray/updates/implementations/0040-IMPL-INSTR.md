# xray-mini-app-template-react implementation 0040 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0040
Created: 20260824T102526Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| Human request dated 2026-08-24 | `LOCAL` | Yes | Require a clear-log control aligned to the right of the Methods title and vertical log resizing without external libraries. |
| `app/components/pages/Home/Cardano/index.tsx` | `LOCAL` | Yes | Own the Methods header, log state, and rendered log entries. |
| `app/components/pages/Home/style.module.css` | `LOCAL` | Yes | Own the existing header/button treatment, log dimensions, overflow, and responsive presentation. |
| `package.json` | `LOCAL` | Yes | Define current dependencies and the repository verification command. |

## Objective

Make the Methods log clearable from its header and vertically resizable without external libraries.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| C01 | Add a visible `Clear log` button to the right side of the Methods heading that clears all current log entries, is disabled when the log is empty, and remains accessible when its visible label is compacted on small screens. | Preserve the existing heading hierarchy, method controls, newest-first 40-entry cap, request/event subscriptions, and future logging after a clear. Reuse the existing local button styling and installed icon set rather than adding a dependency. | `app/components/pages/Home/Cardano/index.tsx` and Home styles. | Lint, typecheck, build, focused source audit, and human interaction review. |
| C02 | Make the log region vertically resizable with the browser-native CSS `resize: vertical` behavior, a usable initial/minimum height, a viewport-aware upper bound, and scrolling when content exceeds the selected height. | Preserve the unified rounded Methods panel, two-column log rows, mobile layout, current theme colors, and horizontal width. Do not add a resize library or custom pointer-event state. | `app/components/pages/Home/style.module.css`. | Full verification, dependency/source audit, and manual resize review on desktop. |

## Implementation steps

1. Add an accessible Clear log button to the existing flex header and connect it directly to the local log state.
2. Reuse the existing clear-button styling and responsive label treatment, adding only the icon/import or small style adjustments needed by the active markup.
3. Replace the fixed log height cap with a native vertical resize configuration that keeps overflow scrollable and constrains the region to practical bounds.
4. Run the complete repository verification, focused source/dependency audits, and whitespace validation.

## Validation

- `npm run verify`.
- `git diff --check`.
- Source audit confirming the clear control is inside `logHeader`, calls only `setLogs([])`, is disabled for an empty log, has an accessible name, and does not alter logging subscriptions or method request behavior.
- Source and manifest audit confirming vertical resizing uses CSS `resize: vertical`, keeps `overflow: auto`, and adds no external dependency or custom pointer-event resize implementation.
- Human browser review confirming the button is right-aligned with the Methods title, clears populated entries to the empty state, remains disabled while empty, and newly received entries appear after clearing.
- Human desktop browser review confirming the log can be dragged vertically within its bounds, keeps the Methods panel width fixed, and scrolls long content at the chosen height.
- Human narrow-screen review confirming the header control remains identifiable and the log rows/panel do not overflow horizontally.

## Compatibility and human review

The existing method actions, incoming-message listeners, newest-first order, entry formatting, 40-entry cap, Cardano gating,
and light/dark presentation must remain unchanged. Human review should exercise clearing before and after method activity and
resize the log at desktop width; native resize-handle appearance may follow the browser and operating system.

## Completion criteria

- The Methods heading has a right-aligned Clear log control with correct empty/populated behavior and an accessible name.
- Clearing affects only current entries and subsequent request or host-message activity logs normally.
- The log is vertically resizable through native CSS, remains vertically scrollable, respects practical height bounds, and does not resize horizontally.
- No package dependency or custom drag implementation is introduced.
- Full verification, focused audits, and diff checks pass.

## Out of scope

- Persisting the selected log height or log entries across mounts, navigation, or reloads.
- Adding clear confirmation, undo, filtering, exporting, row deletion, or changing the 40-entry cap.
- Changing method behavior, bridge subscriptions, log ordering/content, or the surrounding Home layout.
- Building a custom resize handle, keyboard-driven resize controls, or normalizing native handle appearance across browsers.

## Blockers

None.
