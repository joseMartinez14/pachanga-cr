-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (maps to Clerk users)
CREATE TABLE IF NOT EXISTS profiles (
  id text PRIMARY KEY,         -- clerk userId
  username text,
  created_at timestamp with time zone DEFAULT now()
);

-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  mode text CHECK (mode in ('couple','party','trivia')) NOT NULL,
  status text DEFAULT 'active',
  created_at timestamp with time zone DEFAULT now()
);

-- Create room_players table
CREATE TABLE IF NOT EXISTS room_players (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id uuid REFERENCES rooms(id) ON DELETE CASCADE,
  user_id text REFERENCES profiles(id) ON DELETE CASCADE,
  display_name text,
  is_host boolean DEFAULT false,
  joined_at timestamp with time zone DEFAULT now()
);

-- Create rounds table
CREATE TABLE IF NOT EXISTS rounds (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id uuid REFERENCES rooms(id) ON DELETE CASCADE,
  number int,
  payload jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- Create scores table
CREATE TABLE IF NOT EXISTS scores (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id uuid REFERENCES rooms(id) ON DELETE CASCADE,
  user_id text REFERENCES profiles(id) ON DELETE CASCADE,
  points int DEFAULT 0,
  updated_at timestamp with time zone DEFAULT now()
);

-- Create cards table
CREATE TABLE IF NOT EXISTS cards (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  type text,                   -- truth|dare|drinking|charades|spin|kingscup
  intensity text,              -- PG|18+|custom
  text text,
  metadata jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- Create trivia_questions table
CREATE TABLE IF NOT EXISTS trivia_questions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  category text,
  difficulty text,
  question text,
  choices jsonb,               -- ["A","B","C","D"]
  answer_index int,
  created_at timestamp with time zone DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_room_players_room_id ON room_players(room_id);
CREATE INDEX IF NOT EXISTS idx_rounds_room_id ON rounds(room_id);
CREATE INDEX IF NOT EXISTS idx_scores_room_id ON scores(room_id);
CREATE INDEX IF NOT EXISTS idx_cards_type_intensity ON cards(type, intensity);
CREATE INDEX IF NOT EXISTS idx_trivia_questions_category ON trivia_questions(category);