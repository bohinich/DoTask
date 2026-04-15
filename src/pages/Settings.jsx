import { useState } from "react";
import { Save, ArrowUpRight, Trash2, Plus } from "lucide-react";
import { T } from "../tokens/theme";
import { Card, Btn, Avatar, Input, Select } from "../components/ui";

export function SettingsPage() {
  const [notif, setNotif]     = useState(true);
  const [compact, setCompact] = useState(false);
  const [accent, setAccent]   = useState(T.accent);

  const Toggle = ({ on, onChange }) => (
    <div onClick={() => onChange(!on)} style={{
      width: 44, height: 24, borderRadius: 12, cursor: "pointer",
      background: on ? T.accent : "rgba(232,217,187,0.1)",
      position: "relative", transition: "background 0.2s",
      boxShadow: on ? `0 0 10px ${T.accentGlw}` : "none",
      flexShrink: 0,
    }}>
      <div style={{
        position: "absolute", top: 3, left: on ? 23 : 3,
        width: 18, height: 18, borderRadius: "50%", background: "#fff",
        transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
      }} />
    </div>
  );

  const Section = ({ title, children }) => (
    <Card delay={0}>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 1, marginBottom: 16 }}>{title}</div>
      {children}
    </Card>
  );

  const Row = ({ label, desc, children }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 500 }}>{label}</div>
        {desc && <div style={{ fontSize: 11.5, color: T.creamMut, marginTop: 2 }}>{desc}</div>}
      </div>
      {children}
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "22px 26px", display: "flex", flexDirection: "column", gap: 14 }}>
      <div className="fade-up" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, letterSpacing: 1 }}>Settings</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* Profile */}
        <Section title="Profile">
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <Avatar initials="AK" size={56} glow />
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Anna Kovalenko</div>
              <div style={{ fontSize: 12, color: T.creamMut }}>anna@company.com</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <label style={{ fontSize: 11, color: T.creamMut, display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Name</label>
              <Input value="Anna Kovalenko" onChange={() => {}} placeholder="Your name" />
            </div>
            <div>
              <label style={{ fontSize: 11, color: T.creamMut, display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Email</label>
              <Input value="anna@company.com" onChange={() => {}} placeholder="Email" />
            </div>
            <Btn variant="primary" icon={<Save size={14} />} style={{ marginTop: 4 }}>Save Profile</Btn>
          </div>
        </Section>

        {/* Preferences */}
        <Section title="Preferences">
          <Row label="Notifications" desc="Receive task reminders and updates">
            <Toggle on={notif} onChange={setNotif} />
          </Row>
          <Row label="Compact View" desc="Show more tasks with less spacing">
            <Toggle on={compact} onChange={setCompact} />
          </Row>
          <Row label="Accent Color" desc="Primary color for the interface">
            <input type="color" value={accent} onChange={e => setAccent(e.target.value)}
              style={{ width: 40, height: 32, borderRadius: 8, border: "none", cursor: "pointer", background: "none" }} />
          </Row>
          <Row label="Language" desc="Interface language">
            <Select value="uk" onChange={() => {}} style={{ width: 120 }}
              options={[{ value: "uk", label: "Українська" }, { value: "en", label: "English" }, { value: "de", label: "Deutsch" }]} />
          </Row>
        </Section>

        {/* Team */}
        <Section title="Team Members">
          {[
            { name: "Anna Kovalenko",  role: "Admin",     init: "AK" },
            { name: "Max Ryabov",      role: "Developer", init: "MR" },
            { name: "Julia Savchenko", role: "Designer",  init: "JS" },
          ].map(({ name, role, init }) => (
            <div key={init} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
              <Avatar initials={init} size={36} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{name}</div>
                <div style={{ fontSize: 11.5, color: T.creamMut }}>{role}</div>
              </div>
              <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 5, background: T.accentDim, color: T.accent, border: `1px solid rgba(254,85,22,0.25)` }}>{role}</span>
            </div>
          ))}
          <Btn variant="ghost" small icon={<Plus size={13} />} style={{ marginTop: 12 }}>Invite Member</Btn>
        </Section>

        {/* Account */}
        <Section title="Account">
          <Row label="Export Data" desc="Download all your tasks as JSON">
            <Btn variant="ghost" small icon={<ArrowUpRight size={13} />}>Export</Btn>
          </Row>
          <Row label="Clear All Tasks" desc="Permanently delete all tasks">
            <Btn variant="danger" small icon={<Trash2 size={13} />}>Clear</Btn>
          </Row>
          <Row label="Version" desc="Current app version">
            <span style={{ fontSize: 12, color: T.creamMut }}>v1.0.0</span>
          </Row>
        </Section>
      </div>
    </div>
  );
}