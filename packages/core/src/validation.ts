import type {CleverFormField} from './types.js'

function isEmpty(value: unknown): boolean {
  return value == null || value === '' || (Array.isArray(value) && value.length === 0)
}

export function validateField(field: CleverFormField, value: unknown): string | undefined {
  if (field.required && isEmpty(value)) {
    return field.validation?.message || `${field.label} is required.`
  }

  if (isEmpty(value)) return undefined

  const validation = field.validation
  const stringValue = String(value)

  if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stringValue)) {
    return validation?.message || 'Enter a valid email address.'
  }

  if (field.type === 'url') {
    try {
      new URL(stringValue)
    } catch {
      return validation?.message || 'Enter a valid URL.'
    }
  }

  if (validation?.minLength != null && stringValue.length < validation.minLength) {
    return validation.message || `Use at least ${validation.minLength} characters.`
  }

  if (validation?.maxLength != null && stringValue.length > validation.maxLength) {
    return validation.message || `Use no more than ${validation.maxLength} characters.`
  }

  const numericValue = Number(value)
  if (validation?.min != null && !Number.isNaN(numericValue) && numericValue < validation.min) {
    return validation.message || `Value must be at least ${validation.min}.`
  }

  if (validation?.max != null && !Number.isNaN(numericValue) && numericValue > validation.max) {
    return validation.message || `Value must be no more than ${validation.max}.`
  }

  if (validation?.pattern) {
    try {
      if (!new RegExp(validation.pattern).test(stringValue)) {
        return validation.message || 'Enter a valid value.'
      }
    } catch {
      return 'This field has an invalid validation pattern.'
    }
  }

  return undefined
}

export function validateFields(
  fields: CleverFormField[],
  values: Record<string, unknown>
): Record<string, string> {
  const errors: Record<string, string> = {}

  for (const field of fields) {
    const error = validateField(field, values[field.key])
    if (error) errors[field.key] = error
  }

  return errors
}
