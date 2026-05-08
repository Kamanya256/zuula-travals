import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { User, Package, ShoppingCart, Settings, LogOut, Mail, Phone, Edit, Save, X } from "lucide-react";
import AuthGate from "@/components/AuthGate";

export default function ProfilePage() {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ full_name: "", phone: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    // Load profile
    supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle()
      .then(({ data }) => {
        if (data) {
          setProfile(data);
          setEditForm({ full_name: data.full_name || "", phone: data.phone || "" });
        }
      });
    // Load bookings
    supabase.from("bookings").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setBookings(data || []));
    // Load orders
    supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setOrders(data || []));
  }, [user]);

  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase.from("profiles").update({
        full_name: editForm.full_name,
        phone: editForm.phone,
      }).eq("user_id", user.id);
      if (error) throw error;
      setProfile({ ...profile, ...editForm });
      setEditing(false);
      toast({ title: "Profile updated!" });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally { setSaving(false); }
  };

  const statusColor = (s: string) => {
    if (s === "confirmed" || s === "completed") return "default";
    if (s === "cancelled") return "destructive";
    return "secondary";
  };

  return (
    <div>
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-display font-bold mb-1">My Account</h1>
          <p className="text-primary-foreground/80">{user?.email}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-4xl">
          <AuthGate message="Sign in to view your account.">
            <Tabs defaultValue="profile">
              <TabsList className="mb-6">
                <TabsTrigger value="profile"><User className="w-4 h-4 mr-1" /> Profile</TabsTrigger>
                <TabsTrigger value="bookings"><Package className="w-4 h-4 mr-1" /> Bookings</TabsTrigger>
                <TabsTrigger value="orders"><ShoppingCart className="w-4 h-4 mr-1" /> Orders</TabsTrigger>
                <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-1" /> Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Profile Information</CardTitle>
                    {!editing ? (
                      <Button variant="outline" size="sm" onClick={() => setEditing(true)}><Edit className="w-4 h-4 mr-1" /> Edit</Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={saveProfile} disabled={saving}><Save className="w-4 h-4 mr-1" /> Save</Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditing(false)}><X className="w-4 h-4" /></Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground flex items-center gap-1"><User className="w-3 h-3" /> Full Name</label>
                        {editing ? (
                          <Input value={editForm.full_name} onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })} />
                        ) : (
                          <p className="font-medium">{profile?.full_name || "Not set"}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" /> Email</label>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" /> Phone</label>
                        {editing ? (
                          <Input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
                        ) : (
                          <p className="font-medium">{profile?.phone || "Not set"}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Member Since</label>
                        <p className="font-medium">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookings">
                {bookings.length === 0 ? (
                  <Card><CardContent className="py-12 text-center text-muted-foreground">
                    <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="mb-4">You haven't made any bookings yet.</p>
                    <Button asChild><Link to="/packages">Browse Packages</Link></Button>
                  </CardContent></Card>
                ) : (
                  <div className="space-y-3">
                    {bookings.map((b) => (
                      <Card key={b.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">{b.full_name}</p>
                              <p className="text-sm text-muted-foreground">{b.email} • {b.travel_date ? new Date(b.travel_date).toLocaleDateString() : "No date"}</p>
                              <p className="text-sm text-muted-foreground">{b.guests} traveler(s) {b.special_requests ? `• ${b.special_requests.slice(0, 50)}...` : ""}</p>
                            </div>
                            <Badge variant={statusColor(b.status || "pending")}>{b.status || "pending"}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">Booked: {new Date(b.created_at).toLocaleDateString()}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="orders">
                {orders.length === 0 ? (
                  <Card><CardContent className="py-12 text-center text-muted-foreground">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="mb-4">No food orders yet.</p>
                    <Button asChild><Link to="/restaurants">Browse Restaurants</Link></Button>
                  </CardContent></Card>
                ) : (
                  <div className="space-y-3">
                    {orders.map((o) => (
                      <Card key={o.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium capitalize">{o.restaurant_slug?.replace(/-/g, " ")}</p>
                              <p className="text-sm text-muted-foreground">${o.total_amount} • {o.delivery_address?.slice(0, 40)}</p>
                            </div>
                            <Badge variant={statusColor(o.status)}>{o.status}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">{new Date(o.created_at).toLocaleDateString()}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Account Actions</h3>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline" onClick={() => { signOut(); navigate("/"); }}><LogOut className="w-4 h-4 mr-2" /> Sign Out</Button>
                        <Button asChild variant="outline"><Link to="/reset-password">Change Password</Link></Button>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <h3 className="font-semibold mb-2">Quick Links</h3>
                      <div className="flex flex-wrap gap-2">
                        <Button asChild variant="secondary" size="sm"><Link to="/booking">Book a Trip</Link></Button>
                        <Button asChild variant="secondary" size="sm"><Link to="/restaurants">Order Food</Link></Button>
                        <Button asChild variant="secondary" size="sm"><Link to="/packages">Tour Packages</Link></Button>
                        <Button asChild variant="secondary" size="sm"><Link to="/contact">Contact Us</Link></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </AuthGate>
        </div>
      </section>
    </div>
  );
}
