# @cleverforge/sanity-clever-forms-react

Framework-friendly React renderer for CleverForms forms.

```tsx
import {CleverForm, createHttpTransport} from '@cleverforge/sanity-clever-forms-react'

const transport = createHttpTransport({endpoint:'/api/cleverforms/submit'})

export function Form({form}) {
  return <CleverForm form={form} transport={transport} />
}
```

Public forms should submit through a secure server endpoint. Never expose a Sanity write token in browser code.

License: Apache-2.0
