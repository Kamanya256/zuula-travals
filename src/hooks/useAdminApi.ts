import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useAdminApi() {
  const adminCall = useCallback(async (body: Record<string, unknown>) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error("Not authenticated");
    const { data, error } = await supabase.functions.invoke("admin-api", {
      body,
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    if (error) throw error;
    return data;
  }, []);

  return { adminCall };
}
