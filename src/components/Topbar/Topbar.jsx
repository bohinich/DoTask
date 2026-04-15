import { useState } from "react";
import { Search, Bell, Zap } from "lucide-react";
import { T } from "../tokens/theme";
import { Avatar, IconBtn } from "./ui";

export function Topbar({ page, tasks }) {
  const [search, setSearch] = useState("");
  const pending = tasks.filter(t => t.status !== "done").length;

  return (
    <header style={{
      display: "flex", alignItems: "center", gap: 14,
      padding: "13px 26px", borderBottom: `1px solid ${T.border}`,
      background: "rgba(28,43,53,0.7)", backdropFilter: "blur(12px)",
    }}>
      <div style={{ position: "relative", flex: 1, maxWidth: 340 }}>
        <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: T.creamMut }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tasks..."
          style={{
            width: "100%", background: T.bgCard, border: `1px solid ${T.borderMd}`,
            borderRadius: 10, padding: "8px 14px 8px 34px", color: T.cream,
            fontSize: 13, outline: "none",
          }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
        <div style={{ position: "relative" }}>
          <IconBtn icon={Bell} tooltip="Notifications" />
          {pending > 0 && (
            <span style={{
              position: "absolute", top: -3, right: -3, width: 15, height: 15,
              background: T.accent, borderRadius: "50%", fontSize: 9,
              fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 6px ${T.accentGlw}`,
            }}>{pending > 9 ? "9+" : pending}</span>
          )}
        </div>
        <IconBtn icon={Zap} tooltip="Quick actions" />
        <Avatar initials="AK" size={34} glow />
      </div>
    </header>
  );
}