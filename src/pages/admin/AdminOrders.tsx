import { useEffect, useState, useCallback } from "react";
import { useAdminApi } from "@/hooks/useAdminApi";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { useToast } from "@/hooks/use-toast";

export default function AdminOrders() {
  const { adminCall } = useAdminApi();
  const { toast } = useToast();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try { setData(await adminCall({ action: "list", table: "orders" }) || []); }
    catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
    finally { setLoading(false); }
  }, [adminCall, toast]);

  useEffect(() => { load(); }, [load]);

  const onStatusChange = async (id: string, status: string) => {
    await adminCall({ action: "update", table: "orders", id, updates: { status } });
    toast({ title: "Order updated" });
    load();
  };

  const onDelete = async (id: string) => {
    await adminCall({ action: "delete", table: "orders", id });
    toast({ title: "Order deleted" });
    load();
  };

  return (
    <AdminDataTable
      title="Orders" data={data} loading={loading}
      statusOptions={["pending", "preparing", "delivered", "cancelled"]}
      onStatusChange={onStatusChange} onDelete={onDelete} onRefresh={load}
    />
  );
}
