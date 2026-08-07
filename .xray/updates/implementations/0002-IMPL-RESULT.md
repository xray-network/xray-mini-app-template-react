# xray-mini-app-template-react implementation 0002 result

Result-Version: v1
Implementation-ID: xray-mini-app-template-react/0002
Instruction: ./0002-IMPL-INSTR.md
Evidence-Mode: LOCAL

## Change dispositions

| Change ID | Disposition   | Implementation                                                                                                                                                                                                                                                                                                      | Validation                                                                                           |
| --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `C01`     | `IMPLEMENTED` | Declared `npm@10.8.2` and converted package scripts to npm.                                                                                                                                                                                                                                                         | Package scripts inspected and the full verification workflow passed.                                 |
| `C02`     | `IMPLEMENTED` | Generated `package-lock.json` and removed `yarn.lock`.                                                                                                                                                                                                                                                              | npm lockfile installation and lockfile boundary scan passed.                                         |
| `C03`     | `IMPLEMENTED` | Updated README and contributor guidance to npm-only commands.                                                                                                                                                                                                                                                       | Active repository-owned Yarn-reference scan passed.                                                  |
| `C04`     | `IMPLEMENTED` | Ran lint, typecheck, and production builds through npm.                                                                                                                                                                                                                                                             | `npm run verify` and `git diff --check` passed.                                                      |
| `C05`     | `IMPLEMENTED` | Linked the sibling `@xray-network/xray-js@4.0.0` runtime, routed host bridge hooks/types through its mini-app-bridge subpaths, replaced the legacy Cardano provider, migrated Koios consumers/types and constants, removed the direct mini-app SDK dependency, and updated contributor guidance and lint ownership. | Exact sibling resolution, dependency/source scans, `npm run verify`, and public-subpath builds pass. |

## Outcome

xray-mini-app-template-react now uses npm exclusively and consumes both XRAY host communication and Cardano through the locally linked XRAY JavaScript runtime with no active direct legacy dependency or terminology.

## Inputs consumed

The human package-manager and XRAY JavaScript migration requests, `package.json`, the prior `yarn.lock`, `README.md`, `SKILLS.md`, and the sibling runtime's Cardano exports.

## Project changes

Updated `package.json`, `README.md`, `SKILLS.md`, Cardano integration/consumers, types, lint ownership, and the npm lockfile; removed `yarn.lock` and the legacy provider.

## Exported change contract

| Change ID | Semantic change                                                                                                                            | Compatibility                                                                              | Downstream action                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `C01`     | npm 10 is the declared package manager and scripts use npm.                                                                                | Existing script behavior and ordering are preserved.                                       | Generated apps and contributors should use npm.                                                        |
| `C02`     | `package-lock.json` is the sole dependency lockfile.                                                                                       | Dependency ranges remain manifest-controlled.                                              | Use `npm install` or `npm ci`.                                                                         |
| `C03`     | Repository examples and guidance are npm-only.                                                                                             | Documented workflows retain the same intent.                                               | Keep future examples package-manager consistent.                                                       |
| `C04`     | The complete npm verification workflow passes.                                                                                             | Lint, type safety, and production build behavior are preserved.                            | Review the lockfile before acceptance.                                                                 |
| `C05`     | Host communication is provided by xray-js mini-app-bridge subpaths and Cardano by its `/cardano` subpath; shared types use `CardanoTypes`. | Network changes still recreate the client and Koios-backed examples retain their behavior. | Build/link the sibling runtime and use its public facade rather than internal bridge/Cardano packages. |

## Validation

- `npm install --package-lock-only --ignore-scripts` — passed.
- `npm run lint`, `npm run typecheck`, and `npm run build` — passed through `npm run verify`.
- Lockfile and active Yarn-reference scans — passed.
- `git diff --check` — passed.
- `npm ls @xray-network/xray-js --depth=0` and `readlink node_modules/@xray-network/xray-js` — passed; both resolve the sibling runtime.
- Public Cardano and mini-app-bridge subpaths compile and bundle through the linked facade; `createCardano` is exported.
- Active legacy package/provider/CW3 terminology scan — passed with no matches.

## Deviations from instruction

The system-owned global npm prefix rejected the first link attempt. A temporary writable npm prefix was used to register and link the same sibling runtime; the saved manifest remains the portable `file:../xray-js/packages/runtime` dependency. Dependency repair also required registry access after an interrupted parallel npm reify left `jsesc` absent.

## Remaining human review

Review the npm lockfile, npm-only documentation, Cardano provider behavior, and generated-project dependency contract before acceptance.

## Reproducibility

Build `../xray-js/packages/runtime`, link it with npm, install with npm, then run `npm run verify` and the legacy-reference scan.
