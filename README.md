src/
├── App.jsx ← Кореневий компонент + роутінг
│
├── tokens/
│ ├── theme.js ← Дизайн-токени (кольори, хелпери sx, statusMeta, priorityMeta)
│ └── globalStyles.js ← Глобальні CSS стилі (injectGlobal)
│
├── data/
│ └── initialData.js ← INIT_TASKS, INIT_EVENTS, AI_INIT
│
├── components/
│ ├── ui.jsx ← Примітиви: Avatar, Badge, PriorityDot, Card, Btn, IconBtn, Input, Select
│ ├── Modal.jsx ← Компонент модального вікна
│ ├── Sidebar.jsx ← Бокова навігація + NavItem
│ └── Topbar.jsx ← Верхня панель із пошуком та аватаром
│
└── pages/
├── Dashboard.jsx ← Головна сторінка (TaskRow, MiniCalendar, AnalyticsWidget тощо)
├── TasksPage.jsx ← Сторінка задач (list + kanban + modal)
├── CalendarPage.jsx ← Сторінка календаря
├── AnalyticsPage.jsx ← Сторінка аналітики
├── AIPage.jsx ← AI-асистент (Claude API)
└── SettingsPage.jsx ← Сторінка налаштувань
