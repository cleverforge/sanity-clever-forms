import type {
  CleverFormCondition,
  CleverFormConditionalRule,
  CleverFormField
} from './types.js'

function compare(condition: CleverFormCondition, value: unknown): boolean {
  const expected = condition.value
  switch (condition.operator) {
    case 'equals':
      return String(value ?? '') === String(expected ?? '')
    case 'notEquals':
      return String(value ?? '') !== String(expected ?? '')
    case 'contains':
      return Array.isArray(value)
        ? value.map(String).includes(String(expected ?? ''))
        : String(value ?? '').includes(String(expected ?? ''))
    case 'notContains':
      return Array.isArray(value)
        ? !value.map(String).includes(String(expected ?? ''))
        : !String(value ?? '').includes(String(expected ?? ''))
    case 'isEmpty':
      return value == null || value === '' || (Array.isArray(value) && value.length === 0)
    case 'isNotEmpty':
      return !(value == null || value === '' || (Array.isArray(value) && value.length === 0))
    case 'greaterThan':
      return Number(value) > Number(expected)
    case 'lessThan':
      return Number(value) < Number(expected)
    default:
      return false
  }
}

export function evaluateConditionalRule(
  rule: CleverFormConditionalRule | undefined,
  values: Record<string, unknown>
): boolean {
  if (!rule?.enabled || rule.conditions.length === 0) return true

  const matches = rule.conditions.map((condition) =>
    compare(condition, values[condition.fieldKey])
  )

  const conditionResult =
    rule.match === 'all' ? matches.every(Boolean) : matches.some(Boolean)

  return rule.action === 'show' ? conditionResult : !conditionResult
}

export function visibleFields(
  fields: CleverFormField[],
  values: Record<string, unknown>
): CleverFormField[] {
  return fields.filter((field) => evaluateConditionalRule(field.conditional, values))
}
