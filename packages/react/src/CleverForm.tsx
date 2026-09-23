import {useMemo, useState, type FormEvent} from 'react'
import {
  validateFields,
  visibleFields,
  type CleverFormDefinition,
  type CleverFormsTransport,
  type CleverFormSubmissionResult
} from '@cleverforge/sanity-clever-forms-core'
import {CleverField} from './CleverField.js'

export interface CleverFormProps {
  form: CleverFormDefinition
  transport: CleverFormsTransport
  sourceUrl?: string
  locale?: string
  onSuccess?(result: CleverFormSubmissionResult): void
}

export function CleverForm({form, transport, sourceUrl, locale, onSuccess}: CleverFormProps) {
  const initialValues = useMemo(() => {
    const entries = form.pages.flatMap((page) =>
      page.fields.map((field) => [field.key, field.defaultValue ?? ''] as const)
    )
    return Object.fromEntries(entries)
  }, [form])

  const [values, setValues] = useState<Record<string, unknown>>(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [pageIndex, setPageIndex] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string>()

  const page = form.pages[pageIndex]
  const fields = visibleFields(page?.fields ?? [], values)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateFields(fields, values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    if (pageIndex < form.pages.length - 1) {
      setPageIndex((current) => current + 1)
      return
    }

    setSubmitting(true)
    setMessage(undefined)
    try {
      const result = await transport.submit({
        formId: form._id || String(form.slug || form.title),
        formSlug: typeof form.slug === 'string' ? form.slug : form.slug?.current,
        values,
        metadata: {
          submittedAt: new Date().toISOString(),
          sourceUrl,
          locale,
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined
        }
      })

      if (result.fieldErrors) setErrors(result.fieldErrors)
      if (result.message) setMessage(result.message)
      if (result.ok) {
        onSuccess?.(result)
        if (result.redirectUrl && typeof window !== 'undefined') {
          window.location.assign(result.redirectUrl)
        }
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (!page) return null

  return (
    <form onSubmit={handleSubmit} noValidate data-clever-form>
      <header>
        <h2>{form.title}</h2>
        {form.description ? <p>{form.description}</p> : null}
      </header>

      {form.pages.length > 1 ? (
        <p aria-live="polite">Step {pageIndex + 1} of {form.pages.length}</p>
      ) : null}

      {page.title ? <h3>{page.title}</h3> : null}
      {page.description ? <p>{page.description}</p> : null}

      {fields.map((field) => (
        <CleverField
          key={field._key || field.key}
          field={field}
          value={values[field.key]}
          error={errors[field.key]}
          onChange={(value) => {
            setValues((current) => ({...current, [field.key]: value}))
            setErrors((current) => {
              const next = {...current}
              delete next[field.key]
              return next
            })
          }}
        />
      ))}

      <div>
        {pageIndex > 0 ? (
          <button type="button" onClick={() => setPageIndex((current) => current - 1)}>
            Back
          </button>
        ) : null}
        <button type="submit" disabled={submitting}>
          {pageIndex < form.pages.length - 1
            ? 'Next'
            : submitting
              ? 'Submitting...'
              : form.settings?.submitLabel || 'Submit'}
        </button>
      </div>

      {message ? <p role="status">{message}</p> : null}
    </form>
  )
}
