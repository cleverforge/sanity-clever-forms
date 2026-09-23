# @cleverforge/sanity-clever-forms

The CleverForms Studio plugin for Sanity.

```bash
pnpm add @cleverforge/sanity-clever-forms
```

```ts
import {defineConfig} from 'sanity'
import {cleverForms} from '@cleverforge/sanity-clever-forms'

export default defineConfig({
  plugins: [cleverForms()]
})
```

For premium field types, pass additional `fieldTypes` to `cleverForms()`.

License: Apache-2.0
