import restaurantLawns from "@/assets/restaurant-lawns.jpg";
import restaurantCafejavas from "@/assets/restaurant-cafejavas.jpg";
import restaurantKhana from "@/assets/restaurant-khana.jpg";
import restaurantHaandi from "@/assets/restaurant-haandi.jpg";
import restaurantPrunes from "@/assets/restaurant-prunes.jpg";
import restaurantFangfang from "@/assets/restaurant-fangfang.jpg";

export type MenuItem = {
  name: string;
  price: number;
  category: string;
  desc: string;
};

export type Restaurant = {
  slug: string;
  name: string;
  location: string;
  type: string;
  desc: string;
  longDesc: string;
  image: string;
  hours: string;
  phone: string;
  mapQuery: string;
  features: string[];
  menu: MenuItem[];
};

export const restaurants: Restaurant[] = [
  {
    slug: "the-lawns",
    name: "The Lawns",
    location: "Kololo, Kampala",
    type: "Fine Dining",
    desc: "Upscale garden restaurant with international cuisine.",
    longDesc: "Set in the lush gardens of Kololo, The Lawns offers a sophisticated fine dining experience with continental and African-inspired cuisine. Perfect for romantic dinners, business lunches, and special celebrations. Known for impeccable service and a curated wine list.",
    image: restaurantLawns,
    hours: "11:00 AM – 11:00 PM",
    phone: "+256 700 123 456",
    mapQuery: "The Lawns Restaurant Kololo Kampala",
    features: ["Garden Seating", "Wine Bar", "Private Dining", "Live Music Fridays", "Valet Parking"],
    menu: [
      { name: "Grilled Lamb Chops", price: 22, category: "Mains", desc: "Premium lamb chops with rosemary, mint jelly, and seasonal vegetables." },
      { name: "Garden Salad", price: 8, category: "Starters", desc: "Fresh mixed greens with cherry tomatoes, feta, and balsamic vinaigrette." },
      { name: "Pan-Seared Tilapia", price: 18, category: "Mains", desc: "Lake Victoria tilapia with lemon butter sauce and wild rice." },
      { name: "Beef Tenderloin", price: 28, category: "Mains", desc: "8oz tenderloin with truffle mashed potatoes and red wine jus." },
      { name: "Crème Brûlée", price: 10, category: "Desserts", desc: "Classic French custard with caramelized sugar top." },
      { name: "Passion Fruit Martini", price: 12, category: "Drinks", desc: "Fresh passion fruit blended with premium vodka." },
      { name: "House Red Wine (Glass)", price: 9, category: "Drinks", desc: "Selected South African Cabernet Sauvignon." },
    ],
  },
  {
    slug: "cafe-javas",
    name: "Cafe Javas",
    location: "Multiple Locations, Kampala",
    type: "Café & Restaurant",
    desc: "Popular coffee chain with full menu. Open early.",
    longDesc: "Cafe Javas is Uganda's most beloved coffee chain, serving breakfast, lunch, and dinner across multiple locations in Kampala. Famous for generous portions, excellent coffee, and a warm atmosphere that welcomes everyone from families to business professionals.",
    image: restaurantCafejavas,
    hours: "6:30 AM – 11:00 PM",
    phone: "+256 700 234 567",
    mapQuery: "Cafe Javas Kampala",
    features: ["Breakfast All Day", "Free Wi-Fi", "Family Friendly", "Takeaway", "Multiple Locations"],
    menu: [
      { name: "Java Burger Deluxe", price: 12, category: "Mains", desc: "Premium beef burger with bacon, cheese, lettuce, and special sauce." },
      { name: "Cappuccino", price: 4, category: "Drinks", desc: "Classic Italian cappuccino with locally roasted beans." },
      { name: "Chicken Wings (6 pcs)", price: 10, category: "Starters", desc: "Crispy fried chicken wings with BBQ or hot dipping sauce." },
      { name: "Full English Breakfast", price: 14, category: "Breakfast", desc: "Eggs, bacon, sausages, beans, toast, and hash browns." },
      { name: "Pancake Stack", price: 8, category: "Breakfast", desc: "Fluffy pancakes with maple syrup, berries, and whipped cream." },
      { name: "Grilled Chicken Wrap", price: 11, category: "Mains", desc: "Tortilla wrap with grilled chicken, avocado, and chipotle mayo." },
      { name: "Fresh Mango Smoothie", price: 5, category: "Drinks", desc: "Blended fresh mango with yogurt and honey." },
      { name: "Chocolate Brownie", price: 6, category: "Desserts", desc: "Warm chocolate brownie with vanilla ice cream." },
    ],
  },
  {
    slug: "khana-khazana",
    name: "Khana Khazana",
    location: "Kololo, Kampala",
    type: "Indian",
    desc: "Award-winning Indian restaurant.",
    longDesc: "Khana Khazana brings the authentic flavors of India to Kampala. With recipes passed down through generations, this award-winning restaurant specializes in North Indian cuisine with a focus on tandoor-prepared dishes and rich curries. A must-visit for lovers of Indian food.",
    image: restaurantKhana,
    hours: "12:00 PM – 10:30 PM",
    phone: "+256 700 345 678",
    mapQuery: "Khana Khazana Kampala",
    features: ["Tandoor Oven", "Vegetarian Options", "Delivery", "Private Events", "Halal"],
    menu: [
      { name: "Butter Chicken", price: 14, category: "Mains", desc: "Creamy tomato-based chicken curry with aromatic spices." },
      { name: "Garlic Naan (2 pcs)", price: 4, category: "Breads", desc: "Freshly baked garlic flatbread from tandoor oven." },
      { name: "Paneer Tikka", price: 10, category: "Starters", desc: "Marinated cottage cheese grilled in tandoor with peppers." },
      { name: "Lamb Biryani", price: 16, category: "Mains", desc: "Fragrant basmati rice layered with spiced lamb and saffron." },
      { name: "Dal Makhani", price: 9, category: "Mains", desc: "Slow-cooked black lentils in creamy tomato sauce." },
      { name: "Mango Lassi", price: 4, category: "Drinks", desc: "Chilled yogurt drink blended with sweet mango pulp." },
      { name: "Gulab Jamun (3 pcs)", price: 5, category: "Desserts", desc: "Deep-fried milk dumplings soaked in rose-scented syrup." },
    ],
  },
  {
    slug: "haandi-restaurant",
    name: "Haandi Restaurant",
    location: "Kampala Road, Kampala",
    type: "Indian / Mughal",
    desc: "Premium Indian cuisine with traditional Mughal recipes.",
    longDesc: "Haandi Restaurant offers an opulent dining experience inspired by the royal kitchens of the Mughal Empire. Specializing in kebabs, biryanis, and slow-cooked curries, this restaurant is a testament to the rich culinary heritage of India. The regal interiors add to the grand experience.",
    image: restaurantHaandi,
    hours: "12:00 PM – 11:00 PM",
    phone: "+256 700 456 789",
    mapQuery: "Haandi Restaurant Kampala",
    features: ["Mughal Cuisine", "Live Cooking Station", "Event Hosting", "Air Conditioned", "VIP Lounge"],
    menu: [
      { name: "Seekh Kebab (4 pcs)", price: 12, category: "Starters", desc: "Minced lamb skewers grilled with aromatic spices." },
      { name: "Chicken Tikka Masala", price: 15, category: "Mains", desc: "Char-grilled chicken in rich spiced masala gravy." },
      { name: "Mutton Rogan Josh", price: 18, category: "Mains", desc: "Kashmiri-style mutton cooked in red chili and fennel." },
      { name: "Hyderabadi Biryani", price: 17, category: "Mains", desc: "Royal dum-style biryani with tender goat meat." },
      { name: "Tandoori Mixed Grill", price: 24, category: "Mains", desc: "Assorted tandoor meats: chicken, lamb, and prawns." },
      { name: "Kulfi Ice Cream", price: 5, category: "Desserts", desc: "Traditional Indian ice cream with pistachios and cardamom." },
    ],
  },
  {
    slug: "prunes-restaurant",
    name: "Prunes Restaurant",
    location: "Nakasero, Kampala",
    type: "Continental",
    desc: "Fine dining with garden ambiance.",
    longDesc: "Prunes is one of Kampala's most celebrated fine dining destinations, nestled in a charming garden setting in Nakasero. The menu features continental and Mediterranean-inspired dishes prepared with locally sourced ingredients. Ideal for anniversaries, proposals, and elegant gatherings.",
    image: restaurantPrunes,
    hours: "12:00 PM – 10:00 PM",
    phone: "+256 700 567 890",
    mapQuery: "Prunes Restaurant Nakasero Kampala",
    features: ["Garden Dining", "Wine Cellar", "Romantic Setting", "Chef's Specials", "Sunday Brunch"],
    menu: [
      { name: "Grilled Salmon", price: 24, category: "Mains", desc: "Atlantic salmon with herb crust, asparagus, and lemon dill sauce." },
      { name: "Caesar Salad", price: 10, category: "Starters", desc: "Romaine lettuce, croutons, parmesan, and classic Caesar dressing." },
      { name: "Mushroom Risotto", price: 16, category: "Mains", desc: "Creamy arborio rice with wild mushrooms and truffle oil." },
      { name: "Rack of Lamb", price: 30, category: "Mains", desc: "Herb-crusted rack with roasted vegetables and mint jus." },
      { name: "Tiramisu", price: 10, category: "Desserts", desc: "Classic Italian dessert with espresso-soaked ladyfingers." },
      { name: "Sparkling Water", price: 3, category: "Drinks", desc: "Premium imported sparkling mineral water." },
    ],
  },
  {
    slug: "fang-fang",
    name: "Fang Fang",
    location: "Acacia Mall, Kampala",
    type: "Chinese / Asian",
    desc: "Authentic Chinese and Asian cuisine.",
    longDesc: "Fang Fang brings the flavors of East Asia to Kampala's Acacia Mall. From hand-pulled noodles to dim sum baskets, every dish is prepared by chefs with decades of experience. The restaurant features traditional Chinese décor with red lanterns and bamboo accents, creating an immersive dining experience.",
    image: restaurantFangfang,
    hours: "11:00 AM – 10:30 PM",
    phone: "+256 700 678 901",
    mapQuery: "Fang Fang Restaurant Acacia Mall Kampala",
    features: ["Dim Sum", "Sushi Bar", "Takeaway", "Asian Fusion", "Private Room"],
    menu: [
      { name: "Dim Sum Basket (8 pcs)", price: 12, category: "Starters", desc: "Assorted steamed dumplings: pork, shrimp, and vegetable." },
      { name: "Kung Pao Chicken", price: 14, category: "Mains", desc: "Stir-fried chicken with peanuts, chili, and Sichuan pepper." },
      { name: "Crispy Duck", price: 20, category: "Mains", desc: "Whole roasted duck with hoisin sauce and pancakes." },
      { name: "Pad Thai Noodles", price: 13, category: "Mains", desc: "Thai-style stir-fried rice noodles with prawns and tamarind." },
      { name: "Spring Rolls (4 pcs)", price: 7, category: "Starters", desc: "Crispy vegetable spring rolls with sweet chili dip." },
      { name: "Green Tea", price: 3, category: "Drinks", desc: "Traditional Chinese jasmine green tea." },
      { name: "Mochi Ice Cream (3 pcs)", price: 6, category: "Desserts", desc: "Japanese rice cake filled with matcha, mango, and strawberry ice cream." },
    ],
  },
];

export const menuCategories = ["All", "Starters", "Mains", "Breakfast", "Breads", "Desserts", "Drinks"];
