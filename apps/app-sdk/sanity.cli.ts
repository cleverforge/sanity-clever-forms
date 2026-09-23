import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  app: {
    organizationId: 'o1fxxii3v',
    entry: './src/App.tsx',
    title: 'CleverForms',
    visibility: 'unlisted'
  }
})
