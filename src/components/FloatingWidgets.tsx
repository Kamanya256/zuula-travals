import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import ReactMarkdown from "react-markdown";
import CurrencyConverter from "@/components/CurrencyConverter";

type Msg = { role: "user" | "assistant"; content: string };

function getWhatsAppMessage(pathname: string) {
  const base = "Hello Zula Travels!";
  if (pathname.startsWith("/packages/")) return `${base} I'm interested in the ${pathname.split("/").pop()?.replace(/-/g, " ")} package.`;
  if (pathname.startsWith("/restaurants/")) return `${base} I'd like to know more about the ${pathname.split("/").pop()?.replace(/-/g, " ")} restaurant.`;
  if (pathname === "/booking") return `${base} I need help completing my booking.`;
  if (pathname === "/hotels") return `${base} I'm looking for hotel recommendations.`;
  if (pathname === "/cars") return `${base} I'd like to hire a car.`;
  if (pathname === "/flights") return `${base} I need help booking a flight.`;
  if (pathname === "/visa-permits") return `${base} I need help with visa/permit applications.`;
  if (pathname === "/wildlife") return `${base} I'm interested in wildlife tourism - gorilla trekking and safaris.`;
  if (pathname === "/marine") return `${base} I'm interested in marine tourism and boat cruises.`;
  if (pathname === "/aero") return `${base} I'm interested in aerial tourism experiences.`;
  if (pathname === "/sports") return `${base} I'm interested in sports tourism activities.`;
  return `${base} I'm interested in your services.`;
}

function getWelcomeMessage(userName?: string | null) {
  const name = userName ? ` ${userName.split(" ")[0]}` : "";
  return `👋 Welcome${name} to Zula Travels! I'm your AI travel assistant. Ask me about:\n\n🦍 **Wildlife** — Gorilla trekking, chimp tracking, safaris\n🚢 **Marine** — Boat cruises, island tours, fishing\n✈️ **Aero** — Scenic flights, hot air balloons\n🏟️ **Sports** — Stadiums, rafting, adventure sports\n\n💡 **Tip:** Groups of 5+ get a **5% discount** on all bookings!`;
}

export default function FloatingWidgets() {
  const location = useLocation();
  const { user } = useAuth();
  const userName = user?.user_metadata?.full_name;
  const [chatOpen, setChatOpen] = useState(false);
  const [showConverter, setShowConverter] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: getWelcomeMessage(null) },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  // Update welcome message when user signs in
  useEffect(() => {
    if (userName && !hasShownWelcome) {
      setMessages([{ role: "assistant", content: getWelcomeMessage(userName) }]);
      setHasShownWelcome(true);
    }
  }, [userName, hasShownWelcome]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  // Exit intent detection
  useEffect(() => {
    const startTime = Date.now();
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const timeSpent = Date.now() - startTime;
      if (timeSpent < 15000) { // Less than 15 seconds
        e.preventDefault();
        e.returnValue = "We'd love your feedback! Was something missing?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: input.trim() };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setLoading(true);

    // Include user context for personalized responses
    const contextMessages = allMessages.slice(-10).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    // Prepend user info for AI context
    if (userName) {
      contextMessages[0] = {
        ...contextMessages[0],
        content: `[User: ${userName}] ${contextMessages[0].content}`,
      };
    }

    try {
      const { data, error } = await supabase.functions.invoke("travel-assistant", {
        body: { messages: contextMessages, userName: userName || undefined },
      });
      if (error) throw error;
      const reply = data?.reply || "Sorry, please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);

      // Persist conversation for signed-in users only
      if (user) {
        try {
          let convId = conversationId;
          if (!convId) {
            const { data: c } = await supabase.from("chatbot_conversations").insert({
              user_id: user.id,
              title: userMsg.content.slice(0, 60),
            }).select("id").single();
            convId = c?.id ?? null;
            setConversationId(convId);
          }
          if (convId) {
            await supabase.from("chatbot_messages").insert([
              { conversation_id: convId, role: "user", content: userMsg.content },
              { conversation_id: convId, role: "assistant", content: reply },
            ]);
            await supabase.from("chatbot_conversations").update({ updated_at: new Date().toISOString() }).eq("id", convId);
          }
        } catch (e) { console.warn("chat persist failed", e); }
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "I'm having trouble connecting. Reach us on WhatsApp at +256 774 488 956." }]);
    } finally { setLoading(false); }
  };

  const waMessage = encodeURIComponent(getWhatsAppMessage(location.pathname));

  return (
    <>
      <button onClick={() => setShowConverter(!showConverter)} className="fixed bottom-44 right-5 z-50 w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-elevated hover:scale-110 transition-transform text-lg font-bold" aria-label="Currency Converter">💱</button>
      {showConverter && <div className="fixed bottom-60 right-5 z-50 w-[300px] max-w-[calc(100vw-2.5rem)] animate-fade-in"><CurrencyConverter /></div>}

      <a href={`https://wa.me/256774488956?text=${waMessage}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-24 right-5 z-50 w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] text-white flex items-center justify-center shadow-elevated hover:scale-110 transition-transform" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      <button onClick={() => setChatOpen(!chatOpen)} className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-elevated hover:scale-110 transition-transform" aria-label="AI Assistant">
        {chatOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-5 z-50 w-[360px] max-w-[calc(100vw-2.5rem)] h-[480px] bg-card rounded-2xl shadow-elevated border border-border flex flex-col overflow-hidden animate-fade-in">
          <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center"><Bot className="w-5 h-5" /></div>
            <div><h3 className="font-body font-semibold text-sm tracking-tight">Zula Travel Assistant</h3><p className="text-xs text-primary-foreground/70 font-body">{userName ? `Hi ${userName.split(" ")[0]}! How can I help?` : "Ask me anything about East Africa"}</p></div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed font-body ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-secondary text-foreground rounded-bl-md"}`}>
                  {msg.role === "assistant" ? <div className="prose prose-sm max-w-none font-body [&_p]:m-0 [&_ul]:my-1 [&_li]:my-0 [&_strong]:font-semibold"><ReactMarkdown>{msg.content}</ReactMarkdown></div> : msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start"><div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3"><div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div></div></div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="p-3 border-t border-border">
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about tours, hotels, tips..." className="flex-1 bg-secondary rounded-full px-4 py-2.5 text-[13px] font-body outline-none focus:ring-2 focus:ring-primary/20" disabled={loading} />
              <button type="submit" disabled={!input.trim() || loading} className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50"><Send className="w-4 h-4" /></button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}