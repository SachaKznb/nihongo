# Nihongo - WaniKani for French Learners

## Project Overview

A spaced repetition system (SRS) for French speakers learning Japanese kanji and vocabulary, inspired by WaniKani. The app teaches radicals, kanji, and vocabulary through mnemonics in French.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Auth**: NextAuth.js (Auth.js v5)
- **Styling**: Tailwind CSS

## Project Structure

```
nihongo/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/          # Auth pages (login, register)
│   │   ├── (main)/          # Protected pages (dashboard, lessons, reviews)
│   │   ├── api/             # API routes
│   │   └── globals.css
│   ├── components/          # React components
│   │   ├── ui/              # Reusable UI components
│   │   ├── lessons/         # Lesson-related components
│   │   ├── reviews/         # Review-related components
│   │   └── dashboard/       # Dashboard components
│   ├── lib/                 # Utility functions
│   │   ├── auth.ts          # NextAuth configuration
│   │   ├── db.ts            # Prisma client
│   │   ├── srs.ts           # SRS logic
│   │   ├── unlocks.ts       # Unlock logic
│   │   └── audio.ts         # Audio playback
│   └── types/               # TypeScript types
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Seed data
└── public/
    └── radicals/            # Radical images
```

## Key Concepts

### SRS Stages (WaniKani-style)
| Stage | Name | Interval | Color |
|-------|------|----------|-------|
| 0 | Verrouille | - | gray |
| 1 | Apprenti 1 | 4h | pink |
| 2 | Apprenti 2 | 8h | pink |
| 3 | Apprenti 3 | 1 day | pink |
| 4 | Apprenti 4 | 2 days | pink |
| 5 | Guru 1 | 1 week | purple |
| 6 | Guru 2 | 2 weeks | purple |
| 7 | Maitre | 1 month | blue |
| 8 | Shodan | 4 months | yellow |
| 9 | Satori | Complete | black |

**Wrong answer penalties:**
- Apprentice (1-4): Drop 1 stage
- Guru (5-6): Drop 2 stages
- Master (7): Drop to Guru 1
- Shodan (8): Drop to Apprentice 4

### Unlock System
- **Radicals** unlock immediately when user reaches a new level
- **Kanji** unlock when ALL component radicals reach Guru (stage 5+)
- **Vocabulary** unlocks when ALL component kanji reach Guru (stage 5+)
- **Level up** when 90% of current level's kanji reach Guru

### Content (Levels 1-10)
| Level | Radicals | Kanji | Vocabulary |
|-------|----------|-------|------------|
| 1 | 10 | 6 | 6 |
| 2 | 8 | 6 | 9 |
| 3 | 10 | 10 | 16 |
| 4-10 | 10-11 | 10 | 16 |

**Total:** ~99 radicals, ~92 kanji, ~143 vocabulary

All content has French mnemonics designed for French speakers.

## Development Commands

```bash
# Start development server
npm run dev

# Push database schema
npm run db:push

# Seed database
npm run db:seed

# Open Prisma Studio
npm run db:studio

# Build for production
npm run build
```

## API Routes

- `GET /api/lessons` - Get available lessons
- `POST /api/lessons/complete` - Complete a lesson
- `GET /api/reviews` - Get pending reviews
- `POST /api/reviews/submit` - Submit review answer
- `GET /api/progress` - Get user progress
- `GET/PUT /api/settings` - User settings

## Environment Variables

Required in `.env`:
- `DATABASE_URL` - PostgreSQL connection string
- `AUTH_SECRET` - NextAuth secret key
- `NEXTAUTH_URL` - Application URL

## Adding Content

To add new radicals, kanji, or vocabulary:
1. Edit `prisma/seed.ts`
2. Add items with French meanings and mnemonics
3. Run `npm run db:seed`

## Notes for Development

- All text content is in French
- Mnemonics should be culturally relevant for French speakers
- Reading inputs accept both hiragana and romaji
- Answer checking includes typo tolerance using Levenshtein distance

---

## Recent Implementation (Feb 2025)

### Completed Features

