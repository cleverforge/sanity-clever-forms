# CleverForms for Sanity — Milestones

## Milestone 1 — Foundation
Status: Complete

- public Core repository
- private Pro repository
- pnpm monorepo
- TypeScript baseline
- CI
- Studio plugin shell
- App SDK shell
- Core/Pro architecture boundary

## Milestone 2 — Core Form Engine
Status: Complete

Core fields:

- text
- textarea
- email
- phone
- number
- date
- time
- checkbox
- checkbox group
- radio
- select
- multiselect
- heading
- paragraph
- hidden

Core behavior:

- required fields
- min/max and pattern validation
- basic conditional visibility
- multi-page forms
- form statuses
- confirmation messages
- redirects
- submission contracts

## Milestone 3 — Renderer
Status: Complete

- React renderer
- accessible field controls
- multi-page navigation
- validation feedback
- HTTP submission transport
- custom field extension point

## Milestone 4 — Sanity Data Model
Status: Complete

- form schema
- page schema
- field schema
- choices
- conditions
- validation
- settings
- submissions
- extension registry

## Milestone 5 — App SDK Management
Status: Complete for pre-deployment development

- live form list
- create form
- edit form
- submission list
- visual field builder
- page management
- drag/reorder fields
- configurable custom/Pro field types

Deployment still requires real Sanity organization/project identifiers.

## Milestone 6 — Secure Submission Layer
Status: Complete for pre-deployment development

- framework-neutral server service
- active-form enforcement
- field allow-listing
- server validation
- spam/rate-limit hooks
- submission hooks
- Sanity repository adapter

Production requires a server runtime and Sanity write token.

## Milestone 7 — Templates and Documentation
Status: Complete

- contact form
- event registration
- job application
- architecture documentation
- security model
- deployment contract
- canonical Core field matrix

## Milestone 8 — Pro Architecture
Status: Complete for package structure

The private Pro repository contains dedicated package folders for premium fields,
workflow features, analytics, documents, payments, CRM integrations, communications,
AI, Clever Connect, and commercial/licensing contracts.

## Remaining before release

1. CI must be green in Core and Pro.
2. Publish Core packages to npm under @cleverforge.
3. Register/deploy the Sanity App SDK app.
4. Configure real Sanity organization/project/dataset values.
5. Deploy the submission runtime.
6. Connect the shared CleverForms license server.
7. Add production secrets for enabled integrations.
8. Run end-to-end testing on a real Sanity project.

Items 3–8 require external platform/runtime configuration rather than additional
standalone CMS package architecture.
