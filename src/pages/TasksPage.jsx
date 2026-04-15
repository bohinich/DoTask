import { useState } from 'react'
import { Plus, CalendarDays, Edit2, Trash2, Layers, CheckSquare } from 'lucide-react'
import Card from '../components/Card'
import Btn from '../components/Btn'
import IconBtn from '../components/IconBtn'
import Input from '../components/Input'
import Select from '../components/Select'
import Modal from '../components/Modal'
import Badge from '../components/Badge'
import PriorityDot from '../components/PriorityDot'
import Avatar from '../components/Avatar'
import { statusMeta } from '../data/initialData'
import styles from './TasksPage.module.css'

export default function TasksPage({ tasks, setTasks }) {
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("due")
  const [view, setView] = useState("list")
  const [modal, setModal] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [form, setForm] = useState({
    name: "", desc: "", status: "todo", priority: "medium", due: "", assignee: "AK"
  })

  const openNew = () => {
    setEditTask(null)
    setForm({ name: "", desc: "", status: "todo", priority: "medium", due: "", assignee: "AK" })
    setModal(true)
  }

  const openEdit = (task) => {
    setEditTask(task)
    setForm(task)
    setModal(true)
  }

  const save = () => {
    if (!form.name.trim()) return
    if (editTask) {
      setTasks(prev => prev.map(t => t.id === editTask.id ? { ...t, ...form } : t))
    } else {
      setTasks(prev => [...prev, { id: Date.now(), assignee: "AK", ...form }])
    }
    setModal(false)
  }

  const del = id => setTasks(prev => prev.filter(t => t.id !== id))

  const visible = tasks
    .filter(t => filter === "all" || t.status === filter)
    .sort((a, b) => {
      if (sortBy === "due") return (a.due || "").localeCompare(b.due || "")
      if (sortBy === "priority") {
        const order = { urgent: 0, high: 1, medium: 2, low: 3 }
        return order[a.priority] - order[b.priority]
      }
      return a.name.localeCompare(b.name)
    })

  const byStatus = s => visible.filter(t => t.status === s)

  return (
    <div className={styles.tasksPage}>
      <div className={`${styles.toolbar} fade-up`}>
        <div className={styles.pageTitle}>Tasks</div>
        <div className={styles.filterGroup}>
          {["all", "todo", "progress", "done"].map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : statusMeta[f].label}
            </button>
          ))}
        </div>
        <div className={styles.rightToolbar}>
          <Select 
            value={sortBy} 
            onChange={e => setSortBy(e.target.value)} 
            style={{ width: "auto", padding: "7px 10px", fontSize: 12 }}
            options={[
              { value: "due", label: "Sort: Due" },
              { value: "priority", label: "Sort: Priority" },
              { value: "name", label: "Sort: Name" }
            ]}
          />
          <IconBtn icon={view === "list" ? Layers : CheckSquare} onClick={() => setView(view === "list" ? "board" : "list")} />
          <Btn variant="primary" icon={<Plus size={14} />} onClick={openNew}>New Task</Btn>
        </div>
      </div>

      {view === "list" ? (
        <div className={styles.listView}>
          {visible.map((t, i) => (
            <Card key={t.id} delay={i * 0.03} style={{ padding: "13px 16px" }}>
              <div className={styles.listItem}>
                <PriorityDot priority={t.priority} />
                <div className={styles.listItemContent}>
                  <div className={styles.listItemName}>{t.name}</div>
                  <div className={styles.listItemDesc}>{t.desc}</div>
                </div>
                <div className={styles.listItemActions}>
                  <Badge status={t.status} />
                  <span className={styles.listItemDue}>
                    {t.due && <><CalendarDays size={10} style={{ marginRight: 4, verticalAlign: "middle" }} />{t.due}</>}
                  </span>
                  <Avatar initial={t.assignee} size={26} />
                  <IconBtn icon={Edit2} onClick={() => openEdit(t)} tooltip="Edit" />
                  <IconBtn icon={Trash2} onClick={() => del(t.id)} tooltip="Delete" />
                </div>
              </div>
            </Card>
          ))}
          {visible.length === 0 && (
            <div className={styles.emptyState}>No tasks found</div>
          )}
        </div>
      ) : (
        <div className={styles.boardView}>
          {["todo", "progress", "done"].map(s => (
            <div key={s} className={styles.boardColumn}>
              <div className={styles.boardHeader}>
                <span className={styles.boardTitle}>{statusMeta[s].label}</span>
                <span className={styles.boardCount}>{byStatus(s).length}</span>
              </div>
              <div className={styles.boardCards}>
                {byStatus(s).map(t => (
                  <Card key={t.id} style={{ padding: "12px 14px" }}>
                    <div className={styles.boardCardTop}>
                      <PriorityDot priority={t.priority} />
                      <span className={styles.boardCardName}>{t.name}</span>
                      <button className={styles.boardEditBtn} onClick={() => openEdit(t)}>✎</button>
                      <button className={styles.boardDeleteBtn} onClick={() => del(t.id)}>🗑</button>
                    </div>
                    <div className={styles.boardCardDesc}>{t.desc}</div>
                    <div className={styles.boardCardBottom}>
                      {t.due && <span className={styles.boardCardDue}>{t.due}</span>}
                      <Avatar initial={t.assignee} size={22} />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={editTask ? "Edit Task" : "New Task"}>
        <div className={styles.modalForm}>
          <div>
            <label className={styles.modalLabel}>Task Name</label>
            <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Enter task name" />
          </div>
          <div>
            <label className={styles.modalLabel}>Description</label>
            <Input value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} placeholder="Enter description" multiline />
          </div>
          <div className={styles.modalRow}>
            <div>
              <label className={styles.modalLabel}>Status</label>
              <Select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} 
                options={[{ value: "todo", label: "To Do" }, { value: "progress", label: "In Progress" }, { value: "done", label: "Done" }]} />
            </div>
            <div>
              <label className={styles.modalLabel}>Priority</label>
              <Select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))} 
                options={[{ value: "urgent", label: "Urgent" }, { value: "high", label: "High" }, { value: "medium", label: "Medium" }, { value: "low", label: "Low" }]} />
            </div>
          </div>
          <div>
            <label className={styles.modalLabel}>Due Date</label>
            <Input value={form.due} onChange={e => setForm(f => ({ ...f, due: e.target.value }))} placeholder="YYYY-MM-DD" />
          </div>
          <div className={styles.modalButtons}>
            <Btn variant="primary" icon={<Plus size={14} />} onClick={save}>{editTask ? "Save Changes" : "Create Task"}</Btn>
            <Btn variant="ghost" onClick={() => setModal(false)}>Cancel</Btn>
          </div>
        </div>
      </Modal>
    </div>
  )
}