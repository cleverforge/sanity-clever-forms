import type {
  CleverFormDefinition,
  CleverFormSubmissionPayload,
  CleverFormSubmissionResult
} from '@cleverforge/sanity-clever-forms-core'

export interface SubmissionRequestContext {
  ip?: string
  headers?: Record<string, string | undefined>
}

export interface StoredSubmission {
  formId: string
  formSlug?: string
  submittedAt: string
  status: 'received' | 'processed' | 'failed' | 'spam'
  values: Record<string, unknown>
  sourceUrl?: string
  userAgent?: string
  locale?: string
}

export interface CleverFormsRepository {
  getForm(formId: string, formSlug?: string): Promise<CleverFormDefinition | null>
  saveSubmission(submission: StoredSubmission): Promise<{id: string}>
}

export interface CleverFormsSubmissionGuard {
  checkRateLimit?(
    payload: CleverFormSubmissionPayload,
    context: SubmissionRequestContext
  ): Promise<boolean>
  checkSpam?(
    payload: CleverFormSubmissionPayload,
    context: SubmissionRequestContext
  ): Promise<boolean>
}

export interface CleverFormsSubmissionHooks {
  afterSubmission?(
    submission: StoredSubmission,
    result: CleverFormSubmissionResult
  ): Promise<void>
}

export interface CleverFormsSubmissionServiceOptions {
  repository: CleverFormsRepository
  guard?: CleverFormsSubmissionGuard
  hooks?: CleverFormsSubmissionHooks
}
