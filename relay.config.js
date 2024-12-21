module.exports = {
  src: './',
  artifactDirectory: '__generated__',
  schema: 'schema.graphql',               // 기존 백엔드 schema
  schemaExtensions: ['./schema.extensions.graphql'],
  exclude: [
    '**/node_modules/**',
    '**/.next/**',
    '**/__mocks__/**',
    '**/__generated__/**',
  ],
  language: 'typescript',
}
