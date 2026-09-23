# Release acceptance checklist

## Repository

- [x] Core CI build passes
- [x] Core typecheck passes
- [x] Core tests configured
- [x] Pro CI build/typecheck baseline passes
- [x] Pro tests configured
- [x] Core/Pro field boundaries documented
- [x] security architecture documented
- [x] public npm package metadata prepared
- [x] release workflow prepared

## npm

- [ ] confirm npm authentication for the CleverForge scope
- [ ] publish initial Core packages
- [ ] verify package pages and README rendering
- [ ] install packages into a clean test project

## Sanity

- [ ] supply organization ID
- [ ] supply project ID
- [ ] select dataset
- [ ] register/deploy App SDK application
- [ ] run TypeGen against real schema
- [ ] remove temporary pre-TypeGen cast
- [ ] verify create/edit/list/submission UI against real Content Lake

## Runtime

- [ ] create minimum-permission Sanity server token
- [ ] configure allowed origins
- [ ] configure rate limiting
- [ ] configure request size limits
- [ ] deploy submission endpoint
- [ ] execute end-to-end public form submission

## Pro

- [ ] connect shared CleverForms license server
- [ ] validate entitlement server-side
- [ ] enable signature/calculation/upload/repeatingGroup fields
- [ ] configure only the integrations required for the test project
- [ ] run Pro end-to-end tests

## Production

- [ ] monitoring/logging
- [ ] backup/recovery process
- [ ] key rotation procedure
- [ ] release rollback procedure
