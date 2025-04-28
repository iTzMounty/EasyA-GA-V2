/*
  # Create Luma Events Table

  1. New Tables
    - `luma_events`
      - `id` (text, primary key) - Luma event ID
      - `name` (text) - Event name
      - `cover_url` (text) - Event cover image URL
      - `start_at` (timestamptz) - Event start time
      - `location_name` (text) - Location name
      - `is_online` (boolean) - Whether the event is online
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record last update timestamp

  2. Security
    - Enable RLS on `luma_events` table
    - Add policy for public read access
    - Add policy for service role write access
*/

CREATE TABLE IF NOT EXISTS luma_events (
  id text PRIMARY KEY,
  name text NOT NULL,
  cover_url text,
  start_at timestamptz NOT NULL,
  location_name text,
  is_online boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE luma_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON luma_events
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow service role full access"
  ON luma_events
  TO service_role
  USING (true)
  WITH CHECK (true);