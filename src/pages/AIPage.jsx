import { useState, useEffect, useRef } from 'react'
import { Bot, Send } from 'lucide-react'
import Btn from '../components/Btn'
import Avatar from '../components/Avatar'
import styles from './AIPage.module.css'

export default function AIPage({ tasks, setTasks }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello! I'm your AI assistant. I can help you manage your tasks. Try saying:\n\n- Add task: Buy groceries\n- Mark task 1 as done\n- Show my tasks\n- Help" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const processCommand = (text) => {
    const lowerText = text.toLowerCase().trim()
    
    if (lowerText.includes('add task') || lowerText.includes('create task')) {
      let taskName = text.replace(/add task|create task/i, '').replace(/:/, '').trim()
      if (taskName) {
        const newTask = {
          id: Date.now(),
          name: taskName,
          desc: '',
          status: 'todo',
          priority: 'medium',
          due: ''
        }
        setTasks(prev => [...prev, newTask])
        return `Task "${taskName}" has been created.`
      }
      return "Please specify a task name. Example: Add task: Buy milk"
    }
    
    if (lowerText.includes('mark') && lowerText.includes('done')) {
      const match = text.match(/\d+/)
      if (match) {
        const taskId = parseInt(match[0])
        const task = tasks.find(t => t.id === taskId)
        if (task) {
          setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'done' } : t))
          return `Task "${task.name}" marked as done.`
        }
        return `Task with ID ${taskId} not found.`
      }
      return "Please specify task number. Example: Mark task 1 as done"
    }
    
    if (lowerText.includes('mark') && lowerText.includes('progress')) {
      const match = text.match(/\d+/)
      if (match) {
        const taskId = parseInt(match[0])
        const task = tasks.find(t => t.id === taskId)
        if (task) {
          setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'progress' } : t))
          return `Task "${task.name}" moved to In Progress.`
        }
        return `Task with ID ${taskId} not found.`
      }
      return "Please specify task number. Example: Mark task 1 in progress"
    }
    
    if (lowerText.includes('mark') && lowerText.includes('todo')) {
      const match = text.match(/\d+/)
      if (match) {
        const taskId = parseInt(match[0])
        const task = tasks.find(t => t.id === taskId)
        if (task) {
          setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'todo' } : t))
          return `Task "${task.name}" moved back to To Do.`
        }
        return `Task with ID ${taskId} not found.`
      }
      return "Please specify task number. Example: Mark task 1 as todo"
    }
    
    if (lowerText.includes('delete task') || lowerText.includes('remove task')) {
      const match = text.match(/\d+/)
      if (match) {
        const taskId = parseInt(match[0])
        const task = tasks.find(t => t.id === taskId)
        if (task) {
          setTasks(prev => prev.filter(t => t.id !== taskId))
          return `Task "${task.name}" has been deleted.`
        }
        return `Task with ID ${taskId} not found.`
      }
      return "Please specify task number. Example: Delete task 1"
    }
    
    if (lowerText.includes('show tasks') || lowerText.includes('list tasks') || lowerText.includes('my tasks')) {
      if (tasks.length === 0) {
        return "You don't have any tasks yet. Create one with: Add task: Buy milk"
      }
      
      const todoCount = tasks.filter(t => t.status === 'todo').length
      const progressCount = tasks.filter(t => t.status === 'progress').length
      const doneCount = tasks.filter(t => t.status === 'done').length
      
      let taskList = `You have ${tasks.length} total tasks (${todoCount} To Do, ${progressCount} In Progress, ${doneCount} Done):\n\n`
      tasks.forEach((t, i) => {
        const statusText = t.status === 'done' ? '[Done]' : t.status === 'progress' ? '[In Progress]' : '[To Do]'
        const priorityText = t.priority === 'urgent' ? '[Urgent]' : t.priority === 'high' ? '[High]' : t.status === 'medium' ? '[Medium]' : '[Low]'
        taskList += `${i + 1}. ${statusText} ${priorityText} ${t.name}\n`
      })
      return taskList
    }
    
    if (lowerText.includes('help')) {
      return `Available commands:\n\n- Add task: Buy milk - Create a new task\n- Mark task 1 as done - Complete a task\n- Mark task 1 in progress - Move to In Progress\n- Mark task 1 as todo - Move back to To Do\n- Delete task 1 - Remove a task\n- Show my tasks - List all tasks\n- Help - Show this message`
    }
    
    return `I didn't understand. Try:\n\n- Add task: Buy milk\n- Show my tasks\n- Help`
  }

  const send = () => {
    if (!input.trim() || loading) return
    
    const userMsg = input.trim()
    setInput("")
    setMessages(prev => [...prev, { role: "user", text: userMsg }])
    setLoading(true)
    
    setTimeout(() => {
      const response = processCommand(userMsg)
      setMessages(prev => [...prev, { role: "assistant", text: response }])
      setLoading(false)
    }, 300)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const suggestions = [
    "Add task: Buy groceries",
    "Show my tasks",
    "Help",
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
            <div className={styles.subtitle}>I can manage your tasks</div>
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
              <div className={styles.messageText}>{msg.text}</div>
            </div>
            {msg.role === "user" && <Avatar initial="U" size={32} />}
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

      <div className={styles.suggestions}>
        {suggestions.map(s => (
          <button key={s} className={styles.suggestionBtn} onClick={() => setInput(s)}>
            {s}
          </button>
        ))}
      </div>

      <div className={styles.inputSection}>
        <div className={styles.inputWrapper}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me to add, update, or show tasks..."
            className={styles.input}
          />
        </div>
        <Btn variant="primary" onClick={send} icon={<Send size={15} />}>Send</Btn>
      </div>
    </div>
  )
}