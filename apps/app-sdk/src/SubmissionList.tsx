import {Suspense} from 'react'
import {type DocumentHandle, useDocumentProjection, useDocuments} from '@sanity/sdk-react'
import {Card, Heading, Stack, Text} from '@sanity/ui'

function SubmissionRow({handle}: {handle: DocumentHandle}) {
  const {data} = useDocumentProjection<{
    formSlug?: string
    submittedAt?: string
    status?: string
  }>({
    ...handle,
    projection: '{formSlug,submittedAt,status}'
  })

  return (
    <Card padding={3} radius={2} shadow={1}>
      <Stack space={1}>
        <Text weight="semibold">{data?.formSlug || 'Unknown form'}</Text>
        <Text size={1} muted>
          {data?.submittedAt || 'No timestamp'} · {data?.status || 'received'}
        </Text>
      </Stack>
    </Card>
  )
}

export function SubmissionList() {
  const {data} = useDocuments({
    documentType: 'cleverFormSubmission',
    batchSize: 50,
    orderings: [{field: 'submittedAt', direction: 'desc'}]
  })

  return (
    <Stack space={4}>
      <Heading as="h2" size={3}>Submissions</Heading>
      <Stack space={3}>
        {data.map((handle) => (
          <Suspense key={handle.documentId} fallback={<Text>Loading…</Text>}>
            <SubmissionRow handle={handle} />
          </Suspense>
        ))}
      </Stack>
    </Stack>
  )
}
