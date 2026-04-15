import { useState } from "react";
import { T, statusMeta, priorityMeta, sx } from "../tokens/theme";

// ─── AVATAR ───────────────────────────────────────────────────────────────────
export function Avatar({ initials, size = 32, glow = false }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(135deg, ${T.accent}, #c43a00)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.36, fontWeight: 700, color: "#fff",
      border: `2px solid ${T.accent}`, flexShrink: 0,
      boxShadow: glow ? `0 0 14px ${T.accentGlw}` : "none",
      userSelect: "none",
    }}>{initials}</div>
  );
}

// ─── BADGE ────────────────────────────────────────────────────────────────────
export function Badge({ status }) {
  const m = statusMeta[status];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "3px 9px", borderRadius: 5, fontSize: 11, fontWeight: 600,
      color: m.color, background: m.bg, border: `1px solid ${m.border}`,
    }}>{m.label}</span>
  );
}

// ─── PRIORITY DOT ─────────────────────────────────────────────────────────────
export function PriorityDot({ priority }) {
  return (
    <span style={{
      width: 7, height: 7, borderRadius: "50%",
      background: priorityMeta[priority]?.color,
      display: "inline-block", flexShrink: 0,
    }} />
  );
}

// ─── CARD ─────────────────────────────────────────────────────────────────────
export function Card({ children, style, delay = 0, hover = true }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="fade-up"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={sx({
        background: hov && hover ? T.bgCardHv : T.bgCard,
        borderRadius: 14, padding: "18px 20px",
        border: `1px solid ${hov && hover ? "rgba(254,85,22,0.18)" : T.border}`,
        transition: "all 0.2s ease",
        animationDelay: `${delay}s`,
      }, style)}
    >{children}</div>
  );
}

// ─── BTN ──────────────────────────────────────────────────────────────────────
export function Btn({ children, variant = "primary", onClick, style, icon, small = false }) {
  const [hov, setHov] = useState(false);
  const base = {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: small ? "6px 12px" : "9px 18px",
    borderRadius: 9, fontSize: small ? 12 : 13, fontWeight: 600,
    transition: "all 0.2s", cursor: "pointer", border: "none",
    userSelect: "none",
  };
  const variants = {
    primary: {
      background: hov ? "#ff6a2e" : T.accent, color: "#fff",
      boxShadow: hov ? `0 6px 20px ${T.accentGlw}` : `0 4px 14px ${T.accentGlw}`,
      transform: hov ? "translateY(-1px)" : "none",
    },
    ghost: {
      background: hov ? T.accentDim : "transparent",
      color: hov ? T.accent : T.creamDim,
      border: `1px solid ${hov ? "rgba(254,85,22,0.28)" : T.borderMd}`,
    },
    danger: {
      background: hov ? "rgba(255,60,60,0.2)" : "rgba(255,60,60,0.1)",
      color: "#ff5555", border: `1px solid rgba(255,60,60,0.25)`,
    },
  };
  return (
    <button
      style={sx(base, variants[variant], style)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
    >
      {icon && icon}{children}
    </button>
  );
}

// ─── ICON BTN ─────────────────────────────────────────────────────────────────
export function IconBtn({ icon: Icon, onClick, active = false, tooltip = "" }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      title={tooltip}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 34, height: 34, borderRadius: 8,
        background: active || hov ? T.accentDim : T.bgCard,
        border: `1px solid ${active || hov ? "rgba(254,85,22,0.28)" : T.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: active || hov ? T.accent : T.creamDim,
        transition: "all 0.18s", flexShrink: 0,
      }}
    >
      <Icon size={15} />
    </button>
  );
}

// ─── INPUT ────────────────────────────────────────────────────────────────────
export function Input({ value, onChange, placeholder, multiline = false, style }) {
  const [foc, setFoc] = useState(false);
  const base = {
    background: T.bgDeep, border: `1px solid ${foc ? T.accent : T.borderMd}`,
    borderRadius: 9, padding: "9px 13px", color: T.cream, fontSize: 13,
    outline: "none", width: "100%", transition: "all 0.2s",
    boxShadow: foc ? `0 0 0 3px ${T.accentDim}` : "none",
    resize: multiline ? "vertical" : "none",
  };
  return multiline
    ? <textarea value={value} onChange={onChange} placeholder={placeholder}
        onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
        style={sx(base, { minHeight: 80 }, style)} />
    : <input value={value} onChange={onChange} placeholder={placeholder}
        onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
        style={sx(base, style)} />;
}

// ─── SELECT ───────────────────────────────────────────────────────────────────
export function Select({ value, onChange, options, style }) {
  return (
    <select value={value} onChange={onChange} style={sx({
      background: T.bgDeep, border: `1px solid ${T.borderMd}`,
      borderRadius: 9, padding: "9px 13px", color: T.cream,
      fontSize: 13, outline: "none", width: "100%", cursor: "pointer",
    }, style)}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}