/*
  # Add event attendees table and functionality

  1. New Tables
    - `event_attendees`
      - `id` (uuid, primary key)
      - `event_id` (text, references luma_events)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `event_attendees` table
    - Add policies for authenticated users to manage their attendance
*/

CREATE TABLE IF NOT EXISTS event_attendees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id text REFERENCES luma_events(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view event attendees"
  ON event_attendees
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their attendance"
  ON event_attendees
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());