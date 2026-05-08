import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart3, Package, ShoppingCart, Users, Mail, MessageSquare,
  Star, RefreshCw, Search, LogOut, Shield,
} from "lucide-react";

type Stats = { bookings: number; orders: number; contacts: number; newsletters: number; reviews: number; packages: number };

export default function AdminDashboardPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [tableData, setTableData] = useState<any[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const adminCall = useCallback(async (body: any) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error("Not authenticated");
    const { data, error } = await supabase.functions.invoke("admin-api", {
      body,
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    if (error) throw error;
    return data;
  }, []);

  // Check admin status
  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate("/auth"); return; }
    (async () => {
      try {
        const data = await adminCall({ action: "stats" });
        setStats(data);
        setIsAdmin(true);
      } catch {
        setIsAdmin(false);
      }
    })();
  }, [user, authLoading, navigate, adminCall]);

  const loadTable = useCallback(async (table: string) => {
    setTableLoading(true);
    try {
      const data = await adminCall({ action: "list", table });
      setTableData(data || []);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setTableLoading(false);
    }
  }, [adminCall, toast]);

  useEffect(() => {
    if (!isAdmin) return;
    const tableMap: Record<string, string> = {
      bookings: "bookings", orders: "orders", packages: "tour_packages",
      contacts: "contact_messages", newsletters: "newsletter_subscriptions",
      reviews: "reviews", users: "",
    };
    const t = tableMap[activeTab];
    if (t) loadTable(t);
    else if (activeTab === "users") {
      setTableLoading(true);
      adminCall({ action: "list_users" }).then(setTableData).finally(() => setTableLoading(false));
    }
  }, [activeTab, isAdmin, loadTable, adminCall]);

  const updateStatus = async (table: string, id: string, status: string) => {
    try {
      await adminCall({ action: "update", table, id, updates: { status } });
      toast({ title: "Updated" });
      loadTable(table);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const refreshStats = async () => {
    try {
      const data = await adminCall({ action: "stats" });
      setStats(data);
      toast({ title: "Refreshed" });
    } catch {}
  };

  if (authLoading || isAdmin === null) {
    return <div className="py-32 text-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" /></div>;
  }

  if (!isAdmin) {
    return (
      <div className="py-32 text-center">
        <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-display font-bold mb-2">Access Denied</h1>
        <p className="text-muted-foreground mb-6">You don't have admin privileges.</p>
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </div>
    );
  }

  const filtered = tableData.filter((row) =>
    !searchQuery || JSON.stringify(row).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statCards = [
    { label: "Bookings", value: stats?.bookings, icon: Package, tab: "bookings" },
    { label: "Orders", value: stats?.orders, icon: ShoppingCart, tab: "orders" },
    { label: "Packages", value: stats?.packages, icon: BarChart3, tab: "packages" },
    { label: "Messages", value: stats?.contacts, icon: MessageSquare, tab: "contacts" },
    { label: "Subscribers", value: stats?.newsletters, icon: Mail, tab: "newsletters" },
    { label: "Reviews", value: stats?.reviews, icon: Star, tab: "reviews" },
  ];

  return (
    <div>
      <section className="py-8 bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold flex items-center gap-2"><Shield className="w-6 h-6" /> Admin Dashboard</h1>
            <p className="text-primary-foreground/70 text-sm">{user?.email}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={refreshStats}><RefreshCw className="w-4 h-4 mr-1" /> Refresh</Button>
            <Button size="sm" variant="secondary" onClick={() => { signOut(); navigate("/"); }}><LogOut className="w-4 h-4 mr-1" /> Logout</Button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex flex-wrap gap-1 h-auto mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="contacts">Messages</TabsTrigger>
              <TabsTrigger value="newsletters">Subscribers</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {statCards.map((s) => (
                  <Card key={s.label} className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setActiveTab(s.tab)}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
                      <s.icon className="w-5 h-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent><p className="text-3xl font-bold">{s.value ?? "—"}</p></CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {["bookings", "orders", "packages", "users", "contacts", "newsletters", "reviews"].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
                  </div>
                  <span className="text-sm text-muted-foreground">{filtered.length} records</span>
                </div>

                {tableLoading ? (
                  <div className="py-12 text-center"><div className="animate-spin w-6 h-6 border-4 border-primary border-t-transparent rounded-full mx-auto" /></div>
                ) : filtered.length === 0 ? (
                  <div className="py-12 text-center text-muted-foreground">No records found</div>
                ) : (
                  <div className="overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-sm">
                      <thead className="bg-secondary">
                        <tr>
                          {Object.keys(filtered[0]).filter((k) => !["id", "user_id", "updated_at", "items"].includes(k)).slice(0, 7).map((key) => (
                            <th key={key} className="px-4 py-3 text-left font-medium text-muted-foreground capitalize">{key.replace(/_/g, " ")}</th>
                          ))}
                          {(tab === "bookings" || tab === "orders") && <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filtered.map((row, i) => (
                          <tr key={row.id || i} className="hover:bg-secondary/50">
                            {Object.entries(row).filter(([k]) => !["id", "user_id", "updated_at", "items"].includes(k)).slice(0, 7).map(([key, val]) => (
                              <td key={key} className="px-4 py-3 max-w-[200px] truncate">
                                {key === "status" ? (
                                  <Badge variant={val === "confirmed" || val === "completed" ? "default" : val === "cancelled" ? "destructive" : "secondary"}>
                                    {String(val)}
                                  </Badge>
                                ) : key === "rating" ? (
                                  <span>{"⭐".repeat(Number(val))}</span>
                                ) : key.includes("created_at") || key.includes("last_sign") ? (
                                  val ? new Date(String(val)).toLocaleDateString() : "—"
                                ) : (
                                  String(val ?? "—")
                                )}
                              </td>
                            ))}
                            {(tab === "bookings" || tab === "orders") && (
                              <td className="px-4 py-3">
                                <Select value={row.status || "pending"} onValueChange={(v) => updateStatus(tab === "bookings" ? "bookings" : "orders", row.id, v)}>
                                  <SelectTrigger className="w-[130px] h-8 text-xs"><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="confirmed">Confirmed</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
}
