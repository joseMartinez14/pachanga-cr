# Party & Couple Games 🎮

A mobile-friendly PWA featuring party games, couple games, and trivia. Built with Next.js 14, Clerk authentication, and Supabase.

## Features

- **💕 Couple Mode**: Truth or Dare, Couple Quiz, Would You Rather, Story Builder
- **🍻 Party Mode**: Drinking games, Charades, Spin the Bottle, King's Cup
- **🧠 Trivia Mode**: Multiple categories with different game modes
- **🔐 Authentication**: Secure login with Clerk
- **📱 PWA Support**: Install as mobile app
- **🎲 Deterministic Spinner**: Seeded RNG for consistent results
- **⚡ Real-time**: Supabase for live multiplayer features

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Authentication**: Clerk
- **Database**: Supabase (Postgres + Realtime)
- **UI**: TailwindCSS + shadcn/ui
- **Animation**: Framer Motion
- **State**: Zustand
- **Validation**: Zod

## Quick Start

### Prerequisites

- Node.js 18+
- Clerk account
- Supabase project

### 1. Clone and Install

```bash
git clone <your-repo>
cd party-couple-game
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your environment variables:

```env
# Clerk (get from dashboard.clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase (get from supabase.com/dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

1. Go to your Supabase dashboard
2. Run the migration in `sql/001_init.sql` in the SQL editor
3. Seed the database:

```bash
npm run seed
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Architecture

### Authentication Flow

1. Public routes: `/`, `/sign-in`, `/sign-up`
2. Protected routes: All game modes require authentication
3. User profiles created automatically on first sign-in

### Database Schema

- **profiles**: User information (maps to Clerk userId)
- **rooms**: Game sessions for multiplayer
- **room_players**: Players in each room
- **rounds**: Game rounds with payload data
- **scores**: Player scores per room
- **cards**: Truth/dare and drinking game content
- **trivia_questions**: Quiz questions and answers

### Game Logic

- **Deterministic Spinner**: Uses seeded RNG (`lib/rng.ts`) for consistent results across clients
- **Server Actions**: All database writes go through Next.js server actions with Clerk auth
- **Real-time**: Supabase channels for live multiplayer updates

## Game Modes

### Couple Mode (Local Play)
- Intensity selection: PG, Romantic, Spicy
- Truth or Dare with scoring system
- Streak bonuses and skip penalties

### Party Mode (Multiplayer)
- Room-based with host authority
- Spinner selects active player
- Drinking challenges and party games

### Trivia Mode
- Multiple categories and difficulties
- Timer-based with speed bonuses
- Individual and team modes

## Deployment

### Vercel (Recommended)

1. Connect your repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy!

The app is optimized for:
- HTTPS (required for PWA)
- Mobile responsiveness
- Offline functionality
- Add-to-home-screen capability

### Other Platforms

Works on any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## Development

### Project Structure

```
/app                 # Next.js App Router pages
  /couple           # Couple game mode routes
  /party            # Party game mode routes
  /trivia           # Trivia game mode routes
/components         # Reusable UI components
/lib                # Utilities and game logic
  /game-logic/      # Mode-specific game rules
  /schemas/         # Zod validation schemas
/data               # Seed content (JSON files)
/sql                # Database migrations
/scripts            # Seeding and utility scripts
```

### Key Components

- `SpinnerWheel`: Deterministic spinner with Framer Motion
- `PromptCard`: Displays game prompts with actions
- `ScoreBoard`: Leaderboard display
- `Timer`: Countdown with progress ring
- `ModeCard`: Game mode selection cards

### Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run db:setup     # Database migration instructions
npm run seed         # Seed database with content
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Security Notes

- Service role key is server-only (never exposed to client)
- All database writes go through authenticated server actions
- User sessions managed by Clerk
- RLS policies can be added later if needed

## Known Issues & TODOs

- [ ] Add real-time multiplayer for party mode
- [ ] Implement team management for trivia
- [ ] Add sound effects and haptic feedback
- [ ] Create proper app icons and screenshots
- [ ] Add more game content and categories
- [ ] Implement push notifications
- [ ] Add social sharing features

## License

MIT License - see LICENSE file for details.

---

Built with ❤️ using Next.js, Clerk, and Supabase.# pachanga-cr
# pachanga-cr
