import {useState} from 'react'
import type {DocumentHandle} from '@sanity/sdk-react'
import {Button, Card, Container, Flex, Heading, Stack, Text} from '@sanity/ui'
import {FormEditor} from './FormEditor.js'
import {FormList} from './FormList.js'
import {SubmissionList} from './SubmissionList.js'

type View = 'forms' | 'submissions'

export default function App() {
  const [view, setView] = useState<View>('forms')
  const [selectedForm, setSelectedForm] = useState<DocumentHandle | null>(null)

  return (
    <Container width={6} padding={4}>
      <Stack space={5}>
        <Flex align="center" justify="space-between" wrap="wrap" gap={3}>
          <Stack space={2}>
            <Heading as="h1" size={4}>CleverForms</Heading>
            <Text muted>Forms, submissions, and workflow management for Sanity.</Text>
          </Stack>
          <Flex gap={2}>
            <Button
              text="Forms"
              mode={view === 'forms' ? 'default' : 'ghost'}
              onClick={() => {
                setSelectedForm(null)
                setView('forms')
              }}
            />
            <Button
              text="Submissions"
              mode={view === 'submissions' ? 'default' : 'ghost'}
              onClick={() => {
                setSelectedForm(null)
                setView('submissions')
              }}
            />
          </Flex>
        </Flex>

        {view === 'forms' ? (
          selectedForm ? (
            <FormEditor handle={selectedForm} onBack={() => setSelectedForm(null)} />
          ) : (
            <FormList onSelect={setSelectedForm} />
          )
        ) : (
          <SubmissionList />
        )}

        <Card padding={3} radius={2} tone="transparent">
          <Text size={1} muted>Core management app · CleverForge</Text>
        </Card>
      </Stack>
    </Container>
  )
}
