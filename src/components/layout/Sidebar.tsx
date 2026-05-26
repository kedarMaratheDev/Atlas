import { NavLink } from 'react-router-dom'
import { MOCK_TRIPS, daysUntil } from '../../data/mock'
import styles from './Sidebar.module.css'

const NAV = [
  { label: 'Dashboard', to: '/dashboard', badge: null },
  { label: 'Trips',     to: '/trips',     badge: MOCK_TRIPS.length },
  { label: 'Documents', to: '/documents', badge: 14 },
  { label: 'Settings',  to: '/settings',  badge: null },
]

const UPCOMING = MOCK_TRIPS
  .filter(t => t.status === 'upcoming')
  .map(t => ({
    id: t.id,
    name: t.name,
    days: daysUntil(t.startDate),
    color: daysUntil(t.startDate) <= 30 ? '#f05535' : '#4a90d9',
  }))

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon} aria-hidden="true" />
        <span className={styles.logoText}>Atlas</span>
      </div>

      <nav className={styles.nav}>
        {NAV.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [styles.navItem, isActive ? styles.active : ''].join(' ')
            }
          >
            <span className={styles.navLabel}>{item.label}</span>
            {item.badge !== null && (
              <span className={styles.badge}>{item.badge}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Upcoming</span>
        {UPCOMING.map(trip => (
          <NavLink
            key={trip.id}
            to={`/trips/${trip.id}`}
            className={({ isActive }) =>
              [styles.tripItem, isActive ? styles.active : ''].join(' ')
            }
          >
            <span
              className={styles.tripDot}
              style={{ background: trip.color }}
            />
            <span className={styles.tripName}>{trip.name}</span>
            <span className={styles.tripDays}>{trip.days}d</span>
          </NavLink>
        ))}
      </div>

      <div className={styles.spacer} />

      <div className={styles.user}>
        <div className={styles.avatar}>SC</div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>Sarah Chen</span>
          <span className={styles.userEmail}>sarah.chen@gmail.com</span>
        </div>
      </div>
    </aside>
  )
}
