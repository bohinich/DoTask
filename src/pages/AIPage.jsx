import { useState, useEffect, useRef } from 'react'
import { Bot, Send } from 'lucide-react'
import Btn from '../components/Btn'
import Avatar from '../components/Avatar'
import { AI_INIT } from '../data/initialData'
import styles from './AIPage.module.css'

export default function AIPage({ tasks }) {
  const [messages, setMessages] = useState(AI_INIT)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput("")
    setMessages(m => [...m, { role: "user", text: userMsg }])
    setLoading(true)

    setTimeout(() => {
      const reply = `Ось що я знаю про ваші задачі: всього ${tasks.length} задач. З них ${tasks.filter(t => t.status === "done").length} виконано, ${tasks.filter(t => t.status === "progress").length} в роботі, ${tasks.filter(t => t.status === "todo").length} заплановано.`
      setMessages(m => [...m, { role: "assistant", text: reply }])
      setLoading(false)
    }, 1000)
  }

  const suggestions = [
    "Які задачі мають найвищий пріоритет?",
    "Скільки задач в роботі?",
    "Покажи summary по проектам",
    "Що потрібно завершити сьогодні?",
  ]

  return (
    <div className={styles.aiPage}>
      <div className={`${styles.header} fade-up`}>
        <div className={styles.titleSection}>
          <div className={styles.iconWrapper}>
            <Bot size={19} color="#fe5516" />
          </div>
          <div>
            <div className={styles.title}>AI Assistant</div>
            <div className={styles.subtitle}>Powered by Claude · Knowledge base: {tasks.length} tasks</div>
          </div>
        </div>
        <div className={styles.status}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>Online</span>
        </div>
      </div>

      <div className={styles.messagesContainer}>
        {messages.map((msg, i) => (
          <div key={i} className={`${styles.messageRow} ${msg.role === 'user' ? styles.userRow : styles.assistantRow}`}>
            {msg.role === "assistant" && (
              <div className={styles.assistantAvatar}>
                <Bot size={15} color="#fe5516" />
              </div>
            )}
            <div className={`${styles.messageBubble} ${msg.role === 'user' ? styles.userBubble : styles.assistantBubble}`}>
              {msg.text}
            </div>
            {msg.role === "user" && <Avatar initial="AK" size={32} />}
          </div>
        ))}
        {loading && (
          <div className={styles.messageRow}>
            <div className={styles.assistantAvatar}>
              <Bot size={15} color="#fe5516" />
            </div>
            <div className={styles.loadingBubble}>
              <span className={styles.loadingDot}>●</span>
              <span className={styles.loadingDot}>●</span>
              <span className={styles.loadingDot}>●</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length <= 1 && (
        <div className={styles.suggestions}>
          {suggestions.map(s => (
            <button key={s} className={styles.suggestionBtn} onClick={() => setInput(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      <div className={styles.inputSection}>
        <div className={styles.inputWrapper}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about your tasks, priorities, or anything..."
            className={styles.input}
            onKeyPress={e => e.key === 'Enter' && send()}
          />
        </div>
        <Btn variant="primary" onClick={send} icon={<Send size={15} />}>Send</Btn>
      </div>
    </div>
  )
}