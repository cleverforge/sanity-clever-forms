# CleverForms for Sanity

CleverForms is an open-source form builder for Sanity by CleverForge.

## Architecture

This repository contains the free/core product:

- Sanity Studio plugin
- shared form schemas and types
- public React form renderer
- Sanity App SDK management app
- validation and submission contracts
- examples and documentation

Premium capabilities live in the private `sanity-clever-forms-pro` repository and extend this package without replacing the core engine.

## Requirements

- Node.js 22.12+
- React 19.2.2+
- Sanity Studio 6+
- @sanity/sdk-react 3+

## Packages

- `@cleverforge/sanity-clever-forms` – Studio plugin
- `@cleverforge/sanity-clever-forms-schemas` – schemas and shared types
- `@cleverforge/sanity-clever-forms-react` – public form renderer

## Development

```bash
corepack enable
pnpm install
pnpm build
```

## License

Apache-2.0
