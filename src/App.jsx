import { useState } from "react";
import { T } from "./tokens/theme";
import { injectGlobal } from "./tokens/globalStyles";
import { INIT_TASKS, INIT_EVENTS } from "./data/initialData";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Topbar } from "./components/Topbar/Topbar";
import { Dashboard } from "./pages/Dashboard";
import { TasksPage } from "./pages/Tasks";
import { AIPage } from "./pages/AIAssistant";
import { CalendarPage } from "./pages/Calendar";
import { AnalyticsPage } from "./pages/Analytics";
import { SettingsPage } from "./pages/Settings";

export default function App() {
  injectGlobal();
  const [page, setPage]     = useState("dashboard");
  const [tasks, setTasks]   = useState(INIT_TASKS);
  const [events, setEvents] = useState(INIT_EVENTS);

  const pages = {
    dashboard: <Dashboard     tasks={tasks} setPage={setPage} />,
    tasks:     <Tasks     tasks={tasks} setTasks={setTasks} />,
    ai:        <AIAssistant        tasks={tasks} />,
    calendar:  <Calendar  events={events} setEvents={setEvents} />,
    analytics: <Analytics tasks={tasks} />,
    settings:  <Settings />,
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden", background: T.bgDeep }}>
      <Sidebar page={page} setPage={setPage} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar page={page} tasks={tasks} />
        {pages[page]}
      </div>
    </div>
  );
}