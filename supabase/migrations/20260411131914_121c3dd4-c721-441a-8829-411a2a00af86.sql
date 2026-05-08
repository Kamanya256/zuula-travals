
-- Seed destinations
INSERT INTO public.destinations (id, country, city, description) VALUES
  (gen_random_uuid(), 'Uganda', 'Kampala', 'Capital city of Uganda'),
  (gen_random_uuid(), 'Uganda', 'Entebbe', 'International airport city'),
  (gen_random_uuid(), 'Uganda', 'Jinja', 'Source of the Nile'),
  (gen_random_uuid(), 'Uganda', 'Mbarara', 'Western Uganda'),
  (gen_random_uuid(), 'Uganda', 'Kabale', 'Lake Bunyonyi'),
  (gen_random_uuid(), 'Uganda', 'Kalangala', 'Ssese Islands');

-- Seed vendors
INSERT INTO public.vendors (id, name, email, phone, company_name) VALUES
  (gen_random_uuid(), 'Zula Admin', 'admin@zula.com', '0702123456', 'Zula Travels'),
  (gen_random_uuid(), 'John Doe', 'john@example.com', '0700000000', 'Zula Travels');

-- Seed drivers
INSERT INTO public.drivers (id, full_name, phone, experience_years, daily_rate, is_available) VALUES
  (gen_random_uuid(), 'John Okello', '+256701234567', 8, 35.00, true),
  (gen_random_uuid(), 'Peter Ssemakula', '+256702345678', 5, 30.00, true),
  (gen_random_uuid(), 'David Mugisha', '+256703456789', 10, 40.00, true),
  (gen_random_uuid(), 'Michael Kato', '+256704567890', 6, 32.00, true),
  (gen_random_uuid(), 'Samuel Ochieng', '+256705678901', 12, 45.00, true);

-- Seed cars (linked to Kampala destination)
INSERT INTO public.cars (id, destination_id, make, model, year, seating_capacity, transmission, description, is_available, category, fuel_type)
SELECT gen_random_uuid(), d.id, c.make, c.model, c.year, c.seats, c.trans, c.descr, true, c.cat, 'Diesel'
FROM public.destinations d,
(VALUES
  ('Toyota', 'Land Cruiser Prado', 2022, 7, 'manual', '4x4 safari vehicle suitable for long tours', 'SUV'),
  ('Toyota', 'RAV4', 2021, 5, 'manual', 'Comfortable SUV for city and highway travel', 'Sedan'),
  ('Toyota', 'Hiace Van', 2020, 14, 'manual', 'Tour van ideal for groups and airport transfers', 'Van'),
  ('Nissan', 'X-Trail', 2019, 5, 'manual', 'Reliable mid-size SUV', 'Sedan'),
  ('Toyota', 'Coaster Bus', 2018, 29, 'manual', 'Large bus for group tours and conferences', 'Van')
) AS c(make, model, year, seats, trans, descr, cat)
WHERE d.city = 'Kampala';

-- Seed car hire rates
INSERT INTO public.car_hire_rates (id, car_id, base_rate_per_day, currency)
SELECT gen_random_uuid(), c.id,
  CASE
    WHEN c.model = 'Land Cruiser Prado' THEN 120.00
    WHEN c.model = 'RAV4' THEN 80.00
    WHEN c.model = 'Hiace Van' THEN 150.00
    WHEN c.model = 'X-Trail' THEN 90.00
    WHEN c.model = 'Coaster Bus' THEN 220.00
    ELSE 100.00
  END,
  'USD'
FROM public.cars c;

-- Seed hotels
INSERT INTO public.hotels (id, destination_id, name, address, rating, description)
SELECT gen_random_uuid(), d.id, h.name, h.addr, h.rating, h.descr
FROM public.destinations d,
(VALUES
  ('Kampala Serena Hotel', 'Kintu Road, Kampala', 5.0, 'Luxury 5-star hotel'),
  ('Sheraton Kampala Hotel', 'Ternan Avenue, Kampala', 4.8, 'Premium city hotel'),
  ('Africana Hotel Kampala', 'Jinja Road, Kampala', 4.2, 'Affordable comfort')
) AS h(name, addr, rating, descr)
WHERE d.city = 'Kampala';

INSERT INTO public.hotels (id, destination_id, name, address, rating, description)
SELECT gen_random_uuid(), d.id, 'Protea Hotel Entebbe', 'Victoria Mall, Entebbe', 4.6, 'Lakefront hotel'
FROM public.destinations d WHERE d.city = 'Entebbe';

