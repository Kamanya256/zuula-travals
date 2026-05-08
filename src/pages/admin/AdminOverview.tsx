import { useEffect, useState } from "react";
import { useAdminApi } from "@/hooks/useAdminApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package, ShoppingCart, Mail, MessageSquare, Star, Map, MapPin,
  Plane, Hotel, Car, Truck, CreditCard, Calendar, Trees, PawPrint, Tag, Building,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminOverview() {
  const { adminCall } = useAdminApi();
  const [stats, setStats] = useState<Record<string, number> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    adminCall({ action: "stats" }).then(setStats).catch(() => {});
  }, [adminCall]);

  const cards = [
    { label: "Bookings", key: "bookings", icon: Package, path: "/admin/bookings" },
    { label: "Orders", key: "orders", icon: ShoppingCart, path: "/admin/orders" },
    { label: "Payments", key: "payments", icon: CreditCard, path: "/admin/payments" },
    { label: "Destinations", key: "destinations", icon: MapPin, path: "/admin/destinations" },
    { label: "Tour Packages", key: "tour_packages", icon: Map, path: "/admin/packages" },
    { label: "Flights", key: "flights", icon: Plane, path: "/admin/flights" },
    { label: "Hotels", key: "hotels", icon: Hotel, path: "/admin/hotels" },
    { label: "Cars", key: "cars", icon: Car, path: "/admin/cars" },
    { label: "Drivers", key: "drivers", icon: Car, path: "/admin/drivers" },
    { label: "Courier Fleet", key: "courier_fleet", icon: Truck, path: "/admin/courier-fleet" },
    { label: "Courier Bookings", key: "courier_bookings", icon: Truck, path: "/admin/courier-bookings" },
    { label: "Venues", key: "venues", icon: Building, path: "/admin/venues" },
    { label: "Events", key: "events", icon: Calendar, path: "/admin/events" },
    { label: "National Parks", key: "national_parks", icon: Trees, path: "/admin/national-parks" },
    { label: "Wildlife", key: "wildlife", icon: PawPrint, path: "/admin/wildlife" },
    { label: "Promo Codes", key: "promo_codes", icon: Tag, path: "/admin/promo-codes" },
    { label: "Messages", key: "contact_messages", icon: MessageSquare, path: "/admin/messages" },
    { label: "Subscribers", key: "newsletter_subscriptions", icon: Mail, path: "/admin/subscribers" },
    { label: "Reviews", key: "reviews", icon: Star, path: "/admin/reviews" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Manage your entire tourism platform from one place.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Card key={c.label} className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => navigate(c.path)}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
              <c.icon className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{stats ? (stats[c.key] ?? 0) : "—"}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
