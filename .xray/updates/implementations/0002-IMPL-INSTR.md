# xray-mini-app-template-react implementation 0002 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0002
Created: 20260806T132817Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input                                                                                               | Kind    | Required | Purpose                                                                                                                          |
| --------------------------------------------------------------------------------------------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Human request to remove Yarn from all JavaScript projects                                           | `LOCAL` | Yes      | Authorizes the package-manager migration to npm.                                                                                 |
| `package.json`                                                                                      | `LOCAL` | Yes      | Defines scripts, dependencies, and the application completion commands.                                                          |
| `yarn.lock`                                                                                         | `LOCAL` | Yes      | Defines the dependency set to reconcile into an npm lockfile before removal.                                                     |
| `README.md` and `SKILLS.md`                                                                         | `LOCAL` | Yes      | Defines repository-owned package-manager guidance and examples.                                                                  |
| Human request to link `@xray-network/xray-js`, replace legacy dependencies, and reuse its utilities | `LOCAL` | Yes      | Expands this non-terminal npm implementation to the template's host bridge and Cardano integration surfaces.                     |
| `../xray-js/packages/runtime` public exports                                                        | `LOCAL` | Yes      | Defines the sibling runtime package, mini-app bridge, Cardano client factory, clients, helpers, configuration, and direct types. |

## Objective

Migrate xray-mini-app-template-react from Yarn to npm with a reproducible npm lockfile and no remaining active Yarn
commands or guidance, then replace the legacy Cardano package with the locally linked XRAY JavaScript runtime.

## Changes to implement

| Change ID | Requirement                                                                                                                                                            | Compatibility                                                                                                                                                                   | Local owner                                           | Validation                                                                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `C01`     | Declare npm as the package manager and convert package scripts from Yarn to npm.                                                                                       | Preserve the behavior and ordering of development, build, deployment, and verification commands.                                                                                | `package.json`                                        | Inspect scripts and run the repository completion commands through npm.                                                                       |
| `C02`     | Generate `package-lock.json` and remove `yarn.lock`.                                                                                                                   | Resolve the declared dependency ranges without changing application source.                                                                                                     | Root lockfiles                                        | Run npm lockfile installation and verify no Yarn lockfile remains.                                                                            |
| `C03`     | Replace repository-owned Yarn instructions and examples with npm equivalents.                                                                                          | Preserve the documented workflow and command intent.                                                                                                                            | `README.md`, `SKILLS.md`                              | Scan active repository files for stale Yarn references.                                                                                       |
| `C04`     | Validate the npm-managed application and final package-manager boundary.                                                                                               | Do not alter application behavior or introduce another package manager.                                                                                                         | Repository                                            | Run typecheck/build, lint, and verification; run `git diff --check`.                                                                          |
| `C05`     | Make the sibling `@xray-network/xray-js` runtime the sole public host-bridge/Cardano facade, replace `cardano-web3-js`, and remove the direct mini-app SDK dependency. | Preserve host communication, network-driven Cardano initialization, and template examples while using xray-js bridge, client, Koios, address, configuration, and type surfaces. | Manifest, lockfile, integrations, consumers, guidance | Resolve the npm link, smoke-test public exports, run full verification, and scan active files for direct legacy dependencies and terminology. |

## Implementation steps

1. Update the package-manager declaration and script invocations.
2. Reconcile dependencies into a root npm lockfile and remove the Yarn lockfile.
3. Update package-manager documentation and contributor guidance.
4. Run the npm-native completion commands and scan for stale Yarn references.
5. Record actual outcomes and move this implementation to `REVIEW`.
6. Link the sibling XRAY JavaScript runtime, migrate Cardano integration consumers and type names, refresh the lockfile, and repeat the completion checks.

## Validation

- `npm install --package-lock-only --ignore-scripts`
- `npm run typecheck`
- `npm run build`
- `npm run lint`
- `npm run verify`
- Confirm `package-lock.json` exists and `yarn.lock` does not.
- Confirm active repository-owned files contain no Yarn commands or package-manager guidance.
- `git diff --check`
- `npm ls @xray-network/xray-js --depth=0`
- Import-smoke `@xray-network/xray-js/cardano` and confirm `createCardano` is exported.
- Confirm bridge imports resolve only through `@xray-network/xray-js/mini-app-bridge/*` and no direct mini-app SDK dependency/import remains.
- Confirm active source, manifest, lockfile, and guidance contain no `cardano-web3-js`, `cardano-web-js`, `CardanoWeb3`, or `CW3Types` reference.

## Compatibility and human review

The application remains a single React Router project with the same dependency ranges and runtime
behavior. Review the npm lockfile resolution and the intentional removal of Yarn support.

## Completion criteria

- npm is declared and all package scripts use npm.
- A root npm lockfile exists and no Yarn lockfile or active Yarn instruction remains.
- Required npm validation is recorded honestly.
- Cardano examples resolve through the sibling XRAY runtime without legacy package or CW3 terminology.

## Out of scope

Dependency upgrades beyond the requested Cardano runtime replacement, unrelated application
refactoring, deployment, and support for pnpm or Yarn.

## Blockers

None.