INSERT INTO public.hotels (id, destination_id, name, address, rating, description)
SELECT gen_random_uuid(), d.id, 'Brovad Sands Lodge', 'Kalangala Island', 4.4, 'Beach resort'
FROM public.destinations d WHERE d.city = 'Kalangala';

-- Seed hotel rooms
INSERT INTO public.hotel_rooms (id, hotel_id, room_type, capacity, price_per_night, currency, available_quantity, description)
SELECT gen_random_uuid(), h.id, r.rtype, r.cap, r.price, 'USD', r.qty, r.descr
FROM public.hotels h,
(VALUES
  ('Deluxe Room', 2, 280.00, 20, 'Elegant deluxe room with city view'),
  ('Executive Suite', 3, 450.00, 10, 'Luxury executive suite')
) AS r(rtype, cap, price, qty, descr)
WHERE h.name = 'Kampala Serena Hotel';

INSERT INTO public.hotel_rooms (id, hotel_id, room_type, capacity, price_per_night, currency, available_quantity, description)
SELECT gen_random_uuid(), h.id, r.rtype, r.cap, r.price, 'USD', r.qty, r.descr
FROM public.hotels h,
(VALUES
  ('Classic Room', 2, 240.00, 25, 'Modern classic room'),
  ('Club Suite', 3, 380.00, 12, 'Premium club-level suite')
) AS r(rtype, cap, price, qty, descr)
WHERE h.name = 'Sheraton Kampala Hotel';

INSERT INTO public.hotel_rooms (id, hotel_id, room_type, capacity, price_per_night, currency, available_quantity, description)
SELECT gen_random_uuid(), h.id, r.rtype, r.cap, r.price, 'USD', r.qty, r.descr
FROM public.hotels h,
(VALUES
  ('Standard Room', 2, 120.00, 30, 'Affordable and comfortable'),
  ('Business Room', 2, 180.00, 15, 'Ideal for business travelers')
) AS r(rtype, cap, price, qty, descr)
WHERE h.name = 'Africana Hotel Kampala';

INSERT INTO public.hotel_rooms (id, hotel_id, room_type, capacity, price_per_night, currency, available_quantity, description)
SELECT gen_random_uuid(), h.id, r.rtype, r.cap, r.price, 'USD', r.qty, r.descr
FROM public.hotels h,
(VALUES
  ('Lake View Room', 2, 260.00, 18, 'Scenic lakefront room'),
  ('Family Room', 4, 340.00, 8, 'Spacious family room')
) AS r(rtype, cap, price, qty, descr)
WHERE h.name = 'Protea Hotel Entebbe';

INSERT INTO public.hotel_rooms (id, hotel_id, room_type, capacity, price_per_night, currency, available_quantity, description)
SELECT gen_random_uuid(), h.id, r.rtype, r.cap, r.price, 'USD', r.qty, r.descr
FROM public.hotels h,
(VALUES
  ('Beach Chalet', 2, 220.00, 14, 'Private beach chalet'),
  ('Honeymoon Suite', 2, 300.00, 6, 'Romantic lakeside suite')
) AS r(rtype, cap, price, qty, descr)
WHERE h.name = 'Brovad Sands Lodge';

-- Seed courier fleet
INSERT INTO public.courier_fleet (id, vehicle_name, vehicle_category, base_fare, price_per_km, max_weight_kg, is_available) VALUES
  (gen_random_uuid(), 'Boda Boda', 'Motorcycle', 5000, 1500, 20, true),
  (gen_random_uuid(), 'Motorcycle Express', 'Motorcycle', 7000, 1800, 25, true),
  (gen_random_uuid(), 'City Car', 'Car', 15000, 3000, 100, true),
  (gen_random_uuid(), 'Van Delivery', 'Car', 25000, 4500, 500, true),
  (gen_random_uuid(), 'Pickup Truck', 'Truck', 35000, 6000, 1000, true),
  (gen_random_uuid(), 'Trailer / Cargo Truck', 'Regional', 60000, 10000, 5000, true);

-- Seed a flight
INSERT INTO public.flights (id, origin_id, destination_id, airline, flight_number, flight_type, departure_time, arrival_time, price, currency, seats_total, seats_available, status)
SELECT gen_random_uuid(), o.id, d.id, 'Uganda Airlines', 'UR123', 'domestic',
  '2026-06-20 08:00:00+00', '2026-06-20 09:00:00+00', 150.00, 'USD', 100, 100, 'scheduled'
FROM public.destinations o, public.destinations d
WHERE o.city = 'Kampala' AND d.city = 'Entebbe';
