/*
  # Add Community Events Support

  1. Changes
    - Add `is_community_event` column to `luma_events` table
    - Add `description` column for event descriptions
    - Add `max_attendees` column for capacity
    - Add `ticket_price` column for paid events
    - Add `created_by` column for user identification

  2. Security
    - Update RLS policies to allow authenticated users to create community events
    - Add policies for users to manage their own events
*/

DO $$ BEGIN
  -- Add new columns if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'luma_events' AND column_name = 'created_by'
  ) THEN
    ALTER TABLE luma_events ADD COLUMN created_by uuid REFERENCES auth.users(id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'luma_events' AND column_name = 'is_community_event'
  ) THEN
    ALTER TABLE luma_events ADD COLUMN is_community_event boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'luma_events' AND column_name = 'description'
  ) THEN
    ALTER TABLE luma_events ADD COLUMN description text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'luma_events' AND column_name = 'max_attendees'
  ) THEN
    ALTER TABLE luma_events ADD COLUMN max_attendees integer;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'luma_events' AND column_name = 'ticket_price'
  ) THEN
    ALTER TABLE luma_events ADD COLUMN ticket_price decimal(10,2) DEFAULT 0;
  END IF;
END $$;

-- Add policy for creating community events
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Users can create community events'
  ) THEN
    CREATE POLICY "Users can create community events" ON luma_events
      FOR INSERT
      TO authenticated
      WITH CHECK (
        is_community_event = true AND
        created_by = auth.uid()
      );
  END IF;
END $$;

-- Add policy for users to update their own community events
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Users can update their own community events'
  ) THEN
    CREATE POLICY "Users can update their own community events" ON luma_events
      FOR UPDATE
      TO authenticated
      USING (created_by = auth.uid() AND is_community_event = true)
      WITH CHECK (is_community_event = true);
  END IF;
END $$;