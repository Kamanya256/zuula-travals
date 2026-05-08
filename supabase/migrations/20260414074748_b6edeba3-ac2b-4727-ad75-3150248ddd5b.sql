
INSERT INTO storage.buckets (id, name, public) VALUES ('wildlife-images', 'wildlife-images', true);

CREATE POLICY "Public read wildlife images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'wildlife-images');

CREATE POLICY "Service role can upload wildlife images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'wildlife-images');

CREATE POLICY "Service role can update wildlife images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'wildlife-images');
