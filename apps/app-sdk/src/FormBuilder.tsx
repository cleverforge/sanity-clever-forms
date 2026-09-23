import {useState, type DragEvent} from 'react'
import {type DocumentHandle, useDocument, useEditDocument} from '@sanity/sdk-react'
import {Button, Card, Flex, Heading, Label, Select, Stack, Text, TextInput} from '@sanity/ui'
import type {CleverFormFieldType} from '@cleverforge/sanity-clever-forms-core'

interface BuilderField {
  _key: string
  _type: 'cleverFormField'
  key: string
  label: string
  type: CleverFormFieldType
  required?: boolean
  placeholder?: string
}

interface BuilderPage {
  _key: string
  _type: 'cleverFormPage'
  title?: string
  description?: string
  fields: BuilderField[]
}

const fieldTypes: CleverFormFieldType[] = [
  'text', 'email', 'phone', 'number', 'textarea', 'select',
  'radio', 'checkbox', 'date', 'datetime', 'url', 'hidden'
]

function newField(type: CleverFormFieldType): BuilderField {
  const id = crypto.randomUUID()
  return {
    _key: id,
    _type: 'cleverFormField',
    key: `field_${id.replaceAll('-', '').slice(0, 8)}`,
    label: 'New field',
    type,
    required: false
  }
}

export function FormBuilder({handle}: {handle: DocumentHandle}) {
  const {data: currentPages} = useDocument<BuilderPage[]>({...handle, path: 'pages'})
  const editPages = useEditDocument<BuilderPage[]>({...handle, path: 'pages'})
  const [fieldType, setFieldType] = useState<CleverFormFieldType>('text')
  const [dragged, setDragged] = useState<{pageIndex: number; fieldIndex: number} | null>(null)

  const pages = currentPages || []

  function updatePage(pageIndex: number, update: (page: BuilderPage) => BuilderPage) {
    editPages((existing = []) =>
      existing.map((page, index) => index === pageIndex ? update(page) : page)
    )
  }

  function addPage() {
    editPages((existing = []) => [
      ...existing,
      {
        _key: crypto.randomUUID(),
        _type: 'cleverFormPage',
        title: `Page ${existing.length + 1}`,
        fields: []
      }
    ])
  }

  function addField(pageIndex: number) {
    updatePage(pageIndex, (page) => ({
      ...page,
      fields: [...(page.fields || []), newField(fieldType)]
    }))
  }

  function updateField(
    pageIndex: number,
    fieldIndex: number,
    patch: Partial<BuilderField>
  ) {
    updatePage(pageIndex, (page) => ({
      ...page,
      fields: page.fields.map((field, index) =>
        index === fieldIndex ? {...field, ...patch} : field
      )
    }))
  }

  function removeField(pageIndex: number, fieldIndex: number) {
    updatePage(pageIndex, (page) => ({
      ...page,
      fields: page.fields.filter((_, index) => index !== fieldIndex)
    }))
  }

  function removePage(pageIndex: number) {
    if (pages.length <= 1) return
    editPages((existing = []) => existing.filter((_, index) => index !== pageIndex))
  }

  function handleDrop(event: DragEvent, targetPage: number, targetField: number) {
    event.preventDefault()
    if (!dragged) return

    editPages((existing = []) => {
      const next = existing.map((page) => ({...page, fields: [...(page.fields || [])]}))
      const [field] = next[dragged.pageIndex].fields.splice(dragged.fieldIndex, 1)
      next[targetPage].fields.splice(targetField, 0, field)
      return next
    })

    setDragged(null)
  }

  return (
    <Stack space={5}>
      <Flex align="center" justify="space-between" gap={3} wrap="wrap">
        <Stack space={1}>
          <Heading as="h3" size={2}>Form builder</Heading>
          <Text size={1} muted>Drag fields to reorder them or move them between pages.</Text>
        </Stack>
        <Button text="Add page" mode="ghost" onClick={addPage} />
      </Flex>

      {pages.map((page, pageIndex) => (
        <Card key={page._key} padding={4} radius={2} shadow={1}>
          <Stack space={4}>
            <Flex align="center" justify="space-between" gap={3}>
              <TextInput
                value={page.title || ''}
                onChange={(event) =>
                  updatePage(pageIndex, (current) => ({
                    ...current,
                    title: event.currentTarget.value
                  }))
                }
              />
              <Button
                text="Delete page"
                tone="critical"
                mode="ghost"
                disabled={pages.length <= 1}
                onClick={() => removePage(pageIndex)}
              />
            </Flex>

            <Stack space={3}>
              {page.fields?.map((field, fieldIndex) => (
                <Card
                  key={field._key}
                  padding={3}
                  radius={2}
                  tone="transparent"
                  border
                  draggable
                  onDragStart={() => setDragged({pageIndex, fieldIndex})}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => handleDrop(event, pageIndex, fieldIndex)}
                >
                  <Stack space={3}>
                    <Flex align="center" gap={3} wrap="wrap">
                      <TextInput
                        value={field.label}
                        onChange={(event) =>
                          updateField(pageIndex, fieldIndex, {label: event.currentTarget.value})
                        }
                      />
                      <TextInput
                        value={field.key}
                        onChange={(event) =>
                          updateField(pageIndex, fieldIndex, {key: event.currentTarget.value})
                        }
                      />
                      <Select
                        value={field.type}
                        onChange={(event) =>
                          updateField(pageIndex, fieldIndex, {
                            type: event.currentTarget.value as CleverFormFieldType
                          })
                        }
                      >
                        {fieldTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </Select>
                      <Button
                        text="Remove"
                        tone="critical"
                        mode="ghost"
                        onClick={() => removeField(pageIndex, fieldIndex)}
                      />
                    </Flex>
                    <Stack space={2}>
                      <Label>Placeholder</Label>
                      <TextInput
                        value={field.placeholder || ''}
                        onChange={(event) =>
                          updateField(pageIndex, fieldIndex, {
                            placeholder: event.currentTarget.value
                          })
                        }
                      />
                    </Stack>
                    <label>
                      <input
                        type="checkbox"
                        checked={Boolean(field.required)}
                        onChange={(event) =>
                          updateField(pageIndex, fieldIndex, {required: event.currentTarget.checked})
                        }
                      />{' '}
                      Required
                    </label>
                  </Stack>
                </Card>
              ))}
            </Stack>

            <Flex gap={2} align="center">
              <Select
                value={fieldType}
                onChange={(event) => setFieldType(event.currentTarget.value as CleverFormFieldType)}
              >
                {fieldTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>
              <Button text="Add field" tone="primary" onClick={() => addField(pageIndex)} />
            </Flex>
          </Stack>
        </Card>
      ))}
    </Stack>
  )
}