#### 1. Email Verification System
- Users must verify email before accessing the app
- Verification emails sent via Resend API
- 24-hour token expiry
- Resend verification option
- Files: `src/app/api/auth/verify-email/`, `src/app/api/auth/resend-verification/`, `src/app/(auth)/verify-email/`

#### 2. Account Settings (in Settings page, "Compte" tab)
- View account info (email, username, member since)
- Change username
- Change email (requires password, sends verification)
- Change password (requires current password)
- Export data as JSON (GDPR compliance)
- Delete account (requires password + "SUPPRIMER" confirmation)
- Files: `src/app/api/account/*`, `src/app/(main)/settings/page.tsx`

#### 3. Admin Dashboard (code complete, needs schema push)
- Dashboard with stats (users, content, activity)
- User management (list, view, suspend/unsuspend, reset password)
- Content management (CRUD for levels, radicals, kanji, vocabulary)
- Mnemonic editing
- CSV import/export
- Audit logging for all admin actions
- Files: `src/app/(admin)/admin/*`, `src/app/api/admin/*`, `src/lib/admin-auth.ts`, `src/lib/audit.ts`

### Database Schema Changes (in prisma/schema.prisma)
New fields on User model:
- `emailVerified` - DateTime for email verification
- `isAdmin` - Boolean for admin access
- `isSuspended`, `suspendedAt`, `suspendedBy`, `suspendReason` - Suspension system

New models:
- `EmailVerificationToken` - For email verification flow
- `EmailChangeToken` - For email change flow
- `AdminAuditLog` - For tracking admin actions

### Utility Scripts
- `scripts/set-admin.ts` - Set a user as admin: `npx tsx scripts/set-admin.ts email@example.com`
- `scripts/reset-pw.ts` - Reset password locally (dev only)

---

## TODO: Production Setup Required

### CRITICAL: Push Schema to Production
The local schema has new columns (isAdmin, isSuspended, etc.) that don't exist in production yet.

**To fix:**
1. Get your Supabase production DATABASE_URL (with password)
2. Run: `DATABASE_URL="your-production-url" npx prisma db push`
3. Then set yourself as admin in Supabase SQL Editor:
   ```sql
   UPDATE "User" SET "isAdmin" = true WHERE email = 'sacha@kaizen-media.co';
   ```
4. Reset your password if needed:
   ```sql
   UPDATE "User" SET "passwordHash" = '$2a$10$N9qo8uLOickgx2ZMRZoMy.MqrqvnrKLKQF7kL7JMYqh9F8eFmXwdO' WHERE email = 'sacha@kaizen-media.co';
   ```
   (Sets password to `TempPass123!`)

### After Schema Push
1. Log out and log back in to get fresh session with `isAdmin: true`
2. Access admin at https://www.trynihongo.fr/admin

### Environment Variables on Vercel
Ensure these are set:
- `RESEND_API_KEY` - For sending emails (password reset, verification)
- `DATABASE_URL` - Production Supabase URL
- `AUTH_SECRET` - NextAuth secret
- `NEXTAUTH_URL` - https://www.trynihongo.fr

---

## Admin API Routes

- `GET /api/admin/stats` - Dashboard statistics
- `GET/POST /api/admin/users` - List/search users
- `GET/PUT /api/admin/users/[id]` - Get/update user
- `POST /api/admin/users/[id]/suspend` - Suspend user
- `POST /api/admin/users/[id]/unsuspend` - Unsuspend user
- `POST /api/admin/users/[id]/reset-password` - Reset user password
- `GET/POST /api/admin/content/levels` - List/create levels
- `GET/PUT/DELETE /api/admin/content/levels/[id]` - CRUD level
- `GET/POST /api/admin/content/radicals` - List/create radicals
- `GET/PUT/DELETE /api/admin/content/radicals/[id]` - CRUD radical
- `GET/POST /api/admin/content/kanji` - List/create kanji
- `GET/PUT/DELETE /api/admin/content/kanji/[id]` - CRUD kanji
- `GET/POST /api/admin/content/vocabulary` - List/create vocabulary
- `GET/PUT/DELETE /api/admin/content/vocabulary/[id]` - CRUD vocabulary
- `GET /api/admin/audit` - View audit logs
