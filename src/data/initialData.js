export const INIT_TASKS = [
  { id: 1, name: "Design Landing Page", desc: "Create mockups for the new landing page", status: "progress", priority: "high", assignee: "AK", due: "2024-04-12", project: "Marketing" },
  { id: 2, name: "Fix Bug in Login", desc: "Investigate routing token target issue", status: "todo", priority: "urgent", assignee: "MR", due: "2024-04-10", project: "Dev" },
  { id: 3, name: "Write Blog Post", desc: "Draft an article about productivity", status: "done", priority: "medium", assignee: "AK", due: "2024-04-08", project: "Content" },
  { id: 4, name: "Setup Analytics", desc: "Configure tracking for the new dashboard", status: "todo", priority: "high", assignee: "JS", due: "2024-04-14", project: "Data" },
  { id: 5, name: "Mobile App Update", desc: "Push v2.3 to production", status: "done", priority: "medium", assignee: "MR", due: "2024-04-05", project: "Dev" },
  { id: 6, name: "API Documentation", desc: "Write full endpoint documentation", status: "progress", priority: "low", assignee: "AK", due: "2024-04-18", project: "Dev" },
  { id: 7, name: "UX Research", desc: "Interview 5 users about onboarding flow", status: "todo", priority: "high", assignee: "JS", due: "2024-04-20", project: "Design" },
  { id: 8, name: "Database Migration", desc: "Migrate legacy tables to new schema", status: "todo", priority: "urgent", assignee: "MR", due: "2024-04-11", project: "Dev" },
  { id: 9, name: "Email Campaign", desc: "Design and send product newsletter", status: "progress", priority: "medium", assignee: "AK", due: "2024-04-16", project: "Marketing" },
  { id: 10, name: "Onboarding Flow", desc: "Redesign the user onboarding experience", status: "todo", priority: "high", assignee: "JS", due: "2024-04-25", project: "Design" },
]

export const INIT_EVENTS = [
  { id: 1, date: "2024-04-10", title: "Design Review", time: "10:00", color: "#fe5516" },
  { id: 2, date: "2024-04-15", title: "Sprint Planning", time: "14:00", color: "#00c878" },
  { id: 3, date: "2024-04-17", title: "Team Standup", time: "09:00", color: "#fe5516" },
  { id: 4, date: "2024-04-22", title: "Product Demo", time: "16:00", color: "#4f8ef7" },
  { id: 5, date: "2024-04-25", title: "Retrospective", time: "11:00", color: "#00c878" },
]

export const AI_INIT = [
  { role: "assistant", text: "Привіт! Я ваш AI-помічник. Можу допомогти з управлінням задачами. Запитайте мене про пріоритети, статус або просто порадьтеся 😊" }
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