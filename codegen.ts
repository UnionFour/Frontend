import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
   schema: 'https://localhost:7207/graphql',
   documents: ['src/**/*.ts'],
   generates: {
      './src/gql/': {
        preset: 'client',
      }
   }
}
export default config
