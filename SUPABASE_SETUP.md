# UX Centerd - Supabase Form Setup Guide

This document explains how to set up and use the Supabase integration for your contact form.

## Quick Setup

Your Supabase credentials have already been configured in the `.env.local` file. The only step you need to complete is creating the contacts table in your Supabase project.

## Step 1: Create the Contacts Table

1. Go to [https://supabase.com/](https://supabase.com/) and sign in with your account
2. Access your project dashboard for: `https://fjwjjebrlvmsvggkmwyz.supabase.co`
3. In the left sidebar, click on "SQL Editor"
4. Create a new query and paste the entire contents of the `contacts_table.sql` file
5. Click "Run" to execute the SQL and create your contacts table

Here's the SQL (also available in the contacts_table.sql file):

```sql
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
```

## Step 2: Test the Connection

You can verify that everything is working by running the included test script:

1. Open your terminal
2. Run: `node test-supabase.js`
3. If successful, you'll see a confirmation message
4. If there's an error, it will help you identify what needs to be fixed

## Step 3: Use Your Form

Once the setup is complete:

1. Start your development server (`npm run dev`)
2. Fill out and submit the contact form
3. The form data will be sent directly to your Supabase database

## Accessing Form Submissions

To view the contact form submissions:

1. Log in to your Supabase dashboard
2. Go to "Table Editor" in the left sidebar
3. Select the "contacts" table
4. You'll see all form submissions listed here
5. You can filter, sort, or export this data as needed

## Troubleshooting

If you encounter any issues:

1. Check that the contacts table was created successfully
2. Verify that your environment variables are correct in .env.local
3. Check your browser console for any JavaScript errors
4. Try running the test script again to validate your connection

## Security Notes

- Your form is configured with appropriate security policies
- Only anonymous submissions are allowed (no data viewing)
- Only you (authenticated as the database owner) can view the submitted data 