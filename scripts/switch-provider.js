/**
 * Switch Prisma provider based on DATABASE_URL.
 * - If DATABASE_URL starts with "postgresql://" or "postgres://", switches to PostgreSQL.
 * - Otherwise, keeps SQLite (for local development).
 *
 * This allows the same schema to work with both:
 * - Local dev: SQLite (file:./dev.db)
 * - Production (Vercel + Supabase): PostgreSQL
 */
const fs = require('fs')
const path = require('path')

const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma')
const dbUrl = process.env.DATABASE_URL || ''

const isPostgres = dbUrl.startsWith('postgresql://') || dbUrl.startsWith('postgres://')

let schema = fs.readFileSync(schemaPath, 'utf-8')

if (isPostgres) {
  // Switch to PostgreSQL provider
  schema = schema.replace(
    /provider\s*=\s*"sqlite"/,
    'provider = "postgresql"'
  )

  // Add relationMode for PgBouncer compatibility (Supabase uses PgBouncer)
  // This allows Prisma to work with connection pooling
  if (!schema.includes('relationMode')) {
    // Add relationMode to the datasource block
    schema = schema.replace(
      /datasource db \{[\s\S]*?url\s*=\s*env\("DATABASE_URL"\)\s*\n\}/,
      `datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
  relationMode = "prisma"
}
`
    )
  }

  console.log('✅ Prisma provider switched to PostgreSQL (production) with PgBouncer support')
} else {
  // Ensure it's SQLite for local dev
  schema = schema.replace(
    /provider\s*=\s*"postgresql"/,
    'provider = "sqlite"'
  )
  // Remove relationMode and directUrl for SQLite
  schema = schema.replace(/\s*directUrl\s*=\s*env\("DIRECT_URL"\)\s*\n/g, '\n')
  schema = schema.replace(/\s*relationMode\s*=\s*"prisma"\s*\n/g, '\n')
  console.log('✅ Prisma provider kept as SQLite (local dev)')
}

fs.writeFileSync(schemaPath, schema)
