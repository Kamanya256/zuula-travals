import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout";
import { ThemeProvider } from "./components/ThemeProvider";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PackagesPage from "./pages/PackagesPage";
import PackageDetailPage from "./pages/PackageDetailPage";
import BookingPage from "./pages/BookingPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import FlightsPage from "./pages/FlightsPage";
import HotelsPage from "./pages/HotelsPage";
import CarHirePage from "./pages/CarHirePage";
import CourierPage from "./pages/CourierPage";
import VenuesPage from "./pages/VenuesPage";
import FAQPage from "./pages/FAQPage";
import TravelTipsPage from "./pages/TravelTipsPage";
import AttractionsPage from "./pages/AttractionsPage";
import VolunteerPage from "./pages/VolunteerPage";
import CountryGuidesPage from "./pages/CountryGuidesPage";
import EmergencyPage from "./pages/EmergencyPage";
import VisaPermitsPage from "./pages/VisaPermitsPage";
import BoatRidesPage from "./pages/BoatRidesPage";
import MallsDirectoryPage from "./pages/MallsDirectoryPage";
import FoodOrderPage from "./pages/FoodOrderPage";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import NewsPage from "./pages/NewsPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import TravelTipDetailPage from "./pages/TravelTipDetailPage";
import AuthPage from "./pages/AuthPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import SEOGeneratorPage from "./pages/SEOGeneratorPage";
import ProfilePage from "./pages/ProfilePage";
import MarineTourismPage from "./pages/MarineTourismPage";
import WildlifeTourismPage from "./pages/WildlifeTourismPage";
import AeroTourismPage from "./pages/AeroTourismPage";
import SportsTourismPage from "./pages/SportsTourismPage";
import NotFound from "./pages/NotFound";

