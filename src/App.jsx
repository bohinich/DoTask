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
  const [tasks, setTasks] = useState(INIT_TASKS)
  const [events, setEvents] = useState(INIT_EVENTS)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const pages = {
    dashboard: <Dashboard tasks={tasks} setPage={setPage} />,
    tasks: <TasksPage tasks={tasks} setTasks={setTasks} />,
    ai: <AIPage tasks={tasks} />,
    calendar: <CalendarPage events={events} setEvents={setEvents} />,
    analytics: <AnalyticsPage tasks={tasks} />,
    settings: <SettingsPage />,
  }

  return (
    <div className={styles.app}>
      <Sidebar page={page} setPage={setPage} />
      <div className={styles.main}>
        {!isMobile && <Topbar page={page} tasks={tasks} />}
        {pages[page]}
      </div>
    </div>
  )
}