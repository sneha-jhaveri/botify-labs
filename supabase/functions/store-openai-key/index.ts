import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Store the provided OpenAI API key
    const OPENAI_API_KEY = "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"
    
    // Simple health check endpoint that confirms the key is available
    return new Response(
      JSON.stringify({ success: true, message: "OpenAI API key is configured" }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'An error occurred' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})