-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  referral_source TEXT,
  agreed_to_privacy BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create knowledge bases table
CREATE TABLE public.knowledge_bases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  content TEXT,
  source_type TEXT DEFAULT 'upload', -- 'upload', 'scrape', 'manual'
  source_url TEXT,
  is_editable BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for knowledge bases
ALTER TABLE public.knowledge_bases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own knowledge bases" 
ON public.knowledge_bases 
FOR ALL 
USING (auth.uid() = user_id);

-- Create AI agents table
CREATE TABLE public.ai_agents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  guidelines TEXT,
  goals TEXT,
  fallback_message TEXT DEFAULT 'I apologize, but I cannot assist with that request. Please try rephrasing your question or contact support.',
  
  -- Appearance settings
  primary_color TEXT DEFAULT '#3b82f6',
  custom_icon_url TEXT,
  font_family TEXT DEFAULT 'Inter',
  ui_theme JSONB DEFAULT '{}',
  
  -- Tools and capabilities
  tools JSONB DEFAULT '[]',
  has_voice_ai BOOLEAN DEFAULT false,
  has_vision BOOLEAN DEFAULT false,
  has_calendar BOOLEAN DEFAULT false,
  has_lead_capture BOOLEAN DEFAULT false,
  
  -- Workflow configuration
  workflow_config JSONB DEFAULT '{}',
  
  -- Deployment settings
  is_deployed BOOLEAN DEFAULT false,
  deployment_url TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for AI agents
ALTER TABLE public.ai_agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own AI agents" 
ON public.ai_agents 
FOR ALL 
USING (auth.uid() = user_id);

-- Create agent knowledge mapping table
CREATE TABLE public.agent_knowledge_bases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID NOT NULL REFERENCES public.ai_agents(id) ON DELETE CASCADE,
  knowledge_base_id UUID NOT NULL REFERENCES public.knowledge_bases(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(agent_id, knowledge_base_id)
);

-- Enable RLS for agent knowledge mapping
ALTER TABLE public.agent_knowledge_bases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their agent knowledge mappings" 
ON public.agent_knowledge_bases 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.ai_agents 
    WHERE ai_agents.id = agent_id AND ai_agents.user_id = auth.uid()
  )
);

-- Create function to handle new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, full_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'preferred_username',
    NEW.raw_user_meta_data ->> 'full_name'
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_knowledge_bases_updated_at
  BEFORE UPDATE ON public.knowledge_bases
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ai_agents_updated_at
  BEFORE UPDATE ON public.ai_agents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();