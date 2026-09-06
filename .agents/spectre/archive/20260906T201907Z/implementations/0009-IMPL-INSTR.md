# xray-mini-app-template-react implementation 0009 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0009
Created: 20260811T100007Z
Evidence-Mode: LOCAL
Depends-On: xray-mini-app-template-react/0008
Provider-Evidence: NONE

## Objective

Replace the live blockchain-backed table example with a deterministic static cars table.

## Changes to implement

| Change ID | Requirement                                                                                   | Compatibility                                                  | Local owner           | Validation                     |
| --------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------- | ------------------------------ |
| C01       | Replace block data fetching, Cardano state, and live loading behavior with local car records. | The table route and visual component example remain available. | Table example         | Typecheck and build.           |
| C02       | Preserve useful table search, filter, sort, and pagination examples over static data.         | No network or host context is required.                        | Table example         | Lint and build.                |
| C03       | Remove the obsolete block API/model/types and now-unused direct date-fns dependency.          | No compatibility layer is retained for example-only code.      | Template dependencies | Install consistency and build. |

## Validation

- `npm run verify`
- `npm install --package-lock-only --ignore-scripts`
- `git diff --check`

## Completion criteria

The table example renders only local car data and performs no blockchain or network request.
