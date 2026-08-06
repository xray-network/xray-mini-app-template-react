# xray-mini-app-template-react implementation 0001 instruction

Implementation-Version: v1
Implementation-ID: xray-mini-app-template-react/0001
Created: 20260806T074902Z
Evidence-Mode: LOCAL
Depends-On: NONE
Provider-Evidence: NONE

## Inputs and authority

| Input | Kind | Required | Purpose |
| --- | --- | --- | --- |
| `.xray/updates/XRAY-UPDATES.md` | `LOCAL` | Yes | Defines the pinned XRAY Updates v1 installation and validation requirements. |
| `package.json` | `LOCAL` | Yes | Establishes the `xray-mini-app-template-react` repository identity and single-project package structure. |
| Human installation request | `LOCAL` | Yes | Authorizes this installation and supplies the bootstrap acceptance decision. |

## Objective

Install XRAY Updates v1 and validate its tracking structure for this single-project repository,
without modifying product source.

## Changes to implement

| Change ID | Requirement | Compatibility | Local owner | Validation |
| --- | --- | --- | --- | --- |
| `C01` | Install the pinned standard, required README, aggregate ledger, and three canonical templates using flat storage. | Preserve the single-project repository layout and do not create nested target records. | `.xray/updates/` | Verify required files, canonical metadata, flat layout, and repository-relative links. |
| `C02` | Add the required XRAY standards pointer to the root agent instructions. | Preserve all existing instructions and include each required bullet exactly once. | `AGENTS.md` | Verify one XRAY heading and both required bullets. |
| `C03` | Create the matching bootstrap instruction, result, and accepted ledger row for implementation `0001`. | Use `LOCAL` evidence, the exact human-request decision proof, and no other implementation record. | `.xray/updates/implementations/` and `.xray/updates/XRAY-UPDATES-STATUS.md` | Verify IDs, modes, links, Change ID dispositions, state, and decision proof agree. |

## Implementation steps

1. Preserve the downloaded canonical v1.0.0 standard at `.xray/updates/XRAY-UPDATES.md`.
2. Create the README, templates, aggregate ledger, and flat implementation directory.
3. Add the required root `AGENTS.md` pointer.
4. Validate the non-terminal installation structure and record the actual outcomes in the result.
5. Add the accepted bootstrap row using the current human's explicit installation request.
6. Re-run the applicable validation invariants and review the final diff.

## Validation

- Compare the local standard and canonical templates with the canonical source content.
- Run a read-only structural validator covering applicable §13 file, link, schema, ID, layout,
  lifecycle, and Change ID invariants.
- Run `git diff --check`.
- Review `git status --short` and `git diff --stat` to confirm changes are confined to
  `AGENTS.md` and `.xray/updates/**`.

## Compatibility and human review

This governance-only installation leaves application source, dependencies, build behavior, and
deployment behavior unchanged. The current human's request is the explicit acceptance decision
for bootstrap implementation `0001` only.

## Completion criteria

- Every required installation file exists with consistent `xray-mini-app-template-react/0001` metadata.
- Flat storage is used exclusively and all intended repository-relative links resolve.
- Every applicable §13 invariant passes and actual outcomes are recorded.
- Exactly one accepted bootstrap row exists with the required decision proof.
- No product source or provider evidence is modified or created.

## Out of scope

Product changes, dependency changes, provider evidence capture, documentation mirrors,
implementation `0002` or later, and acceptance of any non-bootstrap work.

## Blockers

None.
