# Installing CleverForms for Sanity

## Studio plugin

Install the public Studio package:

```bash
pnpm add @cleverforge/sanity-clever-forms
```

Register it in `sanity.config.ts`:

```ts
import {defineConfig} from 'sanity'
import {cleverForms} from '@cleverforge/sanity-clever-forms'

export default defineConfig({
  // projectId, dataset, plugins, schema, etc.
  plugins: [
    cleverForms()
  ]
})
```

## React renderer

```bash
pnpm add @cleverforge/sanity-clever-forms-react
```

```tsx
import {
  CleverForm,
  createHttpTransport
} from '@cleverforge/sanity-clever-forms-react'

const transport = createHttpTransport({
  endpoint: '/api/cleverforms/submit'
})

export function ContactForm({form}) {
  return <CleverForm form={form} transport={transport} />
}
```

The browser renderer must submit to a server endpoint. Do not expose a Sanity write token in client code.

## Server

Install the framework-neutral submission package and Sanity adapter:

```bash
pnpm add \
  @cleverforge/sanity-clever-forms-server \
  @cleverforge/sanity-clever-forms-sanity
```

Create a Sanity client on the server and pass it to `createSanityRepository()`. Then pass that repository to `createSubmissionService()`.

## Pro fields

After installing the private Pro distribution, register its field types with Core:

```ts
import {cleverForms} from '@cleverforge/sanity-clever-forms'
import {cleverFormsProFieldTypes} from '@cleverforge/sanity-clever-forms-pro'

cleverForms({
  fieldTypes: [...cleverFormsProFieldTypes]
})
```

Premium entitlement must also be verified server-side. A client-side Pro flag is not authorization.
