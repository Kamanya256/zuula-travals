
CREATE TABLE public.wildlife_spotlight (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  animal_name text NOT NULL,
  description text,
  habitat text,
  location text,
  fun_facts text,
  image_url text,
  conservation_status text,
  best_time_to_visit text,
  booking_package_id uuid REFERENCES public.tour_packages(id),
  is_active boolean DEFAULT false,
  featured_date date DEFAULT CURRENT_DATE,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.wildlife_spotlight ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read wildlife_spotlight"
  ON public.wildlife_spotlight FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins manage wildlife_spotlight"
  ON public.wildlife_spotlight FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
