import styles from './Avatar.module.css'

export default function Avatar({ initial, size = 32, glow = false }) {
  return (
    <div 
      className={`${styles.avatar} ${glow ? styles.glow : ''}`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {initial}
    </div>
  )
}