import { Target, Inbox, Clock, CheckCircle2, TrendingUp, Activity } from 'lucide-react'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Avatar from '../components/Avatar'
import { priorityMeta } from '../data/initialData'
import { hexToRgb } from '../utils/helpers'
import styles from './AnalyticsPage.module.css'

export default function AnalyticsPage({ tasks }) {
  const todo = tasks.filter(t => t.status === "todo").length
  const progress = tasks.filter(t => t.status === "progress").length
  const done = tasks.filter(t => t.status === "done").length
  const total = tasks.length
  const pct = Math.round((done / total) * 100)

  const byProject = {}
  tasks.forEach(t => { byProject[t.project] = (byProject[t.project] || 0) + 1 })
  const projectList = Object.entries(byProject).sort((a, b) => b[1] - a[1])
  const maxP = projectList[0]?.[1] || 1

  const byPriority = { urgent: 0, high: 0, medium: 0, low: 0 }
  tasks.forEach(t => { if (byPriority[t.priority] !== undefined) byPriority[t.priority]++ })

  const r = 42, circ = 2 * Math.PI * r
  const offset = circ * (1 - pct / 100)

  const kpiCards = [
    { label: "Completion Rate", value: `${pct}%`, icon: Target, color: "#4f8ef7" },
    { label: "Total Tasks", value: total, icon: Inbox, color: "#e8d9bb" },
    { label: "In Progress", value: progress, icon: Clock, color: "#fe5516" },
    { label: "Done", value: done, icon: CheckCircle2, color: "#00c878" },
  ]

  return (
    <div className={styles.analyticsPage}>
      <div className={`${styles.pageTitle} fade-up`}>Analytics</div>

      <div className={styles.kpiGrid}>
        {kpiCards.map(({ label, value, icon: Icon, color }, i) => (
          <Card key={label} delay={i * 0.06}>
            <div className={styles.kpiCard}>
              <div>
                <div className={styles.kpiLabel}>{label}</div>
                <div className={styles.kpiValue} style={{ color }}>{value}</div>
              </div>
              <Icon size={15} color={color} />
            </div>
            <div className={styles.kpiTrend}>
              <TrendingUp size={11} /> +12% this week
            </div>
          </Card>
        ))}
      </div>

      <div className={styles.chartsGrid}>
        <Card delay={0.24}>
          <div className={styles.chartTitle}>Completion Rate</div>
          <div className={styles.donutContainer}>
            <div className={styles.donutChart}>
              <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(232,217,187,0.08)" strokeWidth="10" />
                <circle cx="60" cy="60" r={r} fill="none" stroke="#fe5516" strokeWidth="10"
                  strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
                  style={{ filter: "drop-shadow(0 0 8px rgba(254,85,22,0.38))", transition: "stroke-dashoffset 0.6s ease" }} />
              </svg>
              <div className={styles.donutLabel}>
                <span className={styles.donutPercent}>{pct}%</span>
                <span className={styles.donutText}>Complete</span>
              </div>
            </div>
            <div className={styles.donutStats}>
              {[["To Do", todo, "rgba(232,217,187,0.55)"], ["Progress", progress, "#fe5516"], ["Done", done, "#00c878"]].map(([l, val, c]) => (
                <div key={l} className={styles.donutStat}>
                  <div className={styles.donutStatValue} style={{ color: c }}>{val}</div>
                  <div className={styles.donutStatLabel}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card delay={0.3}>
          <div className={styles.chartTitle}>By Project</div>
          <div className={styles.projectList}>
            {projectList.map(([name, count], i) => (
              <div key={name}>
                <div className={styles.projectRow}>
                  <span className={styles.projectName}>{name}</span>
                  <span className={styles.projectCount}>{count}</span>
                </div>
                <div className={styles.projectBar}>
                  <div className={styles.projectFill} style={{ width: `${(count / maxP) * 100}%`, background: i === 0 ? "#fe5516" : i === 1 ? "#4f8ef7" : "#00c878" }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card delay={0.36}>
          <div className={styles.chartTitle}>By Priority</div>
          <div className={styles.priorityList}>
            {Object.entries(byPriority).map(([p, count]) => (
              <div key={p} className={styles.priorityRow}>
                <div className={styles.priorityDot} style={{ background: priorityMeta[p].color }} />
                <span className={styles.priorityName}>{priorityMeta[p].label}</span>
                <div className={styles.priorityBar}>
                  <div className={styles.priorityFill} style={{ width: `${(count / total) * 100}%`, background: priorityMeta[p].color }} />
                </div>
                <span className={styles.priorityCount}>{count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card delay={0.42}>
        <div className={styles.chartTitle}>Recent Activity</div>
        <div className={styles.activityList}>
          {tasks.slice(0, 5).map(t => (
            <div key={t.id} className={styles.activityRow}>
              <div className={styles.activityIcon}>
                <Activity size={14} color="#fe5516" />
              </div>
              <div className={styles.activityContent}>
                <div className={styles.activityName}>{t.name}</div>
                <div className={styles.activityMeta}>{t.project} · {t.due}</div>
              </div>
              <Badge status={t.status} />
              <Avatar initial={t.assignee} size={26} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}