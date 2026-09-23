# Architecture

## Core principles

1. Core remains open source.
2. Pro extends Core through public extension contracts.
3. Browser code never receives write tokens or third-party secrets.
4. Public submissions must pass through a server-side endpoint.
5. Sanity Functions may handle post-submission workflows and integrations.
6. Sanity App SDK powers the management experience.
7. Studio plugin supplies schemas and Studio-native entry points.

## Data flow

Public website -> CleverForms renderer -> secure submission endpoint -> Sanity Content Lake -> optional Sanity Function -> integrations.

## Pro boundary

The Pro repository may depend on published Core packages. Core must never import Pro.
