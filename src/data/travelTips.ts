import { Shield, Heart, Sun, Plane, CreditCard, Camera } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type TravelTip = {
  icon: LucideIcon;
  title: string;
  summary: string;
  full: string;
  slug: string;
};

export const tips: TravelTip[] = [
  {
    icon: Shield,
    title: "Health & Vaccinations",
    summary: "Yellow fever vaccination is mandatory. Anti-malaria medication recommended.",
    full: `Yellow fever vaccination is required for entry into Uganda and you must carry the certificate. We strongly recommend Hepatitis A & B, Typhoid, and Tetanus vaccines. Start anti-malaria prophylaxis before travel.

**Before you travel:**
- Visit a travel clinic at least 6 weeks before departure
- Get your International Certificate of Vaccination (yellow card)
- Stock up on anti-malaria tablets (Malarone or Doxycycline recommended)
- Purchase comprehensive travel insurance that covers medical evacuation

**During your trip:**
- Drink only bottled or purified water
- Use sunscreen SPF 50+ and reapply every 2 hours
- Apply insect repellent with DEET, especially after sunset
- Sleep under treated mosquito nets (most lodges provide them)
- Carry a basic first aid kit with antiseptic, plasters, and rehydration salts

**Medical facilities:**
- Kampala has several international-standard hospitals (International Hospital Kampala, Norvik Hospital)
- Rural areas have basic clinics; carry essential medications with you
- Emergency evacuation services are available through AMREF Flying Doctors

**Zula Travels tip:** We provide a complimentary health checklist and can arrange pre-trip medical consultations for all booked clients.`,
    slug: "health-vaccinations",
  },
  {
    icon: Plane,
    title: "Visa & Entry Requirements",
    summary: "Most visitors need a visa. Apply online at visas.immigration.go.ug.",
    full: `Apply for an e-visa at visas.immigration.go.ug at least 2 weeks before travel. The process is straightforward and fully digital.

**Visa types and costs:**
- Single-entry tourist visa: $50 (valid 90 days)
- East Africa Tourist Visa (Uganda, Kenya, Rwanda): $100 (valid 90 days, multiple entries between 3 countries)
- Transit visa: $30 (valid 7 days)
- Multiple-entry visa: $100 (valid 1 year)

**Required documents:**
- Valid passport with 6+ months validity and at least 2 blank pages
- Passport-sized photo (white background)
- Return or onward flight ticket
- Proof of accommodation (hotel booking or invitation letter)
- Yellow fever vaccination certificate
- Proof of sufficient funds ($50/day recommended)

**Processing time:** 2-5 business days (apply early during peak season)

**At the airport:**
- Have your e-visa printed or saved on your phone
- Immigration officers may ask about your travel plans
- Customs allows $500 worth of goods duty-free

**Zula Travels tip:** We offer free visa application assistance for all booked clients and can provide accommodation letters for your application.`,
    slug: "visa-entry",
  },
  {
    icon: CreditCard,
    title: "Money & Currency",
    summary: "Uganda Shilling (UGX). USD widely accepted at hotels and tour operators.",
    full: `The local currency is the Uganda Shilling (UGX). 1 USD ≈ 3,700 UGX (rates fluctuate — check xe.com for current rates).

**Cash:**
- US Dollars printed after 2009 are widely accepted at hotels, lodges, and tour operators
- Carry small USD denominations ($1, $5, $10, $20) for tips and small purchases
- Uganda Shillings needed for markets, local restaurants, and public transport
- ATMs available in Kampala, Jinja, Fort Portal, and other major towns (Stanbic, Barclays, Centenary Bank)

**Cards:**
- Visa and Mastercard accepted at upscale hotels, restaurants, and supermarkets in Kampala
- American Express is rarely accepted
- Always carry cash as backup — card machines can be unreliable

**Mobile Money (recommended):**
- MTN Mobile Money and Airtel Money are ubiquitous
- You can get a local SIM card at the airport ($5-10)
- Load money at any agent kiosk (they're everywhere)
- Pay for almost anything: taxis, restaurants, markets, even gorilla permit deposits

**Tipping guide:**
- Safari guides: $10-20/day per group
- Hotel porters: $2-5
- Restaurant servers: 10% of bill
- Gorilla trekking porters: $10-15
- Drivers: $5-10/day

**Zula Travels tip:** Our packages include all major costs so you only need cash for tips, souvenirs, and personal expenses.`,
    slug: "money-currency",
  },
  {
    icon: Sun,
    title: "Best Time to Visit",
    summary: "June-September and December-February are the dry seasons — ideal for safaris.",
    full: `Uganda has two dry seasons and two wet seasons, thanks to its equatorial location. Each season offers unique experiences.

**Dry seasons (best for most activities):**
- **June – September:** Prime safari season. Clear skies, less vegetation for easier wildlife spotting, gorilla trekking trails are drier. Peak tourist season — book early.
- **December – February:** Second dry season. Great for safaris, bird watching, and Nile activities. Christmas/New Year is busy.

**Wet seasons (budget-friendly, lush landscapes):**
- **March – May (long rains):** Heaviest rainfall. Lower prices, fewer tourists, incredible green landscapes. Some roads become challenging. Not ideal for gorilla trekking.
- **October – November (short rains):** Lighter rain, usually in short bursts. Good for bird watching (migratory birds arrive). Lower prices than dry season.

**Temperature:** Pleasant year-round: 20-28°C (68-82°F) in most areas. Cooler at higher altitudes (Bwindi: 11-23°C).

**Daylight:** 12 hours of daylight year-round (sunrise ~6:30 AM, sunset ~6:45 PM).

**Month-by-month highlights:**
- January: Wildebeest calving (Serengeti/Tanzania side trips)
- February: Bird watching peak
- June-July: Prime gorilla trekking season
- August: Cultural festivals
- October: Shoebill stork sightings at Mabamba Swamp
- December: Holiday safari specials

**Zula Travels tip:** We offer year-round packages with season-specific itineraries. Wet season travelers enjoy 15-20% lower prices.`,
    slug: "best-time-visit",
  },
  {
    icon: Camera,
    title: "What to Pack",
    summary: "Lightweight layers, sturdy boots, binoculars, and a good camera.",
    full: `Packing smart makes all the difference on an East African adventure. Here's your comprehensive checklist.

**Clothing:**
- Neutral-colored lightweight clothing (khaki, olive, beige — no bright colors on safari)
- Long sleeves and pants for evening mosquito protection
- Fleece jacket or warm layer for early morning game drives
- Rain jacket (lightweight, packable)
- Comfortable walking shoes for casual outings
- Sturdy waterproof hiking boots (essential for gorilla trekking)
- Swimsuit for lodge pools and lake activities
- Hat or cap with brim

**Gear:**
- Binoculars (8x42 or 10x42 recommended)
- Camera with zoom lens (200mm+ for wildlife)
- Extra memory cards and batteries
- Power bank (10,000 mAh or larger)
- Universal power adapter (Type G plug — same as UK)
- Headlamp or small flashlight
- Reusable water bottle
- Dry bags for rainy weather (gorilla trekking)
- Daypack (20-30L) for daily excursions

**Health & hygiene:**
- Sunscreen SPF 50+
- Insect repellent (DEET-based)
- Personal medications (with prescription)
- Hand sanitizer
- Wet wipes
- Lip balm with SPF

**Documents:**
- Passport + copies (store digitally too)
- Printed e-visa
- Yellow fever certificate
- Travel insurance documents
- Flight itineraries
- Copies of accommodation bookings

**Zula Travels tip:** We provide a detailed packing list tailored to your specific itinerary upon booking.`,
    slug: "packing-list",
  },
  {
    icon: Heart,
    title: "Cultural Etiquette",
    summary: "Ugandans are warm and welcoming. Learn a few greetings in Luganda.",
    full: `Uganda is known as "The Pearl of Africa" — and Ugandans are famous for their warmth and hospitality. A little cultural awareness goes a long way.

**Basic Luganda greetings:**
- "Oli otya?" — How are you?
- "Gyendi" — I'm fine
- "Webale" / "Webale nnyo" — Thank you / Thank you very much
- "Ssebo" (Sir) / "Nnyabo" (Madam) — Respectful address
- "Nkwagala" — I like/love (for expressing appreciation)

**Social customs:**
- Handshakes are common; use your right hand
- Elders are deeply respected — greet them first
- Accept food/drink with both hands or the right hand
- It's polite to remove shoes when entering someone's home
- Public displays of affection are uncommon

**Photography:**
- Always ask permission before photographing people
- Some communities may request a small fee for photos
- Photography of military installations and government buildings is prohibited
- National park photography is encouraged (no flash near animals)

**Dress code:**
- Dress modestly in rural areas and religious sites
- Cover shoulders and knees when visiting mosques and some churches
- Smart casual is appropriate for restaurants in Kampala
- Swimwear only at pools and beaches

**Markets & bargaining:**
- Bargaining is expected and enjoyed at markets
- Start at about 50% of the asking price
- Be friendly and smile — it's a social interaction
- Fixed prices in supermarkets and malls (no bargaining)

**Religion:**
- Uganda is predominantly Christian (Catholic and Protestant) with a significant Muslim population
- Religious tolerance is strong; respect all faiths
- Sunday mornings: many locals attend church — plan activities accordingly

**Zula Travels tip:** Our guides speak multiple local languages and can help you navigate cultural interactions with ease and respect.`,
    slug: "cultural-etiquette",
  },
];

export function getTipBySlug(slug: string): TravelTip | undefined {
  return tips.find((t) => t.slug === slug);
}
