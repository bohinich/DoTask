import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './pages/Dashboard'
import TasksPage from './pages/TasksPage'
import AIPage from './pages/AIPage'
import CalendarPage from './pages/CalendarPage'
import AnalyticsPage from './pages/AnalyticsPage'
import SettingsPage from './pages/SettingsPage'
import { INIT_TASKS, INIT_EVENTS } from './data/initialData'
import styles from './App.module.css'

export default function App() {
  const [page, setPage] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobile, setIsMobile] = useState(false)

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('dotask_tasks')
    return saved ? JSON.parse(saved) : INIT_TASKS
  })

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('dotask_events')
    return saved ? JSON.parse(saved) : INIT_EVENTS
  })

  useEffect(() => {
    localStorage.setItem('dotask_tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('dotask_events', JSON.stringify(events))
  }, [events])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const pages = {
    dashboard: <Dashboard tasks={tasks} setPage={setPage} searchQuery={searchQuery} />,
    tasks: <TasksPage tasks={tasks} setTasks={setTasks} searchQuery={searchQuery} />,
    ai: <AIPage tasks={tasks} />,
    calendar: <CalendarPage events={events} setEvents={setEvents} />,
    analytics: <AnalyticsPage tasks={tasks} />,
    settings: <SettingsPage />,
  }

  return (
    <div className={styles.app}>
      <Sidebar page={page} setPage={setPage} />
      <div className={styles.main}>
        {!isMobile && <Topbar onSearch={setSearchQuery} />}
        {pages[page]}
      </div>
    </div>
  )
}