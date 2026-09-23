# Submission deployment contract

The Core server package is intentionally framework-neutral.

Production deployment supplies a repository adapter that:

- loads an active `cleverForm`
- creates `cleverFormSubmission` documents using a Sanity server token

The deployment layer also supplies:

- IP-aware rate limiting
- spam detection if configured
- CORS policy
- request size limits
- secret storage
- logging and monitoring

This separation allows the same CleverForms engine to run on DigitalOcean, Vercel, Cloudflare, or another server runtime without changing the public renderer.
