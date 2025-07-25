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

    console.log('Received request:', { message: !!message, agentId: !!agentId, userId: !!userId });

    if (!message) {
      return new Response(JSON.stringify({ 
        error: 'Message is required',
        fallback: "Please provide a message to chat with the AI agent."
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!userId) {
      return new Response(JSON.stringify({ 
        error: 'User not authenticated',
        fallback: "Please log in to chat with the AI agent."
      }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    let agent = null;
    let context = '';

    // Try to get agent if agentId is provided
    if (agentId) {
      const { data: agentData, error: agentError } = await supabase
        .from('ai_agents')
        .select('*')
        .eq('id', agentId)
        .eq('user_id', userId)
        .single();

      if (agentError) {
        console.log('Agent lookup error:', agentError);
      } else {
        agent = agentData;
        console.log('Found agent:', agent.name);
      }
    }

    // Get knowledge bases for this user regardless of agent
    const { data: knowledgeBases, error: kbError } = await supabase
      .from('knowledge_bases')
      .select('*')
      .eq('user_id', userId);

    if (kbError) {
      console.error('Error fetching knowledge bases:', kbError);
    } else {
      console.log('Found knowledge bases:', knowledgeBases?.length || 0);
      
      // Prepare context from knowledge bases
      if (knowledgeBases && knowledgeBases.length > 0) {
        context = knowledgeBases
          .map(kb => `### ${kb.name}\n${kb.content}`)
          .join('\n\n');
      }
    }

    // Use the hardcoded OpenAI API key
    const OPENAI_API_KEY = "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";

    // Create system prompt with agent configuration and knowledge base
    const agentName = agent?.name || 'AI Assistant';
    const agentDescription = agent?.description || 'A helpful AI assistant';
    const agentGuidelines = agent?.guidelines || 'Be helpful and accurate';
    const agentGoals = agent?.goals || 'Assist users with their questions';
    const fallbackMessage = agent?.fallback_message || 'I apologize, but I cannot assist with that request. Please try rephrasing your question or contact support.';

    const systemPrompt = `You are ${agentName}, an AI assistant created to help users.

Description: ${agentDescription}

Guidelines: ${agentGuidelines}

Goals: ${agentGoals}

${context ? `Knowledge Base:
${context}

Instructions: Use the information from the knowledge base above to answer questions. If the user asks about something not covered in the knowledge base, you can use your general knowledge but mention that the information might not be from the official knowledge base.` : 'You can use your general knowledge to help users, but let them know if they haven\'t provided specific knowledge bases yet.'}

If you cannot help with a request, respond with: "${fallbackMessage}"

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
      agentName: agentName,
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