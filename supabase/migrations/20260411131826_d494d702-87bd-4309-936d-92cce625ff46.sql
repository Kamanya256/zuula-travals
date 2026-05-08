
-- =============================================
-- CORE REFERENCE TABLES
-- =============================================

-- Providers (hotels, tour companies, restaurants, etc.)
CREATE TABLE public.providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  business_type text NOT NULL, -- hotel, tour_company, restaurant, bar, car_rental, venue
  contact_email text,
  contact_phone text,
  address text,
  description text,
  is_verified boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Vendors
CREATE TABLE public.vendors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  company_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Countries
CREATE TABLE public.countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  capital text,
  currency text,
  language text,
  visa_information text,
  tourism_board text,
  political_status text,
  economy text,
  culture text,
  security_info text,
  health_info text,
  climate text,
  travel_tips text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Destinations
CREATE TABLE public.destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country text NOT NULL,
  city text NOT NULL,
  description text,
  slug text UNIQUE,
  latitude numeric(10,7),
  longitude numeric(10,7),
  population integer,
  history text,
  economy text,
  culture text,
  security_info text,
  seo_title text,
  seo_description text,
  seo_keywords text,
  hero_video_url text,
  country_id uuid REFERENCES public.countries(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(country, city)
);

-- Destination Info blocks
CREATE TABLE public.destination_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid NOT NULL REFERENCES public.destinations(id) ON DELETE CASCADE,
  block_type text, -- history, heritage, economy, transport, healthcare, etc.
  content text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Destination Distances
CREATE TABLE public.destination_distances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid NOT NULL REFERENCES public.destinations(id),
  place_id integer,
  place_type text, -- hospital, market, police, airport, shopping, attraction
  distance_km numeric(6,2),
  travel_time_minutes integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- =============================================
-- AIRLINES & FLIGHTS
-- =============================================

CREATE TABLE public.airlines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  code text,
  country text,
  website text,
  logo_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.flights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origin_id uuid REFERENCES public.destinations(id),
  destination_id uuid REFERENCES public.destinations(id),
  airline_id uuid REFERENCES public.airlines(id),
  airline text,
  flight_number text,
  flight_type text NOT NULL DEFAULT 'domestic', -- domestic, international
  departure_time timestamptz NOT NULL,
  arrival_time timestamptz NOT NULL,
  duration_minutes integer,
  price numeric(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  seats_total integer NOT NULL DEFAULT 0,
  seats_available integer NOT NULL DEFAULT 0,
  aircraft_type text,
  status text DEFAULT 'scheduled', -- scheduled, delayed, cancelled
  last_updated timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.flight_price_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  flight_id uuid REFERENCES public.flights(id) ON DELETE CASCADE,
  price numeric(10,2),
  recorded_at timestamptz NOT NULL DEFAULT now()
);

-- =============================================
-- HOTELS & ROOMS
-- =============================================

