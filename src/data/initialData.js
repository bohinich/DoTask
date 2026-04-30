export const INIT_TASKS = []

export const INIT_EVENTS = []

export const AI_INIT = [
  { role: "assistant", text: "Hello! I'm your AI assistant. You don't have any tasks yet. Create your first task, and I'll help you organize it 😊" }
]

export const statusMeta = {
  todo: { label: "To Do", color: "rgba(232,217,187,0.55)", bg: "rgba(232,217,187,0.08)" },
  progress: { label: "In Progress", color: "#fe5516", bg: "rgba(254,85,22,0.14)" },
  done: { label: "Done", color: "#00c878", bg: "rgba(0,200,120,0.14)" },
}

export const priorityMeta = {
  urgent: { color: "#ff4444", label: "Urgent" },
  high: { color: "#fe5516", label: "High" },
  medium: { color: "#f7c948", label: "Medium" },
  low: { color: "#00c878", label: "Low" },
}