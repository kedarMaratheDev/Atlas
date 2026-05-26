import { useState } from 'react'
import { MOCK_BOOKINGS, type BookingStatus, type BookingType } from '../../data/mock'
import styles from './TripBookings.module.css'

const TYPE_ICON: Record<BookingType, string> = {
  flight:   '✈',
  hotel:    '⌂',
  rail:     '◷',
  transit:  '⬡',
  activity: '★',
}

const TYPE_LABEL: Record<BookingType, string> = {
  flight:   'Flights',
  hotel:    'Hotels',
  rail:     'Rail',
  transit:  'Transit',
  activity: 'Activities',
}

const STATUS_COLOR: Record<BookingStatus, string> = {
  booked:  '#06b6d4',
  pending: '#f59e0b',
  paid:    '#06b6d4',
}

type Filter = 'all' | BookingStatus

export default function TripBookings() {
  const [filter, setFilter] = useState<Filter>('all')

  const counts = {
    all:     MOCK_BOOKINGS.length,
    booked:  MOCK_BOOKINGS.filter(b => b.status === 'booked').length,
    pending: MOCK_BOOKINGS.filter(b => b.status === 'pending').length,
    paid:    MOCK_BOOKINGS.filter(b => b.status === 'paid').length,
  }

  const visible = filter === 'all' ? MOCK_BOOKINGS : MOCK_BOOKINGS.filter(b => b.status === filter)
  const pendingCount = counts.pending

  const grouped = visible.reduce<Record<BookingType, typeof MOCK_BOOKINGS>>((acc, b) => {
    if (!acc[b.type]) acc[b.type] = []
    acc[b.type].push(b)
    return acc
  }, {} as Record<BookingType, typeof MOCK_BOOKINGS>)

  const groupOrder: BookingType[] = ['flight', 'hotel', 'rail', 'transit', 'activity']

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Bookings</h2>
          <p className={styles.subtitle}>
            {counts.all - counts.pending} of {counts.all} sorted
            {pendingCount > 0 && (
              <span className={styles.pendingWarn}> · {pendingCount} still pending</span>
            )}
          </p>
        </div>
        <button className={styles.addBtn}>+ Add booking</button>
      </div>

      {/* Filter tabs */}
      <div className={styles.filterRow}>
        <div className={styles.filters}>
          {(['all', 'pending', 'booked', 'paid'] as Filter[]).map(f => (
            <button
              key={f}
              className={[styles.filterBtn, filter === f ? styles.filterActive : ''].join(' ')}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)} <span className={styles.filterCount}>{counts[f]}</span>
            </button>
          ))}
        </div>
        <button className={styles.sortBtn}>▼ Filter</button>
      </div>

      {/* Grouped rows */}
      <div className={styles.groups}>
        {groupOrder.map(type => {
          const items = grouped[type]
          if (!items?.length) return null
          return (
            <div key={type} className={styles.group}>
              <div className={styles.groupLabel}>
                <span>{TYPE_ICON[type]}</span>
                {TYPE_LABEL[type]}
                <span className={styles.groupCount}>{items.length}</span>
              </div>
              <div className={styles.bookingList}>
                {items.map(b => (
                  <div key={b.id} className={styles.bookingRow}>
                    <span
                      className={[styles.checkCircle, b.status !== 'pending' ? styles.checked : ''].join(' ')}
                      aria-hidden="true"
                    />
                    <span className={styles.typeIcon}>{TYPE_ICON[b.type]}</span>
                    <div className={styles.bookingBody}>
                      <span className={styles.bookingTitle}>{b.title}</span>
                      <div className={styles.bookingMeta}>
                        <span>{b.detail}</span>
                        {b.doc && <span className={styles.docChip}>✏ {b.doc}</span>}
                      </div>
                    </div>
                    <span className={styles.bookingDate}>
                      {new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className={styles.bookingPrice}>
                      {b.price != null ? `$${b.price.toLocaleString()}` : '—'}
                    </span>
                    <span className={styles.statusBadge} style={{ color: STATUS_COLOR[b.status] }}>
                      <span className={styles.statusDot} style={{ background: STATUS_COLOR[b.status] }} />
                      {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                    </span>
                    <span className={styles.chevron}>›</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
