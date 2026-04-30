import { useState } from 'react'
import { LogOut, User, Settings } from 'lucide-react'
import styles from './Avatar.module.css'

export default function Avatar({ initial, size = 32, glow = false }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('dotask_tasks')
    localStorage.removeItem('dotask_events')
    window.location.reload()
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.avatar} ${glow ? styles.glow : ''}`}
        style={{ width: size, height: size, fontSize: size * 0.36 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {initial}
      </div>
      
      {isOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsOpen(false)} />
          <div className={styles.dropdown}>
            <div className={styles.dropdownItem}>
              <User size={14} />
              <span>Profile</span>
            </div>
            <div className={styles.dropdownItem}>
              <Settings size={14} />
              <span>Settings</span>
            </div>
            <div className={styles.divider} />
            <div className={`${styles.dropdownItem} ${styles.logout}`} onClick={handleLogout}>
              <LogOut size={14} />
              <span>Logout</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}