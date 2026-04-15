import { X } from "lucide-react";
import { T } from "../tokens/theme";

export function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(10,18,22,0.75)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: T.bgPanel, borderRadius: 16, padding: "24px 28px",
          border: `1px solid ${T.borderMd}`, width: "100%", maxWidth: 460,
          animation: "fadeUp 0.25s ease",
          boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: 1 }}>
            {title}
          </span>
          <button onClick={onClose} style={{ color: T.creamDim, background: "none", border: "none", cursor: "pointer" }}>
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}