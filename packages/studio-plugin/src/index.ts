import {definePlugin} from 'sanity'
import {
  cleverFormsSchemaTypes,
  registerCleverFormFieldTypes,
  type CleverFormFieldTypeOption
} from '@cleverforge/sanity-clever-forms-schemas'

export interface CleverFormsConfig {
  submissions?: boolean
  defaultLocale?: string
  fieldTypes?: CleverFormFieldTypeOption[]
}

export const cleverForms = definePlugin<CleverFormsConfig | void>((config) => {
  const options: CleverFormsConfig = config || {}
  registerCleverFormFieldTypes(options.fieldTypes || [])

  return {
    name: 'clever-forms',
    schema: {
      types: cleverFormsSchemaTypes
    }
  }
})

export {
  cleverFormsSchemaTypes,
  registerCleverFormFieldTypes
} from '@cleverforge/sanity-clever-forms-schemas'
