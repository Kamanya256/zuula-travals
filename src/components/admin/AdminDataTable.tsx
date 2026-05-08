import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Trash2, RefreshCw } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AdminDataTableProps {
  data: any[];
  loading: boolean;
  title: string;
  excludeColumns?: string[];
  maxColumns?: number;
  statusOptions?: string[];
  onStatusChange?: (id: string, status: string) => void;
  onDelete?: (id: string) => void;
  onRefresh?: () => void;
}

export function AdminDataTable({
  data, loading, title, excludeColumns = ["id", "user_id", "updated_at", "items"],
  maxColumns = 7, statusOptions, onStatusChange, onDelete, onRefresh,
}: AdminDataTableProps) {
  const [search, setSearch] = useState("");

  const filtered = data.filter((row) =>
    !search || JSON.stringify(row).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <div className="flex items-center gap-3">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          {onRefresh && (
            <Button size="sm" variant="outline" onClick={onRefresh}>
              <RefreshCw className="w-4 h-4 mr-1" /> Refresh
            </Button>
          )}
          <span className="text-sm text-muted-foreground">{filtered.length} records</span>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center">
          <div className="animate-spin w-6 h-6 border-4 border-primary border-t-transparent rounded-full mx-auto" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">No records found</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-background">
          <table className="w-full text-sm">
            <thead className="bg-secondary">
              <tr>
                {Object.keys(filtered[0])
                  .filter((k) => !excludeColumns.includes(k))
                  .slice(0, maxColumns)
                  .map((key) => (
                    <th key={key} className="px-4 py-3 text-left font-medium text-muted-foreground capitalize whitespace-nowrap">
                      {key.replace(/_/g, " ")}
                    </th>
                  ))}
                {(statusOptions || onDelete) && (
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((row, i) => (
                <tr key={row.id || i} className="hover:bg-secondary/50">
                  {Object.entries(row)
                    .filter(([k]) => !excludeColumns.includes(k))
                    .slice(0, maxColumns)
                    .map(([key, val]) => (
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
                  {(statusOptions || onDelete) && (
                    <td className="px-4 py-3 flex items-center gap-2">
                      {statusOptions && onStatusChange && (
                        <Select value={row.status || "pending"} onValueChange={(v) => onStatusChange(row.id, v)}>
                          <SelectTrigger className="w-[120px] h-8 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((s) => (
                              <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {onDelete && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete this record?</AlertDialogTitle>
                              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => onDelete(row.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
