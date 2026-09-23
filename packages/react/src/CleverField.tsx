import type {ChangeEvent} from 'react'
import type {CleverFormField} from '@cleverforge/sanity-clever-forms-core'

export interface CleverFieldProps {
  field: CleverFormField
  value: unknown
  error?: string
  onChange(value: unknown): void
}

export function CleverField({field, value, error, onChange}: CleverFieldProps) {
  const id = `clever-form-${field.key}`
  const common = {
    id,
    name: field.key,
    required: field.required,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${id}-error` : undefined
  }

  let control

  if (field.type === 'textarea') {
    control = (
      <textarea
        {...common}
        placeholder={field.placeholder}
        value={String(value ?? '')}
        onChange={(event) => onChange(event.target.value)}
      />
    )
  } else if (field.type === 'select') {
    control = (
      <select
        {...common}
        value={String(value ?? '')}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Select</option>
        {field.choices?.map((choice) => (
          <option key={choice.value} value={choice.value}>{choice.label}</option>
        ))}
      </select>
    )
  } else if (field.type === 'radio') {
    control = (
      <div role="radiogroup" aria-labelledby={`${id}-label`}>
        {field.choices?.map((choice) => (
          <label key={choice.value}>
            <input
              type="radio"
              name={field.key}
              value={choice.value}
              checked={String(value ?? '') === choice.value}
              onChange={() => onChange(choice.value)}
            />
            {choice.label}
          </label>
        ))}
      </div>
    )
  } else if (field.type === 'checkbox' && field.choices?.length) {
    const selected = Array.isArray(value) ? value.map(String) : []
    control = (
      <div>
        {field.choices.map((choice) => (
          <label key={choice.value}>
            <input
              type="checkbox"
              value={choice.value}
              checked={selected.includes(choice.value)}
              onChange={(event) => {
                onChange(
                  event.target.checked
                    ? [...selected, choice.value]
                    : selected.filter((item) => item !== choice.value)
                )
              }}
            />
            {choice.label}
          </label>
        ))}
      </div>
    )
  } else if (field.type === 'checkbox') {
    control = (
      <input
        {...common}
        type="checkbox"
        checked={Boolean(value)}
        onChange={(event) => onChange(event.target.checked)}
      />
    )
  } else if (field.type === 'hidden') {
    control = <input {...common} type="hidden" value={String(value ?? field.defaultValue ?? '')} />
  } else {
    const htmlType =
      field.type === 'phone' ? 'tel' :
      field.type === 'datetime' ? 'datetime-local' :
      field.type

    control = (
      <input
        {...common}
        type={htmlType}
        placeholder={field.placeholder}
        value={String(value ?? '')}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(field.type === 'number' && event.target.value !== '' ? Number(event.target.value) : event.target.value)
        }
      />
    )
  }

  if (field.type === 'hidden') return control

  return (
    <div data-clever-field={field.key}>
      <label id={`${id}-label`} htmlFor={id}>
        {field.label}{field.required ? ' *' : ''}
      </label>
      {field.description ? <p>{field.description}</p> : null}
      {control}
      {error ? <p id={`${id}-error`} role="alert">{error}</p> : null}
    </div>
  )
}
