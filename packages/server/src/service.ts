import {
  evaluateConditionalRule,
  validateFields,
  type CleverFormDefinition,
  type CleverFormField,
  type CleverFormSubmissionPayload,
  type CleverFormSubmissionResult
} from '@cleverforge/sanity-clever-forms-core'
import type {
  CleverFormsSubmissionServiceOptions,
  StoredSubmission,
  SubmissionRequestContext
} from './types.js'

function getDeclaredFields(form: CleverFormDefinition): CleverFormField[] {
  return form.pages.flatMap((page) => page.fields)
}

function sanitizeValues(
  form: CleverFormDefinition,
  values: Record<string, unknown>
): Record<string, unknown> {
  const allowed = new Set(getDeclaredFields(form).map((field) => field.key))
  return Object.fromEntries(
    Object.entries(values).filter(([key]) => allowed.has(key))
  )
}

function getVisibleFields(
  form: CleverFormDefinition,
  values: Record<string, unknown>
): CleverFormField[] {
  return getDeclaredFields(form).filter((field) =>
    evaluateConditionalRule(field.conditional, values)
  )
}

export function createSubmissionService(options: CleverFormsSubmissionServiceOptions) {
  const {repository, guard, hooks} = options

  return {
    async submit(
      payload: CleverFormSubmissionPayload,
      context: SubmissionRequestContext = {}
    ): Promise<CleverFormSubmissionResult> {
      if (!payload?.formId || !payload.values || typeof payload.values !== 'object') {
        return {ok: false, message: 'Invalid submission payload.'}
      }

      const form = await repository.getForm(payload.formId, payload.formSlug)
      if (!form || form.status !== 'active') {
        return {ok: false, message: 'This form is unavailable.'}
      }

      if (guard?.checkRateLimit) {
        const allowed = await guard.checkRateLimit(payload, context)
        if (!allowed) {
          return {ok: false, message: 'Too many submissions. Try again later.'}
        }
      }

      const values = sanitizeValues(form, payload.values)
      const visibleFields = getVisibleFields(form, values)
      const fieldErrors = validateFields(visibleFields, values)

      if (Object.keys(fieldErrors).length > 0) {
        return {ok: false, fieldErrors, message: 'Review the highlighted fields.'}
      }

      if (guard?.checkSpam) {
        const spam = await guard.checkSpam({...payload, values}, context)
        if (spam) {
          return {ok: true, message: form.settings?.successMessage || 'Thank you.'}
        }
      }

      const stored: StoredSubmission = {
        formId: payload.formId,
        formSlug: payload.formSlug,
        submittedAt: new Date().toISOString(),
        status: 'received',
        values,
        sourceUrl: payload.metadata?.sourceUrl,
        userAgent: payload.metadata?.userAgent,
        locale: payload.metadata?.locale
      }

      let submissionId: string | undefined
      if (form.settings?.storeSubmissions !== false) {
        const saved = await repository.saveSubmission(stored)
        submissionId = saved.id
      }

      const result: CleverFormSubmissionResult = {
        ok: true,
        submissionId,
        redirectUrl: form.settings?.redirectUrl,
        message: form.settings?.successMessage || 'Thank you.'
      }

      await hooks?.afterSubmission?.(stored, result)
      return result
    }
  }
}
