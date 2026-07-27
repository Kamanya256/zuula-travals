
-- INVESTMENT OPPORTUNITIES
CREATE TABLE public.investment_opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  industry text NOT NULL,
  country text,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  summary text,
  market_overview text,
  opportunities text,
  incentives text,
  risks text,
  statistics jsonb,
  min_investment numeric,
  currency text NOT NULL DEFAULT 'USD',
  image_url text,
  is_featured boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.investment_opportunities TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.investment_opportunities TO authenticated;
GRANT ALL ON public.investment_opportunities TO service_role;
ALTER TABLE public.investment_opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "invest_public_read" ON public.investment_opportunities FOR SELECT USING (is_active = true);
CREATE POLICY "invest_admin_all" ON public.investment_opportunities FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- BUSINESS DIRECTORY
CREATE TABLE public.business_directory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  sector text,
  country text,
  city text,
  logo_url text,
  cover_image_url text,
  description text,
  services text,
  products text,
  website text,
  email text,
  phone text,
  address text,
  gallery_images text[],
  is_verified boolean NOT NULL DEFAULT false,
  is_featured boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.business_directory TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.business_directory TO authenticated;
GRANT ALL ON public.business_directory TO service_role;
ALTER TABLE public.business_directory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "bizdir_public_read" ON public.business_directory FOR SELECT USING (is_active = true);
CREATE POLICY "bizdir_admin_all" ON public.business_directory FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- MAGAZINE ISSUES
CREATE TABLE public.magazine_issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  issue_number text,
  category text,
  cover_image_url text,
  summary text,
  content text,
  pdf_url text,
  published_at timestamptz NOT NULL DEFAULT now(),
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.magazine_issues TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.magazine_issues TO authenticated;
GRANT ALL ON public.magazine_issues TO service_role;
ALTER TABLE public.magazine_issues ENABLE ROW LEVEL SECURITY;
CREATE POLICY "magazine_public_read" ON public.magazine_issues FOR SELECT USING (is_published = true);
CREATE POLICY "magazine_admin_all" ON public.magazine_issues FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- ZULA TV
CREATE TABLE public.zula_tv_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  guest_name text,
  organisation text,
  category text,
  description text,
  video_url text,
  thumbnail_url text,
  duration text,
  published_at timestamptz NOT NULL DEFAULT now(),
  is_featured boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.zula_tv_videos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.zula_tv_videos TO authenticated;
GRANT ALL ON public.zula_tv_videos TO service_role;
ALTER TABLE public.zula_tv_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "zulatv_public_read" ON public.zula_tv_videos FOR SELECT USING (is_active = true);
CREATE POLICY "zulatv_admin_all" ON public.zula_tv_videos FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- TESTIMONIALS
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  role text,
  country text,
  quote text NOT NULL,
  avatar_url text,
  rating integer DEFAULT 5,
  is_active boolean NOT NULL DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "testimonials_public_read" ON public.testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "testimonials_admin_all" ON public.testimonials FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- HOMEPAGE HERO SLIDES
CREATE TABLE public.homepage_hero_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  headline text NOT NULL,
  subheadline text,
  image_url text,
  video_url text,
  cta_label text,
  cta_link text,
  display_order integer DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.homepage_hero_slides TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.homepage_hero_slides TO authenticated;
GRANT ALL ON public.homepage_hero_slides TO service_role;
ALTER TABLE public.homepage_hero_slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hero_public_read" ON public.homepage_hero_slides FOR SELECT USING (is_active = true);
CREATE POLICY "hero_admin_all" ON public.homepage_hero_slides FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- updated_at triggers
CREATE TRIGGER trg_invest_updated BEFORE UPDATE ON public.investment_opportunities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_bizdir_updated BEFORE UPDATE ON public.business_directory FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_magazine_updated BEFORE UPDATE ON public.magazine_issues FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_zulatv_updated BEFORE UPDATE ON public.zula_tv_videos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_testimonials_updated BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_hero_updated BEFORE UPDATE ON public.homepage_hero_slides FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
