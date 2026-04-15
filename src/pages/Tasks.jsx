import { useState } from "react";
import {
  Plus, Edit2, Trash2, Save, CalendarDays, Layers, CheckSquare,
} from "lucide-react";
import { T, statusMeta, sx } from "../tokens/theme";
import { Card, Btn, Badge, PriorityDot, Avatar, IconBtn, Input, Select } from "../components/ui";
import { Modal } from "../components/Modal";

export function TasksPage({ tasks, setTasks }) {
  const [view, setView]       = useState("list");
  const [filter, setFilter]   = useState("all");
  const [sortBy, setSortBy]   = useState("due");
  const [modal, setModal]     = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [form, setForm]       = useState({ name: "", desc: "", status: "todo", priority: "medium", due: "" });

  const openNew  = () => { setForm({ name: "", desc: "", status: "todo", priority: "medium", due: "" }); setEditTask(null); setModal(true); };
  const openEdit = t  => { setForm({ name: t.name, desc: t.desc, status: t.status, priority: t.priority, due: t.due || "" }); setEditTask(t); setModal(true); };

  const save = () => {
    if (!form.name.trim()) return;
    if (editTask) {
      setTasks(prev => prev.map(t => t.id === editTask.id ? { ...t, ...form } : t));
    } else {
      setTasks(prev => [...prev, { id: Date.now(), assignee: "AK", project: "General", ...form }]);
    }
    setModal(false);
  };

  const del = id => setTasks(prev => prev.filter(t => t.id !== id));

  const visible = tasks
    .filter(t => filter === "all" || t.status === filter)
    .sort((a, b) => {
      if (sortBy === "due")      return (a.due || "").localeCompare(b.due || "");
      if (sortBy === "priority") { const o = { urgent: 0, high: 1, medium: 2, low: 3 }; return o[a.priority] - o[b.priority]; }
      return a.name.localeCompare(b.name);
    });

  const byStatus = s => visible.filter(t => t.status === s);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "22px 26px", display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Toolbar */}
      <div className="fade-up" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, letterSpacing: 1, flex: 1 }}>Tasks</div>
        <div style={{ display: "flex", gap: 4 }}>
          {["all", "todo", "progress", "done"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "6px 13px", borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: "pointer",
              background: filter === f ? T.accentDim : "transparent",
              color: filter === f ? T.accent : T.creamDim,
              border: `1px solid ${filter === f ? "rgba(254,85,22,0.28)" : T.border}`,
              transition: "all 0.15s",
            }}>{f === "all" ? "All" : statusMeta[f]?.label}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <Select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{ width: "auto", padding: "7px 10px", fontSize: 12 }}
            options={[
              { value: "due",      label: "Sort: Due" },
              { value: "priority", label: "Sort: Priority" },
              { value: "name",     label: "Sort: Name" },
            ]}
          />
          <IconBtn icon={view === "list" ? Layers : CheckSquare} onClick={() => setView(v => v === "list" ? "kanban" : "list")} tooltip="Toggle view" />
        </div>
        <Btn variant="primary" icon={<Plus size={14} />} onClick={openNew}>New Task</Btn>
      </div>

      {/* List view */}
      {view === "list" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {visible.map((t, i) => (
            <Card key={t.id} delay={i * 0.03} style={{ padding: "13px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <PriorityDot priority={t.priority} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{t.name}</div>
                  <div style={{ fontSize: 11.5, color: T.creamMut }}>{t.desc}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Badge status={t.status} />
                  <span style={{ fontSize: 11, color: T.creamMut, minWidth: 70 }}>
                    {t.due && <><CalendarDays size={10} style={{ marginRight: 4, verticalAlign: "middle" }} />{t.due}</>}
                  </span>
                  <Avatar initials={t.assignee} size={26} />
                  <div style={{ display: "flex", gap: 4 }}>
                    <IconBtn icon={Edit2}  onClick={() => openEdit(t)} tooltip="Edit" />
                    <IconBtn icon={Trash2} onClick={() => del(t.id)}   tooltip="Delete" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {visible.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0", color: T.creamMut, fontSize: 14 }}>
              No tasks found
            </div>
          )}
        </div>
      ) : (
        /* Kanban view */
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, alignItems: "start" }}>
          {["todo", "progress", "done"].map(s => (
            <div key={s}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: statusMeta[s].color }}>{statusMeta[s].label}</span>
                <span style={{ background: statusMeta[s].bg, color: statusMeta[s].color, padding: "2px 7px", borderRadius: 5, fontSize: 11, fontWeight: 600 }}>{byStatus(s).length}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {byStatus(s).map(t => (
                  <Card key={t.id} style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                      <PriorityDot priority={t.priority} />
                      <span style={{ fontSize: 13, fontWeight: 500, flex: 1 }}>{t.name}</span>
                      <button onClick={() => openEdit(t)} style={{ color: T.creamMut, background: "none", border: "none", cursor: "pointer" }}><Edit2 size={12} /></button>
                      <button onClick={() => del(t.id)}   style={{ color: "#ff5555",  background: "none", border: "none", cursor: "pointer" }}><Trash2 size={12} /></button>
                    </div>
                    <div style={{ fontSize: 11, color: T.creamMut, marginBottom: 8 }}>{t.desc}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      {t.due && <span style={{ fontSize: 10.5, color: T.creamMut }}>{t.due}</span>}
                      <Avatar initials={t.assignee} size={22} />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal open={modal} onClose={() => setModal(false)} title={editTask ? "Edit Task" : "New Task"}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={{ fontSize: 11, color: T.creamMut, display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>Task Name</label>
            <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Enter task name..." />
          </div>
          <div>
            <label style={{ fontSize: 11, color: T.creamMut, display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>Description</label>
            <Input value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} placeholder="Task description..." multiline />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, color: T.creamMut, display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>Status</label>
              <Select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                options={[{ value: "todo", label: "To Do" }, { value: "progress", label: "In Progress" }, { value: "done", label: "Done" }]} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: T.creamMut, display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>Priority</label>
              <Select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
                options={[{ value: "urgent", label: "Urgent" }, { value: "high", label: "High" }, { value: "medium", label: "Medium" }, { value: "low", label: "Low" }]} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 11, color: T.creamMut, display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>Due Date</label>
            <Input value={form.due} onChange={e => setForm(f => ({ ...f, due: e.target.value }))} placeholder="2024-04-30" />
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <Btn variant="primary" icon={<Save size={14} />} onClick={save} style={{ flex: 1 }}>
              {editTask ? "Save Changes" : "Create Task"}
            </Btn>
            <Btn variant="ghost" onClick={() => setModal(false)}>Cancel</Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}