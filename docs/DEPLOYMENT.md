# Deployment prerequisites

Code development can proceed without a live Sanity project. Deployment cannot.

## Sanity App SDK

Required values:

- Sanity organization ID
- Sanity project ID
- dataset name
- App SDK application ID after first deployment

Runtime browser configuration:

- SANITY_APP_ORGANIZATION_ID
- SANITY_APP_PROJECT_ID
- SANITY_APP_DATASET
- SANITY_APP_CLEVERFORMS_FIELD_TYPES (optional, comma-separated)

These values are identifiers, not secrets.

## Submission service

The public submission endpoint requires server-side configuration:

- Sanity project ID
- dataset
- Sanity write token with only the permissions CleverForms requires
- allowed origins
- request size policy
- rate-limit storage/configuration

Do not expose the write token through SANITY_APP_* variables.

## Pro runtime

Additional server-side secrets depend on enabled features:

- CleverForge entitlement/license verification
- Salesforce credentials/tokens
- Stripe secret and webhook signing secret
- Microsoft Graph application credentials
- webhook secrets
- PDF runtime configuration

## Hosting boundary

The Core and Pro repositories are designed so the final runtime can be hosted on DigitalOcean without changing form definitions or renderer APIs.
