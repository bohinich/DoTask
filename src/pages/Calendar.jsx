import { useState } from "react";
import { ChevronLeft, ChevronRight as ChevronR, Plus, X } from "lucide-react";
import { T } from "../tokens/theme";
import { Card, Btn, Input } from "../components/ui";

export function CalendarPage({ events, setEvents }) {
  const [month, setMonth]   = useState(new Date(2024, 3, 1));
  const [selected, setSelected] = useState(null);
  const [form, setForm]     = useState({ title: "", time: "09:00", color: T.accent });

  const start     = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  const total     = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const prevTotal = new Date(month.getFullYear(), month.getMonth(), 0).getDate();

  const cells = Array.from({ length: 42 }, (_, i) => {
    const d = i - start + 1;
    if (d < 1)      return { day: prevTotal + d, cur: false };
    if (d > total)  return { day: d - total,     cur: false };
    return { day: d, cur: true };
  });

  const monthStr = month.toLocaleString("default", { month: "long", year: "numeric" });

  const eventsOn = d => {
    const key = `2024-04-${String(d).padStart(2, "0")}`;
    return events.filter(e => e.date === key);
  };

  const addEvent = () => {
    if (!form.title.trim() || !selected) return;
    const key = `2024-04-${String(selected).padStart(2, "0")}`;
    setEvents(prev => [...prev, { id: Date.now(), date: key, title: form.title, time: form.time, color: form.color }]);
    setForm({ title: "", time: "09:00", color: T.accent });
  };

  const delEvent = id => setEvents(prev => prev.filter(e => e.id !== id));

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "22px 26px", display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Header */}
      <div className="fade-up" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, letterSpacing: 1, flex: 1 }}>Calendar</span>
        <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1))}
          style={{ width: 32, height: 32, borderRadius: 8, background: T.bgCard, border: `1px solid ${T.border}`, color: T.creamDim, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <ChevronLeft size={14} />
        </button>
        <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 1, minWidth: 180, textAlign: "center" }}>{monthStr}</span>
        <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1))}
          style={{ width: 32, height: 32, borderRadius: 8, background: T.bgCard, border: `1px solid ${T.border}`, color: T.creamDim, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <ChevronR size={14} />
        </button>
      </div>

      {/* Grid */}
      <Card delay={0.06} style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)" }}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
            <div key={d} style={{ padding: "12px 8px", textAlign: "center", fontSize: 11, fontWeight: 600, color: T.creamMut, borderBottom: `1px solid ${T.border}` }}>{d}</div>
          ))}
          {cells.map(({ day, cur }, i) => {
            const evs    = cur ? eventsOn(day) : [];
            const isSel  = selected === day && cur;
            const isToday = cur && day === 15;
            return (
              <div key={i} onClick={() => cur && setSelected(day)}
                style={{
                  minHeight: 100, padding: "8px 10px", cursor: cur ? "pointer" : "default",
                  border: `1px solid ${T.border}`, borderTop: "none",
                  background: isSel ? T.accentDim : isToday ? "rgba(254,85,22,0.06)" : "transparent",
                  transition: "background 0.15s",
                }}>
                <div style={{
                  width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  background: isToday ? T.accent : "transparent",
                  color: !cur ? T.creamMut : isToday ? "#fff" : T.cream,
                  fontSize: 13, fontWeight: isToday ? 700 : 400,
                  boxShadow: isToday ? `0 0 10px ${T.accentGlw}` : "none",
                }}>{day}</div>
                {evs.map(e => (
                  <div key={e.id} style={{
                    background: `${e.color}22`, border: `1px solid ${e.color}55`,
                    borderLeft: `3px solid ${e.color}`, borderRadius: 4,
                    padding: "2px 5px", fontSize: 10, color: e.color, marginBottom: 3,
                    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4,
                  }}>
                    <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.title}</span>
                    <button onClick={ev => { ev.stopPropagation(); delEvent(e.id); }}
                      style={{ color: e.color, opacity: 0.7, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      <X size={8} />
                    </button>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Add event */}
      {selected && (
        <Card delay={0} style={{ padding: "16px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13, color: T.creamDim, flex: 1 }}>Add event on April {selected}</span>
            <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Event title..." style={{ maxWidth: 200 }} />
            <Input value={form.time}  onChange={e => setForm(f => ({ ...f, time: e.target.value  }))} style={{ maxWidth: 90 }} />
            <Btn variant="primary" small icon={<Plus size={13} />} onClick={addEvent}>Add</Btn>
          </div>
        </Card>
      )}
    </div>
  );
}