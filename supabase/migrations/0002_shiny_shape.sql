/*
  # Add accident details to cases table

  1. Changes
    - Add new columns to cases table for accident details:
      - accident_date (timestamp with time zone)
      - accident_place (text)
      - accident_circumstances (text)
      - accident_opponent_name (text)
      - accident_opponent_licence_plate_number (text)
*/

DO $$ 
BEGIN
  -- Add accident_date column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'cases' AND column_name = 'accident_date'
  ) THEN
    ALTER TABLE cases ADD COLUMN accident_date timestamptz;
  END IF;

  -- Add accident_place column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'cases' AND column_name = 'accident_place'
  ) THEN
    ALTER TABLE cases ADD COLUMN accident_place text;
  END IF;

  -- Add accident_circumstances column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'cases' AND column_name = 'accident_circumstances'
  ) THEN
    ALTER TABLE cases ADD COLUMN accident_circumstances text;
  END IF;

  -- Add accident_opponent_name column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'cases' AND column_name = 'accident_opponent_name'
  ) THEN
    ALTER TABLE cases ADD COLUMN accident_opponent_name text;
  END IF;

  -- Add accident_opponent_licence_plate_number column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'cases' AND column_name = 'accident_opponent_licence_plate_number'
  ) THEN
    ALTER TABLE cases ADD COLUMN accident_opponent_licence_plate_number text;
  END IF;
END $$;