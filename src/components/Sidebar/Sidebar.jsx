import { useState } from "react";
import {
  LayoutDashboard, CheckSquare, Bot, CalendarDays, BarChart2,
  Settings, ChevronRight, Users, Layers,
} from "lucide-react";
import { T } from "../tokens/theme";

const NAV = [
  { id: "dashboard", label: "Dashboard",    Icon: LayoutDashboard },
  { id: "tasks",     label: "Tasks",        Icon: CheckSquare },
  { id: "ai",        label: "AI Assistant", Icon: Bot },
  { id: "calendar",  label: "Calendar",     Icon: CalendarDays },
  { id: "analytics", label: "Analytics",    Icon: BarChart2 },
];

function NavItem({ active, Icon, label, onClick, chevron }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
        borderRadius: 8, cursor: "pointer", marginBottom: 2,
        background: active || hov ? T.accentDim : "transparent",
        color: active ? T.accent : hov ? T.cream : T.creamDim,
        fontWeight: active ? 500 : 400, fontSize: 13.5,
        transition: "all 0.18s", position: "relative",
      }}
    >
      {active && (
        <div style={{
          position: "absolute", left: 0, top: 5, bottom: 5, width: 3,
          background: T.accent, borderRadius: "0 2px 2px 0",
          boxShadow: `0 0 8px ${T.accentGlw}`,
        }} />
      )}
      <Icon size={15} style={{ flexShrink: 0 }} />
      <span style={{ flex: 1 }}>{label}</span>
      {chevron && <ChevronRight size={13} style={{ opacity: 0.4 }} />}
    </div>
  );
}

export function Sidebar({ page, setPage }) {
  return (
    <aside style={{
      width: 220, minHeight: "100vh", background: T.bgPanel,
      borderRight: `1px solid ${T.border}`, display: "flex",
      flexDirection: "column", flexShrink: 0, position: "relative", zIndex: 10,
    }}>
      {/* Accent line */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: 1, height: "100%",
        background: `linear-gradient(to bottom, transparent, ${T.accent} 40%, transparent)`,
        opacity: 0.25,
      }} />

      {/* Logo */}
      <div style={{ padding: "22px 18px 18px", borderBottom: `1px solid ${T.border}`, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, background: T.accent, borderRadius: 9,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 18px ${T.accentGlw}`,
          }}>
            <Layers size={18} color="#fff" />
          </div>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: 1.5 }}>
            Task Manager
          </span>
        </div>
      </div>

      {/* Nav */}
      <div style={{ padding: "0 10px", flex: 1 }}>
        <span style={{ display: "block", fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.creamMut, padding: "8px 12px 6px" }}>
          Menu
        </span>
        {NAV.map(({ id, label, Icon }) => (
          <NavItem key={id} active={page === id} Icon={Icon} label={label} onClick={() => setPage(id)} />
        ))}
        <span style={{ display: "block", fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.creamMut, padding: "14px 12px 6px" }}>
          Teams
        </span>
        <NavItem Icon={Users} label="Product" onClick={() => {}} chevron />
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 10px 18px", borderTop: `1px solid ${T.border}` }}>
        <NavItem
          Icon={Settings}
          label="Settings"
          active={page === "settings"}
          onClick={() => setPage("settings")}
        />
      </div>
    </aside>
  );
}