CREATE TABLE public.hotels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid NOT NULL REFERENCES public.destinations(id),
  name text NOT NULL,
  address text,
  rating numeric(2,1),
  description text,
  provider_id uuid REFERENCES public.providers(id),
  vendor_id uuid REFERENCES public.vendors(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.hotel_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id uuid NOT NULL REFERENCES public.hotels(id),
  room_type text NOT NULL,
  capacity integer NOT NULL,
  price_per_night numeric(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  available_quantity integer DEFAULT 0,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- =============================================
-- CARS & DRIVERS
-- =============================================

CREATE TABLE public.cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid NOT NULL REFERENCES public.destinations(id),
  make text,
  model text,
  plate_number text UNIQUE,
  year integer,
  seating_capacity integer,
  transmission text DEFAULT 'manual',
  description text,
  image_url text,
  is_available boolean DEFAULT true,
  category text DEFAULT 'SUV',
  available_quantity integer DEFAULT 1,
  fuel_type text DEFAULT 'Petrol',
  engine_capacity text,
  features text,
  driver_included boolean DEFAULT false,
  daily_rate_with_driver numeric(10,2),
  provider_id uuid REFERENCES public.providers(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.car_hire_rates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id uuid NOT NULL REFERENCES public.cars(id),
  base_rate_per_day numeric(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  available_quantity integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.car_hire_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  includes_driver boolean NOT NULL DEFAULT false,
  includes_fuel boolean NOT NULL DEFAULT false,
  extra_cost numeric(10,2) DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.drivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text UNIQUE,
  license_number text,
  experience_years integer DEFAULT 0,
  languages text,
  rating numeric(2,1),
  daily_rate numeric(10,2) NOT NULL,
  is_available boolean DEFAULT true,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.car_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id uuid NOT NULL REFERENCES public.cars(id),
  driver_id uuid REFERENCES public.drivers(id),
  pricing_type text NOT NULL DEFAULT 'dry', -- dry, wet
  start_date date NOT NULL,
  end_date date NOT NULL,
  total_amount numeric(10,2) NOT NULL,
  currency text DEFAULT 'USD',
  status text DEFAULT 'pending',
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- =============================================
-- BOOKING SYSTEM (extended)
-- =============================================

CREATE TABLE public.booking_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES public.bookings(id),
  service_type text NOT NULL, -- hotel_room, flight, car_hire, venue, tour
  service_id uuid NOT NULL,
  quantity integer DEFAULT 1,
  unit_price numeric(10,2) NOT NULL,
  start_date date,
  end_date date,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.booking_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  table_name text,
  old_status text,
  new_status text,
  changed_by uuid,
  change_time timestamptz NOT NULL DEFAULT now()
);

-- =============================================
-- PAYMENTS
-- =============================================

CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES public.bookings(id),
  amount numeric(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  method text,
  status text NOT NULL DEFAULT 'pending', -- pending, paid, failed
  payment_date timestamptz DEFAULT now(),
  transaction_id text,
  provider text, -- mtn_momo, airtel, visa, flutterwave, stripe
  reference text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- =============================================
-- COURIER SYSTEM
-- =============================================

CREATE TABLE public.courier_fleet (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_name text NOT NULL,
  vehicle_category text NOT NULL, -- Motorcycle, Car, Truck, Regional
  base_fare numeric(10,2) NOT NULL,
  price_per_km numeric(10,2) NOT NULL,
  max_weight_kg integer,
  image_url text,
  is_available boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.courier_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES auth.users(id),
  driver_id uuid,
  vehicle_id uuid NOT NULL REFERENCES public.courier_fleet(id),
  pickup_address text NOT NULL,
  dropoff_address text NOT NULL,
  pickup_coords text,
  dropoff_coords text,
  is_surprise boolean DEFAULT false,
  receiver_name text,
  receiver_phone text,
  special_instructions text,
  parcel_items text,
  estimated_distance_km numeric(6,2),
  estimated_delivery_time timestamptz,
  total_price numeric(10,2) NOT NULL,
  payment_status text DEFAULT 'Unpaid',
  payment_method text,
  delivery_status text DEFAULT 'Pending',
  tracking_id text NOT NULL UNIQUE,
  current_location text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.courier_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES public.courier_bookings(id) ON DELETE CASCADE,
  status_update text NOT NULL,
  current_location text,
  update_time timestamptz NOT NULL DEFAULT now()
);

-- =============================================
-- PLACES, PARKS, AIRPORTS
-- =============================================

CREATE TABLE public.places_of_interest (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid NOT NULL REFERENCES public.destinations(id),
  name text,
  type text, -- attraction, hospital, bank, restaurant, etc.
  description text,
  latitude numeric(10,7),
  longitude numeric(10,7),
  opening_hours text,
  is_featured boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.national_parks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  country_id uuid REFERENCES public.countries(id),
  destination_id uuid REFERENCES public.destinations(id),
  description text,
  wildlife text,
  entry_fee numeric(10,2),
  latitude numeric(10,7),
  longitude numeric(10,7),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.nearby_airports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid REFERENCES public.destinations(id),
  airport_name text,
  iata_code text,
  distance_km numeric(6,2),
  transport_options text,
  booking_links text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- =============================================
-- TOURS & EVENTS
-- =============================================

CREATE TABLE public.tours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE,
  title text,
  short_description text,
  full_description text,
  duration_days integer,
  location text,
  hero_image text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.tour_itinerary_days (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_package_id uuid NOT NULL REFERENCES public.tour_packages(id) ON DELETE CASCADE,
  day_number integer NOT NULL,
  title text,
  description text,
  meals_included text,
  accommodation text,
  activities text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.tour_package_destinations (
  tour_package_id uuid NOT NULL REFERENCES public.tour_packages(id),
  destination_id uuid NOT NULL REFERENCES public.destinations(id),
  day_number integer,
  PRIMARY KEY (tour_package_id, destination_id)
);

CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid REFERENCES public.destinations(id),
  name text,
  description text,
  start_date date,
  end_date date,
  venue text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- =============================================
-- CONTENT & MEDIA
-- =============================================

CREATE TABLE public.media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text, -- hotel, tour_package, destination, car, venue, place, flight
  entity_id uuid NOT NULL,
  media_type text NOT NULL, -- image, video
  url text NOT NULL,
  caption text,
  is_featured boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.ai_knowledge (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic text,
  content text,
  keywords text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL, -- destination, hotel, tour, car, venue, courier, blog, platform
  entity_id uuid,
  question text NOT NULL,
  answer text NOT NULL,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- =============================================
-- PRICING & PROMOS
-- =============================================

CREATE TABLE public.pricing_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_type text, -- hotel, car, tour
  service_id uuid,
  rule_type text, -- discount, seasonal, promo
  value numeric(10,2),
  value_type text, -- percent, fixed
  start_date date,
  end_date date,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.promo_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE,
  discount_percent integer,
  valid_from date,
  valid_to date,
  max_usage integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- =============================================
-- MISC
-- =============================================

CREATE TABLE public.availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_type text, -- hotel_room, car, tour, venue
  service_id uuid,
  available_date date,
  available_quantity integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.external_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text,
  entity_id uuid,
  provider_name text,
  url text,
  affiliate_code text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.venues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid NOT NULL REFERENCES public.destinations(id),
  name text NOT NULL,
  venue_type text,
  capacity integer,
  price_per_day numeric(10,2),
  currency text,
  description text,
  provider_id uuid REFERENCES public.providers(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.volunteer_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  destination_id uuid REFERENCES public.destinations(id),
  organization text,
  description text,
  duration_days integer,
  price numeric(10,2),
  currency text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.wildlife (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  scientific_name text,
  description text,
  habitat text,
  diet text,
  lifespan text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.travel_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  booking_id uuid REFERENCES public.bookings(id),
  message text,
  sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.search_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword text NOT NULL,
  entity_type text,
  entity_id uuid,
  user_ip text,
  user_id uuid REFERENCES auth.users(id),
  results_count integer DEFAULT 0,
  searched_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.surprise_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  description text,
  price numeric(8,2),
  includes jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.provider_ai_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES public.providers(id),
  auto_pricing boolean DEFAULT false,
  auto_response boolean DEFAULT true,
  smart_recommendation boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.restaurants_extended (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid REFERENCES public.destinations(id),
  name text,
  cuisine_type text,
  price_range text,
  description text,
  rating numeric(2,1),
  provider_id uuid REFERENCES public.providers(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- =============================================
-- RLS POLICIES - Admin-only access via edge function
-- All these tables are managed through admin-api edge function
-- Public read for service tables (flights, hotels, cars, destinations, etc.)
-- =============================================

ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destination_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destination_distances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.airlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flight_price_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotel_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_hire_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_hire_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courier_fleet ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courier_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courier_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.places_of_interest ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.national_parks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nearby_airports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_itinerary_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_package_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.external_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wildlife ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.surprise_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_ai_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants_extended ENABLE ROW LEVEL SECURITY;

-- Public read policies for service/content tables
CREATE POLICY "Public read destinations" ON public.destinations FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read countries" ON public.countries FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read airlines" ON public.airlines FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read flights" ON public.flights FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read hotels" ON public.hotels FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read hotel_rooms" ON public.hotel_rooms FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read cars" ON public.cars FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read car_hire_rates" ON public.car_hire_rates FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read car_hire_options" ON public.car_hire_options FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read drivers" ON public.drivers FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read courier_fleet" ON public.courier_fleet FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read places_of_interest" ON public.places_of_interest FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read national_parks" ON public.national_parks FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read nearby_airports" ON public.nearby_airports FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read tours" ON public.tours FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read tour_itinerary_days" ON public.tour_itinerary_days FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read events" ON public.events FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read media" ON public.media FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read faqs" ON public.faqs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read venues" ON public.venues FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read volunteer_programs" ON public.volunteer_programs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read wildlife" ON public.wildlife FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read providers" ON public.providers FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read vendors" ON public.vendors FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read promo_codes" ON public.promo_codes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read destination_info" ON public.destination_info FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read restaurants_extended" ON public.restaurants_extended FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read surprise_packages" ON public.surprise_packages FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read tour_package_destinations" ON public.tour_package_destinations FOR SELECT TO anon, authenticated USING (true);

-- Authenticated user policies for their own data
CREATE POLICY "Users read own car_bookings" ON public.car_bookings FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users insert own car_bookings" ON public.car_bookings FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users read own courier_bookings" ON public.courier_bookings FOR SELECT TO authenticated USING (customer_id = auth.uid());
CREATE POLICY "Users insert own courier_bookings" ON public.courier_bookings FOR INSERT TO authenticated WITH CHECK (customer_id = auth.uid());
CREATE POLICY "Users read own payments" ON public.payments FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.bookings b WHERE b.id = booking_id AND b.user_id = auth.uid())
);
CREATE POLICY "Users read own travel_alerts" ON public.travel_alerts FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users read own booking_items" ON public.booking_items FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.bookings b WHERE b.id = booking_id AND b.user_id = auth.uid())
);
CREATE POLICY "Authenticated insert search_logs" ON public.search_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Public read courier_tracking" ON public.courier_tracking FOR SELECT TO anon, authenticated USING (true);
