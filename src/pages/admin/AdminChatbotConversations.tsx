import { useEffect, useState } from "react";
import { useAdminApi } from "@/hooks/useAdminApi";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, User } from "lucide-react";

type Conv = { id: string; user_id: string; title: string | null; started_at: string; updated_at: string };
type Msg = { id: string; conversation_id: string; role: string; content: string; created_at: string };

export default function AdminChatbotConversations() {
  const { adminCall } = useAdminApi();
  const [convs, setConvs] = useState<Conv[]>([]);
  const [selected, setSelected] = useState<Conv | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await adminCall({ action: "list", table: "chatbot_conversations" });
        setConvs((data ?? []) as Conv[]);
      } finally { setLoading(false); }
    })();
  }, [adminCall]);

  useEffect(() => {
    if (!selected) return;
    (async () => {
      const data = await adminCall({ action: "list_messages_for_conversation", conversation_id: selected.id });
      setMessages((data ?? []) as Msg[]);
    })();
  }, [selected, adminCall]);

  const filtered = convs.filter((c) => !q || (c.title ?? "").toLowerCase().includes(q.toLowerCase()) || c.user_id.includes(q));

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-display font-bold flex items-center gap-2"><MessageSquare className="w-6 h-6" /> Chatbot Conversations</h1>
        <p className="text-sm text-muted-foreground">All signed-in user chats with the AI travel assistant.</p>
      </header>

      <div className="grid md:grid-cols-[320px,1fr] gap-4 h-[calc(100vh-220px)]">
        <Card className="overflow-hidden flex flex-col">
          <div className="p-3 border-b">
            <Input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <ScrollArea className="flex-1">
            {loading ? <div className="p-6 text-center text-sm text-muted-foreground">Loading…</div> :
              filtered.length === 0 ? <div className="p-6 text-center text-sm text-muted-foreground">No conversations yet.</div> :
              filtered.map((c) => (
                <button key={c.id} onClick={() => setSelected(c)} className={`w-full text-left p-3 border-b hover:bg-secondary/50 ${selected?.id === c.id ? "bg-secondary" : ""}`}>
                  <p className="font-medium text-sm line-clamp-1">{c.title ?? "Untitled chat"}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><User className="w-3 h-3" /> {c.user_id.slice(0, 8)}…</p>
                  <p className="text-xs text-muted-foreground">{new Date(c.updated_at).toLocaleString()}</p>
                </button>
              ))
            }
          </ScrollArea>
        </Card>

        <Card className="overflow-hidden flex flex-col">
          {!selected ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">Select a conversation to view messages.</div>
          ) : (
            <>
              <div className="p-4 border-b">
                <p className="font-semibold">{selected.title ?? "Untitled chat"}</p>
                <p className="text-xs text-muted-foreground">User: {selected.user_id} · started {new Date(selected.started_at).toLocaleString()}</p>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3 max-w-3xl mx-auto">
                  {messages.map((m) => (
                    <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                        <Badge variant="outline" className="text-[10px] mb-1">{m.role}</Badge>
                        <div className="whitespace-pre-wrap">{m.content}</div>
                      </div>
                    </div>
                  ))}
                  {messages.length === 0 && <p className="text-center text-sm text-muted-foreground py-8">No messages.</p>}
                </div>
              </ScrollArea>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
