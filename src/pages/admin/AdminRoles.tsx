import { useEffect, useState, useCallback } from "react";
import { useAdminApi } from "@/hooks/useAdminApi";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Trash2, UserPlus, RefreshCw } from "lucide-react";

export default function AdminRoles() {
  const { adminCall } = useAdminApi();
  const { toast } = useToast();
  const [roles, setRoles] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("moderator");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [roleData, userData] = await Promise.all([
        adminCall({ action: "list", table: "user_roles" }),
        adminCall({ action: "list_users" }),
      ]);
      setRoles(roleData || []);
      setUsers(userData || []);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [adminCall, toast]);

  useEffect(() => { load(); }, [load]);

  const assignRole = async () => {
    if (!selectedUser || !selectedRole) return;
    try {
      await adminCall({
        action: "update",
        table: "user_roles",
        id: null,
        updates: { user_id: selectedUser, role: selectedRole },
      });
      toast({ title: "Role assigned" });
      setSelectedUser("");
      load();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const removeRole = async (id: string) => {
    try {
      await adminCall({ action: "delete", table: "user_roles", id });
      toast({ title: "Role removed" });
      load();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const getUserEmail = (userId: string) => {
    const u = users.find((u) => u.id === userId);
    return u?.email || userId;
  };

  if (loading) {
    return <div className="py-16 text-center"><div className="animate-spin w-6 h-6 border-4 border-primary border-t-transparent rounded-full mx-auto" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Shield className="w-5 h-5" /> Role Management
          </h2>
          <p className="text-sm text-muted-foreground">Assign and manage user roles</p>
        </div>
        <Button size="sm" variant="outline" onClick={load}>
          <RefreshCw className="w-4 h-4 mr-1" /> Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Assign Role</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger className="flex-1"><SelectValue placeholder="Select user..." /></SelectTrigger>
              <SelectContent>
                {users.map((u) => (
                  <SelectItem key={u.id} value={u.id}>{u.email}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={assignRole} disabled={!selectedUser}>
              <UserPlus className="w-4 h-4 mr-1" /> Assign
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Roles ({roles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {roles.length === 0 ? (
            <p className="text-muted-foreground text-sm">No roles assigned yet.</p>
          ) : (
            <div className="space-y-2">
              {roles.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-foreground">{getUserEmail(r.user_id)}</span>
                    <Badge variant={r.role === "admin" ? "default" : "secondary"}>{r.role}</Badge>
                  </div>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => removeRole(r.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
