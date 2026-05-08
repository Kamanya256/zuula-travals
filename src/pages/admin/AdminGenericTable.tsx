import { useEffect, useState, useCallback } from "react";
import { useAdminApi } from "@/hooks/useAdminApi";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { useToast } from "@/hooks/use-toast";

interface Props {
  title: string;
  table: string;
  excludeColumns?: string[];
}

export default function AdminGenericTable({ title, table, excludeColumns = ["id"] }: Props) {
  const { adminCall } = useAdminApi();
  const { toast } = useToast();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setData(await adminCall({ action: "list", table }) || []);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [adminCall, toast, table]);

  useEffect(() => { load(); }, [load]);

  return (
    <AdminDataTable
      title={title}
      data={data}
      loading={loading}
      excludeColumns={excludeColumns}
      onRefresh={load}
    />
  );
}
