import { Search, X } from 'lucide-react'
import { useState, useRef } from 'react'
import Avatar from './Avatar'
import styles from './Topbar.module.css'

export default function Topbar({ onSearch }) {
  const [search, setSearch] = useState("")
  const inputRef = useRef(null)

  const handleSearch = (value) => {
    setSearch(value)
    if (onSearch) onSearch(value)
  }

  const handleBlur = () => {
    // Очищаємо пошук при втраті фокусу
    setSearch("")
    if (onSearch) onSearch("")
  }

  const clearSearch = () => {
    setSearch("")
    if (onSearch) onSearch("")
    inputRef.current?.focus()
  }

  return (
    <header className={styles.topbar}>
      <div className={styles.searchContainer}>
        <Search size={14} className={styles.searchIcon} />
        <input
          ref={inputRef}
          value={search}
          onChange={e => handleSearch(e.target.value)}
          onBlur={handleBlur}
          placeholder="Search..."
          className={styles.searchInput}
        />
        {search && (
          <button className={styles.clearBtn} onClick={clearSearch}>
            <X size={12} />
          </button>
        )}
      </div>
      <div className={styles.rightSection}>
        <Avatar initial="U" size={34} />
      </div>
    </header>
  )
}