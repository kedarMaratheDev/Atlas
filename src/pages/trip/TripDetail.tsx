import { NavLink, Outlet, useParams, Link } from 'react-router-dom'
import { MOCK_TRIPS, formatDateRange, daysUntil } from '../../data/mock'
import styles from './TripDetail.module.css'

const TABS = [
  { label: 'Overview',  to: '',           badge: null, icon: '⌂' },
  { label: 'Itinerary', to: 'itinerary',  badge: null, icon: '⎇' },
  { label: 'Bookings',  to: 'bookings',   badge: 8,    icon: '▣' },
  { label: 'Expenses',  to: 'expenses',   badge: null, icon: '◈' },
  { label: 'Documents', to: 'documents',  badge: 7,    icon: '◻' },
]

export default function TripDetail() {
  const { id } = useParams()
  const trip = MOCK_TRIPS.find(t => t.id === id) ?? MOCK_TRIPS[0]
  const days = daysUntil(trip.startDate)
  const isUpcoming = trip.status === 'upcoming'

  return (
    <div className={styles.root}>
      {/* breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link to="/trips" className={styles.breadcrumbLink}>Trips</Link>
        <span className={styles.breadcrumbSep}>›</span>
        <span className={styles.breadcrumbCurrent}>{trip.name}</span>
      </div>

      {/* hero */}
      <div className={styles.hero} style={{ background: trip.cover }}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroTop}>
          {isUpcoming && (
            <span className={styles.upcomingBadge}>
              <span className={styles.upcomingDot} />
              Upcoming
            </span>
          )}
          {isUpcoming && (
            <span className={styles.daysAway}>in {days} days</span>
          )}
        </div>
        <div className={styles.heroBottom}>
          <h1 className={styles.heroTitle}>{trip.destination}, {trip.country}</h1>
          <p className={styles.heroMeta}>
            <span className={styles.calIcon}>▫</span>
            {formatDateRange(trip.startDate, trip.endDate)}
            <span className={styles.sep}>·</span>
            {trip.nights} nights
            <span className={styles.sep}>·</span>
            {trip.type}
          </p>
        </div>
      </div>

      {/* tabs */}
      <nav className={styles.tabs}>
        {TABS.map(tab => (
          <NavLink
            key={tab.label}
            to={tab.to}
            end={tab.to === ''}
            className={({ isActive }) =>
              [styles.tab, isActive ? styles.tabActive : ''].join(' ')
            }
          >
            <span className={styles.tabIcon}>{tab.icon}</span>
            {tab.label}
            {tab.badge !== null && (
              <span className={styles.tabBadge}>{tab.badge}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* tab content */}
      <div className={styles.content}>
        <Outlet context={{ trip }} />
      </div>
    </div>
  )
}
