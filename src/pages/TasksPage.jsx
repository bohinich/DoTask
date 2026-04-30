import { useState } from 'react'
import { Plus, CalendarDays, Edit2, Trash2, LayoutGrid, List, CheckSquare } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Card from '../components/Card'
import Btn from '../components/Btn'
import IconBtn from '../components/IconBtn'
import Input from '../components/Input'
import CustomSelect from '../components/CustomSelect'
import Modal from '../components/Modal'
import Badge from '../components/Badge'
import PriorityDot from '../components/PriorityDot'
import { statusMeta, priorityMeta } from '../data/initialData'
import styles from './TasksPage.module.css'

function SortableTask({ task, onEdit, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: task.id,
    data: {
      type: 'task',
      status: task.status
    }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card style={{ padding: "12px 14px", cursor: "grab" }}>
        <div className={styles.boardCardTop}>
          <PriorityDot priority={task.priority} />
          <span className={styles.boardCardName}>{task.name}</span>
          <div className={styles.boardCardActions}>
            <button 
              className={styles.boardEditBtn} 
              onClick={(e) => { e.stopPropagation(); onEdit(task); }}
            >
              <Edit2 size={12} />
            </button>
            <button 
              className={styles.boardDeleteBtn} 
              onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>
        <div className={styles.boardCardDesc}>{task.desc}</div>
        <div className={styles.boardCardBottom}>
          {task.due && (
            <span className={styles.boardCardDue}>
              <CalendarDays size={10} style={{ marginRight: 4 }} />
              {task.due}
            </span>
          )}
        </div>
      </Card>
    </div>
  )
}

function DropZone({ status }) {
  const { setNodeRef, isOver } = useSortable({
    id: `dropzone-${status}`,
    data: {
      type: 'column',
      status: status,
    },
  })

  return (
    <div 
      ref={setNodeRef} 
      className={`${styles.dropZone} ${isOver ? styles.dropZoneOver : ''}`}
    />
  )
}

function Column({ status, label, tasks, onEdit, onDelete }) {
  const taskIds = tasks.map(t => t.id)

  return (
    <div className={styles.boardColumn}>
      <div className={styles.boardHeader}>
        <span className={styles.boardTitle}>{label}</span>
        <span className={styles.boardCount}>{tasks.length}</span>
      </div>
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div className={styles.boardCards}>
          {tasks.map(task => (
            <SortableTask key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      </SortableContext>
      <DropZone status={status} />
    </div>
  )
}

export default function TasksPage({ tasks, setTasks, searchQuery }) {
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("due")
  const [view, setView] = useState("list")
  const [modal, setModal] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [activeId, setActiveId] = useState(null)
  const [form, setForm] = useState({
    name: "", desc: "", status: "todo", priority: "medium", due: ""
  })

  const filteredBySearch = tasks.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.desc && t.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const visible = filteredBySearch
    .filter(t => filter === "all" || t.status === filter)
    .sort((a, b) => {
      if (sortBy === "due") return (a.due || "").localeCompare(b.due || "")
      if (sortBy === "priority") {
        const order = { urgent: 0, high: 1, medium: 2, low: 3 }
        return order[a.priority] - order[b.priority]
      }
      return a.name.localeCompare(b.name)
    })

  const getTasksByStatus = (status) => visible.filter(t => t.status === status)

  const openNew = () => {
    setEditTask(null)
    setForm({ name: "", desc: "", status: "todo", priority: "medium", due: "" })
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
      setTasks(prev => [...prev, { id: Date.now(), ...form }])
    }
    setModal(false)
  }

  const del = id => setTasks(prev => prev.filter(t => t.id !== id))

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveId(null)
    
    if (!over) return

    const taskId = active.id
    const draggedTask = tasks.find(t => t.id === taskId)
    if (!draggedTask) return

    let newStatus = null
    
    if (over.id?.toString().startsWith('dropzone-')) {
      newStatus = over.id.toString().replace('dropzone-', '')
    } else {
      const overTask = tasks.find(t => t.id === over.id)
      if (overTask) {
        newStatus = overTask.status
      }
    }

    if (newStatus && draggedTask.status !== newStatus) {
      setTasks(prev => prev.map(task =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      ))
    }
  }

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const statusOptions = [
    { value: "todo", label: "To Do" },
    { value: "progress", label: "In Progress" },
    { value: "done", label: "Done" }
  ]

  const priorityOptions = [
    { value: "urgent", label: "Urgent" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" }
  ]

  const sortOptions = [
    { value: "due", label: "Sort: Due" },
    { value: "priority", label: "Sort: Priority" },
    { value: "name", label: "Sort: Name" }
  ]

  const activeTask = tasks.find(t => t.id === activeId)

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
          <CustomSelect 
            value={sortBy} 
            onChange={setSortBy} 
            options={sortOptions}
            placeholder="Sort"
          />
          <IconBtn icon={view === "list" ? LayoutGrid : List} onClick={() => setView(view === "list" ? "board" : "list")} />
          <Btn variant="primary" icon={<Plus size={14} />} onClick={openNew}>New Task</Btn>
        </div>
      </div>

      {tasks.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <CheckSquare size={48} strokeWidth={1.5} />
          </div>
          <div className={styles.emptyTitle}>No tasks</div>
          <div className={styles.emptyText}>Click "New Task" to create your first task</div>
          <Btn variant="primary" onClick={openNew}>Create Task</Btn>
        </div>
      )}

      {tasks.length > 0 && view === "list" && (
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
                  {t.due && (
                    <span className={styles.listItemDue}>
                      <CalendarDays size={10} style={{ marginRight: 4, verticalAlign: "middle" }} />
                      {t.due}
                    </span>
                  )}
                  <IconBtn icon={Edit2} onClick={() => openEdit(t)} />
                  <IconBtn icon={Trash2} onClick={() => del(t.id)} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tasks.length > 0 && view === "board" && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className={styles.boardView}>
            <Column 
              status="todo" 
              label="To Do" 
              tasks={getTasksByStatus('todo')} 
              onEdit={openEdit} 
              onDelete={del} 
            />
            <Column 
              status="progress" 
              label="In Progress" 
              tasks={getTasksByStatus('progress')} 
              onEdit={openEdit} 
              onDelete={del} 
            />
            <Column 
              status="done" 
              label="Done" 
              tasks={getTasksByStatus('done')} 
              onEdit={openEdit} 
              onDelete={del} 
            />
          </div>
          <DragOverlay dropAnimation={null}>
            {activeTask ? (
              <Card style={{ padding: "12px 14px", opacity: 0.8, cursor: "grabbing", background: "#2a3c4a" }}>
                <div className={styles.boardCardTop}>
                  <PriorityDot priority={activeTask.priority} />
                  <span className={styles.boardCardName}>{activeTask.name}</span>
                </div>
                <div className={styles.boardCardDesc}>{activeTask.desc}</div>
              </Card>
            ) : null}
          </DragOverlay>
        </DndContext>
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
              <CustomSelect value={form.status} onChange={val => setForm(f => ({ ...f, status: val }))} options={statusOptions} />
            </div>
            <div>
              <label className={styles.modalLabel}>Priority</label>
              <CustomSelect value={form.priority} onChange={val => setForm(f => ({ ...f, priority: val }))} options={priorityOptions} />
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