import {Suspense} from 'react'
import {
  type DocumentHandle,
  createDocument,
  createDocumentHandle,
  useApplyDocumentActions,
  useDocumentProjection,
  useDocuments
} from '@sanity/sdk-react'
import {Button, Card, Flex, Heading, Stack, Text} from '@sanity/ui'

function FormRow({
  handle,
  onSelect
}: {
  handle: DocumentHandle
  onSelect(handle: DocumentHandle): void
}) {
  const {data} = useDocumentProjection<{
    title?: string
    status?: string
    slug?: {current?: string}
  }>({
    ...handle,
    projection: '{title,status,slug}'
  })

  return (
    <Card padding={3} radius={2} shadow={1}>
      <Flex align="center" justify="space-between" gap={3}>
        <Stack space={2}>
          <Heading as="h3" size={1}>{data?.title || 'Untitled form'}</Heading>
          <Text size={1} muted>
            {data?.status || 'draft'} · {data?.slug?.current || 'no-slug'}
          </Text>
        </Stack>
        <Button text="Open" mode="ghost" onClick={() => onSelect(handle)} />
      </Flex>
    </Card>
  )
}

export function FormList({
  onSelect
}: {
  onSelect(handle: DocumentHandle): void
}) {
  const {data: forms, hasMore, loadMore, isPending} = useDocuments({
    documentType: 'cleverForm',
    batchSize: 20,
    orderings: [{field: '_createdAt', direction: 'desc'}]
  })
  const apply = useApplyDocumentActions()

  function createForm() {
    const handle = createDocumentHandle({
      documentId: crypto.randomUUID(),
      documentType: 'cleverForm'
    })

    apply(
      createDocument(handle, {
        title: 'Untitled form',
        status: 'draft',
        pages: [{
          _key: crypto.randomUUID(),
          _type: 'cleverFormPage',
          title: 'Page 1',
          fields: []
        }],
        settings: {
          _type: 'cleverFormSettings',
          submitLabel: 'Submit',
          storeSubmissions: true
        }
      })
    )

    onSelect(handle)
  }

  return (
    <Stack space={4}>
      <Flex align="center" justify="space-between">
        <Heading as="h2" size={3}>Forms</Heading>
        <Button text="New form" tone="primary" onClick={createForm} />
      </Flex>

      <Stack space={3}>
        {forms.map((handle) => (
          <Suspense key={handle.documentId} fallback={<Card padding={3}><Text>Loading…</Text></Card>}>
            <FormRow handle={handle} onSelect={onSelect} />
          </Suspense>
        ))}
      </Stack>

      {hasMore ? (
        <Button
          text={isPending ? 'Loading…' : 'Load more'}
          disabled={isPending}
          onClick={loadMore}
        />
      ) : null}
    </Stack>
  )
}
