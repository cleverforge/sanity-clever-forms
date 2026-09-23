import {
  type DocumentHandle,
  useDocument,
  useEditDocument
} from '@sanity/sdk-react'
import {Button, Card, Flex, Heading, Label, Select, Stack, Text, TextArea, TextInput} from '@sanity/ui'
import {FormBuilder} from './FormBuilder.js'

function StringField({
  handle,
  path,
  label,
  multiline = false
}: {
  handle: DocumentHandle
  path: string
  label: string
  multiline?: boolean
}) {
  const {data} = useDocument<string>({...handle, path})
  const edit = useEditDocument<string>({...handle, path})

  return (
    <Stack space={2}>
      <Label>{label}</Label>
      {multiline ? (
        <TextArea value={data || ''} onChange={(event) => edit(event.currentTarget.value)} />
      ) : (
        <TextInput value={data || ''} onChange={(event) => edit(event.currentTarget.value)} />
      )}
    </Stack>
  )
}

export function FormEditor({
  handle,
  onBack
}: {
  handle: DocumentHandle
  onBack(): void
}) {
  const {data: title} = useDocument<string>({...handle, path: 'title'})
  const {data: status} = useDocument<string>({...handle, path: 'status'})
  const editStatus = useEditDocument<string>({...handle, path: 'status'})

  return (
    <Stack space={5}>
      <Flex align="center" gap={3}>
        <Button text="Back" mode="ghost" onClick={onBack} />
        <Stack space={1}>
          <Heading as="h2" size={3}>{title || 'Untitled form'}</Heading>
          <Text muted size={1}>Changes sync directly with Sanity drafts.</Text>
        </Stack>
      </Flex>

      <Card padding={4} radius={2} shadow={1}>
        <Stack space={4}>
          <StringField handle={handle} path="title" label="Title" />
          <StringField handle={handle} path="description" label="Description" multiline />

          <Stack space={2}>
            <Label>Status</Label>
            <Select
              value={status || 'draft'}
              onChange={(event) => editStatus(event.currentTarget.value)}
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </Select>
          </Stack>

          <StringField handle={handle} path="settings.submitLabel" label="Submit button label" />
          <StringField handle={handle} path="settings.successMessage" label="Success message" multiline />
          <StringField handle={handle} path="settings.redirectUrl" label="Redirect URL" />
        </Stack>
      </Card>

      <FormBuilder handle={handle} />
    </Stack>
  )
}
