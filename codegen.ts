import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
   schema: 'http://localhost:5251/graphql',
   documents: ['src/**/*.ts'],
   generates: {
      './src/gql/': {
        preset: 'client',
      }
   }
}
export default config
