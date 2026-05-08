import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, MapPin, Flag, Users, Landmark, Heart, GraduationCap, UtensilsCrossed, Banknote, Shield, Droplets, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-uganda.jpg";
import wildlifeImg from "@/assets/wildlife-safari.jpg";
import adventureImg from "@/assets/adventure-nile.jpg";
import cultureImg from "@/assets/culture-uganda.jpg";
import gorillaImg from "@/assets/gorilla-trekking.jpg";
import lodgeImg from "@/assets/luxury-lodge.jpg";

const countries = [
  {
    name: "Uganda",
    flag: "🇺🇬",
    capital: "Kampala",
    img: heroImg,
    currency: "Ugandan Shilling (UGX)",
    languages: "English, Luganda, Swahili",
    population: "45+ million",
    stability: "Stable — one of East Africa's top tourism destinations",
    leaders: "President: Yoweri Kaguta Museveni (since 1986)",
    intro: "Known as the 'Pearl of Africa,' Uganda is a landlocked country blessed with extraordinary natural beauty — from the snow-capped Rwenzori Mountains to the source of the River Nile.",
    history: "Uganda gained independence from Britain on October 9, 1962. The country has overcome turbulent periods including the Idi Amin era (1971-1979) and has emerged as one of Africa's most vibrant democracies and fastest-growing economies.",
    hospitality: "Ugandans are renowned for their warm hospitality. Visitors are treated as honored guests with genuine smiles and helpfulness everywhere you go. The cultural diversity of 56+ tribes creates a rich tapestry of welcoming traditions.",
    food: "Ugandan cuisine features matoke (steamed plantains), posho (cornmeal), rolex (egg-chapati rolls), luwombo (steamed stew in banana leaves), and fresh tilapia from Lake Victoria. Fresh tropical fruits — mangoes, jackfruit, passion fruit — are abundant year-round.",
    water: "Home to Lake Victoria (Africa's largest lake), the Source of the River Nile, Lake Bunyonyi, and Lake Albert. Fresh tilapia, Nile perch, and other fish species are plentiful.",
    health: "Yellow fever vaccination required. Malaria prophylaxis recommended. Major hospitals in Kampala include Mulago National Referral Hospital, Mengo Hospital, and International Hospital Kampala.",
    education: "Home to Makerere University (est. 1922), one of Africa's oldest and most prestigious universities. Education tours visit schools, research centers, and community learning projects.",
    marriage: "Traditional Ugandan weddings are vibrant cultural celebrations. The 'Introduction' (Kwanjula in Buganda) is a pre-wedding ceremony where the groom's family visits the bride's family with gifts. Church weddings and Islamic nikkahs follow cultural ceremonies.",
    calendarEvents: ["Jan 26 - NRM Liberation Day", "Mar 8 - Women's Day", "Jun 3 - Martyrs Day (Namugongo)", "Jun 9 - Heroes Day", "Oct 9 - Independence Day"],
    topAttractions: ["Bwindi Gorilla Trekking", "Source of the Nile, Jinja", "Queen Elizabeth National Park", "Murchison Falls", "Namugongo Martyrs Shrine"],
  },
  {
    name: "Kenya",
    flag: "🇰🇪",
    capital: "Nairobi",
    img: wildlifeImg,
    currency: "Kenyan Shilling (KES)",
    languages: "English, Swahili",
    population: "54+ million",
    stability: "Stable democracy — East Africa's economic hub",
    leaders: "President: William Ruto (since 2022)",
    intro: "Kenya is East Africa's powerhouse — famous for the Maasai Mara, stunning beaches on the Indian Ocean coast, and Nairobi's vibrant urban culture.",
    history: "Kenya gained independence from Britain on December 12, 1963, led by Jomo Kenyatta. The country has developed into East Africa's largest economy and a hub for technology, finance, and tourism.",
    hospitality: "Kenyans are known for the phrase 'Karibu' (Welcome). The Maasai people's cultural traditions of hosting visitors are world-renowned. Coastal Swahili hospitality blends African, Arab, and Indian influences.",
    food: "Kenyan staples include nyama choma (grilled meat), ugali (cornmeal), sukuma wiki (collard greens), chapati, and mandazi. Coastal cuisine features biryani, pilau, and fresh seafood. Kenyan tea and coffee are world-famous.",
    water: "Indian Ocean coastline with beaches in Mombasa, Diani, and Lamu. Lake Nakuru (flamingos), Lake Naivasha, and Lake Turkana (the Jade Sea). Fresh fish from lakes and ocean.",
    health: "Yellow fever certificate needed from endemic areas. Malaria prophylaxis for coast and western regions. Nairobi Hospital and Aga Khan University Hospital are top facilities.",
    education: "University of Nairobi and Kenyatta University lead East African research. Kenya is a hub for tech innovation ('Silicon Savannah') with a vibrant startup ecosystem.",
    marriage: "Kenyan weddings blend tribal customs with modern ceremonies. Maasai weddings feature elaborate beadwork and cattle exchanges. Kikuyu 'ruracio' ceremonies involve dowry negotiations.",
    calendarEvents: ["Jun 1 - Madaraka Day", "Oct 20 - Mashujaa Day", "Dec 12 - Jamhuri Day", "Jul-Oct - Wildebeest Migration Season"],
    topAttractions: ["Maasai Mara Safari", "Diani Beach", "Mount Kenya", "Amboseli National Park", "Lamu Island"],
  },
  {
    name: "Rwanda",
    flag: "🇷🇼",
    capital: "Kigali",
    img: gorillaImg,
    currency: "Rwandan Franc (RWF)",
    languages: "Kinyarwanda, English, French, Swahili",
    population: "13+ million",
    stability: "Very stable — known as Africa's cleanest and safest country",
    leaders: "President: Paul Kagame (since 2000)",
    intro: "The 'Land of a Thousand Hills,' Rwanda has transformed into one of Africa's most remarkable success stories — clean, safe, and forward-thinking.",
    history: "Rwanda gained independence in 1962. The tragic genocide of 1994 claimed 800,000+ lives. Under President Kagame's leadership, Rwanda has rebuilt into Africa's most progressive nation with remarkable economic growth and unity.",
    hospitality: "Rwandans practice 'Ubumwe' (unity) and treat guests with deep respect. Kigali is consistently rated Africa's cleanest city. The country's community-based tourism ensures authentic cultural exchanges.",
    food: "Rwandan cuisine features brochettes (grilled meat skewers), isombe (cassava leaves with spinach), beans with plantains, and fresh vegetables. Rwanda produces excellent specialty coffee and tea.",
    water: "Lake Kivu is one of Africa's Great Lakes with stunning beaches and island resorts. The Akagera River and numerous highland streams support diverse ecosystems.",
    health: "Excellent healthcare system for the region. Rwanda Community-Based Health Insurance covers 91% of the population. King Faisal Hospital is the leading facility.",
    education: "University of Rwanda leads research. Rwanda is a pioneer in African technology adoption with the 'Vision 2050' development plan. Coding academies and tech hubs thrive in Kigali.",
    marriage: "Traditional Rwandan 'Gusaba' ceremonies involve beautiful negotiations between families. The groom's family brings gifts including cows. Modern celebrations blend cultural and Western elements.",
    calendarEvents: ["Feb 1 - Heroes Day", "Apr 7 - Genocide Memorial Day", "Jul 1 - Independence Day", "Jul 4 - Liberation Day"],
    topAttractions: ["Volcanoes NP Gorilla Trekking", "Kigali Genocide Memorial", "Lake Kivu", "Nyungwe Forest", "Akagera National Park"],
  },
  {
    name: "Tanzania",
    flag: "🇹🇿",
    capital: "Dodoma (administrative), Dar es Salaam (commercial)",
    img: adventureImg,
    currency: "Tanzanian Shilling (TZS)",
    languages: "Swahili, English",
    population: "61+ million",
    stability: "Stable democracy — peaceful nation with strong tourism sector",
    leaders: "President: Samia Suluhu Hassan (since 2021, first female president)",
    intro: "Tanzania is home to Africa's highest peak (Kilimanjaro), the Serengeti's Great Migration, and the spice island of Zanzibar — a complete African experience.",
    history: "Tanganyika gained independence in 1961 under Julius Nyerere and united with Zanzibar in 1964 to form Tanzania. The country has maintained peace and stability through Nyerere's philosophy of 'Ujamaa' (familyhood).",
    hospitality: "'Karibu Tanzania!' — Tanzanians are among the friendliest people in Africa. Swahili coastal culture offers legendary hospitality. The Maasai and Hadzabe communities welcome visitors into their traditional lifestyles.",
    food: "Tanzanian cuisine includes ugali, pilau (spiced rice), mishkaki (grilled meat), chips mayai (french fry omelet), and Zanzibari seafood. Zanzibar is the 'Spice Island' — cloves, vanilla, and cinnamon flavors dominate.",
    water: "Indian Ocean coastline with Zanzibar and Mafia Island. Lake Victoria (shared), Lake Tanganyika (world's second deepest lake), and Lake Manyara. Fresh tilapia, dagaa, and prawns.",
    health: "Yellow fever certificate required from endemic areas. Malaria prophylaxis recommended. Muhimbili National Hospital in Dar es Salaam is the main facility.",
    education: "University of Dar es Salaam is the oldest university. Tanzania is pioneering community-based conservation education programs in the Serengeti ecosystem.",
    marriage: "Swahili weddings on the coast are elaborate multi-day celebrations with henna, traditional dances, and feasting. Maasai weddings involve cattle exchanges and warrior ceremonies.",
    calendarEvents: ["Jan 12 - Zanzibar Revolution Day", "Apr 26 - Union Day", "Jul 7 - Saba Saba Day", "Jun-Oct - Great Migration Season"],
    topAttractions: ["Serengeti Migration", "Mount Kilimanjaro", "Zanzibar Beaches", "Ngorongoro Crater", "Selous Game Reserve"],
  },
  {
    name: "DR Congo",
    flag: "🇨🇩",
    capital: "Kinshasa",
    img: lodgeImg,
    currency: "Congolese Franc (CDF), USD widely accepted",
    languages: "French, Lingala, Swahili, Kikongo",
    population: "100+ million",
    stability: "Eastern regions require caution — tourism established in Virunga area",
    leaders: "President: Félix Tshisekedi (since 2019)",
    intro: "The Democratic Republic of Congo is home to Virunga National Park — Africa's oldest national park and a UNESCO World Heritage Site with mountain gorillas and active volcanoes.",
    history: "Formerly known as Zaire, the DRC gained independence from Belgium in 1960. Despite political challenges, the country's eastern regions offer extraordinary wildlife experiences including gorilla trekking in Virunga.",
    hospitality: "Congolese people are warm and generous. Music is central to culture — Congolese rumba and soukous have influenced African music worldwide. The diversity of 200+ ethnic groups creates rich cultural experiences.",
    food: "Congolese cuisine features fufu (cassava paste), moambe chicken (palm nut stew), grilled fish, and abundant tropical fruits. Fresh river fish from the Congo River is a staple.",
    water: "The Congo River is Africa's second longest and the world's deepest river. Lake Kivu (shared with Rwanda) and Lake Tanganyika offer scenic beauty.",
    health: "Yellow fever vaccination required. Malaria prophylaxis essential. Travel insurance with medical evacuation recommended.",
    education: "University of Kinshasa is the largest. Conservation education programs at Virunga National Park train local rangers and researchers.",
    marriage: "Congolese weddings are joyful celebrations filled with music, dance, and colorful attire. The 'dot' (dowry) ceremony is an important pre-wedding tradition.",
    calendarEvents: ["Jan 4 - Martyrs of Independence Day", "Jun 30 - Independence Day", "Aug 1 - Parents' Day"],
    topAttractions: ["Virunga NP Gorilla Trekking", "Nyiragongo Volcano", "Kahuzi-Biega NP", "Congo River", "Garamba NP"],
  },
  {
    name: "South Sudan",
    flag: "🇸🇸",
    capital: "Juba",
    img: cultureImg,
    currency: "South Sudanese Pound (SSP), USD widely accepted",
    languages: "English, Arabic, Dinka, Nuer",
    population: "11+ million",
    stability: "Developing tourism sector — guided travel recommended",
    leaders: "President: Salva Kiir Mayardit (since 2011)",
    intro: "The world's youngest nation (independent 2011), South Sudan offers untouched wilderness, the world's second largest animal migration, and unique Nilotic cultures.",
    history: "South Sudan gained independence from Sudan on July 9, 2011, after decades of civil war. The country is home to the Sudd — one of the world's largest wetlands — and diverse Nilotic cultures including the Dinka and Nuer peoples.",
    hospitality: "South Sudanese people are known for their resilience and generosity. Visitors are welcomed with traditional songs and dances. The Dinka and Nuer cattle-herding cultures offer unique immersive experiences.",
    food: "South Sudanese cuisine features kisra (fermented bread), ful medames (fava beans), grilled Nile perch, and goat stew. Fresh mangoes and tropical fruits are seasonal treats.",
    water: "The White Nile flows through the country. The Sudd wetland is one of the world's largest freshwater ecosystems, supporting diverse wildlife and fishing communities.",
    health: "Yellow fever vaccination required. Comprehensive travel insurance with evacuation coverage essential. Medical facilities are limited outside Juba.",
    education: "University of Juba is the main institution. The country is building its education infrastructure with international support.",
    marriage: "Dinka weddings involve elaborate cattle dowry negotiations — cattle are central to social status and wealth. Nuer ceremonies feature traditional scarification and dancing.",
    calendarEvents: ["Jul 9 - Independence Day", "May 16 - SPLA Day", "Jul 30 - Martyrs Day"],
    topAttractions: ["Boma National Park", "The Sudd Wetland", "Nimule National Park", "Juba Markets", "White Nile River"],
  },
];

