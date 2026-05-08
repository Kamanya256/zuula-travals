import { useEffect, useState, useCallback } from "react";
import { useAdminApi } from "@/hooks/useAdminApi";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { useToast } from "@/hooks/use-toast";

export default function AdminRestaurants() {
  const { adminCall } = useAdminApi();
  const { toast } = useToast();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try { setData(await adminCall({ action: "list", table: "restaurants" }) || []); }
    catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
    finally { setLoading(false); }
  }, [adminCall, toast]);

  useEffect(() => { load(); }, [load]);

  const onDelete = async (id: string) => {
    await adminCall({ action: "delete", table: "restaurants", id });
    toast({ title: "Restaurant deleted" });
    load();
  };

  return (
    <AdminDataTable
      title="Restaurants" data={data} loading={loading}
      onDelete={onDelete} onRefresh={load}
    />
  );
}
