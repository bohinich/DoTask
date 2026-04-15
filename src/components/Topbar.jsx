import { Search, Bell, Zap } from 'lucide-react'
import { useState } from 'react'
import IconBtn from './IconBtn'
import Avatar from './Avatar'
import styles from './Topbar.module.css'

export default function Topbar({ tasks }) {
  const [search, setSearch] = useState("")
  const pending = tasks.filter(t => t.status !== "done").length

  return (
    <header className={styles.topbar}>
      <div className={styles.searchContainer}>
        <Search size={14} className={styles.searchIcon} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className={styles.searchInput}
        />
      </div>
      <div className={styles.rightSection}>
        <div className={styles.notificationWrapper}>
          <IconBtn icon={Bell} tooltip="Notifications" />
          {pending > 0 && (
            <span className={styles.badge}>{pending}</span>
          )}
        </div>
        <IconBtn icon={Zap} tooltip="Quick actions" />
        <Avatar initial="AK" size={34} glow />
      </div>
    </header>
  )
}