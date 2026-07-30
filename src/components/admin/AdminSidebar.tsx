import {
  BarChart3, Package, ShoppingCart, Users, Mail, MessageSquare,
  Star, Home, UtensilsCrossed, Map, Shield, LogOut, Plane, Hotel,
  Car, Truck, MapPin, Trees, CreditCard, Calendar, Image, HelpCircle,
  Tag, Globe, Building, Heart, PawPrint, Bell, Search, Gift, Brain, Newspaper,
  BriefcaseBusiness,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { ScrollArea } from "@/components/ui/scroll-area";

const mainItems = [
  { title: "Overview", url: "/admin", icon: BarChart3 },
  { title: "Bookings", url: "/admin/bookings", icon: Package },
  { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
  { title: "Payments", url: "/admin/payments", icon: CreditCard },
];

const servicesItems = [
  { title: "Destinations", url: "/admin/destinations", icon: MapPin },
  { title: "Countries", url: "/admin/countries", icon: Globe },
  { title: "Tour Packages", url: "/admin/packages", icon: Map },
  { title: "Flights", url: "/admin/flights", icon: Plane },
  { title: "Airlines", url: "/admin/airlines", icon: Plane },
  { title: "Hotels", url: "/admin/hotels", icon: Hotel },
  { title: "Hotel Rooms", url: "/admin/hotel-rooms", icon: Hotel },
  { title: "Cars", url: "/admin/cars", icon: Car },
  { title: "Drivers", url: "/admin/drivers", icon: Car },
  { title: "Restaurants", url: "/admin/restaurants", icon: UtensilsCrossed },
  { title: "Venues", url: "/admin/venues", icon: Building },
  { title: "Courier Fleet", url: "/admin/courier-fleet", icon: Truck },
  { title: "Courier Bookings", url: "/admin/courier-bookings", icon: Truck },
  { title: "Trip Plans", url: "/admin/trip-plans", icon: Calendar },
  { title: "Itinerary Versions", url: "/admin/trip-plan-versions", icon: Calendar },
  { title: "Vendor Websites", url: "/admin/vendor-sites", icon: Building },
];

const contentItems = [
  { title: "Hero Slides", url: "/admin/hero-slides", icon: Image },
  { title: "Investment", url: "/admin/investment", icon: BriefcaseBusiness },
  { title: "Business Directory", url: "/admin/business-directory", icon: Building },
  { title: "Magazine", url: "/admin/magazine", icon: Newspaper },
  { title: "Zula TV", url: "/admin/zula-tv", icon: Image },
  { title: "Testimonials", url: "/admin/testimonials", icon: Star },
  { title: "Media", url: "/admin/media", icon: Image },
  { title: "FAQs", url: "/admin/faqs", icon: HelpCircle },
  { title: "Events", url: "/admin/events", icon: Calendar },
  { title: "Tourism News", url: "/admin/tourism-news", icon: Newspaper },
  { title: "Business Spotlights", url: "/admin/business-spotlights", icon: BriefcaseBusiness },
  { title: "Business News", url: "/admin/business-news", icon: Newspaper },
  { title: "National Parks", url: "/admin/national-parks", icon: Trees },
  { title: "Wildlife", url: "/admin/wildlife", icon: PawPrint },
  { title: "Volunteer Programs", url: "/admin/volunteer-programs", icon: Heart },
  { title: "AI Knowledge", url: "/admin/ai-knowledge", icon: Brain },
  { title: "Promo Codes", url: "/admin/promo-codes", icon: Tag },
  { title: "Package Offers", url: "/admin/package-offers", icon: Gift },
  { title: "Hotel Offers", url: "/admin/accommodation-offers", icon: Hotel },
  { title: "Surprise Packages", url: "/admin/surprise-packages", icon: Gift },
];

const engagementItems = [
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Roles", url: "/admin/roles", icon: Shield },
  { title: "Reviews", url: "/admin/reviews", icon: Star },
  { title: "Messages", url: "/admin/messages", icon: MessageSquare },
  { title: "Chatbot Logs", url: "/admin/chatbot-conversations", icon: MessageSquare },
  { title: "Subscribers", url: "/admin/subscribers", icon: Mail },
  { title: "Travel Alerts", url: "/admin/travel-alerts", icon: Bell },
  { title: "Search Logs", url: "/admin/search-logs", icon: Search },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const isActive = (path: string) =>
    path === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(path);

  const renderGroup = (label: string, items: typeof mainItems) => (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={isActive(item.url)}>
                <NavLink to={item.url} end={item.url === "/admin"}>
                  <item.icon className="mr-2 h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent>
        <ScrollArea className="h-full">
          {renderGroup("Operations", mainItems)}
          {renderGroup("Services", servicesItems)}
          {renderGroup("Content", contentItems)}
          {renderGroup("Engagement", engagementItems)}
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => navigate("/")}>
              <Home className="mr-2 h-4 w-4 shrink-0" />
              {!collapsed && <span>View Site</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => { signOut(); navigate("/"); }}>
              <LogOut className="mr-2 h-4 w-4 shrink-0" />
              {!collapsed && <span>Sign Out</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
