import { useEffect, useState, useCallback } from "react";
import { useAdminApi } from "@/hooks/useAdminApi";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { useToast } from "@/hooks/use-toast";

export default function AdminReviews() {
  const { adminCall } = useAdminApi();
  const { toast } = useToast();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try { setData(await adminCall({ action: "list", table: "reviews" }) || []); }
    catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
    finally { setLoading(false); }
  }, [adminCall, toast]);

  useEffect(() => { load(); }, [load]);

  const onDelete = async (id: string) => {
    await adminCall({ action: "delete", table: "reviews", id });
    toast({ title: "Review deleted" });
    load();
  };

  return <AdminDataTable title="Reviews" data={data} loading={loading} onDelete={onDelete} onRefresh={load} />;
}
