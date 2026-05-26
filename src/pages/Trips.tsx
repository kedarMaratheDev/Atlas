import { Link } from 'react-router-dom'
import { MOCK_TRIPS, formatDateRange } from '../data/mock'
import styles from './Trips.module.css'

export default function Trips() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>All trips</h1>
          <span className={styles.count}>{MOCK_TRIPS.length}</span>
        </div>
        <button className={styles.filterBtn}>Filter ›</button>
      </div>

      <div className={styles.grid}>
        {MOCK_TRIPS.map(trip => {
          const isCompleted = trip.status === 'completed'

          return (
            <Link key={trip.id} to={`/trips/${trip.id}`} className={styles.card}>
              <div className={styles.cardPhoto} style={{ background: trip.cover }} />
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <span className={styles.cardName}>{trip.destination}</span>
                  <span className={styles.cardCountry}>{trip.country}</span>
                </div>
                <div className={styles.cardDate}>
                  <span className={styles.calIcon}>▫</span>
                  {formatDateRange(trip.startDate, trip.endDate)}
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.cardNights}>{trip.nights} nights</span>
                  {isCompleted ? (
                    <span className={styles.statusCompleted}>Completed</span>
                  ) : (
                    <span className={styles.statusPlanned}>
                      {trip.progress}% planned
                    </span>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
