import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  app: {
    organizationId:
      process.env.SANITY_APP_ORGANIZATION_ID || 'REPLACE_WITH_ORGANIZATION_ID',
    entry: './src/App.tsx',
    visibility: 'unlisted'
  }
})