const sections = [
  { key: "intro", label: "Introduction", icon: Globe },
  { key: "history", label: "History", icon: Landmark },
  { key: "hospitality", label: "Hospitality", icon: Heart },
  { key: "food", label: "Food & Produce", icon: UtensilsCrossed },
  { key: "water", label: "Fresh Water & Fish", icon: Droplets },
  { key: "health", label: "Health", icon: Stethoscope },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "marriage", label: "Marriage & Culture", icon: Heart },
];

import { Stethoscope } from "lucide-react";

export default function CountryGuidesPage() {
  const [active, setActive] = useState("Uganda");
  const country = countries.find((c) => c.name === active)!;

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={country.img} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <Globe className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">East Africa Country Guides</h1>
          <p className="text-primary-foreground/80 text-lg">Discover the history, culture, cuisine, and tourist attractions of East Africa's most beautiful countries.</p>
        </div>
      </section>

      {/* Welcome */}
      <section className="py-6 bg-accent/10 border-b border-accent/20">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">🌍 <strong>Welcome to East Africa!</strong> A region of extraordinary diversity — from snow-capped mountains to tropical beaches, ancient cultures to modern cities. Let us be your guide to this beautiful corner of the world.</p>
        </div>
      </section>

      {/* Country Selector */}
      <section className="py-6 border-b border-border sticky top-16 md:top-[4.5rem] z-30 bg-background/95 backdrop-blur-md">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {countries.map((c) => (
              <button
                key={c.name}
                onClick={() => setActive(c.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  active === c.name ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                <span className="text-lg">{c.flag}</span> {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Country Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Header Card */}
              <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card">
                <div className="relative h-64">
                  <img src={country.img} alt={country.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-3xl font-display font-bold text-background flex items-center gap-3">
                      <span className="text-4xl">{country.flag}</span> {country.name}
                    </h2>
                    <p className="text-background/80 text-sm mt-1"><MapPin className="w-3 h-3 inline mr-1" />Capital: {country.capital}</p>
                  </div>
                </div>
                <div className="p-6 grid sm:grid-cols-3 gap-4 text-sm">
                  <div><span className="text-muted-foreground block">Currency</span><span className="font-medium">{country.currency}</span></div>
                  <div><span className="text-muted-foreground block">Languages</span><span className="font-medium">{country.languages}</span></div>
                  <div><span className="text-muted-foreground block">Population</span><span className="font-medium">{country.population}</span></div>
                </div>
              </div>

              {/* Political Status */}
              <div className="bg-card rounded-xl border border-border p-6 shadow-card">
                <div className="flex items-center gap-3 mb-3">
                  <Flag className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-display font-bold">Political Status</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2"><strong>Current Leader:</strong> {country.leaders}</p>
                <p className="text-sm text-muted-foreground"><strong>Stability:</strong> {country.stability}</p>
              </div>

              {/* Content Sections */}
              {sections.map(({ key, label, icon: Icon }) => (
                <div key={key} className="bg-card rounded-xl border border-border p-6 shadow-card">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-display font-bold">{label}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{(country as any)[key]}</p>
                </div>
              ))}

              {/* Calendar Events */}
              <div className="bg-card rounded-xl border border-border p-6 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <Landmark className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-display font-bold">Key Calendar Events</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {country.calendarEvents.map((e) => (
                    <div key={e} className="bg-secondary rounded-lg px-4 py-2.5 text-sm">{e}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-36 space-y-6">
                <div className="bg-card rounded-xl border border-border shadow-elevated p-6">
                  <h3 className="font-display font-bold text-lg mb-4">Top Attractions</h3>
                  <div className="space-y-2">
                    {country.topAttractions.map((a) => (
                      <div key={a} className="flex items-center gap-2 text-sm">
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />{a}
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full rounded-full mt-6">
                    <Link to="/packages">View {country.name} Tours <ArrowRight className="w-4 h-4 ml-2" /></Link>
                  </Button>
                </div>

                <div className="bg-accent/10 rounded-xl p-6 border border-accent/20">
                  <Shield className="w-8 h-8 text-accent mb-3" />
                  <h3 className="font-display font-semibold mb-2">Travel Advisory</h3>
                  <p className="text-xs text-muted-foreground mb-4">We provide up-to-date travel advisories and safety information for all destinations. Our local guides ensure safe and enjoyable experiences.</p>
                  <Button asChild variant="outline" size="sm" className="w-full rounded-full">
                    <Link to="/travel-tips">Travel Tips</Link>
                  </Button>
                </div>

                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-display font-semibold mb-3">Book a Trip to {country.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4">Custom itineraries tailored to your preferences.</p>
                  <Button asChild size="sm" className="w-full rounded-full">
                    <Link to="/contact">Request Quote</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
