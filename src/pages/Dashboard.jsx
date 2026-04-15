import { useState } from "react";
import {
  Plus, MoreHorizontal, Activity, Inbox, Clock,
  CheckCircle2, Target, ChevronLeft, ChevronRight as ChevronR,
} from "lucide-react";
import { T, statusMeta, priorityMeta, sx } from "../tokens/theme";
import { Card, Btn, Badge, PriorityDot, Avatar } from "../components/ui";

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

// ─── TASK ROW ─────────────────────────────────────────────────────────────────
export function TaskRow({ task, compact = false, onEdit, onDelete }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "11px 13px", background: "rgba(14,26,32,0.45)",
        borderRadius: 10, marginBottom: 8,
        border: `1px solid ${hov ? "rgba(254,85,22,0.15)" : T.border}`,
        transition: "all 0.18s", transform: hov ? "translateX(2px)" : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: compact ? 2 : 5 }}>
        <PriorityDot priority={task.priority} />
        <span style={{ fontSize: 13.5, fontWeight: 500, flex: 1 }}>{task.name}</span>
        {!compact && hov && (
          <div style={{ display: "flex", gap: 5 }}>
            {onEdit   && <button onClick={() => onEdit(task)}    style={{ color: T.creamDim, background: "none", border: "none", cursor: "pointer" }}>✏️</button>}
            {onDelete && <button onClick={() => onDelete(task.id)} style={{ color: "#ff5555", background: "none", border: "none", cursor: "pointer" }}>🗑</button>}
          </div>
        )}
      </div>
      {!compact && <div style={{ fontSize: 11.5, color: T.creamMut, marginBottom: 7 }}>{task.desc}</div>}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Badge status={task.status} />
        {compact && hov && (
          <div style={{ display: "flex", gap: 4 }}>
            {onEdit   && <button onClick={() => onEdit(task)}    style={{ color: T.creamDim, background: "none", border: "none", cursor: "pointer" }}>✏️</button>}
            {onDelete && <button onClick={() => onDelete(task.id)} style={{ color: "#ff5555", background: "none", border: "none", cursor: "pointer" }}>🗑</button>}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MINI CALENDAR ────────────────────────────────────────────────────────────
function MiniCalendar() {
  const [month, setMonth] = useState(new Date(2024, 3, 1));
  const today = 15;
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const start = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  const total = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = Array.from({ length: 42 }, (_, i) => {
    const d = i - start + 1;
    return d > 0 && d <= total ? d : null;
  });
  const hasEvent = [3, 10, 17, 22, 25];
  const monthName = month.toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <Card delay={0.36}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 17, letterSpacing: 1 }}>{monthName}</span>
        <div style={{ display: "flex", gap: 5 }}>
          {[ChevronLeft, ChevronR].map((Icon, i) => (
            <button key={i}
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + (i === 0 ? -1 : 1)))}
              style={{ width: 24, height: 24, borderRadius: 5, background: "rgba(232,217,187,0.07)", border: `1px solid ${T.border}`, color: T.creamDim, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Icon size={12} />
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3, textAlign: "center" }}>
        {days.map((d, i) => (
          <div key={i} style={{ fontSize: 10, fontWeight: 600, color: T.creamMut, padding: "3px 0" }}>{d}</div>
        ))}
        {cells.map((d, i) => (
          <div key={i} style={{
            aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, borderRadius: 6, cursor: d ? "pointer" : "default",
            color: d === today ? "#fff" : d ? T.creamDim : "transparent",
            background: d === today ? T.accent : "transparent",
            boxShadow: d === today ? `0 0 10px ${T.accentGlw}` : "none",
            fontWeight: d === today ? 700 : 400, position: "relative",
          }}>
            {d}
            {d && hasEvent.includes(d) && d !== today && (
              <span style={{ position: "absolute", bottom: 2, width: 4, height: 4, borderRadius: "50%", background: T.accent, left: "50%", transform: "translateX(-50%)" }} />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── NEW TASK BANNER ──────────────────────────────────────────────────────────
function NewTaskBanner({ onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="fade-up"
      style={{
        background: hov ? "rgba(254,85,22,0.1)" : "rgba(254,85,22,0.05)",
        border: `1px dashed ${hov ? T.accent : "rgba(254,85,22,0.3)"}`,
        borderRadius: 14, padding: "18px 22px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        cursor: "pointer", transition: "all 0.25s",
        boxShadow: hov ? `0 0 22px rgba(254,85,22,0.1)` : "none",
        animationDelay: "0.42s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, color: T.creamDim, fontSize: 14 }}>
        <Plus size={20} color={T.accent} />
        Create New Task
      </div>
      <Btn variant="primary" icon={<Plus size={14} />}>New Task</Btn>
    </div>
  );
}

// ─── ANALYTICS WIDGET ─────────────────────────────────────────────────────────
function AnalyticsWidget({ todo, progress, done, pct }) {
  const r = 34, circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  return (
    <Card delay={0.48} style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Bebas Neue',sans-serif", fontSize: 17, letterSpacing: 1 }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: T.accentDim, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Activity size={13} color={T.accent} />
          </div>
          Analytics
        </div>
        <MoreHorizontal size={16} color={T.creamMut} style={{ cursor: "pointer" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "To Do",       val: todo,     dot: T.creamDim },
            { label: "In Progress", val: progress, dot: T.accent },
            { label: "Completed",   val: done,     dot: T.green },
          ].map(({ label, val, dot }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, color: T.creamDim }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: dot, display: "inline-block" }} />
                {label}
              </div>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{val}</span>
            </div>
          ))}
        </div>
        <div style={{ position: "relative", width: 90, height: 90, flexShrink: 0 }}>
          <svg width="90" height="90" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(232,217,187,0.08)" strokeWidth="8" />
            <circle cx="45" cy="45" r={r} fill="none" stroke={T.accent} strokeWidth="8"
              strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
              style={{ filter: `drop-shadow(0 0 6px ${T.accentGlw})`, transition: "stroke-dashoffset 0.6s ease" }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: 1 }}>{pct}%</span>
            <span style={{ fontSize: 9, color: T.creamMut, textAlign: "center", lineHeight: 1.2 }}>Done</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
export function Dashboard({ tasks, setPage }) {
  const todo     = tasks.filter(t => t.status === "todo").length;
  const progress = tasks.filter(t => t.status === "progress").length;
  const done     = tasks.filter(t => t.status === "done").length;
  const total    = tasks.length;
  const pct      = Math.round((done / total) * 100);
  const myTasks  = tasks.filter(t => t.assignee === "AK").slice(0, 3);
  const inProgress = tasks.filter(t => t.status === "progress").slice(0, 2);

  const stats = [
    { label: "Total Tasks",  value: total,    icon: Inbox,        color: T.cream },
    { label: "In Progress",  value: progress, icon: Clock,        color: T.accent },
    { label: "Completed",    value: done,     icon: CheckCircle2, color: T.green },
    { label: "Completion",   value: `${pct}%`,icon: Target,       color: "#4f8ef7" },
  ];

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "22px 26px", display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {stats.map(({ label, value, icon: Icon, color }, i) => (
          <Card key={label} delay={i * 0.06}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 11, color: T.creamMut, marginBottom: 6, fontWeight: 500, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, color, letterSpacing: 1 }}>{value}</div>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: `rgba(${hexToRgb(color === T.cream ? "#e8d9bb" : color)},0.12)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={17} color={color} />
              </div>
            </div>
            <div style={{ marginTop: 10, height: 3, borderRadius: 3, background: T.border }}>
              <div style={{ height: "100%", borderRadius: 3, background: color, width: `${Math.min(100, (Number(String(value).replace("%","")) / (label === "Completion" ? 100 : total || 1)) * 100)}%` }} />
            </div>
          </Card>
        ))}
      </div>

      {/* Main content */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 290px", gap: 14 }}>
        {/* My Tasks */}
        <Card delay={0.24}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 1 }}>My Tasks</div>
              <div style={{ fontSize: 11, color: T.creamMut }}>{myTasks.length} tasks</div>
            </div>
            <Btn variant="ghost" small icon={<Plus size={13} />} onClick={() => setPage("tasks")}>Add</Btn>
          </div>
          {myTasks.map(t => <TaskRow key={t.id} task={t} compact />)}
        </Card>

        {/* In Progress */}
        <Card delay={0.3}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 1 }}>In Progress</div>
              <div style={{ fontSize: 11, color: T.creamMut }}>{inProgress.length} tasks</div>
            </div>
            <Btn variant="ghost" small icon={<Plus size={13} />} onClick={() => setPage("tasks")}>Add</Btn>
          </div>
          {inProgress.map((t, i) => (
            <div key={t.id} style={{ marginBottom: i < inProgress.length - 1 ? 8 : 0 }}>
              {i === 0 && <div style={{ marginBottom: 6 }}><Badge status="progress" /></div>}
              <TaskRow task={t} compact />
            </div>
          ))}
        </Card>

        {/* Mini Calendar */}
        <MiniCalendar />
      </div>

      {/* Bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <NewTaskBanner onClick={() => setPage("tasks")} />
        <AnalyticsWidget todo={todo} progress={progress} done={done} pct={pct} />
      </div>
    </div>
  );
}