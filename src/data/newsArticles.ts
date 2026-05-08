import gorillaImg from "@/assets/gorilla-trekking.jpg";
import adventureImg from "@/assets/adventure-nile.jpg";
import cultureImg from "@/assets/culture-uganda.jpg";
import wildlifeImg from "@/assets/wildlife-safari.jpg";
import lodgeImg from "@/assets/luxury-lodge.jpg";
import heroLake from "@/assets/hero-lake.jpg";

export type NewsArticle = {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  image: string;
  content: string;
  relatedLink: string;
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "uganda-new-gorilla-trail-bwindi",
    title: "Uganda Opens New Gorilla Trekking Trail in Bwindi",
    date: "2026-03-05",
    category: "Wildlife",
    summary: "A new trail allows smaller groups for a more intimate gorilla experience in Bwindi Impenetrable Forest.",
    image: gorillaImg,
    relatedLink: "/packages",
    content: `Uganda Wildlife Authority (UWA) has officially opened a brand-new gorilla trekking trail in the southern sector of Bwindi Impenetrable National Park. The trail, named "Nkuringo Ridge Path," is designed to accommodate smaller groups of just 4 trekkers (down from the standard 8), offering a more intimate and exclusive encounter with the endangered mountain gorillas.

The new trail winds through pristine montane forest, passing waterfalls and offering panoramic views of the Virunga volcanoes. It takes approximately 3-5 hours to complete and is rated as moderately challenging.

**Key highlights of the new trail:**
- Maximum 4 trekkers per group for a more personal experience
- Dedicated habituated gorilla family of 12 members
- Professional UWA guides with 10+ years of tracking experience
- Rest stops with scenic viewpoints along the ridge
- Available from April 2026 onwards

Gorilla trekking permits for this exclusive trail are priced at $800 per person (foreign non-residents) and can be booked through licensed tour operators like Zula Travels. Early booking is strongly recommended as permits are limited to just 4 per day.

This development is part of Uganda's broader strategy to promote sustainable tourism while protecting the approximately 459 mountain gorillas that call Bwindi home — representing roughly half of the world's remaining population.`,
  },
  {
    slug: "east-african-tourist-visa-online",
    title: "East African Tourist Visa Now Available Online",
    date: "2026-02-28",
    category: "Visa & Travel",
    summary: "Travelers can now apply for the East African Tourist Visa online, covering Uganda, Kenya, and Rwanda in one visa.",
    image: cultureImg,
    relatedLink: "/visa-permits",
    content: `The East African Community has streamlined its visa process with a fully digital application system. The East African Tourist Visa (EATV) now allows travelers to visit Uganda, Kenya, and Rwanda on a single visa — all applied for online.

**How to apply:**
1. Visit visas.immigration.go.ug
2. Select "East African Tourist Visa"
3. Upload passport photo, travel itinerary, and accommodation proof
4. Pay $100 online via credit card or mobile money
5. Receive your e-visa within 3-5 business days

**What the visa covers:**
- 90-day validity across Uganda, Kenya, and Rwanda
- Multiple entries between the three countries
- Tourist activities including safaris, gorilla trekking, and beach holidays

The digital system eliminates the need to visit embassies and reduces processing times from weeks to days. Travelers are advised to apply at least 2 weeks before departure.

Zula Travels offers complimentary visa application assistance for all booked clients. Contact us for help navigating the application process.`,
  },
  {
    slug: "direct-flights-dubai-entebbe",
    title: "New Direct Flights from Dubai to Entebbe",
    date: "2026-02-20",
    category: "Flights",
    summary: "Emirates launches 3 weekly direct flights from Dubai to Entebbe International Airport.",
    image: adventureImg,
    relatedLink: "/flights",
    content: `Emirates Airlines has announced the launch of three weekly direct flights connecting Dubai International Airport (DXB) to Entebbe International Airport (EBB). The new route significantly reduces travel time for tourists from the Middle East, Europe, and Asia.

**Flight schedule:**
- Tuesday, Thursday, Saturday departures
- Dubai → Entebbe: 5 hours 30 minutes (departure 08:00, arrival 12:30 EAT)
- Entebbe → Dubai: 5 hours 45 minutes (departure 14:00, arrival 20:45 GST)
- Aircraft: Boeing 777-300ER (Economy, Business, First Class)

**What this means for travelers:**
- Faster connections from Europe, Asia, and Australia via Dubai hub
- Competitive fares starting from $450 round-trip (Economy)
- Enhanced cargo capacity for Ugandan exports
- Seamless connections to 150+ Emirates destinations worldwide

This launch complements existing routes from Turkish Airlines (via Istanbul), KLM (via Amsterdam), and Ethiopian Airlines (via Addis Ababa), giving travelers more options than ever for reaching Uganda.

Zula Travels can arrange airport transfers, meet-and-greet services, and complete travel packages timed with the new flight schedule.`,
  },
  {
    slug: "murchison-falls-top-safari-2026",
    title: "Murchison Falls Named Top Safari Destination 2026",
    date: "2026-02-15",
    category: "Awards",
    summary: "Murchison Falls National Park wins 'Africa's Top Safari Destination' at the World Travel Awards.",
    image: wildlifeImg,
    relatedLink: "/attractions",
    content: `Murchison Falls National Park has been awarded "Africa's Top Safari Destination 2026" at the prestigious World Travel Awards ceremony held in Nairobi. This is the first time a Ugandan national park has won the continent's top safari honor.

**Why Murchison Falls won:**
- The world's most powerful waterfall (the entire Nile forces through a 7-meter gap)
- Big Five wildlife (lions, elephants, buffaloes, leopards, and recently reintroduced rhinos)
- Exceptional boat cruises to the base of the falls
- Chimp tracking in Budongo Forest
- Hot air balloon safaris over the savanna

**Park highlights:**
- Size: 3,893 km² — Uganda's largest national park
- Location: Northwestern Uganda, 4-5 hours from Kampala
- Best time to visit: December-February and June-September
- Accommodation: Paraa Safari Lodge, Chobe Safari Lodge, Baker's Lodge

The award is expected to boost visitor numbers by 30% in 2026. Zula Travels offers 3-day and 5-day Murchison Falls safari packages with all-inclusive pricing.`,
  },
  {
    slug: "lake-victoria-sunset-cruises-year-round",
    title: "Lake Victoria Sunset Cruises Now Available Year-Round",
    date: "2026-02-10",
    category: "Boat Rides",
    summary: "Due to popular demand, sunset cruises on Lake Victoria are now offered daily throughout the year.",
    image: heroLake,
    relatedLink: "/boat-rides",
    content: `Lake Victoria sunset cruises, previously a seasonal offering, are now available daily throughout the year following overwhelming demand from tourists and locals alike.

**Cruise options:**
- **Standard Sunset Cruise** (2 hours): $45/person — includes soft drinks and snacks
- **Premium Dinner Cruise** (3 hours): $85/person — 3-course dinner, wine, and live music
- **Private Charter** (4 hours): $350 for up to 10 guests — fully customizable experience

**What to expect:**
- Departure from Ggaba Landing Site or Munyonyo Resort pier
- Stunning sunset views over Africa's largest lake
- Bird watching (African fish eagles, herons, kingfishers)
- Optional fishing experience (catch and release)
- Professional crew and safety equipment

**Booking information:**
- Daily departures at 4:30 PM (arrive 30 minutes early)
- Children under 5: free; 5-12 years: 50% discount
- Advance booking recommended for weekends and holidays

Lake Victoria covers 68,800 km² and is shared by Uganda, Kenya, and Tanzania. The Ugandan shoreline offers some of the most spectacular sunset views on the continent.

Book your cruise through Zula Travels for the best rates and hotel pickup service.`,
  },
  {
    slug: "luxury-lodge-queen-elizabeth-np",
    title: "New Luxury Lodge Opens Near Queen Elizabeth NP",
    date: "2026-01-30",
    category: "Hotels",
    summary: "A world-class eco-lodge with 20 suites opens at the edge of Queen Elizabeth National Park.",
    image: lodgeImg,
    relatedLink: "/hotels",
    content: `A stunning new eco-lodge, "Kazinga Wilderness Retreat," has opened its doors at the edge of Queen Elizabeth National Park, offering 20 luxury suites with uninterrupted views of the Kazinga Channel.

**Lodge features:**
- 20 spacious suites (60 m² each) with private terraces
- Infinity pool overlooking the channel
- Spa and wellness center with African-inspired treatments
- Farm-to-table restaurant using locally sourced ingredients
- Solar-powered with rainwater harvesting (100% off-grid)

**Room rates:**
- Deluxe Suite: $350/night (single), $450/night (double)
- Premium Suite: $500/night — includes game drive
- Honeymoon Suite: $650/night — champagne, spa treatment, private dinner

**Activities included:**
- Morning and evening game drives
- Kazinga Channel boat cruise
- Guided nature walks
- Cultural community visits

The lodge is a joint venture between Ugandan entrepreneurs and a South African hospitality group, employing 85 staff members from surrounding communities. It has been built using sustainable materials and follows strict environmental guidelines.

Zula Travels is an official booking partner — contact us for exclusive rates and safari-lodge combination packages.`,
  },
  {
    slug: "uganda-waives-visa-fees",
    title: "Uganda Waives Visa Fees for 6 Countries",
    date: "2026-01-20",
    category: "Visa & Travel",
    summary: "Uganda announces visa fee waivers for tourists from selected countries to boost tourism.",
    image: cultureImg,
    relatedLink: "/visa-permits",
    content: `In a landmark move to boost tourism, the Government of Uganda has announced visa fee waivers for citizens of six countries, effective from March 1, 2026.

**Countries with waived visa fees:**
1. South Africa
2. India
3. China
4. Japan
5. South Korea
6. Brazil

**Details:**
- Tourist visas (up to 90 days) will be free of charge
- Standard application process remains (online via immigration portal)
- Business and work visas are not included in the waiver
- The program runs for an initial period of 2 years

**Expected impact:**
- 40% increase in tourist arrivals from these countries
- $50 million additional tourism revenue projected
- 5,000+ new jobs in the hospitality sector

This initiative aligns with Uganda's Vision 2040 goal of becoming a top-tier African tourism destination. The country welcomed 1.8 million tourists in 2025 and aims to reach 4 million by 2030.

Zula Travels offers tailored packages for visitors from all six countries, including Mandarin and Japanese-speaking guides.`,
  },
  {
    slug: "kampala-food-festival-march",
    title: "Kampala Food Festival Returns This March",
    date: "2026-01-15",
    category: "Food & Culture",
    summary: "The annual Kampala Food Festival brings together chefs, street food vendors, and food lovers.",
    image: cultureImg,
    relatedLink: "/restaurants",
    content: `The highly anticipated Kampala Food Festival is back for its 7th edition, running from March 20-22, 2026 at the Kampala Serena Hotel grounds. The three-day culinary extravaganza brings together Uganda's best chefs, street food vendors, and food enthusiasts.

**Festival highlights:**
- **50+ food stalls** featuring local and international cuisines
- **Celebrity chef demonstrations** from East Africa's top culinary talent
- **Street food alley** — sample Rolex, Chapati, Samosas, and more for under $5
- **Wine & spirits lounge** with tastings from African vineyards
- **Live music** and cultural performances
- **Children's cooking workshops** (ages 6-14)

**Ticket prices:**
- Day pass: $15 (includes 3 food tokens)
- Weekend pass: $35 (includes 8 food tokens + drink voucher)
- VIP pass: $75 (premium seating, unlimited food tokens, meet chefs)
- Children under 10: free

**Notable participating restaurants:**
- The Lawns, Cafe Javas, Khana Khazana, Fang Fang, and 40+ others

The festival also features a "Cook for a Cause" charity auction where proceeds support school feeding programs in northern Uganda.

Book your festival tickets through Zula Travels and combine with a Kampala city tour package.`,
  },
];

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}
