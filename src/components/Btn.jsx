import { useState } from 'react'
import styles from './Btn.module.css'

export default function Btn({ children, variant = "primary", onClick, style, icon, small = false }) {
  const [hov, setHov] = useState(false)

  const getVariantStyles = () => {
    switch(variant) {
      case 'primary':
        return {
          background: hov ? '#ff6a2e' : '#fe5516',
          color: '#fff',
          boxShadow: hov ? '0 6px 20px rgba(254,85,22,0.38)' : '0 4px 14px rgba(254,85,22,0.38)',
          transform: hov ? 'translateY(-1px)' : 'none',
        }
      case 'ghost':
        return {
          background: hov ? 'rgba(254,85,22,0.14)' : 'transparent',
          color: hov ? '#fe5516' : 'rgba(232,217,187,0.55)',
          border: `1px solid ${hov ? 'rgba(254,85,22,0.28)' : 'rgba(232,217,187,0.13)'}`,
        }
      case 'danger':
        return {
          background: hov ? 'rgba(255,60,60,0.2)' : 'rgba(255,60,60,0.1)',
          color: '#ff5555',
          border: '1px solid rgba(255,60,60,0.25)',
        }
      default:
        return {}
    }
  }

  return (
    <button
      className={`${styles.btn} ${small ? styles.small : ''}`}
      style={{ ...getVariantStyles(), ...style }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
    >
      {icon && icon}
      {children}
    </button>
  )
}