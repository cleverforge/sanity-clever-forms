# Security Policy

## Reporting a vulnerability

Do not open public GitHub issues for security vulnerabilities.

Report vulnerabilities privately to CleverForge through the security contact published by the organization.

Include:
- affected package/version
- reproduction steps
- impact
- suggested mitigation if known

## Security model

CleverForms separates browser, CMS, and server responsibilities.

Browser code must never contain:
- Sanity write tokens
- Salesforce secrets
- Stripe secret keys
- Microsoft/Google application secrets
- CleverForge licensing secrets

Public submissions must be processed by a server-side endpoint that performs server validation and authorization.

## Supported release line

Security fixes are applied to the latest supported release line unless otherwise announced.
