# Releasing CleverForms for Sanity

CleverForms Core uses Changesets to coordinate versions across public packages.

## Release flow

1. All CI checks must pass.
2. Add a changeset for user-facing package changes.
3. Merge changes to `main`.
4. Run `pnpm release:version` to update package versions and changelogs.
5. Review generated changes.
6. Run `pnpm build && pnpm typecheck && pnpm test`.
7. Publish with `pnpm release:publish`.

## First public release

The initial public package line is `0.1.0`.

Do not publish the private App SDK application package.

## npm scope

Public packages use the `@cleverforge` npm scope and `publishConfig.access = public`.

Publishing requires an authenticated npm session or CI publishing configuration. Credentials must never be committed to the repository.
