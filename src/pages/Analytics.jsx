import { Inbox, Clock, CheckCircle2, Target, TrendingUp, Activity } from "lucide-react";
import { T, priorityMeta } from "../tokens/theme";
import { Card, Badge, Avatar } from "../components/ui";

export function AnalyticsPage({ tasks }) {
  const todo     = tasks.filter(t => t.status === "todo").length;
  const progress = tasks.filter(t => t.status === "progress").length;
  const done     = tasks.filter(t => t.status === "done").length;
  const total    = tasks.length;
  const pct      = Math.round((done / total) * 100);

  const byProject = {};
  tasks.forEach(t => { byProject[t.project] = (byProject[t.project] || 0) + 1; });
  const projectList = Object.entries(byProject).sort((a, b) => b[1] - a[1]);
  const maxP = projectList[0]?.[1] || 1;

  const byPriority = { urgent: 0, high: 0, medium: 0, low: 0 };
  tasks.forEach(t => { if (byPriority[t.priority] !== undefined) byPriority[t.priority]++; });

  const r = 42, circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "22px 26px", display: "flex", flexDirection: "column", gap: 14 }}>
      <div className="fade-up" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, letterSpacing: 1 }}>Analytics</div>

      {/* KPI cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {[
          { label: "Completion Rate", value: `${pct}%`, icon: Target,        color: "#4f8ef7" },
          { label: "Total Tasks",     value: total,      icon: Inbox,         color: T.cream },
          { label: "In Progress",     value: progress,   icon: Clock,         color: T.accent },
          { label: "Done",            value: done,       icon: CheckCircle2,  color: T.green },
        ].map(({ label, value, icon: Icon, color }, i) => (
          <Card key={label} delay={i * 0.06}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 11, color: T.creamMut, textTransform: "uppercase", letterSpacing: 1 }}>{label}</span>
              <Icon size={15} color={color} />
            </div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 34, color, letterSpacing: 1 }}>{value}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6, fontSize: 11, color: T.green }}>
              <TrendingUp size={11} /> +12% this week
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        {/* Donut */}
        <Card delay={0.24}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 1, marginBottom: 16 }}>Completion</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "relative", width: 120, height: 120 }}>
              <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(232,217,187,0.08)" strokeWidth="10" />
                <circle cx="60" cy="60" r={r} fill="none" stroke={T.accent} strokeWidth="10"
                  strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
                  style={{ filter: `drop-shadow(0 0 8px ${T.accentGlw})`, transition: "stroke-dashoffset 0.6s ease" }} />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: 1 }}>{pct}%</span>
                <span style={{ fontSize: 10, color: T.creamMut }}>Complete</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", marginTop: 16 }}>
            {[["To Do", todo, T.creamDim], ["Progress", progress, T.accent], ["Done", done, T.green]].map(([l, v, c]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, color: c }}>{v}</div>
                <div style={{ fontSize: 11, color: T.creamMut }}>{l}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* By project */}
        <Card delay={0.3}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 1, marginBottom: 16 }}>By Project</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {projectList.map(([name, count], i) => (
              <div key={name}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                  <span style={{ color: T.creamDim }}>{name}</span>
                  <span style={{ color: T.cream, fontWeight: 600 }}>{count}</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: "rgba(232,217,187,0.08)" }}>
                  <div style={{
                    height: "100%", borderRadius: 3,
                    background: i === 0 ? T.accent : i === 1 ? "#4f8ef7" : T.green,
                    width: `${(count / maxP) * 100}%`, transition: "width 0.6s ease",
                    boxShadow: i === 0 ? `0 0 8px ${T.accentGlw}` : "none",
                  }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* By priority */}
        <Card delay={0.36}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 1, marginBottom: 16 }}>By Priority</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {Object.entries(byPriority).map(([p, count]) => (
              <div key={p} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: priorityMeta[p].color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: T.creamDim, flex: 1, textTransform: "capitalize" }}>{priorityMeta[p].label}</span>
                <div style={{ flex: 2, height: 6, borderRadius: 3, background: "rgba(232,217,187,0.08)" }}>
                  <div style={{ height: "100%", borderRadius: 3, background: priorityMeta[p].color, width: `${(count / (total || 1)) * 100}%` }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, minWidth: 20, textAlign: "right" }}>{count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent activity */}
      <Card delay={0.42}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 1, marginBottom: 14 }}>Recent Activity</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tasks.slice(0, 5).map(t => (
            <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: T.accentDim, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Activity size={14} color={T.accent} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{t.name}</div>
                <div style={{ fontSize: 11, color: T.creamMut }}>{t.project} · {t.due}</div>
              </div>
              <Badge status={t.status} />
              <Avatar initials={t.assignee} size={26} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}