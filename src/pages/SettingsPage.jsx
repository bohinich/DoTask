import { useState } from 'react'
import { Save, ArrowUpRight, Trash2, Plus } from 'lucide-react'
import Card from '../components/Card'
import Btn from '../components/Btn'
import Avatar from '../components/Avatar'
import Input from '../components/Input'
import Select from '../components/Select'
import styles from './SettingsPage.module.css'

function Toggle({ on, onChange }) {
  return (
    <div className={`${styles.toggle} ${on ? styles.on : ''}`} onClick={() => onChange(!on)}>
      <div className={styles.toggleKnob} />
    </div>
  )
}

function Section({ title, children }) {
  return (
    <Card delay={0}>
      <div className={styles.sectionTitle}>{title}</div>
      {children}
    </Card>
  )
}

function Row({ label, desc, children }) {
  return (
    <div className={styles.row}>
      <div>
        <div className={styles.rowLabel}>{label}</div>
        {desc && <div className={styles.rowDesc}>{desc}</div>}
      </div>
      {children}
    </div>
  )
}

export default function SettingsPage() {
  const [notif, setNotif] = useState(true)
  const [compact, setCompact] = useState(false)
  const [accent, setAccent] = useState("#fe5516")

  const teamMembers = [
    { name: "Anna Kovalenko", role: "Admin", init: "AK" },
    { name: "Max Ryabov", role: "Developer", init: "MR" },
    { name: "Julia Savchenko", role: "Designer", init: "JS" },
  ]

  return (
    <div className={styles.settingsPage}>
      <div className={`${styles.pageTitle} fade-up`}>Settings</div>

      <div className={styles.settingsGrid}>
        <Section title="Profile">
          <div className={styles.profileHeader}>
            <Avatar initial="AK" size={56} glow />
            <div>
              <div className={styles.profileName}>Anna Kovalenko</div>
              <div className={styles.profileEmail}>anna@company.com</div>
            </div>
          </div>
          <div className={styles.profileForm}>
            <div>
              <label className={styles.formLabel}>Full Name</label>
              <Input value="Anna Kovalenko" onChange={() => {}} placeholder="Your name" />
            </div>
            <div>
              <label className={styles.formLabel}>Email</label>
              <Input value="anna@company.com" onChange={() => {}} placeholder="Email" />
            </div>
            <Btn variant="primary" icon={<Save size={14} />} style={{ marginTop: 4 }}>Save Changes</Btn>
          </div>
        </Section>

        <Section title="Preferences">
          <Row label="Notifications" desc="Receive task reminders and updates">
            <Toggle on={notif} onChange={setNotif} />
          </Row>
          <Row label="Compact View" desc="Show more tasks with less spacing">
            <Toggle on={compact} onChange={setCompact} />
          </Row>
          <Row label="Accent Color" desc="Primary color for the interface">
            <input type="color" value={accent} onChange={e => setAccent(e.target.value)} className={styles.colorPicker} />
          </Row>
          <Row label="Language" desc="Interface language">
            <Select value="uk" onChange={() => {}} style={{ width: 120 }} options={[{ value: "uk", label: "Українська" }, { value: "en", label: "English" }]} />
          </Row>
        </Section>

        <Section title="Team Members">
          {teamMembers.map(({ name, role, init }) => (
            <div key={init} className={styles.teamRow}>
              <Avatar initial={init} size={36} />
              <div className={styles.teamInfo}>
                <div className={styles.teamName}>{name}</div>
                <div className={styles.teamRole}>{role}</div>
              </div>
              <span className={styles.teamBadge}>{role === "Admin" ? "Admin" : "Member"}</span>
            </div>
          ))}
          <Btn variant="ghost" small icon={<Plus size={13} />} style={{ marginTop: 12 }}>Invite Member</Btn>
        </Section>

        <Section title="Account">
          <Row label="Export Data" desc="Download all your tasks as JSON">
            <Btn variant="ghost" small icon={<ArrowUpRight size={13} />}>Export</Btn>
          </Row>
          <Row label="Clear All Tasks" desc="Permanently delete all tasks">
            <Btn variant="danger" small icon={<Trash2 size={13} />}>Clear</Btn>
          </Row>
          <Row label="Version" desc="Current app version">
            <span className={styles.version}>v1.0.0</span>
          </Row>
        </Section>
      </div>
    </div>
  )
}