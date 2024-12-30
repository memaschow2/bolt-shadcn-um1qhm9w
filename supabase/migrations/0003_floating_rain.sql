/*
  # Add case images support
  
  1. New Tables
    - `case_images`
      - `id` (uuid, primary key)
      - `case_id` (uuid, foreign key to cases)
      - `url` (text, image URL)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `case_images` table
    - Add policies for authenticated users to manage their case images
*/

CREATE TABLE IF NOT EXISTS case_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE case_images ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own case images
CREATE POLICY "Users can read own case images"
  ON case_images
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM cases
      WHERE cases.id = case_images.case_id
      AND cases.user_id = auth.uid()
    )
  );

-- Policy: Users can insert images for their own cases
CREATE POLICY "Users can insert own case images"
  ON case_images
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM cases
      WHERE cases.id = case_images.case_id
      AND cases.user_id = auth.uid()
    )
  );

-- Policy: Users can delete their own case images
CREATE POLICY "Users can delete own case images"
  ON case_images
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM cases
      WHERE cases.id = case_images.case_id
      AND cases.user_id = auth.uid()
    )
  );