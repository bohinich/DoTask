import { useState } from 'react'
import { ChevronLeft, ChevronRight, X, Plus } from 'lucide-react'
import Card from '../components/Card'
import Btn from '../components/Btn'
import Input from '../components/Input'
import styles from './CalendarPage.module.css'

export default function CalendarPage({ events, setEvents }) {
  const [month, setMonth] = useState(new Date(2024, 3, 1))
  const [selected, setSelected] = useState(null)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ title: "", time: "09:00", color: "#fe5516" })

  const start = new Date(month.getFullYear(), month.getMonth(), 1).getDay()
  const total = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const prevTotal = new Date(month.getFullYear(), month.getMonth(), 0).getDate()

  const cells = Array.from({ length: 42 }, (_, i) => {
    const d = i - start + 1
    if (d < 1) return { day: prevTotal + d, cur: false }
    if (d > total) return { day: d - total, cur: false }
    return { day: d, cur: true }
  })

  const monthStr = month.toLocaleString("default", { month: "long", year: "numeric" })
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const eventsOn = (day) => {
    const key = `2024-04-${String(day).padStart(2, "0")}`
    return events.filter(e => e.date === key)
  }

  const addEvent = () => {
    if (!form.title.trim() || !selected) return
    const key = `2024-04-${String(selected).padStart(2, "0")}`
    setEvents(prev => [...prev, { id: Date.now(), date: key, title: form.title, time: form.time, color: form.color }])
    setModal(false)
    setForm({ title: "", time: "09:00", color: "#fe5516" })
  }

  const delEvent = id => setEvents(prev => prev.filter(e => e.id !== id))

  return (
    <div className={styles.calendarPage}>
      <div className={`${styles.header} fade-up`}>
        <div className={styles.title}>Calendar</div>
        <div className={styles.nav}>
          <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}>
            <ChevronLeft size={14} />
          </button>
          <span className={styles.month}>{monthStr}</span>
          <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <Card delay={0.06} style={{ padding: 0, overflow: "hidden" }}>
        <div className={styles.calendarGrid}>
          {weekdays.map(d => (
            <div key={d} className={styles.weekday}>{d}</div>
          ))}
          {cells.map(({ day, cur }, i) => {
            const evs = cur ? eventsOn(day) : []
            const isSel = selected === day && cur
            const isToday = cur && day === 15
            return (
              <div
                key={i}
                className={`${styles.calendarCell} ${cur ? styles.cur : styles.prevNext} ${isSel ? styles.selected : ''} ${isToday ? styles.today : ''}`}
                onClick={() => cur && setSelected(day)}
              >
                <div className={`${styles.dayNumber} ${isToday ? styles.todayNumber : ''}`}>
                  {day}
                </div>
                {evs.map(e => (
                  <div key={e.id} className={styles.event} style={{ background: `${e.color}22`, borderColor: `${e.color}55`, borderLeftColor: e.color }}>
                    <span className={styles.eventTitle}>{e.title}</span>
                    <button className={styles.eventDelete} onClick={ev => { ev.stopPropagation(); delEvent(e.id) }}>
                      <X size={8} />
                    </button>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </Card>

      {selected && (
        <Card delay={0} style={{ padding: "16px 20px", marginTop: 14 }}>
          <div className={styles.addEventSection}>
            <span className={styles.addEventLabel}>Add event on April {selected}</span>
            <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Event title" style={{ width: 200 }} />
            <Input value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} placeholder="Time" style={{ width: 100 }} />
            <input type="color" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} className={styles.colorPicker} />
            <Btn variant="primary" small icon={<Plus size={13} />} onClick={addEvent}>Add</Btn>
          </div>
        </Card>
      )}
    </div>
  )
}