import type {CleverFormSubmissionPayload} from '@cleverforge/sanity-clever-forms-core'
import type {SubmissionRequestContext} from './types.js'

export interface CleverFormsHttpRequest {
  method?: string
  body?: unknown
  headers?: Record<string, string | undefined>
  ip?: string
}

export interface CleverFormsHttpResponse {
  status: number
  headers: Record<string, string>
  body: string
}

export interface CleverFormsSubmitter {
  submit(
    payload: CleverFormSubmissionPayload,
    context?: SubmissionRequestContext
  ): Promise<unknown>
}

export function createJsonSubmissionHandler(service: CleverFormsSubmitter) {
  return async function handle(request: CleverFormsHttpRequest): Promise<CleverFormsHttpResponse> {
    const headers = {'content-type': 'application/json; charset=utf-8'}

    if ((request.method || 'POST').toUpperCase() !== 'POST') {
      return {
        status: 405,
        headers: {...headers, allow: 'POST'},
        body: JSON.stringify({ok: false, message: 'Method not allowed.'})
      }
    }

    if (!request.body || typeof request.body !== 'object') {
      return {
        status: 400,
        headers,
        body: JSON.stringify({ok: false, message: 'Invalid JSON body.'})
      }
    }

    try {
      const result = await service.submit(
        request.body as CleverFormSubmissionPayload,
        {headers: request.headers, ip: request.ip}
      )

      return {
        status: 200,
        headers,
        body: JSON.stringify(result)
      }
    } catch {
      return {
        status: 500,
        headers,
        body: JSON.stringify({ok: false, message: 'Submission could not be processed.'})
      }
    }
  }
}
