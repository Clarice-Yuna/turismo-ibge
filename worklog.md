---
Task ID: 1
Agent: Main Agent
Task: Fix site for direct link access and prepare for Supabase + Vercel deployment

Work Log:
- Identified issue: Prisma schema was set to PostgreSQL but .env had SQLite URL (mismatch)
- Created scripts/switch-provider.js that auto-detects DATABASE_URL and switches Prisma provider
- Reverted schema.prisma to SQLite (for local dev)
- Updated package.json build/postinstall scripts to run switch-provider.js before prisma generate
- On Vercel: DATABASE_URL starts with "postgresql://" → auto-switches to PostgreSQL provider
- Locally: DATABASE_URL starts with "file:" → keeps SQLite provider
- Generated complete supabase-seed.sql file with all tables + data (28 states, 27 capitals, 30 questions, 20 curiosities, 8 quiz attempts, 5 users)
- Regenerated Prisma Client for SQLite - local dev confirmed working
- Updated .env.example for production use

Stage Summary:
- Site works locally with SQLite (auto-detected)
- Site will work on Vercel with PostgreSQL/Supabase (auto-detected)
- supabase-seed.sql ready to paste into Supabase SQL Editor (zero terminal needed)
- switch-provider.js handles the SQLite↔PostgreSQL switch automatically
