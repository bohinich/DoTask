import { useState } from 'react'
import styles from './Card.module.css'

export default function Card({ children, style, delay = 0, hover = true }) {
  const [hov, setHov] = useState(false)
  
  return (
    <div
      className={`${styles.card} fade-up`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov && hover ? '#2a3c4a' : '#243340',
        borderColor: hov && hover ? 'rgba(254,85,22,0.18)' : 'rgba(232,217,187,0.07)',
        animationDelay: `${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}