// Admin pages (lazy loaded)
import AdminLayout from "./components/admin/AdminLayout";
const AdminOverview = lazy(() => import("./pages/admin/AdminOverview"));
const AdminBookings = lazy(() => import("./pages/admin/AdminBookings"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));
const AdminPackages = lazy(() => import("./pages/admin/AdminPackages"));
const AdminRestaurants = lazy(() => import("./pages/admin/AdminRestaurants"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminRoles = lazy(() => import("./pages/admin/AdminRoles"));
const AdminReviews = lazy(() => import("./pages/admin/AdminReviews"));
const AdminMessages = lazy(() => import("./pages/admin/AdminMessages"));
const AdminSubscribers = lazy(() => import("./pages/admin/AdminSubscribers"));
const AdminDestinations = lazy(() => import("./pages/admin/AdminDestinations"));
const AdminCountries = lazy(() => import("./pages/admin/AdminCountries"));
const AdminFlights = lazy(() => import("./pages/admin/AdminFlights"));
const AdminAirlines = lazy(() => import("./pages/admin/AdminAirlines"));
const AdminHotels = lazy(() => import("./pages/admin/AdminHotels"));
const AdminHotelRooms = lazy(() => import("./pages/admin/AdminHotelRooms"));
const AdminCars = lazy(() => import("./pages/admin/AdminCars"));
const AdminDrivers = lazy(() => import("./pages/admin/AdminDrivers"));
const AdminVenues = lazy(() => import("./pages/admin/AdminVenues"));
const AdminCourierFleet = lazy(() => import("./pages/admin/AdminCourierFleet"));
const AdminCourierBookings = lazy(() => import("./pages/admin/AdminCourierBookings"));
const AdminPayments = lazy(() => import("./pages/admin/AdminPayments"));
const AdminMedia = lazy(() => import("./pages/admin/AdminMedia"));
const AdminFAQs = lazy(() => import("./pages/admin/AdminFAQs"));
const AdminEvents = lazy(() => import("./pages/admin/AdminEvents"));
const AdminNationalParks = lazy(() => import("./pages/admin/AdminNationalParks"));
const AdminWildlife = lazy(() => import("./pages/admin/AdminWildlife"));
const AdminVolunteerPrograms = lazy(() => import("./pages/admin/AdminVolunteerPrograms"));
const AdminAIKnowledge = lazy(() => import("./pages/admin/AdminAIKnowledge"));
const AdminPromoCodes = lazy(() => import("./pages/admin/AdminPromoCodes"));
const AdminSurprisePackages = lazy(() => import("./pages/admin/AdminSurprisePackages"));
const AdminTravelAlerts = lazy(() => import("./pages/admin/AdminTravelAlerts"));
const AdminSearchLogs = lazy(() => import("./pages/admin/AdminSearchLogs"));
const AdminWildlifeSpotlight = lazy(() => import("./pages/admin/AdminWildlifeSpotlight"));
const AdminTourismNewsFeed = lazy(() => import("./pages/admin/AdminTourismNewsFeed"));
const AdminPackageOffers = lazy(() => import("./pages/admin/AdminPackageOffers"));
const AdminAccommodationOffers = lazy(() => import("./pages/admin/AdminAccommodationOffers"));
const AdminBusinessSpotlights = lazy(() => import("./pages/admin/AdminBusinessSpotlights"));
const AdminBusinessNews = lazy(() => import("./pages/admin/AdminBusinessNews"));
const AdminChatbotConversations = lazy(() => import("./pages/admin/AdminChatbotConversations"));
const BusinessSpotlightDetailPage = lazy(() => import("./pages/BusinessSpotlightDetailPage"));
const InvestmentPage = lazy(() => import("./pages/InvestmentPage"));
const InvestmentDetailPage = lazy(() => import("./pages/InvestmentDetailPage"));
const BusinessDirectoryPage = lazy(() => import("./pages/BusinessDirectoryPage"));
const MagazinePage = lazy(() => import("./pages/MagazinePage"));
const MagazineDetailPage = lazy(() => import("./pages/MagazineDetailPage"));
const ZulaTVPage = lazy(() => import("./pages/ZulaTVPage"));
const AdminInvestmentOpportunities = lazy(() => import("./pages/admin/AdminInvestmentOpportunities"));
const AdminBusinessDirectory = lazy(() => import("./pages/admin/AdminBusinessDirectory"));
const AdminMagazine = lazy(() => import("./pages/admin/AdminMagazine"));
const AdminZulaTV = lazy(() => import("./pages/admin/AdminZulaTV"));
const AdminTestimonials = lazy(() => import("./pages/admin/AdminTestimonials"));
const AdminHeroSlides = lazy(() => import("./pages/admin/AdminHeroSlides"));
const BusinessNewsPage = lazy(() => import("./pages/BusinessNewsPage"));
const BusinessNewsDetailPage = lazy(() => import("./pages/BusinessNewsDetailPage"));
const PlanJourneyPage = lazy(() => import("./pages/PlanJourneyPage"));
const AdminTripPlans = lazy(() => import("./pages/admin/AdminTripPlans"));
const AdminTripPlanVersions = lazy(() => import("./pages/admin/AdminTripPlanVersions"));
const VendorPortalPage = lazy(() => import("./pages/VendorPortalPage"));
const VendorSitePage = lazy(() => import("./pages/VendorSitePage"));
const VendorsPage = lazy(() => import("./pages/VendorsPage"));
const AdminVendorSites = lazy(() => import("./pages/admin/AdminVendorSites"));

const queryClient = new QueryClient();

const AdminFallback = () => (
  <div className="flex items-center justify-center py-16">
    <div className="animate-spin w-6 h-6 border-4 border-primary border-t-transparent rounded-full" />
  </div>
);

const A = ({ children }: { children: React.ReactNode }) => (
  <AdminLayout><Suspense fallback={<AdminFallback />}>{children}</Suspense></AdminLayout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<Layout><HomePage /></Layout>} path="/" />
          <Route element={<Layout><AboutPage /></Layout>} path="/about" />
          <Route element={<Layout><PackagesPage /></Layout>} path="/packages" />
          <Route element={<Layout><PackageDetailPage /></Layout>} path="/packages/:slug" />
          <Route element={<Layout><BookingPage /></Layout>} path="/booking" />
          <Route element={<Layout><ContactPage /></Layout>} path="/contact" />
          <Route element={<Layout><ServicesPage /></Layout>} path="/services" />
          <Route element={<Layout><FlightsPage /></Layout>} path="/flights" />
          <Route element={<Layout><HotelsPage /></Layout>} path="/hotels" />
          <Route element={<Layout><CarHirePage /></Layout>} path="/cars" />
          <Route element={<Layout><CourierPage /></Layout>} path="/courier" />
          <Route element={<Layout><VenuesPage /></Layout>} path="/venues" />
          <Route element={<Layout><FAQPage /></Layout>} path="/faq" />
          <Route element={<Layout><TravelTipsPage /></Layout>} path="/travel-tips" />
          <Route element={<Layout><TravelTipDetailPage /></Layout>} path="/travel-tips/:slug" />
          <Route element={<Layout><AttractionsPage /></Layout>} path="/attractions" />
          <Route element={<Layout><VolunteerPage /></Layout>} path="/volunteer" />
          <Route element={<Layout><CountryGuidesPage /></Layout>} path="/country-guides" />
          <Route element={<Layout><EmergencyPage /></Layout>} path="/emergency" />
          <Route element={<Layout><VisaPermitsPage /></Layout>} path="/visa-permits" />
          <Route element={<Layout><BoatRidesPage /></Layout>} path="/boat-rides" />
          <Route element={<Layout><MallsDirectoryPage /></Layout>} path="/malls" />
          <Route element={<Layout><FoodOrderPage /></Layout>} path="/food-order" />
          <Route element={<Layout><FoodOrderPage /></Layout>} path="/restaurants" />
          <Route element={<Layout><RestaurantDetailPage /></Layout>} path="/restaurants/:slug" />
          <Route element={<Layout><NewsPage /></Layout>} path="/news" />
          <Route element={<Layout><NewsDetailPage /></Layout>} path="/news/:slug" />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route element={<Layout><PaymentSuccessPage /></Layout>} path="/payment-success" />
          <Route element={<Layout><SEOGeneratorPage /></Layout>} path="/seo-generator" />
          <Route element={<Layout><ProfilePage /></Layout>} path="/profile" />
          <Route element={<Layout><MarineTourismPage /></Layout>} path="/marine" />
          <Route element={<Layout><WildlifeTourismPage /></Layout>} path="/wildlife" />
          <Route element={<Layout><AeroTourismPage /></Layout>} path="/aero" />
          <Route element={<Layout><SportsTourismPage /></Layout>} path="/sports" />
          <Route element={<Layout><Suspense fallback={<AdminFallback />}><BusinessNewsPage /></Suspense></Layout>} path="/business-news" />
          <Route element={<Layout><Suspense fallback={<AdminFallback />}><BusinessNewsDetailPage /></Suspense></Layout>} path="/business-news/:slug" />
          <Route element={<Layout><Suspense fallback={<AdminFallback />}><BusinessSpotlightDetailPage /></Suspense></Layout>} path="/business/:slug" />

          <Route element={<Layout><Suspense fallback={<AdminFallback />}><InvestmentPage /></Suspense></Layout>} path="/investment" />
          <Route element={<Layout><Suspense fallback={<AdminFallback />}><InvestmentDetailPage /></Suspense></Layout>} path="/investment/:slug" />
          <Route element={<Layout><Suspense fallback={<AdminFallback />}><BusinessDirectoryPage /></Suspense></Layout>} path="/business-directory" />
          <Route element={<Layout><Suspense fallback={<AdminFallback />}><MagazinePage /></Suspense></Layout>} path="/magazine" />
          <Route element={<Layout><Suspense fallback={<AdminFallback />}><MagazineDetailPage /></Suspense></Layout>} path="/magazine/:slug" />
          <Route element={<Layout><Suspense fallback={<AdminFallback />}><ZulaTVPage /></Suspense></Layout>} path="/zula-tv" />
          <Route element={<Layout><Suspense fallback={<AdminFallback />}><PlanJourneyPage /></Suspense></Layout>} path="/plan" />
          <Route element={<Layout><Suspense fallback={<AdminFallback />}><VendorsPage /></Suspense></Layout>} path="/vendors" />
          <Route element={<Layout><Suspense fallback={<AdminFallback />}><VendorPortalPage /></Suspense></Layout>} path="/vendor" />
          <Route element={<Layout><Suspense fallback={<AdminFallback />}><VendorSitePage /></Suspense></Layout>} path="/v/:slug" />

          {/* Admin routes */}
          <Route path="/admin" element={<A><AdminOverview /></A>} />
          <Route path="/admin/bookings" element={<A><AdminBookings /></A>} />
          <Route path="/admin/orders" element={<A><AdminOrders /></A>} />
          <Route path="/admin/payments" element={<A><AdminPayments /></A>} />
          <Route path="/admin/destinations" element={<A><AdminDestinations /></A>} />
          <Route path="/admin/countries" element={<A><AdminCountries /></A>} />
          <Route path="/admin/packages" element={<A><AdminPackages /></A>} />
          <Route path="/admin/flights" element={<A><AdminFlights /></A>} />
          <Route path="/admin/airlines" element={<A><AdminAirlines /></A>} />
          <Route path="/admin/hotels" element={<A><AdminHotels /></A>} />
          <Route path="/admin/hotel-rooms" element={<A><AdminHotelRooms /></A>} />
          <Route path="/admin/cars" element={<A><AdminCars /></A>} />
          <Route path="/admin/drivers" element={<A><AdminDrivers /></A>} />
          <Route path="/admin/restaurants" element={<A><AdminRestaurants /></A>} />
          <Route path="/admin/venues" element={<A><AdminVenues /></A>} />
          <Route path="/admin/courier-fleet" element={<A><AdminCourierFleet /></A>} />
          <Route path="/admin/courier-bookings" element={<A><AdminCourierBookings /></A>} />
          <Route path="/admin/media" element={<A><AdminMedia /></A>} />
          <Route path="/admin/faqs" element={<A><AdminFAQs /></A>} />
          <Route path="/admin/events" element={<A><AdminEvents /></A>} />
          <Route path="/admin/national-parks" element={<A><AdminNationalParks /></A>} />
          <Route path="/admin/wildlife" element={<A><AdminWildlife /></A>} />
          <Route path="/admin/volunteer-programs" element={<A><AdminVolunteerPrograms /></A>} />
          <Route path="/admin/ai-knowledge" element={<A><AdminAIKnowledge /></A>} />
          <Route path="/admin/promo-codes" element={<A><AdminPromoCodes /></A>} />
          <Route path="/admin/surprise-packages" element={<A><AdminSurprisePackages /></A>} />
          <Route path="/admin/users" element={<A><AdminUsers /></A>} />
          <Route path="/admin/roles" element={<A><AdminRoles /></A>} />
          <Route path="/admin/reviews" element={<A><AdminReviews /></A>} />
          <Route path="/admin/messages" element={<A><AdminMessages /></A>} />
          <Route path="/admin/subscribers" element={<A><AdminSubscribers /></A>} />
          <Route path="/admin/travel-alerts" element={<A><AdminTravelAlerts /></A>} />
          <Route path="/admin/search-logs" element={<A><AdminSearchLogs /></A>} />
          <Route path="/admin/wildlife-spotlight" element={<A><AdminWildlifeSpotlight /></A>} />
          <Route path="/admin/tourism-news" element={<A><AdminTourismNewsFeed /></A>} />
          <Route path="/admin/package-offers" element={<A><AdminPackageOffers /></A>} />
          <Route path="/admin/accommodation-offers" element={<A><AdminAccommodationOffers /></A>} />
          <Route path="/admin/business-spotlights" element={<A><AdminBusinessSpotlights /></A>} />
          <Route path="/admin/business-news" element={<A><AdminBusinessNews /></A>} />
          <Route path="/admin/chatbot-conversations" element={<A><AdminChatbotConversations /></A>} />

          <Route path="/admin/investment" element={<A><AdminInvestmentOpportunities /></A>} />
          <Route path="/admin/business-directory" element={<A><AdminBusinessDirectory /></A>} />
          <Route path="/admin/magazine" element={<A><AdminMagazine /></A>} />
          <Route path="/admin/zula-tv" element={<A><AdminZulaTV /></A>} />
          <Route path="/admin/testimonials" element={<A><AdminTestimonials /></A>} />
          <Route path="/admin/hero-slides" element={<A><AdminHeroSlides /></A>} />
          <Route path="/admin/trip-plans" element={<A><AdminTripPlans /></A>} />
          <Route path="/admin/trip-plan-versions" element={<A><AdminTripPlanVersions /></A>} />
          <Route path="/admin/vendor-sites" element={<A><AdminVendorSites /></A>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
