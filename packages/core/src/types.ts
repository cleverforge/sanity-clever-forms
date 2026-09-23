export const cleverFormBuiltInFieldTypes = [
  'text',
  'textarea',
  'email',
  'number',
  'phone',
  'url',
  'select',
  'multiselect',
  'radio',
  'checkbox',
  'checkboxGroup',
  'date',
  'time',
  'datetime',
  'file',
  'address',
  'heading',
  'paragraph',
  'richText',
  'hidden'
] as const

export type CleverFormBuiltInFieldType = (typeof cleverFormBuiltInFieldTypes)[number]
export type CleverFormFieldType = CleverFormBuiltInFieldType | (string & {})

export const cleverFormFieldTypes = cleverFormBuiltInFieldTypes

export type CleverFormOperator =
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'notContains'
  | 'isEmpty'
  | 'isNotEmpty'
  | 'greaterThan'
  | 'lessThan'

export interface CleverFormChoice {
  _key?: string
  label: string
  value: string
}

export interface CleverFormCondition {
  _key?: string
  fieldKey: string
  operator: CleverFormOperator
  value?: string | number | boolean
}

export interface CleverFormConditionalRule {
  enabled?: boolean
  action: 'show' | 'hide'
  match: 'all' | 'any'
  conditions: CleverFormCondition[]
}

export interface CleverFormValidationRule {
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: string
  message?: string
  allowedFileTypes?: string[]
  maxFileSizeBytes?: number
}

export interface CleverFormAddressValue {
  line1?: string
  line2?: string
  city?: string
  region?: string
  postalCode?: string
  country?: string
}

export interface CleverFormField {
  _key?: string
  key: string
  label: string
  type: CleverFormFieldType
  description?: string
  placeholder?: string
  required?: boolean
  defaultValue?: unknown
  choices?: CleverFormChoice[]
  validation?: CleverFormValidationRule
  conditional?: CleverFormConditionalRule
  config?: Record<string, unknown>
}

export interface CleverFormPage {
  _key?: string
  title?: string
  description?: string
  fields: CleverFormField[]
}

export interface CleverFormDefinition {
  _id?: string
  title: string
  slug?: {current: string} | string
  status?: 'draft' | 'active' | 'archived'
  description?: string
  pages: CleverFormPage[]
  settings?: {
    submitLabel?: string
    successMessage?: string
    redirectUrl?: string
    storeSubmissions?: boolean
  }
}

export interface CleverFormSubmissionPayload {
  formId: string
  formSlug?: string
  values: Record<string, unknown>
  metadata?: {
    submittedAt?: string
    sourceUrl?: string
    userAgent?: string
    locale?: string
  }
}

export interface CleverFormSubmissionResult {
  ok: boolean
  submissionId?: string
  redirectUrl?: string
  message?: string
  fieldErrors?: Record<string, string>
  data?: Record<string, unknown>
}

export interface CleverFormsTransport {
  submit(payload: CleverFormSubmissionPayload): Promise<CleverFormSubmissionResult>
}
