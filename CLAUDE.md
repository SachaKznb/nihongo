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

### SRS Stages
- 0: Locked
- 1-4: Apprentice (4h, 8h, 1d, 2d)
- 5-6: Guru (1w, 2w)
- 7: Master (1 month)
- 8: Enlightened (4 months)
- 9: Burned (complete)

### Unlock System
- Radicals unlock when user reaches a new level
- Kanji unlock when ALL component radicals are at Guru+
- Vocabulary unlocks when ALL component kanji are at Guru+
- Next level unlocks when 90% of current level kanji are at Guru+

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
