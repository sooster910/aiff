module.exports = {
  src: './',
  artifactDirectory: '__generated__',
  schema: 'schema.graphql',
  schemaExtensions: ['./schema.extensions.graphql'],
  exclude: [
    '**/node_modules/**',
    '**/.next/**',
    '**/__mocks__/**',
    '**/__generated__/**',
    '**/.history/**',
  ],
  language: 'typescript',
}
