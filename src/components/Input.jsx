import { useState } from 'react'
import styles from './Input.module.css'

export default function Input({ value, onChange, placeholder, multiline = false, style }) {
  const [foc, setFoc] = useState(false)

  const className = `${styles.input} ${foc ? styles.focused : ''} ${multiline ? styles.multiline : ''}`

  if (multiline) {
    return (
      <textarea
        className={className}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFoc(true)}
        onBlur={() => setFoc(false)}
        style={style}
      />
    )
  }

  return (
    <input
      className={className}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={() => setFoc(true)}
      onBlur={() => setFoc(false)}
      style={style}
    />
  )
}