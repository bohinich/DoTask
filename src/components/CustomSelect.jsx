import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import styles from './CustomSelect.module.css'

export default function CustomSelect({ value, onChange, options, placeholder }) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selected = options.find(opt => opt.value === value)

  return (
    <div className={styles.customSelect} ref={ref}>
      <button 
        className={styles.selectButton} 
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected ? selected.label : placeholder}
        <ChevronDown size={14} className={`${styles.chevron} ${isOpen ? styles.open : ''}`} />
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {options.map(opt => (
            <div
              key={opt.value}
              className={`${styles.option} ${opt.value === value ? styles.selected : ''}`}
              onClick={() => {
                onChange(opt.value)
                setIsOpen(false)
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}