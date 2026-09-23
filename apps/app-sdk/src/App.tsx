import {useState} from 'react'
import type {SanityConfig} from '@sanity/sdk'
import {SanityApp, type DocumentHandle} from '@sanity/sdk-react'
import {Button, Card, Container, Flex, Heading, Stack, Text, ThemeProvider, studioTheme} from '@sanity/ui'
import {FormEditor} from './FormEditor.js'
import {FormList} from './FormList.js'
import {SubmissionList} from './SubmissionList.js'

type View = 'forms' | 'submissions'

function CleverFormsWorkspace() {
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

export default function App() {
  const config: SanityConfig[] = [{
    projectId: process.env.SANITY_APP_PROJECT_ID || 'REPLACE_WITH_PROJECT_ID',
    dataset: process.env.SANITY_APP_DATASET || 'production'
  }]

  return (
    <ThemeProvider theme={studioTheme}>
      <SanityApp config={config} fallback={<div>Loading CleverForms…</div>}>
        <CleverFormsWorkspace />
      </SanityApp>
    </ThemeProvider>
  )
}
