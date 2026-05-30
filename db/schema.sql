-- Enable UUID generation (Postgres)
create extension if not exists "uuid-ossp";

-- Players
create table players (
  id uuid primary key default uuid_generate_v4(),
  username text unique not null,
  display_name text,
  points integer default 0,
  rank integer,
  avatar_url text,
  created_at timestamp default now()
);

-- Player Achievements / Stats
create table player_achievements (
  id uuid primary key default uuid_generate_v4(),
  player_id uuid references players(id),
  event_name text,           -- "UHC", "MACE", "SMP" etc.
  tier text,                 -- "LT4", "LT3", "HT3"
  points integer,
  achieved_at timestamp
);
