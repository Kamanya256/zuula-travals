import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, MapPin, Star, CheckCircle, Calendar, ArrowLeft } from "lucide-react";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import ImageGallery from "@/components/ImageGallery";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import CustomerRating from "@/components/CustomerRating";
import DistanceCalculator from "@/components/DistanceCalculator";
import gorillaImg from "@/assets/gorilla-trekking.jpg";
import adventureImg from "@/assets/adventure-nile.jpg";
import cultureImg from "@/assets/culture-uganda.jpg";
import wildlifeImg from "@/assets/wildlife-safari.jpg";
import lodgeImg from "@/assets/luxury-lodge.jpg";
import heroImg from "@/assets/hero-uganda.jpg";
import cityImg from "@/assets/tour-city.jpg";
import religionImg from "@/assets/tour-religion.jpg";
import marineImg from "@/assets/tour-marine.jpg";
import aeroImg from "@/assets/tour-aero.jpg";
import healthImg from "@/assets/tour-health.jpg";
import politicalImg from "@/assets/tour-political.jpg";
import chimpImg from "@/assets/tour-chimp.jpg";
import npImg from "@/assets/tour-national-park.jpg";

interface PackageData {
  title: string;
  img: string;
  gallery: string[];
  duration: string;
  group: string;
  location: string;
  price: string;
  rating: number;
  category: string;
  desc: string;
  highlights: string[];
  itinerary: { day: string; title: string; desc: string }[];
  includes: string[];
  excludes: string[];
  offer?: string;
  youtubeId?: string;
  mapQuery?: string;
}

