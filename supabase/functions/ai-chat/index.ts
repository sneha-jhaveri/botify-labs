import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, agentId, userId } = await req.json();

    if (!message || !agentId || !userId) {
      throw new Error('Message, agentId, and userId are required');
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Get agent details
    const { data: agent, error: agentError } = await supabase
      .from('ai_agents')
      .select('*')
      .eq('id', agentId)
      .eq('user_id', userId)
      .single();

    if (agentError || !agent) {
      throw new Error('Agent not found or access denied');
    }

    // Get knowledge bases for this user
    const { data: knowledgeBases, error: kbError } = await supabase
      .from('knowledge_bases')
      .select('*')
      .eq('user_id', userId);

    if (kbError) {
      console.error('Error fetching knowledge bases:', kbError);
    }

    // Prepare context from knowledge bases
    let context = '';
    if (knowledgeBases && knowledgeBases.length > 0) {
      context = knowledgeBases
        .map(kb => `### ${kb.name}\n${kb.content}`)
        .join('\n\n');
    }

    // Use the hardcoded OpenAI API key
    const OPENAI_API_KEY = "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";

    // Create system prompt with agent configuration and knowledge base
    const systemPrompt = `You are ${agent.name}, an AI assistant created to help users.

${agent.description ? `Description: ${agent.description}` : ''}

${agent.guidelines ? `Guidelines: ${agent.guidelines}` : ''}

${agent.goals ? `Goals: ${agent.goals}` : ''}

${context ? `Knowledge Base:
${context}

Instructions: Use the information from the knowledge base above to answer questions. If the user asks about something not covered in the knowledge base, you can use your general knowledge but mention that the information might not be from the official knowledge base.` : ''}

If you cannot help with a request, respond with: "${agent.fallback_message}"

Always be helpful, accurate, and follow the guidelines provided.`;

    console.log('Sending request to OpenAI with system prompt length:', systemPrompt.length);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('Generated response length:', aiResponse.length);

    return new Response(JSON.stringify({ 
      response: aiResponse,
      agentName: agent.name,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      fallback: "I apologize, but I'm having trouble processing your request right now. Please try again later."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});