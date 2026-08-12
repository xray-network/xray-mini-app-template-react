# xray-mini-app-template-react implementation 0013 result

Result-Version: v1
Implementation-ID: xray-mini-app-template-react/0013
Instruction: ./0013-IMPL-INSTR.md
Evidence-Mode: LOCAL

## Change dispositions

| Change ID | Disposition   | Implementation                                                                                                                    | Validation                                    |
| --------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| C01       | `IMPLEMENTED` | Reduced the heading scale, kept the left copy concise, and placed setup, host-context, CIP-30, and console guidance on the right. | Lint, typecheck, and production build passed. |
| C02       | `IMPLEMENTED` | Matched the Current blockchain right-column outer width with a full-height, more generously padded panel.                         | Responsive CSS audit and build passed.        |
| C03       | `IMPLEMENTED` | Replaced blockchain rows with compact inline pills while preserving hidden status text for accessibility.                         | Lint and production build passed.             |

## Outcome

The template hero is easier to scan: its left side stays focused on the value proposition, while the aligned support panel explains how to run and exercise the template.

## Inputs consumed

- Human request on 2026-08-11.
- `app/components/pages/Home/index.tsx`.
- `app/components/pages/Home/style.module.css`.

## Project changes

- Rewrote the headline as “Build XRAY mini apps with React.”
- Summarized ready-to-use host context, Cardano CIP-30, and request/response tooling in one line.
- Consolidated clone, XRAY App, host-context, CIP-30, console, and chain-extension guidance in the right panel.
- Reduced desktop and mobile heading scales and tightened hero height, spacing, and padding.
- Matched the Current blockchain `1.2fr / 0.8fr` columns and 420px right-column minimum without a grid gap, moved separation into the left column, and increased panel padding.
- Replaced divided blockchain rows with wrapping inline pills and accessible support states.

## Exported change contract

| Change ID | Semantic change                                                                 | Compatibility                                                      | Downstream action |
| --------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ----------------- |
| C01       | Left messaging stays concise while the right panel owns usage guidance.         | Repository URL and Copy behavior are unchanged.                    | None.             |
| C02       | Support matches the Current blockchain right-column outer width at full height. | The layout still stacks naturally below 900px.                     | Review widths.    |
| C03       | Blockchain names render as one wrapping inline group.                           | Screen readers still receive Supported and Coming soon state text. | None.             |

## Validation

- `npm run verify` — passed ESLint, typecheck, and production build; Vite reported only the existing large Cardano chunk warning.
- `git diff --check` — passed.

## Deviations from instruction

None.

## Remaining human review

- Confirm the hero and Current blockchain right-column outer edges align at desktop widths.
- Confirm all three chain pills stay compact and wrap cleanly on narrower screens.

## Reproducibility

Run `npm run verify` and `git diff --check`, then inspect the home hero above and below the 900px breakpoint.