const packagesData: Record<string, PackageData> = {
  gorilla: {
    title: "Gorilla Trekking Experience",
    img: gorillaImg,
    gallery: [gorillaImg, wildlifeImg, lodgeImg],
    duration: "3 Days / 2 Nights",
    group: "2-8",
    location: "Bwindi Impenetrable Forest, Uganda",
    price: "From $1,500",
    rating: 5,
    category: "Wildlife",
    desc: "Trek through the misty forests of Bwindi Impenetrable National Park to encounter endangered mountain gorillas in their natural habitat. This once-in-a-lifetime experience brings you face-to-face with these gentle giants, guided by expert trackers who know every trail.\n\n**Mountain Gorillas** are one of the most endangered species on Earth, with fewer than 1,100 remaining in the wild. Uganda is home to over 50% of the world's mountain gorilla population. These magnificent creatures share 98% of their DNA with humans and live in family groups led by a dominant silverback.",
    highlights: ["Face-to-face gorilla encounter", "Expert wildlife guides", "Luxury forest lodge stay", "Cultural village visit", "Forest nature walks"],
    itinerary: [
      { day: "Day 1", title: "Arrival & Briefing", desc: "Arrive at Bwindi Impenetrable Forest. Check into your luxury lodge, enjoy a welcome dinner, and attend a gorilla trekking briefing with your guide." },
      { day: "Day 2", title: "Gorilla Trekking", desc: "Early morning breakfast followed by the gorilla trek. Spend up to 1 hour with a gorilla family. Afternoon cultural visit to the Batwa community." },
      { day: "Day 3", title: "Nature Walk & Departure", desc: "Morning forest nature walk to spot birds and primates. After lunch, transfer to the airstrip or onward destination." },
    ],
    includes: ["All accommodation", "Park entrance fees", "Gorilla permit", "Professional guide", "All meals", "Ground transport", "Drinking water"],
    excludes: ["International flights", "Travel insurance", "Tips & gratuities", "Personal expenses", "Alcoholic beverages"],
    youtubeId: "LU8DDYz68kM",
    mapQuery: "Bwindi Impenetrable Forest Uganda",
  },
  adventure: {
    title: "Nile Adventure Package",
    img: adventureImg,
    gallery: [adventureImg, heroImg, wildlifeImg],
    duration: "2 Days / 1 Night",
    group: "4-12",
    location: "Jinja, Source of the Nile, Uganda",
    price: "From $350",
    rating: 5,
    category: "Adventure",
    desc: "Experience the adrenaline rush of white-water rafting on the mighty River Nile, bungee jumping over the rapids, and kayaking through scenic river channels in Jinja — the adventure capital of East Africa.",
    highlights: ["Grade 5 white-water rafting", "Bungee jumping (44m)", "Kayaking on the Nile", "Source of the Nile boat cruise", "Sunset at Jinja"],
    itinerary: [
      { day: "Day 1", title: "Rafting & Bungee", desc: "Morning pickup from Kampala. Arrive Jinja for white-water rafting (Grade 3-5 rapids). Optional bungee jumping. Evening riverside dinner." },
      { day: "Day 2", title: "Kayaking & Source of Nile", desc: "Morning kayaking session. Visit the Source of the Nile by boat. Lunch and return to Kampala." },
    ],
    includes: ["All activities", "Safety equipment", "Professional instructors", "Meals (2 lunches, 1 dinner)", "Transport from Kampala", "Photos & video"],
    excludes: ["Accommodation upgrade", "Travel insurance", "Tips", "Personal items"],
    youtubeId: "dQw4w9WgXcQ",
    mapQuery: "Jinja Source of the Nile Uganda",
  },
  culture: {
    title: "Cultural Safari Immersion",
    img: cultureImg,
    gallery: [cultureImg, heroImg, lodgeImg],
    duration: "5 Days / 4 Nights",
    group: "2-10",
    location: "Multiple Locations, Uganda",
    price: "From $800",
    rating: 4,
    category: "Cultural",
    desc: "Immerse yourself in Uganda's 56 indigenous cultures and traditions. Visit royal kingdoms, participate in traditional ceremonies, learn local crafts, and taste authentic Ugandan cuisine across different regions.",
    highlights: ["Buganda Kingdom Palace visit", "Traditional dance performances", "Craft workshops", "Village homestay", "Local cuisine tasting", "Royal tomb visits"],
    itinerary: [
      { day: "Day 1", title: "Kampala Cultural Tour", desc: "Visit Kasubi Tombs (UNESCO), Lubiri Palace, and the National Museum. Evening cultural dance performance." },
      { day: "Day 2", title: "Buganda Kingdom", desc: "Explore the Buganda Kingdom heritage sites, meet local artisans, and participate in bark cloth making." },
      { day: "Day 3", title: "Eastern Uganda", desc: "Travel to Jinja. Visit the Busoga Kingdom, experience the Imbalu ceremony preparations, and enjoy local cuisine." },
      { day: "Day 4", title: "Western Cultures", desc: "Fly/drive to Fort Portal. Visit the Tooro Kingdom palace and Karambi royal tombs. Batwa pygmy community visit." },
      { day: "Day 5", title: "Craft Markets & Departure", desc: "Morning visit to local craft markets. Final cultural exchange. Transfer to departure point." },
    ],
    includes: ["All accommodation", "Cultural guide", "Entry fees", "All meals", "Internal transport", "Traditional outfits rental"],
    excludes: ["International flights", "Travel insurance", "Tips", "Personal shopping", "Alcoholic drinks"],
    mapQuery: "Kampala Uganda",
  },
  safari: {
    title: "Wildlife Safari Adventure",
    img: wildlifeImg,
    gallery: [wildlifeImg, npImg, lodgeImg],
    duration: "4 Days / 3 Nights",
    group: "2-8",
    location: "Queen Elizabeth National Park, Uganda",
    price: "From $1,200",
    rating: 5,
    category: "Wildlife",
    desc: "Explore Queen Elizabeth National Park on thrilling game drives and boat cruises. Encounter Africa's Big Five — lions, elephants, buffaloes, leopards, and hippos in their natural savanna habitat.",
    highlights: ["Big Five game drives", "Kazinga Channel boat cruise", "Tree-climbing lions", "Crater lakes exploration", "Bird watching (600+ species)"],
    itinerary: [
      { day: "Day 1", title: "Arrival at Queen Elizabeth NP", desc: "Drive through the scenic Rift Valley. Check into safari lodge. Afternoon crater lakes drive." },
      { day: "Day 2", title: "Full Day Game Drive", desc: "Morning and afternoon game drives across Kasenyi Plains. Picnic lunch in the park. Search for tree-climbing lions in Ishasha." },
      { day: "Day 3", title: "Kazinga Channel Cruise", desc: "Morning game drive. Afternoon boat cruise on Kazinga Channel — hippos, elephants, and 100+ bird species." },
      { day: "Day 4", title: "Morning Drive & Departure", desc: "Early morning game drive for predator sightings. Breakfast and transfer to departure point." },
    ],
    includes: ["Safari lodge accommodation", "All park fees", "Game drives", "Boat cruise", "Professional guide", "All meals", "4x4 safari vehicle"],
    excludes: ["International flights", "Travel insurance", "Tips", "Drinks", "Laundry"],
    youtubeId: "LU8DDYz68kM",
    mapQuery: "Queen Elizabeth National Park Uganda",
  },
  "city-tour": {
    title: "Kampala City Tour",
    img: cityImg,
    gallery: [cityImg, cultureImg, heroImg],
    duration: "1 Day",
    group: "2-15",
    location: "Kampala, Uganda",
    price: "From $80",
    rating: 4,
    category: "City Tours",
    desc: "Discover the vibrant capital of Uganda with visits to historical landmarks, bustling markets, religious sites, and the famous Owino Market. Experience the energy of Kampala's nightlife and cuisine scene.",
    highlights: ["Kasubi Tombs UNESCO site", "Uganda National Museum", "Owino Market experience", "Kampala nightlife", "Rolex street food tour"],
    itinerary: [
      { day: "Full Day", title: "Kampala Highlights", desc: "Morning: Kasubi Tombs, Uganda Museum, Hindu Temple. Lunch at a rooftop restaurant. Afternoon: Owino Market, Gadaffi Mosque panoramic views, craft markets. Evening: Street food tour and optional nightlife experience." },
    ],
    includes: ["Transport", "Professional guide", "Entry fees", "Lunch", "Water"],
    excludes: ["Dinner", "Tips", "Personal shopping", "Drinks"],
    mapQuery: "Kampala City Center Uganda",
  },
  religion: {
    title: "Religious Heritage Tour",
    img: religionImg,
    gallery: [religionImg, cultureImg, heroImg],
    duration: "3 Days / 2 Nights",
    group: "2-20",
    location: "Kampala & Namugongo, Uganda",
    price: "From $400",
    rating: 4,
    category: "Religious",
    desc: "Visit Uganda's most sacred religious sites including the Namugongo Martyrs Shrine, Rubaga Cathedral, Kibuli Mosque, and Bahai Temple. Perfect for pilgrims and those interested in religious history.",
    highlights: ["Namugongo Martyrs Shrine", "Rubaga Cathedral", "Kibuli Mosque", "Bahai Temple", "Namirembe Cathedral"],
    itinerary: [
      { day: "Day 1", title: "Christian Heritage", desc: "Visit Namugongo Martyrs Shrine, Rubaga Cathedral, and Namirembe Cathedral. Learn about the Uganda Martyrs story." },
      { day: "Day 2", title: "Islamic & Bahai Sites", desc: "Explore Kibuli Mosque, Gadaffi National Mosque (panoramic views), and the Bahai Temple on Kikaaya Hill." },
      { day: "Day 3", title: "Interfaith Experience", desc: "Meet religious leaders from different faiths. Community project visit. Departure." },
    ],
    includes: ["Accommodation", "Guide", "Entry fees", "Meals", "Transport"],
    excludes: ["Flights", "Insurance", "Tips", "Personal items"],
    mapQuery: "Namugongo Martyrs Shrine Uganda",
  },
  marine: {
    title: "Marine & Lake Tour",
    img: marineImg,
    gallery: [marineImg, adventureImg, heroImg],
    duration: "3 Days / 2 Nights",
    group: "2-10",
    location: "Lake Victoria & Ssese Islands, Uganda",
    price: "From $500",
    rating: 4,
    category: "Marine",
    desc: "Explore Uganda's magnificent waterways — from Lake Victoria (Africa's largest lake) to the stunning Ssese Islands. Enjoy fishing, island hopping, sunset cruises, and beach relaxation.",
    highlights: ["Ssese Islands beach", "Sport fishing", "Sunset boat cruise", "Island hopping", "Fresh fish BBQ", "Swimming & snorkeling"],
    itinerary: [
      { day: "Day 1", title: "Ferry to Ssese Islands", desc: "Morning ferry from Nakiwogo. Arrive at Kalangala. Beach relaxation, swimming, and sunset cocktails." },
      { day: "Day 2", title: "Island Exploration", desc: "Morning sport fishing. Island hopping by boat. Visit fishing communities. Afternoon snorkeling. Fresh fish BBQ dinner." },
      { day: "Day 3", title: "Lake Cruise & Return", desc: "Sunrise lake cruise. Breakfast on the beach. Return ferry to mainland." },
    ],
    includes: ["Ferry tickets", "Island accommodation", "Boat tours", "Fishing equipment", "Meals", "Guide"],
    excludes: ["Transport to ferry point", "Insurance", "Tips", "Drinks", "Personal items"],
    mapQuery: "Ssese Islands Uganda",
  },
  aero: {
    title: "Aero Tourism Experience",
    img: aeroImg,
    gallery: [aeroImg, wildlifeImg, lodgeImg],
    duration: "1-2 Days",
    group: "2-4",
    location: "Multiple Locations, Uganda",
    price: "From $600",
    rating: 5,
    category: "Aero Tourism",
    desc: "See Uganda from above! Hot air balloon safaris over national parks, helicopter tours over the Nile, scenic flights over the Rwenzori Mountains, and paragliding experiences.",
    highlights: ["Hot air balloon safari", "Helicopter tour", "Scenic flights", "Aerial photography", "Paragliding"],
    itinerary: [
      { day: "Day 1", title: "Aerial Adventure", desc: "Early morning hot air balloon ride over Queen Elizabeth NP. Champagne bush breakfast. Afternoon helicopter tour over Murchison Falls. Scenic flight over Rwenzori Mountains." },
    ],
    includes: ["All flights/rides", "Safety equipment", "Professional pilots", "Breakfast", "Photos", "Insurance"],
    excludes: ["Ground transport", "Accommodation", "Lunch/Dinner", "Tips"],
  },
  political: {
    title: "Political Heritage Tour",
    img: politicalImg,
    gallery: [politicalImg, cityImg, cultureImg],
    duration: "2 Days / 1 Night",
    group: "2-15",
    location: "Kampala & Entebbe, Uganda",
    price: "From $250",
    rating: 4,
    category: "Political",
    desc: "Explore Uganda's political history from colonial times to independence. Visit Parliament, State House, independence monuments, and learn about the nation's political journey.",
    highlights: ["Parliament building tour", "Uganda Museum", "Independence Monument", "Entebbe State House", "Idi Amin historical sites"],
    itinerary: [
      { day: "Day 1", title: "Kampala Political Sites", desc: "Visit Parliament, Independence Monument, Idi Amin's torture chambers at Lubiri Palace, and Uganda Museum. Meet political analysts for a briefing." },
      { day: "Day 2", title: "Entebbe Heritage", desc: "Visit the old Entebbe airport (1976 raid site), State House grounds, and Botanical Gardens. Return to Kampala." },
    ],
    includes: ["Transport", "Guide", "Entry fees", "Meals", "Accommodation"],
    excludes: ["Flights", "Insurance", "Tips", "Personal items"],
    mapQuery: "Parliament of Uganda Kampala",
  },
  health: {
    title: "Health & Wellness Retreat",
    img: healthImg,
    gallery: [healthImg, lodgeImg, marineImg],
    duration: "5-7 Days",
    group: "1-6",
    location: "Multiple Locations, Uganda",
    price: "From $1,800",
    rating: 5,
    category: "Health",
    desc: "Rejuvenate your mind and body at Uganda's finest wellness retreats. Hot springs, spa treatments, yoga, meditation, traditional healing, and health check-ups at top medical facilities.",
    highlights: ["Kitagata Hot Springs", "Spa treatments", "Yoga & meditation", "Traditional healing", "Medical check-ups", "Healthy cuisine"],
    itinerary: [
      { day: "Day 1-2", title: "Arrival & Wellness Assessment", desc: "Arrive at luxury wellness resort. Health assessment, personalized wellness plan, spa treatments, and yoga sessions." },
      { day: "Day 3-4", title: "Hot Springs & Healing", desc: "Visit Kitagata Hot Springs. Traditional healing sessions. Nature walks. Meditation and mindfulness workshops." },
      { day: "Day 5", title: "Medical Tourism", desc: "Optional visit to top medical facilities in Kampala for health check-ups, dental care, or specialized treatments." },
    ],
    includes: ["Luxury accommodation", "All treatments", "Meals (healthy menu)", "Transport", "Wellness guide", "Medical consultation"],
    excludes: ["Flights", "Insurance", "Medical procedures", "Tips", "Personal items"],
  },
  chimp: {
    title: "Chimpanzee Tracking",
    img: chimpImg,
    gallery: [chimpImg, wildlifeImg, gorillaImg],
    duration: "2 Days / 1 Night",
    group: "2-8",
    location: "Kibale National Park, Uganda",
    price: "From $600",
    rating: 5,
    category: "Wildlife",
    desc: "Track habituated chimpanzees through the lush rainforests of Kibale National Park — home to the highest concentration of primates in Africa with 13 different species.\n\n**Chimpanzees** are our closest living relatives, sharing 98.7% of our DNA. Kibale is home to about 1,500 chimps in 13 habituated communities. They use tools, communicate with over 60 distinct vocalizations, and live in complex social groups.",
    highlights: ["Chimpanzee tracking", "13 primate species", "Bigodi Wetland Sanctuary", "Forest bird watching", "Nature walks"],
    itinerary: [
      { day: "Day 1", title: "Arrival & Bigodi Wetland", desc: "Arrive at Kibale Forest. Afternoon visit to Bigodi Wetland Sanctuary for bird watching and primate spotting. Evening at lodge." },
      { day: "Day 2", title: "Chimpanzee Tracking", desc: "Early morning chimp tracking (2-5 hours). Spend 1 hour with chimps. Afternoon nature walk. Departure." },
    ],
    includes: ["Accommodation", "Chimp permit", "Park fees", "Guide", "Meals", "Transport"],
    excludes: ["Flights", "Insurance", "Tips", "Drinks", "Personal items"],
    youtubeId: "LU8DDYz68kM",
    mapQuery: "Kibale National Park Uganda",
  },
  "national-parks": {
    title: "National Parks Explorer",
    img: npImg,
    gallery: [npImg, wildlifeImg, gorillaImg, lodgeImg],
    duration: "7 Days / 6 Nights",
    group: "2-8",
    location: "Multiple National Parks, Uganda",
    price: "From $2,500",
    rating: 5,
    category: "National Parks",
    desc: "The ultimate Uganda safari covering three major national parks — Queen Elizabeth, Murchison Falls, and Bwindi. Game drives, boat cruises, waterfall hikes, and gorilla encounters.",
    highlights: ["3 National Parks", "Big Five game drives", "Murchison Falls hike", "Gorilla trekking", "Nile boat cruise", "Tree-climbing lions"],
    itinerary: [
      { day: "Day 1-2", title: "Murchison Falls NP", desc: "Drive to Murchison Falls. Game drive, Nile boat cruise to the falls, and hike to the top of the falls." },
      { day: "Day 3-4", title: "Queen Elizabeth NP", desc: "Transfer to Queen Elizabeth NP. Game drives, Kazinga Channel cruise, and Ishasha tree-climbing lions." },
      { day: "Day 5-6", title: "Bwindi Forest", desc: "Drive through the scenic Rift Valley to Bwindi. Gorilla trekking and Batwa community visit." },
      { day: "Day 7", title: "Departure", desc: "Morning nature walk. Transfer to Entebbe for departure." },
    ],
    includes: ["All accommodation", "All park fees", "Gorilla permit", "Game drives", "Boat cruises", "Guide", "All meals", "4x4 vehicle"],
    excludes: ["International flights", "Insurance", "Tips", "Drinks", "Laundry", "Personal items"],
    mapQuery: "Murchison Falls National Park Uganda",
  },
  honeymoon: {
    title: "Luxury Honeymoon Retreat",
    img: lodgeImg,
    gallery: [lodgeImg, marineImg, heroImg],
    duration: "7 Days / 6 Nights",
    group: "2",
    location: "Multiple Locations, Uganda",
    price: "From $3,000",
    rating: 5,
    category: "Luxury",
    desc: "Premium lodges, private guides, and exclusive romantic experiences across Uganda's most beautiful destinations.",
    highlights: ["Private safari drives", "Luxury lodges", "Romantic dinners", "Couples spa", "Champagne sundowners"],
    itinerary: [
      { day: "Day 1-2", title: "Lake Bunyonyi", desc: "Arrive at the 'Switzerland of Africa'. Private canoe ride, island picnic, and romantic sunset dinner." },
      { day: "Day 3-4", title: "Bwindi Forest", desc: "Gorilla trekking together. Private forest dinner. Spa treatments at luxury lodge." },
      { day: "Day 5-6", title: "Queen Elizabeth NP", desc: "Private game drives. Sunset Kazinga Channel cruise with champagne. Bush dinner under the stars." },
      { day: "Day 7", title: "Departure", desc: "Farewell breakfast. Transfer to Entebbe with lakeside lunch stop." },
    ],
    includes: ["Luxury accommodation", "Private guide", "All permits", "All meals", "Spa treatments", "Champagne", "Romantic setups", "4x4 vehicle"],
    excludes: ["International flights", "Insurance", "Tips", "Shopping"],
  },
  combined: {
    title: "Combined East Africa Safari",
    img: heroImg,
    gallery: [heroImg, wildlifeImg, gorillaImg, npImg],
    duration: "10 Days / 9 Nights",
    group: "2-8",
    location: "Uganda, Kenya, Tanzania",
    price: "From $4,500",
    rating: 5,
    category: "Combined",
    desc: "The ultimate East African safari across three countries — gorilla trekking in Uganda, Maasai Mara in Kenya, and the Serengeti in Tanzania.",
    highlights: ["3 countries", "Gorilla trekking", "Maasai Mara", "Serengeti", "Ngorongoro Crater", "Big Five"],
    itinerary: [
      { day: "Day 1-3", title: "Uganda", desc: "Bwindi gorilla trekking, Queen Elizabeth NP game drives, and Kazinga Channel cruise." },
      { day: "Day 4-6", title: "Kenya", desc: "Fly to Nairobi. Maasai Mara safari with game drives, balloon safari, and Maasai village visit." },
      { day: "Day 7-9", title: "Tanzania", desc: "Cross to Serengeti. Great Migration viewing. Ngorongoro Crater descent. Olduvai Gorge." },
      { day: "Day 10", title: "Departure", desc: "Final game drive. Transfer to Kilimanjaro Airport for departure." },
    ],
    includes: ["All accommodation", "All permits", "Internal flights", "Game drives", "Guides", "All meals", "Safari vehicles"],
    excludes: ["International flights", "Visas", "Insurance", "Tips", "Personal items"],
  },
  education: {
    title: "Education Tour",
    img: cultureImg,
    gallery: [cultureImg, npImg, heroImg],
    duration: "3-5 Days",
    group: "10-40",
    location: "Multiple Locations, Uganda",
    price: "From $300",
    rating: 4,
    category: "Education",
    desc: "Comprehensive educational tours designed for schools, universities, and research groups. Visit Uganda's leading museums, research centers, national parks, and cultural institutions for an immersive learning experience.",
    highlights: ["Uganda Museum & National Archives", "Mabira Forest ecology walk", "Source of the Nile geography lesson", "Kibale primate research center", "Makerere University campus tour", "Community development projects"],
    itinerary: [
      { day: "Day 1", title: "Kampala Academic Tour", desc: "Visit Uganda Museum, National Archives, Makerere University campus, and the National Library. Lecture on Uganda's history and biodiversity." },
      { day: "Day 2", title: "Mabira Forest Ecology", desc: "Travel to Mabira Forest Reserve. Guided ecology walk studying tropical rainforest ecosystems, canopy structure, and 315 bird species. Hands-on conservation workshop." },
      { day: "Day 3", title: "Jinja Geography & History", desc: "Visit the Source of the Nile, Owen Falls Dam, and learn about hydroelectric power. Afternoon at Busoga Kingdom cultural center." },
      { day: "Day 4", title: "Wildlife Research (Optional)", desc: "Visit Kibale National Park research station or Queen Elizabeth NP for wildlife monitoring, census techniques, and community conservation programs." },
      { day: "Day 5", title: "Community Project & Wrap-up", desc: "Visit a community development project. Student presentations and certificate ceremony. Departure." },
    ],
    includes: ["Accommodation", "Transport", "Entry fees", "Educational guides", "All meals", "Study materials", "Certificates"],
    excludes: ["Flights", "Insurance", "Tips", "Personal items", "Optional activities"],
  },
  memorial: {
    title: "Memorial Heritage Tour",
    img: religionImg,
    gallery: [religionImg, cultureImg, cityImg],
    duration: "2 Days / 1 Night",
    group: "2-20",
    location: "Kampala & Surrounds, Uganda",
    price: "From $200",
    rating: 4,
    category: "Memorial",
    desc: "A solemn and enlightening journey through Uganda's most significant memorial sites. Honor the Uganda Martyrs at Namugongo, visit the royal burial grounds at Kasubi, and reflect at independence monuments that shaped the nation.",
    highlights: ["Namugongo Martyrs Shrine (Catholic & Anglican)", "Kasubi Royal Tombs (UNESCO)", "Independence Monument", "Lubiri Palace historical site", "Heroes Corner & National Heroes"],
    itinerary: [
      { day: "Day 1", title: "Namugongo & Martyrs Heritage", desc: "Morning visit to Namugongo Catholic Martyrs Shrine and basilica. Learn about the 45 Christian martyrs of 1886. Visit the Anglican Martyrs shrine nearby. Afternoon at Kasubi Royal Tombs — UNESCO World Heritage burial grounds of the Buganda Kings." },
      { day: "Day 2", title: "Independence & National Heroes", desc: "Visit the Independence Monument at Speke Road. Tour Lubiri Palace and Idi Amin's historical bunkers. Visit the National Heroes Corner. Reflection and discussion on Uganda's journey to independence. Departure." },
    ],
    includes: ["Accommodation", "Guide", "Entry fees", "Meals", "Transport"],
    excludes: ["Flights", "Insurance", "Tips", "Personal items"],
    mapQuery: "Namugongo Martyrs Shrine Kampala",
  },
  mabira: {
    title: "Mabira Forest Adventure",
    img: npImg,
    gallery: [npImg, adventureImg, wildlifeImg],
    duration: "1 Day",
    group: "2-12",
    location: "Jinja Road, 54km from Kampala",
    price: "From $60",
    rating: 4,
    category: "Adventure",
    desc: "Explore one of Uganda's largest surviving natural tropical rainforests just 54km from Kampala. Mabira Forest Reserve covers 300 sq km and is home to 315 bird species, 218 butterfly species, and the rare grey-cheeked mangabey monkey.",
    highlights: ["Canopy zip-lining", "Nature trail walks", "315 bird species", "Grey-cheeked mangabey spotting", "Mountain biking", "Butterfly watching"],
    itinerary: [
      { day: "Full Day", title: "Mabira Forest Experience", desc: "Morning departure from Kampala (1 hour drive). Guided forest nature walk through ancient trees and medicinal plant trails. Canopy zip-lining adventure. Lunch at the Rainforest Lodge. Afternoon mountain biking or bird watching. Optional visit to Sezibwa Falls nearby. Return to Kampala by sunset." },
    ],
    includes: ["Transport from Kampala", "Park entry fees", "Guide", "Zip-lining equipment", "Lunch", "Water"],
    excludes: ["Mountain bike rental ($10)", "Insurance", "Tips", "Personal items"],
    mapQuery: "Mabira Forest Reserve Uganda",
  },
  "great-migration": {
    title: "Great Migration Safari",
    img: heroImg,
    gallery: [heroImg, wildlifeImg, aeroImg, lodgeImg],
    duration: "8 Days / 7 Nights",
    group: "2-8",
    location: "Maasai Mara, Serengeti & Ngorongoro",
    price: "From $3,850",
    rating: 5,
    category: "Wildlife",
    desc: "Follow one of the world's greatest wildlife spectacles across Kenya and Tanzania with expert safari guides, carefully selected lodges, and flexible routing based on seasonal migration movement.",
    highlights: ["Maasai Mara game drives", "Serengeti plains", "Ngorongoro Crater", "Optional balloon safari", "Big Five viewing", "Maasai cultural visit"],
    itinerary: [
      { day: "Day 1-2", title: "Nairobi to Maasai Mara", desc: "Arrival briefing, scenic drive or flight to the Mara, afternoon game drive, and sundowner." },
      { day: "Day 3-4", title: "Migration Tracking", desc: "Full-day game drives following wildebeest, zebra, lions, cheetahs, and river-crossing areas when in season." },
      { day: "Day 5-6", title: "Serengeti", desc: "Cross into Tanzania for central or northern Serengeti game drives based on wildlife movement." },
      { day: "Day 7-8", title: "Ngorongoro & Departure", desc: "Crater descent for dense wildlife viewing, final lodge night, then transfer to Arusha or Kilimanjaro Airport." },
    ],
    includes: ["Safari lodges", "Park fees", "4x4 game drives", "Professional guide", "All meals", "Cross-border support"],
    excludes: ["International flights", "Visas", "Travel insurance", "Tips", "Optional balloon flight"],
    offer: "Groups of 5+ receive 5% off, plus complimentary itinerary planning and packing guidance.",
    mapQuery: "Maasai Mara National Reserve Kenya",
  },
  "zanzibar-blue-safari": {
    title: "Zanzibar Blue Safari",
    img: marineImg,
    gallery: [marineImg, heroImg, adventureImg, lodgeImg],
    duration: "4 Days / 3 Nights",
    group: "2-10",
    location: "Zanzibar, Tanzania",
    price: "From $950",
    rating: 5,
    category: "Marine",
    desc: "A relaxed island escape combining Stone Town heritage, spice farms, sandbanks, dhow sailing, snorkeling, seafood lunches, and warm Indian Ocean beaches.",
    highlights: ["Stone Town tour", "Spice farm visit", "Dhow sailing", "Snorkeling", "Sandbank picnic", "Beach leisure"],
    itinerary: [
      { day: "Day 1", title: "Stone Town Arrival", desc: "Airport pickup, hotel check-in, sunset waterfront walk, and guided Stone Town orientation." },
      { day: "Day 2", title: "Spice & Heritage", desc: "Spice farm tour, local lunch, historical sites, markets, and evening Swahili dinner." },
      { day: "Day 3", title: "Blue Safari", desc: "Dhow sailing, snorkeling, sandbank picnic, seafood lunch, and lagoon swimming." },
      { day: "Day 4", title: "Beach Morning", desc: "Leisure morning before transfer for departure or extension." },
    ],
    includes: ["Hotel stay", "Airport transfers", "Tours listed", "Selected meals", "Boat crew", "Snorkeling gear"],
    excludes: ["Flights", "Travel insurance", "Tips", "Personal expenses"],
    offer: "Book with any safari package and receive coordinated airport transfers and beach-extension planning.",
    mapQuery: "Stone Town Zanzibar Tanzania",
  },
  "shoebill-birding": {
    title: "Uganda Birding & Shoebill",
    img: marineImg,
    gallery: [marineImg, npImg, wildlifeImg],
    duration: "3 Days / 2 Nights",
    group: "2-6",
    location: "Mabamba Wetland & Entebbe",
    price: "From $480",
    rating: 5,
    category: "Wildlife",
    desc: "A focused birding itinerary for travelers hoping to see the rare shoebill, Lake Victoria wetland species, forest birds, and Entebbe's botanical gardens.",
    highlights: ["Shoebill canoe tracking", "Mabamba Wetland", "Botanical Gardens", "Lake Victoria birding", "Specialist guide"],
    itinerary: [
      { day: "Day 1", title: "Entebbe Arrival", desc: "Arrival, botanical gardens bird walk, and briefing with your birding guide." },
      { day: "Day 2", title: "Mabamba Wetland", desc: "Early canoe search for shoebill, papyrus birds, and Lake Victoria shoreline species." },
      { day: "Day 3", title: "Optional Extension", desc: "Morning birding or transfer onward to Murchison, Kibale, or Bwindi." },
    ],
    includes: ["Accommodation", "Canoe fees", "Birding guide", "Transport", "Meals", "Water"],
    excludes: ["Flights", "Insurance", "Tips", "Camera fees where applicable"],
    offer: "Includes a bird checklist and free consultation for longer Uganda birding routes.",
    mapQuery: "Mabamba Swamp Uganda",
  },
  "kigali-memorial": {
    title: "Kigali Genocide Memorial & City",
    img: politicalImg,
    gallery: [politicalImg, cultureImg, cityImg],
    duration: "2 Days / 1 Night",
    group: "2-12",
    location: "Kigali, Rwanda",
    price: "From $420",
    rating: 5,
    category: "Memorial",
    desc: "A respectful Rwanda city experience focused on remembrance, reconciliation, clean-city planning, markets, art spaces, and local cuisine.",
    highlights: ["Kigali Genocide Memorial", "Nyamirambo walk", "Art galleries", "Local markets", "Rwanda history briefing"],
    itinerary: [{ day: "Day 1-2", title: "Kigali Heritage", desc: "Guided memorial visit, city viewpoints, markets, cultural neighborhood walk, and optional museum or art gallery stops." }],
    includes: ["Hotel", "Guide", "Transport", "Entry coordination", "Selected meals"],
    excludes: ["Flights", "Insurance", "Tips", "Personal purchases"],
    offer: "Can be added before or after gorilla trekking in Rwanda or Uganda.",
    mapQuery: "Kigali Genocide Memorial Rwanda",
  },
  "agro-tourism": {
    title: "Coffee, Tea & Farm Tour",
    img: cultureImg,
    gallery: [cultureImg, npImg, lodgeImg],
    duration: "2 Days / 1 Night",
    group: "2-12",
    location: "Sipi & Fort Portal, Uganda",
    price: "From $220",
    rating: 4,
    category: "Cultural",
    desc: "Meet farmers, process coffee by hand, walk tea estates, taste fresh produce, and connect with Uganda's agricultural communities.",
    highlights: ["Coffee processing", "Tea estate walk", "Farm lunch", "Waterfall visit", "Community market"],
    itinerary: [{ day: "Day 1-2", title: "Farm-to-cup Experience", desc: "Coffee or tea farm visit, local cooking, waterfall or crater scenery, and community storytelling." }],
    includes: ["Transport", "Farm guide", "Accommodation", "Meals", "Tastings"],
    excludes: ["Flights", "Insurance", "Tips", "Personal shopping"],
    offer: "Includes locally roasted coffee gift pack for bookings of 5+ travelers.",
    mapQuery: "Sipi Falls Uganda",
  },
  "student-expedition": {
    title: "East Africa Student Expedition",
    img: cultureImg,
    gallery: [cultureImg, npImg, wildlifeImg],
    duration: "10 Days / 9 Nights",
    group: "10-40",
    location: "Uganda, Kenya & Rwanda",
    price: "From $1,450",
    rating: 4,
    category: "Education",
    desc: "A curriculum-friendly learning journey through museums, conservation centers, universities, innovation hubs, national parks, and community projects.",
    highlights: ["Museums", "Universities", "Conservation labs", "Innovation hubs", "Community projects", "National parks"],
    itinerary: [{ day: "Day 1-10", title: "Regional Learning Route", desc: "Structured educational visits across Kampala, Jinja, Nairobi, and Kigali with daily guided learning reflections." }],
    includes: ["Student accommodation", "Transport", "Educational guides", "Entry fees", "Meals", "Certificates"],
    excludes: ["Flights", "Insurance", "Visas", "Tips"],
    offer: "Teacher/chaperone planning pack included for confirmed school groups.",
    mapQuery: "Makerere University Kampala Uganda",
  },
};

