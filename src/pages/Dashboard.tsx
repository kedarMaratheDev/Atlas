import { Link } from 'react-router-dom'
import { MOCK_USER, MOCK_TRIPS, MOCK_ALERTS, daysUntil, formatDateRange, greeting } from '../data/mock'
import styles from './Dashboard.module.css'

const nextTrip = MOCK_TRIPS.find(t => t.status === 'upcoming')!
const days = daysUntil(nextTrip.startDate)

const SEVERITY_COLOR: Record<string, string> = {
  error:   '#f05535',
  warning: '#e8a030',
}

export default function Dashboard() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  return (
    <div className={styles.page}>
      {/* ── Header ─────────────────────────────────── */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.greeting}>{greeting()}, {MOCK_USER.name.split(' ')[0]}.</h1>
          <p className={styles.subtext}>
            {today}
            <span className={styles.dot}>·</span>
            {nextTrip.name} in {days} days
          </p>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.countdown}>
            <span className={styles.countdownNum}>{days}</span>
            <span className={styles.countdownLabel}>days</span>
          </div>
          <Link to="/trips/new" className={styles.newTripBtn}>+ New trip</Link>
        </div>
      </div>

      {/* ── Active trip hero ────────────────────────── */}
      <div className={styles.hero} style={{ background: nextTrip.cover }}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroBadges}>
          <span className={styles.upcomingBadge}>Upcoming</span>
          <span className={styles.daysAwayBadge}>in {days} days</span>
        </div>
        <div className={styles.heroBottom}>
          <div className={styles.heroInfo}>
            <h2 className={styles.heroTitle}>{nextTrip.destination}, {nextTrip.country}</h2>
            <p className={styles.heroMeta}>
              {formatDateRange(nextTrip.startDate, nextTrip.endDate)}
              <span className={styles.heroDot}>·</span>
              {nextTrip.nights} nights
              <span className={styles.heroDot}>·</span>
              {nextTrip.type}
            </p>
          </div>
          <div className={styles.heroCtas}>
            <Link to={`/trips/${nextTrip.id}`} className={styles.manageBtn}>Manage trip</Link>
            <Link to={`/trips/${nextTrip.id}/itinerary`} className={styles.itineraryBtn}>Open itinerary</Link>
          </div>
        </div>
      </div>

      {/* ── Needs your attention ─────────────────────── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>Needs your attention</span>
          <Link to="/trips" className={styles.viewAll}>View all</Link>
        </div>
        <div className={styles.alertList}>
          {MOCK_ALERTS.map(alert => (
            <div key={alert.id} className={styles.alertRow}>
              <span
                className={styles.alertDot}
                style={{ background: SEVERITY_COLOR[alert.severity] }}
              />
              <div className={styles.alertBody}>
                <span className={styles.alertTitle}>{alert.title}</span>
                <span className={styles.alertDetail}>
                  {alert.trip && <>{alert.trip}<span className={styles.alertSep}>·</span></>}
                  {alert.detail}
                </span>
              </div>
              <span className={styles.alertDate}>
                {new Date(alert.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <span className={styles.alertArrow}>›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
