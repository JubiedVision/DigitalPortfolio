-- Create contacts table for form submissions
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  project TEXT NOT NULL,
  services TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add row level security policies (recommended)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy that allows inserting data
CREATE POLICY "Allow inserts from anyone" ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);
  
-- Create policy that only allows you (authenticated as service role) to select data
CREATE POLICY "Only allow service role to select" ON contacts
  FOR SELECT
  USING (auth.role() = 'service_role'); 