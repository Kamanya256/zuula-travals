import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Clock, Phone, Star, ShoppingCart, Plus, Minus, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { restaurants, menuCategories } from "@/data/restaurants";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import CustomerRating from "@/components/CustomerRating";
import AuthGate from "@/components/AuthGate";
import { useAuth } from "@/hooks/useAuth";

type CartItem = { name: string; price: number; qty: number };

export default function RestaurantDetailPage() {
  const { slug } = useParams();
  const restaurant = restaurants.find((r) => r.slug === slug);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({ name: "", phone: "", location: "", notes: "" });
  const { toast } = useToast();
  const { user } = useAuth();

  if (!restaurant) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-3xl font-display font-bold mb-4">Restaurant Not Found</h1>
        <Button asChild><Link to="/restaurants">Browse All Restaurants</Link></Button>
      </div>
    );
  }

  const filtered = activeCategory === "All" ? restaurant.menu : restaurant.menu.filter((m) => m.category === activeCategory);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const categories = ["All", ...Array.from(new Set(restaurant.menu.map((m) => m.category)))];

  const addToCart = (item: { name: string; price: number }) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.name === item.name);
      if (existing) return prev.map((c) => (c.name === item.name ? { ...c, qty: c.qty + 1 } : c));
      return [...prev, { name: item.name, price: item.price, qty: 1 }];
    });
  };

  const updateQty = (name: string, delta: number) => {
    setCart((prev) => prev.map((c) => (c.name === name ? { ...c, qty: Math.max(0, c.qty + delta) } : c)).filter((c) => c.qty > 0));
  };

  const placeOrder = () => {
    if (!deliveryInfo.name || !deliveryInfo.phone || !deliveryInfo.location) {
      toast({ title: "Missing info", description: "Please fill in delivery details.", variant: "destructive" });
      return;
    }
    setOrderPlaced(true);
    toast({ title: "Order Placed! 🎉", description: `Your order from ${restaurant.name} has been submitted.` });
  };

  if (orderPlaced) {
    return (
      <div className="py-32 text-center">
        <div className="container max-w-lg">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-display font-bold mb-4">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-6">
            Your order of <strong>${total}</strong> from <strong>{restaurant.name}</strong> will be delivered to <strong>{deliveryInfo.location}</strong>.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild><Link to="/">Back to Home</Link></Button>
            <Button asChild variant="outline"><Link to="/restaurants">Browse Restaurants</Link></Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px]">
        <img src={restaurant.image} alt={restaurant.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container">
            <Link to="/restaurants" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-3">
              <ArrowLeft className="w-4 h-4" /> All Restaurants
            </Link>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{restaurant.name}</h1>
            <div className="flex flex-wrap gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {restaurant.location}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {restaurant.hours}</span>
              <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {restaurant.phone}</span>
              <span className="bg-accent text-accent-foreground px-3 py-0.5 rounded-full font-medium">{restaurant.type}</span>
            </div>
          </div>
        </div>
      </section>

      {/* About + Features */}
      <section className="py-12 bg-secondary/30">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-display font-bold mb-4">About {restaurant.name}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{restaurant.longDesc}</p>
              <div className="flex flex-wrap gap-2">
                {restaurant.features.map((f) => (
                  <span key={f} className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium">{f}</span>
                ))}
              </div>
            </div>
            <div>
              <GoogleMapEmbed query={restaurant.mapQuery} height="250px" />
            </div>
          </div>
        </div>
      </section>

      {/* Ratings */}
      <section className="py-8 border-b border-border">
        <div className="container">
          <CustomerRating itemName={restaurant.name} itemType="restaurant" />
        </div>
      </section>

      {/* Menu + Cart */}
      <section className="py-4 border-b border-border sticky top-16 md:top-[4.5rem] z-30 bg-background/95 backdrop-blur-md">
        <div className="container flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"}`}>
              {cat}
            </button>
          ))}
          {cart.length > 0 && (
            <span className="ml-auto bg-accent text-accent-foreground px-3 py-2 rounded-full text-sm font-bold flex items-center gap-1">
              <ShoppingCart className="w-4 h-4" /> {cart.reduce((s, c) => s + c.qty, 0)} items · ${total}
            </span>
          )}
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-display font-bold mb-6">🍽️ Menu</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid sm:grid-cols-2 gap-4">
                {filtered.map((item) => {
                  const inCart = cart.find((c) => c.name === item.name);
                  return (
                    <div key={item.name} className="bg-card rounded-xl border border-border p-4 shadow-card">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-display font-semibold text-sm">{item.name}</h3>
                          <span className="text-xs text-muted-foreground">{item.category}</span>
                        </div>
                        <span className="text-primary font-bold">${item.price}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{item.desc}</p>
                      {inCart ? (
                        <div className="flex items-center gap-3">
                          <button onClick={() => updateQty(item.name, -1)} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"><Minus className="w-4 h-4" /></button>
                          <span className="font-semibold">{inCart.qty}</span>
                          <button onClick={() => updateQty(item.name, 1)} className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center"><Plus className="w-4 h-4" /></button>
                        </div>
                      ) : (
                        <Button onClick={() => addToCart(item)} size="sm" variant="outline" className="rounded-full text-xs">
                          <Plus className="w-3 h-3 mr-1" /> Add to Cart
                        </Button>
                      )}
                    </div>
                  );
                })}
                {filtered.length === 0 && <p className="text-muted-foreground col-span-2 text-center py-8">No items in this category.</p>}
              </div>
            </div>

            {/* Cart sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-card rounded-xl border border-border p-6 shadow-elevated">
                <h3 className="font-display font-bold text-lg mb-4">
                  <ShoppingCart className="w-5 h-5 inline mr-2" />Your Order
                </h3>
                {cart.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Your cart is empty. Browse the menu and add items.</p>
                ) : (
                  <AuthGate message="Sign in to place your food order.">
                    <div className="space-y-2 mb-4">
                      {cart.map((c) => (
                        <div key={c.name} className="flex justify-between text-sm">
                          <span>{c.name} x{c.qty}</span>
                          <span className="font-semibold">${c.price * c.qty}</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                        <span>Total</span>
                        <span className="text-primary">${total}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Input placeholder="Your Name *" value={deliveryInfo.name} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })} />
                      <Input placeholder="Phone Number *" value={deliveryInfo.phone} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })} />
                      <Input placeholder="Hotel / Location *" value={deliveryInfo.location} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, location: e.target.value })} />
                      <Textarea placeholder="Special requests..." value={deliveryInfo.notes} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, notes: e.target.value })} rows={2} />
                      <Button onClick={placeOrder} className="w-full rounded-full">
                        Place Order <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </AuthGate>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other restaurants */}
      <section className="py-12 bg-secondary/30">
        <div className="container">
          <h2 className="text-2xl font-display font-bold mb-6">Explore Other Restaurants</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.filter((r) => r.slug !== slug).slice(0, 3).map((r) => (
              <Link key={r.slug} to={`/restaurants/${r.slug}`} className="bg-card rounded-xl border border-border overflow-hidden shadow-card hover:shadow-elevated transition-all group">
                <img src={r.image} alt={r.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-4">
                  <h3 className="font-display font-semibold">{r.name}</h3>
                  <p className="text-xs text-muted-foreground">{r.location} · {r.type}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
