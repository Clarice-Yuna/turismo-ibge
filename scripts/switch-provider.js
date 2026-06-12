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
  schema = schema.replace(
    /provider\s*=\s*"sqlite"/,
    'provider = "postgresql"'
  )
  console.log('✅ Prisma provider switched to PostgreSQL (production)')
} else {
  // Ensure it's SQLite for local dev
  schema = schema.replace(
    /provider\s*=\s*"postgresql"/,
    'provider = "sqlite"'
  )
  console.log('✅ Prisma provider kept as SQLite (local dev)')
}

fs.writeFileSync(schemaPath, schema)
