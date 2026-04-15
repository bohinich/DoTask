import { useState } from 'react'
import { Inbox, Clock, CheckCircle2, Target, Plus, Activity, MoreHorizontal } from 'lucide-react'
import Card from '../components/Card'
import Btn from '../components/Btn'
import TaskRow from '../components/TaskRow'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'
import { hexToRgb } from '../utils/helpers'
import styles from './Dashboard.module.css'

function MiniCalendar() {
  const [month, setMonth] = useState(new Date(2024, 3, 1))
  const today = 15
  const days = ["S", "M", "T", "W", "T", "F", "S"]
  const start = new Date(month.getFullYear(), month.getMonth(), 1).getDay()
  const total = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cells = Array.from({ length: 42 }, (_, i) => {
    const d = i - start + 1
    return d > 0 && d <= total ? d : null
  })
  const hasEvent = [3, 10, 17, 22, 25]
  const monthName = month.toLocaleString("default", { month: "long", year: "numeric" })

  return (
    <Card delay={0.36} style={{ gridRow: "span 1" }}>
      <div className={styles.calendarHeader}>
        <span className={styles.calendarMonth}>{monthName}</span>
        <div className={styles.calendarNav}>
          <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}>◀</button>
          <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>▶</button>
        </div>
      </div>
      <div className={styles.calendarGrid}>
        {days.map((d, i) => (
          <div key={i} className={styles.calendarWeekday}>{d}</div>
        ))}
        {cells.map((d, i) => (
          <div key={i} className={`${styles.calendarDay} ${d === today ? styles.today : ''}`}>
            {d}
            {d && hasEvent.includes(d) && d !== today && <span className={styles.eventDot} />}
          </div>
        ))}
      </div>
    </Card>
  )
}

function NewTaskBanner({ onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => setHov(true)} 
      onMouseLeave={() => setHov(false)}
      className={`${styles.newTaskBanner} fade-up ${hov ? styles.hovered : ''}`}
    >
      <div className={styles.bannerContent}>
        <Plus size={20} color="#fe5516" />
        Create New Task
      </div>
      <Btn variant="primary" icon={<Plus size={14} />}>New Task</Btn>
    </div>
  )
}

function AnalyticsWidget({ todo, progress, done, pct }) {
  const r = 34, circ = 2 * Math.PI * r
  const offset = circ * (1 - pct / 100)
  
  return (
    <Card delay={0.48} className={styles.analyticsWidget}>
      <div className={styles.widgetHeader}>
        <div className={styles.widgetTitle}>
          <div className={styles.widgetIcon}><Activity size={13} color="#fe5516" /></div>
          Analytics
        </div>
        <MoreHorizontal size={16} color="rgba(232,217,187,0.55)" style={{ cursor: "pointer" }} />
      </div>
      <div className={styles.widgetContent}>
        <div className={styles.statsList}>
          {[
            { label: "To Do", val: todo, dot: "rgba(232,217,187,0.55)" },
            { label: "In Progress", val: progress, dot: "#fe5516" },
            { label: "Completed", val: done, dot: "#00c878" },
          ].map(({ label, val, dot }) => (
            <div key={label} className={styles.statRow}>
              <div className={styles.statLabel}>
                <span className={styles.statDot} style={{ background: dot }} />
                {label}
              </div>
              <span className={styles.statValue}>{val}</span>
            </div>
          ))}
        </div>
        <div className={styles.chartContainer}>
          <svg width="90" height="90" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(232,217,187,0.08)" strokeWidth="6" />
            <circle cx="45" cy="45" r={r} fill="none" stroke="#fe5516" strokeWidth="6" 
              strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
              style={{ filter: "drop-shadow(0 0 6px rgba(254,85,22,0.38))", transition: "stroke-dashoffset 0.6s ease" }} />
          </svg>
          <div className={styles.chartLabel}>
            <span className={styles.chartPercent}>{pct}%</span>
            <span className={styles.chartText}>Complete</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function Dashboard({ tasks, setPage }) {
  const todo = tasks.filter(t => t.status === "todo").length
  const progress = tasks.filter(t => t.status === "progress").length
  const done = tasks.filter(t => t.status === "done").length
  const total = tasks.length
  const pct = Math.round((done / total) * 100)

  const myTasks = tasks.filter(t => t.assignee === "AK").slice(0, 3)
  const inProgress = tasks.filter(t => t.status === "progress").slice(0, 2)

  const stats = [
    { label: "Total Tasks", value: total, icon: Inbox, color: "#e8d9bb" },
    { label: "In Progress", value: progress, icon: Clock, color: "#fe5516" },
    { label: "Completed", value: done, icon: CheckCircle2, color: "#00c878" },
    { label: "Completion", value: `${pct}%`, icon: Target, color: "#4f8ef7" },
  ]

  return (
    <div className={styles.dashboard}>
      <div className={styles.statsGrid}>
        {stats.map(({ label, value, icon: Icon, color }, i) => (
          <Card key={label} delay={i * 0.06}>
            <div className={styles.statCard}>
              <div>
                <div className={styles.statLabel}>{label}</div>
                <div className={styles.statNumber} style={{ color }}>{value}</div>
              </div>
              <div className={styles.statIcon} style={{ background: `rgba(${hexToRgb(color)}, 0.1)` }}>
                <Icon size={17} color={color} />
              </div>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${Math.min(100, (value / total) * 100)}%`, background: color }} />
            </div>
          </Card>
        ))}
      </div>

      <div className={styles.mainGrid}>
        <Card delay={0.24}>
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionTitle}>My Tasks</div>
              <div className={styles.sectionCount}>{myTasks.length} tasks</div>
            </div>
            <Btn variant="ghost" small icon={<Plus size={13} />} onClick={() => setPage("tasks")}>Add</Btn>
          </div>
          {myTasks.map(t => <TaskRow key={t.id} task={t} compact />)}
        </Card>

        <Card delay={0.3}>
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionTitle}>In Progress</div>
              <div className={styles.sectionCount}>{inProgress.length} tasks</div>
            </div>
            <Btn variant="ghost" small icon={<Plus size={13} />} onClick={() => setPage("tasks")}>Add</Btn>
          </div>
          {inProgress.map((t, i) => (
            <div key={t.id} style={{ marginBottom: i < inProgress.length - 1 ? 8 : 0 }}>
              {i === 0 && <div style={{ marginBottom: 6 }}><Badge status="progress" /></div>}
              <TaskRow task={t} compact />
            </div>
          ))}
        </Card>

        <MiniCalendar />
      </div>

      <div className={styles.bottomGrid}>
        <NewTaskBanner onClick={() => setPage("tasks")} />
        <AnalyticsWidget todo={todo} progress={progress} done={done} pct={pct} />
      </div>
    </div>
  )
}