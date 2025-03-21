// Test script to verify Supabase connection
// Run with: node test-supabase.js

import { createClient } from '@supabase/supabase-js';

// Supabase credentials
const supabaseUrl = 'https://fjwjjebrlvmsvggkmwyz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqd2pqZWJybHZtc3ZnZ2ttd3l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1Nzc3OTAsImV4cCI6MjA1ODE1Mzc5MH0.6DKO3jaCE4LcQWllnnjKvcitFXbHNjb35g1wErqGTYU';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test function
async function testConnection() {
  console.log('Testing Supabase connection...');
  
  try {
    // Simple test query to check if the connection works
    const { error } = await supabase
      .from('contacts')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error('Error connecting to Supabase:', error.message);
      if (error.message.includes('does not exist')) {
        console.log('\nThe contacts table doesn\'t exist yet. You need to run the SQL script to create it.');
        console.log('Copy the contents of contacts_table.sql and execute it in the Supabase SQL Editor.');
      }
    } else {
      console.log('Successfully connected to Supabase!');
      console.log('The contacts table is set up and ready to receive form submissions.');
    }
  } catch (err) {
    console.error('Unexpected error:', err.message);
  }
}

// Run the test
testConnection(); 