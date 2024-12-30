-- Create a new storage bucket for case images
INSERT INTO storage.buckets (id, name, public)
VALUES ('case-images', 'case-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies
CREATE POLICY "Authenticated users can upload case images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'case-images'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update their case images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'case-images'
  AND auth.role() = 'authenticated'
  AND owner = auth.uid()
);

CREATE POLICY "Anyone can view case images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'case-images');

CREATE POLICY "Authenticated users can delete their case images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'case-images'
  AND auth.role() = 'authenticated'
  AND owner = auth.uid()
);