export default function PackageDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const pkg = slug ? packagesData[slug] : null;

  if (!pkg) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-3xl font-display font-bold mb-4">Package Not Found</h1>
        <p className="text-muted-foreground mb-6">The tour package you're looking for doesn't exist.</p>
        <Button asChild><Link to="/packages">View All Packages</Link></Button>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="container relative z-10 max-w-4xl">
          <Link to="/packages" className="inline-flex items-center gap-1 text-sm text-accent hover:underline mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Packages
          </Link>
          <span className="inline-block bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full mb-3">{pkg.category}</span>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">{pkg.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/80 mb-4">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{pkg.duration}</span>
            <span className="flex items-center gap-1"><Users className="w-4 h-4" />{pkg.group} pax</span>
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{pkg.location}</span>
            <span className="flex items-center gap-1">
              {Array.from({ length: pkg.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </span>
          </div>
          <p className="text-2xl font-display font-bold text-accent">{pkg.price}</p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-8 bg-secondary/30">
        <div className="container">
          <ImageGallery images={pkg.gallery.map((src, i) => ({ src, alt: `${pkg.title} ${i + 1}` }))} />
        </div>
      </section>

      {/* YouTube Video */}
      {pkg.youtubeId && (
        <section className="py-8">
          <div className="container max-w-3xl">
            <h2 className="text-xl font-display font-bold mb-4">🎥 Watch Video</h2>
            <YouTubeEmbed videoId={pkg.youtubeId} title={pkg.title} />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-display font-bold mb-4">About This Tour</h2>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line">{pkg.desc}</div>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold mb-4">Highlights</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {pkg.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold mb-6">Day-by-Day Itinerary</h2>
                <div className="space-y-4">
                  {pkg.itinerary.map((item, i) => (
                    <div key={i} className="bg-card rounded-xl border border-border p-6 shadow-card">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">{item.day}</span>
                        <h3 className="font-display font-semibold text-lg">{item.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display font-bold text-lg mb-3 text-primary">What's Included</h3>
                  <ul className="space-y-2">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-3 text-destructive">What's Excluded</h3>
                  <ul className="space-y-2">
                    {pkg.excludes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Map */}
              {pkg.mapQuery && (
                <div>
                  <h2 className="text-2xl font-display font-bold mb-4">📍 Location</h2>
                  <GoogleMapEmbed query={pkg.mapQuery} height="350px" />
                </div>
              )}

              {/* Customer Rating */}
              <CustomerRating itemName={pkg.title} itemType="tour package" />
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24 space-y-6">
                <div className="bg-card rounded-xl border border-border shadow-elevated p-6">
                  <p className="text-3xl font-display font-bold text-primary mb-1">{pkg.price}</p>
                  <p className="text-sm text-muted-foreground mb-6">per person</p>
                  {pkg.offer && (
                    <div className="mb-6 rounded-lg bg-accent/10 p-4 text-sm text-foreground">
                      <p className="font-semibold text-primary mb-1">Current booking offer</p>
                      <p>{pkg.offer}</p>
                    </div>
                  )}
                  <Button asChild size="lg" className="w-full rounded-full mb-3">
                    <Link to={`/booking?package=${slug}`}>
                      Book Now <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full rounded-full">
                    <Link to="/contact">Ask a Question</Link>
                  </Button>
                  <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm">
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-muted-foreground" /> {pkg.duration}</div>
                    <div className="flex items-center gap-2"><Users className="w-4 h-4 text-muted-foreground" /> {pkg.group} travelers</div>
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground" /> {pkg.location}</div>
                  </div>
                </div>

                <DistanceCalculator />

                <div className="bg-secondary/50 rounded-xl p-6 text-center">
                  <h3 className="font-display font-semibold mb-2">Need a Custom Itinerary?</h3>
                  <p className="text-sm text-muted-foreground mb-4">We can tailor this package to your preferences.</p>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link to="/contact">Contact Us</Link>
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
