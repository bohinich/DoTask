import styles from './Select.module.css'

export default function Select({ value, onChange, options, style }) {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={onChange}
      style={style}
    >
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}