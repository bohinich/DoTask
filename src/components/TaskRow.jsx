import { useState } from 'react'
import Badge from './Badge'
import PriorityDot from './PriorityDot'
import styles from './TaskRow.module.css'

export default function TaskRow({ task, compact = false, onEdit, onDelete }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      className={`${styles.taskRow} ${hov ? styles.hovered : ''}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className={styles.rowTop}>
        <PriorityDot priority={task.priority} />
        <span className={styles.taskName}>{task.name}</span>
        {!compact && hov && (
          <div className={styles.actionButtons}>
            {onEdit && <button className={styles.editBtn} onClick={() => onEdit(task)}>✎</button>}
            {onDelete && <button className={styles.deleteBtn} onClick={() => onDelete(task.id)}>🗑</button>}
          </div>
        )}
      </div>
      {!compact && (
        <>
          <div className={styles.taskDesc}>{task.desc}</div>
          <div className={styles.rowBottom}>
            <Badge status={task.status} />
            {compact && hov && (
              <div className={styles.actionButtons}>
                {onEdit && <button className={styles.editBtn} onClick={() => onEdit(task)}>✎</button>}
                {onDelete && <button className={styles.deleteBtn} onClick={() => onDelete(task.id)}>🗑</button>}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}