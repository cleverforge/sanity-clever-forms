# Contributing to CleverForms for Sanity

## Development

Requirements:
- Node.js 22.12+
- pnpm 10.17.1+

```bash
pnpm install
pnpm --filter './packages/**' -r build
pnpm typecheck
pnpm test
```

## Pull requests

Keep Core and Pro boundaries intact:
- Core must never import Pro.
- Browser packages must not introduce privileged secrets.
- New free fields must be added to the canonical Core field matrix.
- Premium fields/integrations belong in the private Pro repository.

For user-facing public package changes, add a Changeset.

## Commit scope

Prefer focused commits for schema, renderer, server, App SDK, documentation, tests, and release changes.
