import {Card, Container, Heading, Stack, Text} from '@sanity/ui'

export default function App() {
  return (
    <Container width={5} padding={4}>
      <Stack space={4}>
        <Heading as="h1" size={4}>CleverForms</Heading>
        <Card padding={4} radius={2} shadow={1}>
          <Stack space={3}>
            <Heading as="h2" size={2}>Forms dashboard</Heading>
            <Text muted>Milestone 1 foundation is active. Form management arrives in the App SDK milestone.</Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  )
}
