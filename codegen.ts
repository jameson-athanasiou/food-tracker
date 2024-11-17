import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['src/**/*.graphql'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    'types/types.generated.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        maybeValue: 'T | null | undefined',
      },
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: { extension: '.generated.ts', baseTypesPath: '../types/types.generated.ts' },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: { withHooks: true },
    },
  },
}

export default config
