CREATE TABLE public.trip_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  trip_name TEXT NOT NULL,
  country TEXT,
  travel_style TEXT,
  start_date DATE,
  days INTEGER NOT NULL DEFAULT 5,
  travellers INTEGER NOT NULL DEFAULT 2,
  budget_range TEXT,
  interests TEXT[] NOT NULL DEFAULT '{}',
  notes TEXT,
  generated_itinerary JSONB,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.trip_plans TO authenticated;
GRANT ALL ON public.trip_plans TO service_role;

ALTER TABLE public.trip_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own trip plans"
ON public.trip_plans FOR ALL TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all trip plans"
ON public.trip_plans FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_trip_plans_updated_at
BEFORE UPDATE ON public.trip_plans
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_trip_plans_user ON public.trip_plans(user_id);