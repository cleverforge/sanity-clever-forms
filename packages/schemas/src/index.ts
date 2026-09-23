import {defineArrayMember, defineField, defineType} from 'sanity'
import {cleverFormFieldTypes} from '@cleverforge/sanity-clever-forms-core'

const fieldTypeOptions = cleverFormFieldTypes.map((value) => ({
  title: value.charAt(0).toUpperCase() + value.slice(1),
  value
}))

export const cleverFormChoice = defineType({
  name: 'cleverFormChoice',
  title: 'Choice',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required()})
  ],
  preview: {select: {title: 'label', subtitle: 'value'}}
})

export const cleverFormCondition = defineType({
  name: 'cleverFormCondition',
  title: 'Condition',
  type: 'object',
  fields: [
    defineField({name: 'fieldKey', title: 'Field key', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'operator',
      title: 'Operator',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Equals', value: 'equals'},
          {title: 'Does not equal', value: 'notEquals'},
          {title: 'Contains', value: 'contains'},
          {title: 'Does not contain', value: 'notContains'},
          {title: 'Is empty', value: 'isEmpty'},
          {title: 'Is not empty', value: 'isNotEmpty'},
          {title: 'Greater than', value: 'greaterThan'},
          {title: 'Less than', value: 'lessThan'}
        ]
      }
    }),
    defineField({name: 'value', title: 'Comparison value', type: 'string'})
  ]
})

export const cleverFormConditional = defineType({
  name: 'cleverFormConditional',
  title: 'Conditional logic',
  type: 'object',
  fields: [
    defineField({name: 'enabled', title: 'Enable conditional logic', type: 'boolean', initialValue: false}),
    defineField({
      name: 'action',
      title: 'Action',
      type: 'string',
      initialValue: 'show',
      options: {list: [{title: 'Show', value: 'show'}, {title: 'Hide', value: 'hide'}]}
    }),
    defineField({
      name: 'match',
      title: 'Match',
      type: 'string',
      initialValue: 'all',
      options: {list: [{title: 'All conditions', value: 'all'}, {title: 'Any condition', value: 'any'}]}
    }),
    defineField({name: 'conditions', title: 'Conditions', type: 'array', of: [defineArrayMember({type: 'cleverFormCondition'})]})
  ]
})

export const cleverFormValidation = defineType({
  name: 'cleverFormValidation',
  title: 'Validation',
  type: 'object',
  fields: [
    defineField({name: 'minLength', title: 'Minimum length', type: 'number'}),
    defineField({name: 'maxLength', title: 'Maximum length', type: 'number'}),
    defineField({name: 'min', title: 'Minimum number', type: 'number'}),
    defineField({name: 'max', title: 'Maximum number', type: 'number'}),
    defineField({name: 'pattern', title: 'Regular expression', type: 'string'}),
    defineField({name: 'message', title: 'Custom error message', type: 'string'})
  ]
})

export const cleverFormField = defineType({
  name: 'cleverFormField',
  title: 'Form field',
  type: 'object',
  fields: [
    defineField({name: 'key', title: 'Field key', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'type',
      title: 'Field type',
      type: 'string',
      options: {list: fieldTypeOptions},
      validation: (Rule) => Rule.required()
    }),
    defineField({name: 'description', title: 'Help text', type: 'text', rows: 2}),
    defineField({name: 'placeholder', title: 'Placeholder', type: 'string'}),
    defineField({name: 'required', title: 'Required', type: 'boolean', initialValue: false}),
    defineField({name: 'defaultValue', title: 'Default value', type: 'string'}),
    defineField({
      name: 'choices',
      title: 'Choices',
      type: 'array',
      of: [defineArrayMember({type: 'cleverFormChoice'})],
      hidden: ({parent}) => !['select', 'radio', 'checkbox'].includes(parent?.type)
    }),
    defineField({name: 'validation', title: 'Validation', type: 'cleverFormValidation'}),
    defineField({name: 'conditional', title: 'Conditional logic', type: 'cleverFormConditional'})
  ],
  preview: {select: {title: 'label', subtitle: 'type'}}
})

export const cleverFormPage = defineType({
  name: 'cleverFormPage',
  title: 'Form page',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Page title', type: 'string'}),
    defineField({name: 'description', title: 'Page description', type: 'text', rows: 2}),
    defineField({
      name: 'fields',
      title: 'Fields',
      type: 'array',
      of: [defineArrayMember({type: 'cleverFormField'})]
    })
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title: title || 'Untitled page'})
  }
})

export const cleverFormSettings = defineType({
  name: 'cleverFormSettings',
  title: 'Form settings',
  type: 'object',
  fields: [
    defineField({name: 'submitLabel', title: 'Submit button label', type: 'string', initialValue: 'Submit'}),
    defineField({name: 'successMessage', title: 'Success message', type: 'text', rows: 3}),
    defineField({name: 'redirectUrl', title: 'Redirect URL', type: 'url'}),
    defineField({name: 'storeSubmissions', title: 'Store submissions in Sanity', type: 'boolean', initialValue: true})
  ]
})

export const cleverForm = defineType({
  name: 'cleverForm',
  title: 'CleverForm',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'draft',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Active', value: 'active'},
          {title: 'Archived', value: 'archived'}
        ]
      }
    }),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
    defineField({
      name: 'pages',
      title: 'Pages',
      type: 'array',
      of: [defineArrayMember({type: 'cleverFormPage'})],
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({name: 'settings', title: 'Settings', type: 'cleverFormSettings'})
  ],
  preview: {select: {title: 'title', subtitle: 'status'}}
})

export const cleverFormSubmission = defineType({
  name: 'cleverFormSubmission',
  title: 'CleverForm submission',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({name: 'formId', title: 'Form ID', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'formSlug', title: 'Form slug', type: 'string'}),
    defineField({name: 'submittedAt', title: 'Submitted at', type: 'datetime'}),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'received',
      options: {list: ['received', 'processed', 'failed', 'spam']}
    }),
    defineField({name: 'payload', title: 'Payload JSON', type: 'text'}),
    defineField({name: 'sourceUrl', title: 'Source URL', type: 'url'})
  ],
  preview: {select: {title: 'formSlug', subtitle: 'submittedAt'}}
})

export const cleverFormsSchemaTypes = [
  cleverFormChoice,
  cleverFormCondition,
  cleverFormConditional,
  cleverFormValidation,
  cleverFormField,
  cleverFormPage,
  cleverFormSettings,
  cleverForm,
  cleverFormSubmission
]
