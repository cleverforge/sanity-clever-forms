import type {CleverFormDefinition} from '@cleverforge/sanity-clever-forms-core'
import type {
  CleverFormsRepository,
  StoredSubmission
} from '@cleverforge/sanity-clever-forms-server'

export interface SanityClientLike {
  fetch<T>(
    query: string,
    params?: Record<string, unknown>
  ): Promise<T>
  create<T extends Record<string, unknown>>(
    document: T
  ): Promise<T & {_id: string}>
}

const formProjection = `{
  _id,
  title,
  slug,
  status,
  description,
  pages[]{
    _key,
    title,
    description,
    fields[]{
      _key,
      key,
      label,
      type,
      description,
      placeholder,
      required,
      defaultValue,
      choices[]{_key,label,value},
      validation,
      conditional,
      config
    }
  },
  settings
}`

export function createSanityRepository(
  client: SanityClientLike
): CleverFormsRepository {
  return {
    async getForm(formId, formSlug): Promise<CleverFormDefinition | null> {
      return client.fetch<CleverFormDefinition | null>(
        `*[_type == "cleverForm" &&
          status == "active" &&
          (_id == $formId || slug.current == $formSlug)
        ][0]${formProjection}`,
        {formId, formSlug: formSlug || ''}
      )
    },

    async saveSubmission(submission: StoredSubmission) {
      const created = await client.create({
        _type: 'cleverFormSubmission',
        formId: submission.formId,
        formSlug: submission.formSlug,
        submittedAt: submission.submittedAt,
        status: submission.status,
        payload: JSON.stringify(submission.values),
        sourceUrl: submission.sourceUrl
      })

      return {id: created._id}
    }
  }
}
