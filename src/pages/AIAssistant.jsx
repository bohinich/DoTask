import { useState, useEffect, useRef } from "react";
import { Bot, Send, RefreshCw } from "lucide-react";
import { T } from "../tokens/theme";
import { Avatar, Btn, Input } from "../components/ui";
import { AI_INIT } from "../data/initialData";

export function AIPage({ tasks }) {
  const [messages, setMessages] = useState(AI_INIT);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(m => [...m, { role: "user", text: userMsg }]);
    setLoading(true);
    try {
      const systemPrompt = `You are a task manager AI assistant. The user has ${tasks.length} tasks. Done: ${tasks.filter(t => t.status === "done").length}, In progress: ${tasks.filter(t => t.status === "progress").length}, Todo: ${tasks.filter(t => t.status === "todo").length}. Tasks: ${JSON.stringify(tasks.map(t => ({ name: t.name, status: t.status, priority: t.priority, due: t.due })))}. Answer in the same language as the user.`;
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: "user", content: userMsg }],
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't process that.";
      setMessages(m => [...m, { role: "assistant", text: reply }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", text: "Connection error. Please try again." }]);
    }
    setLoading(false);
  };

  const suggestions = [
    "Які задачі мають найвищий пріоритет?",
    "Скільки задач в роботі?",
    "Покажи summary по проєктам",
    "Що потрібно завершити сьогодні?",
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "22px 26px", gap: 16, overflow: "hidden" }}>
      {/* Header */}
      <div className="fade-up" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: T.accentDim, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Bot size={19} color={T.accent} />
        </div>
        <div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, letterSpacing: 1 }}>AI Assistant</div>
          <div style={{ fontSize: 12, color: T.creamMut }}>Powered by Claude · Knows your {tasks.length} tasks</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.green, boxShadow: `0 0 6px ${T.green}` }} />
          <span style={{ fontSize: 12, color: T.green }}>Online</span>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingRight: 4 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", gap: 10, justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            {msg.role === "assistant" && (
              <div style={{ width: 32, height: 32, borderRadius: 9, background: T.accentDim, border: `1px solid rgba(254,85,22,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Bot size={15} color={T.accent} />
              </div>
            )}
            <div style={{
              maxWidth: "70%", padding: "11px 15px",
              borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              background: msg.role === "user" ? T.accent : T.bgCard,
              color: msg.role === "user" ? "#fff" : T.cream,
              fontSize: 13.5, lineHeight: 1.55,
              border: msg.role === "assistant" ? `1px solid ${T.border}` : "none",
              boxShadow: msg.role === "user" ? `0 4px 14px ${T.accentGlw}` : "none",
              whiteSpace: "pre-wrap",
            }}>
              {msg.text}
            </div>
            {msg.role === "user" && <Avatar initials="AK" size={32} />}
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: T.accentDim, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Bot size={15} color={T.accent} />
            </div>
            <div style={{ padding: "13px 16px", borderRadius: "14px 14px 14px 4px", background: T.bgCard, border: `1px solid ${T.border}`, display: "flex", gap: 5, alignItems: "center" }}>
              {[0, 1, 2].map(j => (
                <span key={j} style={{ width: 7, height: 7, borderRadius: "50%", background: T.accent, display: "inline-block", animation: `pulse 1.2s ease ${j * 0.2}s infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {suggestions.map(s => (
            <button key={s} onClick={() => setInput(s)}
              style={{ padding: "7px 13px", borderRadius: 8, fontSize: 12, cursor: "pointer", background: T.bgCard, border: `1px solid ${T.borderMd}`, color: T.creamDim, transition: "all 0.15s" }}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about your tasks, priorities, or anything..."
          />
        </div>
        <Btn variant="primary" onClick={send} icon={<Send size={15} />} style={{ padding: "9px 16px" }} />
      </div>
    </div>
  );
}