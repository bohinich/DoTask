import { useState } from 'react'
import styles from './IconBtn.module.css'

export default function IconBtn({ icon: Icon, onClick, active = false, tooltip = "" }) {
  const [hov, setHov] = useState(false)

  return (
    <button
      title={tooltip}
      className={`${styles.iconBtn} ${(active || hov) ? styles.active : ''}`}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <Icon size={15} />
    </button>
  )
}