-- Create storage bucket for knowledge base files
INSERT INTO storage.buckets (id, name, public) VALUES ('knowledge-files', 'knowledge-files', false);

-- Create policies for knowledge base file uploads
CREATE POLICY "Users can upload their own knowledge files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'knowledge-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own knowledge files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'knowledge-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own knowledge files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'knowledge-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own knowledge files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'knowledge-files' AND auth.uid()::text = (storage.foldername(name))[1]);