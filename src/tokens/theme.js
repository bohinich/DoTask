export const T = {
  bgDeep:   "#0e1a20",
  bgPanel:  "#1c2b35",
  bgCard:   "#243340",
  bgCardHv: "#2a3c4a",
  accent:   "#fe5516",
  accentDim:"rgba(254,85,22,0.14)",
  accentGlw:"rgba(254,85,22,0.38)",
  cream:    "#e8d9bb",
  creamDim: "rgba(232,217,187,0.55)",
  creamMut: "rgba(232,217,187,0.25)",
  green:    "#00c878",
  greenDim: "rgba(0,200,120,0.14)",
  border:   "rgba(232,217,187,0.07)",
  borderMd: "rgba(232,217,187,0.13)",
};

export const statusMeta = {
  todo:     { label:"To Do",       color: T.creamDim, bg:"rgba(232,217,187,0.08)", border:"rgba(232,217,187,0.15)" },
  progress: { label:"In Progress", color: T.accent,   bg: T.accentDim,             border:"rgba(254,85,22,0.3)" },
  done:     { label:"Done",        color: T.green,    bg: T.greenDim,              border:"rgba(0,200,120,0.3)" },
};

export const priorityMeta = {
  urgent: { color:"#ff4444", label:"Urgent" },
  high:   { color: T.accent, label:"High" },
  medium: { color:"#f7c948", label:"Medium" },
  low:    { color: T.green,  label:"Low" },
};

export const sx = (...objs) => Object.assign({}, ...objs);