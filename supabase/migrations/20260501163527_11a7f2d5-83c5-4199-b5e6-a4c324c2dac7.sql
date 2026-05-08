
-- Business Spotlight (rotates every 8h)
CREATE TABLE public.business_spotlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sector TEXT NOT NULL,
  country TEXT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT,
  full_article TEXT,
  key_stats JSONB DEFAULT '{}'::jsonb,
  deposits_locations TEXT,
  market_trends TEXT,
  fraud_warnings TEXT,
  government_policies TEXT,
  requirements TEXT,
  prices TEXT,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.business_spotlights ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active spotlights" ON public.business_spotlights
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage spotlights" ON public.business_spotlights
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER trg_business_spotlights_updated BEFORE UPDATE ON public.business_spotlights
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Business News (daily)
CREATE TABLE public.business_news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country TEXT,
  sector TEXT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT,
  full_article TEXT,
  image_url TEXT,
  source_url TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.business_news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active business news" ON public.business_news
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage business news" ON public.business_news
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER trg_business_news_updated BEFORE UPDATE ON public.business_news
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Chatbot conversations & messages
CREATE TABLE public.chatbot_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.chatbot_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own conversations" ON public.chatbot_conversations
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own conversations" ON public.chatbot_conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own conversations" ON public.chatbot_conversations
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins view all conversations" ON public.chatbot_conversations
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER trg_chatbot_conversations_updated BEFORE UPDATE ON public.chatbot_conversations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.chatbot_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.chatbot_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.chatbot_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own messages" ON public.chatbot_messages
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.chatbot_conversations c
    WHERE c.id = chatbot_messages.conversation_id AND c.user_id = auth.uid()
  ));
CREATE POLICY "Users insert own messages" ON public.chatbot_messages
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM public.chatbot_conversations c
    WHERE c.id = chatbot_messages.conversation_id AND c.user_id = auth.uid()
  ));
CREATE POLICY "Admins view all messages" ON public.chatbot_messages
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_chatbot_messages_conv ON public.chatbot_messages(conversation_id, created_at);
CREATE INDEX idx_business_spotlights_active ON public.business_spotlights(is_active, created_at DESC);
CREATE INDEX idx_business_news_published ON public.business_news(published_at DESC);
