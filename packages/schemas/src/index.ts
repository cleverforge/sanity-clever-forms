import {defineField, defineType} from 'sanity'

export const cleverFormField = defineType({
  name: 'cleverFormField',
  title: 'Form field',
  type: 'object',
  fields: [
    defineField({name: 'key', title: 'Field key', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'fieldType',
      title: 'Field type',
      type: 'string',
      options: {
        list: [
          {title: 'Text', value: 'text'},
          {title: 'Email', value: 'email'},
          {title: 'Phone', value: 'phone'},
          {title: 'Number', value: 'number'},
          {title: 'Textarea', value: 'textarea'},
          {title: 'Select', value: 'select'},
          {title: 'Radio', value: 'radio'},
          {title: 'Checkbox', value: 'checkbox'},
          {title: 'Date', value: 'date'}
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({name: 'required', title: 'Required', type: 'boolean', initialValue: false}),
    defineField({name: 'placeholder', title: 'Placeholder', type: 'string'}),
    defineField({
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [{type: 'string'}],
      hidden: ({parent}) => !['select', 'radio', 'checkbox'].includes(parent?.fieldType)
    })
  ],
  preview: {
    select: {title: 'label', subtitle: 'fieldType'}
  }
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
    defineField({name: 'fields', title: 'Fields', type: 'array', of: [{type: 'cleverFormField'}]}),
    defineField({name: 'successMessage', title: 'Success message', type: 'text', rows: 3})
  ]
})

export const cleverFormSubmission = defineType({
  name: 'cleverFormSubmission',
  title: 'CleverForm submission',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({name: 'formId', title: 'Form ID', type: 'string'}),
    defineField({name: 'submittedAt', title: 'Submitted at', type: 'datetime'}),
    defineField({name: 'status', title: 'Status', type: 'string', initialValue: 'received'}),
    defineField({name: 'payload', title: 'Payload', type: 'text'})
  ],
  preview: {
    select: {title: 'formId', subtitle: 'submittedAt'}
  }
})

export const cleverFormsSchemaTypes = [
  cleverFormField,
  cleverForm,
  cleverFormSubmission
]
