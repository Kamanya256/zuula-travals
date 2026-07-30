ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'vendor';

CREATE TABLE public.trip_plan_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_plan_id UUID NOT NULL REFERENCES public.trip_plans(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  label TEXT,
  itinerary JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_trip_plan_versions_plan ON public.trip_plan_versions(trip_plan_id, version DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.trip_plan_versions TO authenticated;
GRANT ALL ON public.trip_plan_versions TO service_role;
ALTER TABLE public.trip_plan_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own trip versions" ON public.trip_plan_versions
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins view all trip versions" ON public.trip_plan_versions
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.vendor_sites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  business_name TEXT NOT NULL,
  tagline TEXT,
  about TEXT,
  category TEXT,
  logo_url TEXT,
  cover_url TEXT,
  phone TEXT,
  email TEXT,
  whatsapp TEXT,
  website TEXT,
  address TEXT,
  city TEXT,
  country TEXT,
  opening_hours TEXT,
  services JSONB NOT NULL DEFAULT '[]'::jsonb,
  gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
  socials JSONB NOT NULL DEFAULT '{}'::jsonb,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_vendor_sites_user ON public.vendor_sites(user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.vendor_sites TO authenticated;
GRANT SELECT ON public.vendor_sites TO anon;
GRANT ALL ON public.vendor_sites TO service_role;
ALTER TABLE public.vendor_sites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published vendor sites are public" ON public.vendor_sites
  FOR SELECT USING (published = true);
CREATE POLICY "Vendors view their own site" ON public.vendor_sites
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Vendors create their own site" ON public.vendor_sites
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Vendors update their own site" ON public.vendor_sites
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Vendors delete their own site" ON public.vendor_sites
  FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins manage all vendor sites" ON public.vendor_sites
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_vendor_sites_updated_at BEFORE UPDATE ON public.vendor_sites
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();