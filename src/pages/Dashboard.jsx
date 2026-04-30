import { useState } from 'react'
import { Inbox, Clock, CheckCircle2, Target, Plus, Activity, MoreHorizontal, Sparkles, ArrowRight, Search } from 'lucide-react'
import Card from '../components/Card'
import Btn from '../components/Btn'
import TaskRow from '../components/TaskRow'
import Badge from '../components/Badge'
import { hexToRgb } from '../utils/helpers'
import styles from './Dashboard.module.css'

function MiniCalendar() {
  const [month, setMonth] = useState(new Date())
  const today = new Date().getDate()
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  const days = ["S", "M", "T", "W", "T", "F", "S"]
  const start = new Date(month.getFullYear(), month.getMonth(), 1).getDay()
  const total = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cells = Array.from({ length: 42 }, (_, i) => {
    const d = i - start + 1
    return d > 0 && d <= total ? d : null
  })
  
  const monthName = month.toLocaleString("en-US", { month: "long", year: "numeric" })

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
        {cells.map((d, i) => {
          const isToday = d === today && 
            month.getMonth() === currentMonth && 
            month.getFullYear() === currentYear
          return (
            <div key={i} className={`${styles.calendarDay} ${isToday ? styles.today : ''}`}>
              {d}
            </div>
          )
        })}
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
      className={`${styles.newTaskBanner} ${hov ? styles.hovered : ''}`}
    >
      <div className={styles.bannerContent}>
        <div className={styles.pulseRing}>
          <Plus size={20} color="#fe5516" />
        </div>
        <span>Create New Task</span>
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
          <div className={styles.widgetIcon}>
            <Activity size={13} color="#fe5516" />
            <div className={styles.iconPulse} />
          </div>
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

export default function Dashboard({ tasks, setPage, searchQuery = "" }) {
  const filteredTasks = searchQuery 
    ? tasks.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.desc && t.desc.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : tasks

  const todo = filteredTasks.filter(t => t.status === "todo").length
  const progress = filteredTasks.filter(t => t.status === "progress").length
  const done = filteredTasks.filter(t => t.status === "done").length
  const total = filteredTasks.length
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)

  if (tasks.length === 0) {
    return (
      <div className={styles.dashboard}>
        <Card delay={0}>
          <div className={styles.welcomeCard}>
            <div className={styles.welcomeIcon}>
              <div className={styles.orbitRing}>
                <div className={styles.orbitDot} />
                <div className={styles.orbitDot2} />
                <div className={styles.orbitDot3} />
              </div>
              <Sparkles size={32} strokeWidth={1.5} />
            </div>
            <h3 className={styles.welcomeTitle}>Welcome to DoTask!</h3>
            <p className={styles.welcomeText}>
              Your personal task manager. Start by creating your first task.
            </p>
            <ul className={styles.welcomeList}>
              <li>
                <div className={styles.listBullet} />
                Create tasks with priorities and deadlines
                <div className={styles.listLine} />
              </li>
              <li>
                <div className={styles.listBullet} />
                Track progress: To Do → In Progress → Done
                <div className={styles.listLine} />
              </li>
              <li>
                <div className={styles.listBullet} />
                View analytics of your productivity
                <div className={styles.listLine} />
              </li>
              <li>
                <div className={styles.listBullet} />
                Plan events in the calendar
                <div className={styles.listLine} />
              </li>
            </ul>
            <Btn variant="primary" onClick={() => setPage("tasks")}>
              Create First Task
              <ArrowRight size={14} style={{ marginLeft: 8 }} />
            </Btn>
          </div>
        </Card>
      </div>
    )
  }

  if (total === 0 && searchQuery) {
    return (
      <div className={styles.dashboard}>
        <Card delay={0}>
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>
              <div className={styles.searchPulse} />
              <Search size={48} strokeWidth={1.5} />
            </div>
            <h3 className={styles.noResultsTitle}>No results found</h3>
            <p className={styles.noResultsText}>
              No tasks found for "{searchQuery}". Try a different search term.
            </p>
            <Btn variant="ghost" onClick={() => window.location.reload()}>
              Clear search
            </Btn>
          </div>
        </Card>
      </div>
    )
  }

  const recentTasks = filteredTasks.slice(0, 3)
  const inProgressTasks = filteredTasks.filter(t => t.status === "progress").slice(0, 2)

  const stats = [
    { label: "Total Tasks", value: total, icon: Inbox, color: "#e8d9bb" },
    { label: "In Progress", value: progress, icon: Clock, color: "#fe5516" },
    { label: "Completed", value: done, icon: CheckCircle2, color: "#00c878" },
    { label: "Completion", value: `${pct}%`, icon: Target, color: "#4f8ef7" },
  ]

  return (
    <div className={styles.dashboard}>
      {searchQuery && (
        <div className={styles.searchInfo}>
          <div className={styles.searchInfoDot} />
          Search results: "{searchQuery}" — found {total} tasks
        </div>
      )}

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
              <div className={styles.sectionTitle}>Recent Tasks</div>
              <div className={styles.sectionCount}>{recentTasks.length} tasks</div>
            </div>
            <Btn variant="ghost" small icon={<Plus size={13} />} onClick={() => setPage("tasks")}>Add</Btn>
          </div>
          <div className={styles.taskList}>
            {recentTasks.map((t, i) => (
              <div key={t.id} className={styles.taskItem} style={{ animationDelay: `${i * 0.1}s` }}>
                <TaskRow task={t} compact />
              </div>
            ))}
          </div>
          {recentTasks.length === 0 && searchQuery && (
            <div className={styles.emptyTasks}>No tasks found</div>
          )}
        </Card>

        <Card delay={0.3}>
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionTitle}>In Progress</div>
              <div className={styles.sectionCount}>{inProgressTasks.length} tasks</div>
            </div>
            <Btn variant="ghost" small icon={<Plus size={13} />} onClick={() => setPage("tasks")}>Add</Btn>
          </div>
          <div className={styles.taskList}>
            {inProgressTasks.map((t, i) => (
              <div key={t.id} className={styles.taskItem} style={{ animationDelay: `${i * 0.1}s` }}>
                <TaskRow task={t} compact />
              </div>
            ))}
          </div>
          {inProgressTasks.length === 0 && searchQuery && (
            <div className={styles.emptyTasks}>No tasks in progress</div>
          )}
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