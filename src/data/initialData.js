import { T } from "../tokens/theme";

export const INIT_TASKS = [
  { id:1,  name:"Design Landing Page",  desc:"Create mockups for the new landing page.",      status:"progress", priority:"high",   due:"2024-04-12", assignee:"AK", project:"Design" },
  { id:2,  name:"Fix Bug in Login",     desc:"Investigate routing token target issues.",        status:"todo",     priority:"urgent", due:"2024-04-10", assignee:"MR", project:"Dev" },
  { id:3,  name:"Write Blog Post",      desc:"Draft an article about productivity tips.",       status:"todo",     priority:"medium", due:"2024-04-18", assignee:"JS", project:"Marketing" },
  { id:4,  name:"Setup Analytics",      desc:"Configure tracking for the new dashboard.",      status:"done",     priority:"high",   due:"2024-04-08", assignee:"AK", project:"Dev" },
  { id:5,  name:"Mobile App Update",    desc:"Push v2.3 to production.",                        status:"progress", priority:"urgent", due:"2024-04-11", assignee:"MR", project:"Dev" },
  { id:6,  name:"API Documentation",   desc:"Write full endpoint documentation.",              status:"todo",     priority:"medium", due:"2024-04-20", assignee:"AK", project:"Dev" },
  { id:7,  name:"UX Research",          desc:"Interview 5 users about onboarding flow.",       status:"done",     priority:"low",    due:"2024-04-07", assignee:"JS", project:"Design" },
  { id:8,  name:"Database Migration",  desc:"Migrate legacy tables to new schema.",            status:"todo",     priority:"high",   due:"2024-04-22", assignee:"MR", project:"Dev" },
  { id:9,  name:"Email Campaign",       desc:"Design and send product newsletter.",             status:"done",     priority:"medium", due:"2024-04-09", assignee:"JS", project:"Marketing" },
  { id:10, name:"Onboarding Flow",      desc:"Redesign the user onboarding experience.",       status:"progress", priority:"high",   due:"2024-04-15", assignee:"AK", project:"Design" },
];

export const INIT_EVENTS = [
  { id:1, date:"2024-04-10", title:"Design Review",  time:"10:00", color: T.accent },
  { id:2, date:"2024-04-15", title:"Sprint Planning", time:"14:00", color: T.green },
  { id:3, date:"2024-04-17", title:"Team Standup",   time:"09:00", color: T.accent },
  { id:4, date:"2024-04-22", title:"Product Demo",   time:"16:00", color:"#4f8ef7" },
  { id:5, date:"2024-04-25", title:"Retrospective",  time:"11:00", color: T.green },
];

export const AI_INIT = [
  { role:"assistant", text:"Привіт! Я ваш AI-помічник. Можу допомогти з управлінням задачами, пріоритетами та плануванням." },
];