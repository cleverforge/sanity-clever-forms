import type {
  CleverFormsTransport,
  CleverFormSubmissionPayload,
  CleverFormSubmissionResult
} from '@cleverforge/sanity-clever-forms-core'

export interface HttpTransportOptions {
  endpoint: string
  headers?: Record<string, string>
  credentials?: RequestCredentials
}

export function createHttpTransport(options: HttpTransportOptions): CleverFormsTransport {
  return {
    async submit(payload: CleverFormSubmissionPayload): Promise<CleverFormSubmissionResult> {
      const response = await fetch(options.endpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...options.headers
        },
        credentials: options.credentials,
        body: JSON.stringify(payload)
      })

      const data = await response.json().catch(() => ({})) as CleverFormSubmissionResult
      if (!response.ok) {
        return {
          ok: false,
          message: data.message || 'Submission failed.',
          fieldErrors: data.fieldErrors
        }
      }

      return data
    }
  }
}
