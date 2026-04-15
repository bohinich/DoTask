import { T } from "./theme";

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${T.bgDeep}; font-family: 'DM Sans', sans-serif; color: ${T.cream}; overflow: hidden; }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${T.creamMut}; border-radius: 4px; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
  @keyframes slideIn { from { transform: translateX(-8px); opacity:0 } to { transform:translateX(0); opacity:1 } }
  @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.5} }
  .fade-up { animation: fadeUp 0.35s ease forwards; }
  input, textarea, button, select { font-family: 'DM Sans', sans-serif; }
  button { cursor: pointer; border: none; background: none; }
`;

export function injectGlobal() {
  if (document.getElementById("tm-global")) return;
  const s = document.createElement("style");
  s.id = "tm-global";
  s.textContent = GLOBAL_CSS;
  document.head.appendChild(s);
}