# Sanity App SDK setup

The management application under `apps/app-sdk` is ready for a real Sanity project.

## Required identifiers

- Sanity organization ID
- project ID
- dataset

Configure:

```bash
SANITY_APP_ORGANIZATION_ID=
SANITY_APP_PROJECT_ID=
SANITY_APP_DATASET=production
```

Optional Pro/custom fields:

```bash
SANITY_APP_CLEVERFORMS_FIELD_TYPES=signature,calculation,upload,repeatingGroup
```

## TypeGen

The repository currently contains one narrow pre-TypeGen cast around new-form initial values. After the application is connected to the real Sanity project/schema, run Sanity TypeGen and replace that temporary cast with generated document types.

## Deployment boundary

App SDK deployment is separate from the public form submission runtime. The App SDK uses Sanity authentication; public submissions still go through the secure CleverForms server endpoint.
