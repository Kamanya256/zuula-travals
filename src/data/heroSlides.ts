import heroWildlife from "@/assets/hero-wildlife.jpg";
import heroLodge from "@/assets/hero-lodge.jpg";
import heroCottage from "@/assets/hero-cottage.jpg";
import heroSafari from "@/assets/hero-safari.jpg";
import heroGorilla from "@/assets/hero-gorilla.jpg";
import heroLake from "@/assets/hero-lake.jpg";
import heroHotelRoom from "@/assets/hero-hotel-room.jpg";
import gorillaImg from "@/assets/gorilla-trekking.jpg";
import adventureImg from "@/assets/adventure-nile.jpg";
import cultureImg from "@/assets/culture-uganda.jpg";
import wildlifeImg from "@/assets/wildlife-safari.jpg";
import lodgeImg from "@/assets/luxury-lodge.jpg";
import restaurantLawns from "@/assets/restaurant-lawns.jpg";
import restaurantCafejavas from "@/assets/restaurant-cafejavas.jpg";
import restaurantPrunes from "@/assets/restaurant-prunes.jpg";
import restaurantFangfang from "@/assets/restaurant-fangfang.jpg";

export type HeroSlide = {
  img: string;
  title: string;
  subtitle: string;
  desc: string;
  link: string;
};

// Master pool of hero content pulled from across the site
const heroPool: HeroSlide[] = [
  // Wildlife & Safari
  { img: heroWildlife, title: "Wildlife Safari", subtitle: "Africa's Big Five", desc: "Witness elephants, lions, and zebras roaming free across Uganda's stunning savannas.", link: "/packages" },
  { img: heroGorilla, title: "Gorilla Trekking", subtitle: "Bwindi Impenetrable Forest", desc: "Encounter mountain gorillas in their natural habitat — a once-in-a-lifetime adventure.", link: "/visa-permits" },
  { img: heroSafari, title: "Safari Adventures", subtitle: "Game Drives & Expeditions", desc: "Explore national parks on thrilling game drives with expert guides.", link: "/packages" },
  // Accommodation
  { img: heroLodge, title: "Luxury Lodges", subtitle: "Premium Accommodation", desc: "Stay in world-class safari lodges with breathtaking views of the African landscape.", link: "/hotels" },
  { img: heroHotelRoom, title: "5-Star Hotels", subtitle: "Luxury Accommodation", desc: "Experience world-class hospitality at Uganda's finest hotels and resorts.", link: "/hotels" },
  { img: heroCottage, title: "Country Retreats", subtitle: "Cottages & Country Homes", desc: "Escape to charming cottages nestled in Uganda's lush countryside.", link: "/hotels" },
  // Water & Nature
  { img: heroLake, title: "Lake Escapes", subtitle: "Scenic Waterways", desc: "Discover serene lakes, flamingos at sunrise, and peaceful boat cruises.", link: "/boat-rides" },
  // Culture & Food
  { img: cultureImg, title: "Rich Culture", subtitle: "56+ Indigenous Cultures", desc: "Discover vibrant traditions, dances, and crafts of East Africa's diverse communities.", link: "/attractions" },
  { img: restaurantLawns, title: "Fine Dining", subtitle: "Culinary Experiences", desc: "Savour world-class cuisine at Kampala's top restaurants — from garden dining to street food.", link: "/restaurants" },
  { img: restaurantCafejavas, title: "Cafe Culture", subtitle: "Coffee & Cuisine", desc: "Uganda is the birthplace of Robusta coffee — taste it fresh at beloved local cafés.", link: "/restaurants" },
  // Adventure
  { img: adventureImg, title: "Nile Adventures", subtitle: "White Water Rafting", desc: "Conquer the rapids of the mighty River Nile at Jinja — Africa's adventure capital.", link: "/packages" },
  { img: wildlifeImg, title: "Queen Elizabeth NP", subtitle: "Tree-Climbing Lions", desc: "Spot the famous tree-climbing lions on a game drive through the Ishasha sector.", link: "/packages" },
  // Dining
  { img: restaurantPrunes, title: "Garden Dining", subtitle: "Nakasero, Kampala", desc: "Dine under the stars in enchanting garden restaurants with continental cuisine.", link: "/restaurants/prunes-restaurant" },
  { img: restaurantFangfang, title: "Asian Flavors", subtitle: "Authentic Dim Sum", desc: "Explore East Asian cuisine right in the heart of Kampala's Acacia Mall.", link: "/restaurants/fang-fang" },
  // Services
  { img: gorillaImg, title: "Gorilla Permits", subtitle: "Book Early, Save More", desc: "Secure your gorilla trekking permits through our hassle-free booking system.", link: "/visa-permits" },
  { img: lodgeImg, title: "Volunteer Programs", subtitle: "Give Back to Communities", desc: "Join conservation and community projects that make a lasting impact.", link: "/volunteer" },
];

/**
 * Returns a shuffled selection of hero slides.
 * Each page load gets a fresh random order.
 */
export function getRandomHeroSlides(count = 7): HeroSlide[] {
  const shuffled = [...heroPool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
