import { statusMeta } from '../data/initialData'
import styles from './Badge.module.css'

export default function Badge({ status }) {
  const m = statusMeta[status]
  return (
    <span 
      className={styles.badge}
      style={{ color: m.color, background: m.bg, borderColor: `${m.color}33` }}
    >
      {m.label}
    </span>
  )
}