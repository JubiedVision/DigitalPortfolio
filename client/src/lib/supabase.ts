import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// You'll need to replace these with your actual Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to submit form data to Supabase
export async function submitContactForm(formData: {
  name: string;
  email: string;
  company?: string;
  project: string;
  services?: string[];
}) {
  // Insert data into your 'contacts' table (or whatever you name it in Supabase)
  const { data, error } = await supabase
    .from('contacts')
    .insert([formData]);

  if (error) {
    throw error;
  }

  return data;
} 