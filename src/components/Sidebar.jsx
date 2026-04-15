import { LayoutDashboard, CheckSquare, Bot, CalendarDays, BarChart2, Settings, Layers, Users, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import styles from './Sidebar.module.css'

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "tasks", label: "Tasks", Icon: CheckSquare },
  { id: "ai", label: "AI Assistant", Icon: Bot },
  { id: "calendar", label: "Calendar", Icon: CalendarDays },
  { id: "analytics", label: "Analytics", Icon: BarChart2 },
  { id: "settings", label: "Settings", Icon: Settings },
]

function NavItem({ active, Icon, label, onClick, chevron }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      className={`${styles.navItem} ${(active || hov) ? styles.active : ''}`}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ color: active ? '#fe5516' : hov ? '#e8d9bb' : 'rgba(232,217,187,0.55)' }}
    >
      {active && <div className={styles.activeIndicator} />}
      <Icon size={15} className={styles.navIcon} />
      <span className={styles.navLabel}>{label}</span>
      {chevron && <ChevronRight size={13} className={styles.chevron} />}
    </div>
  )
}

export default function Sidebar({ page, setPage }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.accentLine} />
      
      <div className={styles.logoSection}>
        <div className={styles.logoIcon}>
          <Layers size={18} color="#fff" />
        </div>
        <span className={styles.logoText}>Task Manager</span>
      </div>

      <div className={styles.navSection}>
        <span className={styles.sectionTitle}>MAIN</span>
        {NAV_ITEMS.map(item => (
          <NavItem
            key={item.id}
            active={page === item.id}
            Icon={item.Icon}
            label={item.label}
            onClick={() => setPage(item.id)}
          />
        ))}
        
        <span className={`${styles.sectionTitle} ${styles.teamsTitle}`}>TEAMS</span>
        <NavItem Icon={Users} label="Product" onClick={() => {}} chevron />
      </div>
    </aside>
  )
}