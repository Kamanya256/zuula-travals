CREATE TABLE IF NOT EXISTS public.tourism_news_feed (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL DEFAULT 'Tourism',
  summary text,
  content text,
  source_url text,
  image_url text,
  published_at timestamptz NOT NULL DEFAULT now(),
  relevance_score integer NOT NULL DEFAULT 50,
  tags text[] DEFAULT '{}',
  is_published boolean NOT NULL DEFAULT true,
  rewritten_by_ai boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.tourism_news_feed ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published tourism news"
ON public.tourism_news_feed
FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins can view all tourism news"
ON public.tourism_news_feed
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can create tourism news"
ON public.tourism_news_feed
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update tourism news"
ON public.tourism_news_feed
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete tourism news"
ON public.tourism_news_feed
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_tourism_news_feed_updated_at
BEFORE UPDATE ON public.tourism_news_feed
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.package_offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_package_id uuid,
  package_slug text,
  title text NOT NULL,
  offer_details text,
  inclusions text[] DEFAULT '{}',
  gallery_images text[] DEFAULT '{}',
  starting_fee numeric,
  currency text NOT NULL DEFAULT 'USD',
  valid_until date,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.package_offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active package offers"
ON public.package_offers
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage package offers"
ON public.package_offers
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_package_offers_updated_at
BEFORE UPDATE ON public.package_offers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.accommodation_offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id uuid,
  hotel_name text,
  title text NOT NULL,
  offer_details text,
  inclusions text[] DEFAULT '{}',
  gallery_images text[] DEFAULT '{}',
  starting_fee numeric,
  currency text NOT NULL DEFAULT 'USD',
  valid_until date,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.accommodation_offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active accommodation offers"
ON public.accommodation_offers
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage accommodation offers"
ON public.accommodation_offers
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_accommodation_offers_updated_at
BEFORE UPDATE ON public.accommodation_offers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_tourism_news_feed_published ON public.tourism_news_feed (is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_package_offers_slug ON public.package_offers (package_slug, is_active);
CREATE INDEX IF NOT EXISTS idx_accommodation_offers_hotel_name ON public.accommodation_offers (hotel_name, is_active);