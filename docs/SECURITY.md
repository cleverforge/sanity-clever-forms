# CleverForms security model

## Public forms

Public form browsers receive only form definitions and the public submission endpoint.

They must never receive:

- Sanity write tokens
- Stripe secret keys
- Salesforce client secrets
- Microsoft client secrets
- CleverForge licensing secrets

## Submission processing

The server package enforces:

1. form lookup
2. active-form requirement
3. optional rate limiting
4. field allow-listing
5. conditional visibility
6. server-side validation
7. optional spam detection
8. controlled submission storage
9. post-submission hooks

Unknown fields supplied by a browser are discarded.

## Integrations

Third-party integrations run through server-side hooks or Sanity Functions.
Client-side entitlement checks are UI hints only. Privileged Pro actions must verify entitlement server-side.
