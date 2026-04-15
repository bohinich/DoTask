import { priorityMeta } from '../data/initialData'
import styles from './PriorityDot.module.css'

export default function PriorityDot({ priority }) {
  const color = priorityMeta[priority]?.color || "#ccc"
  return <span className={styles.dot} style={{ background: color }} />
}