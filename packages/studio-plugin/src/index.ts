import {definePlugin} from 'sanity'
import {cleverFormsSchemaTypes} from '@cleverforge/sanity-clever-forms-schemas'

export interface CleverFormsConfig {
  submissions?: boolean
  defaultLocale?: string
}

export const cleverForms = definePlugin<CleverFormsConfig | void>((config = {}) => ({
  name: 'clever-forms',
  schema: {
    types: cleverFormsSchemaTypes
  }
}))

export {cleverFormsSchemaTypes} from '@cleverforge/sanity-clever-forms-schemas'
