import { Link } from 'react-router-dom'
import { MOCK_ITINERARY, MOCK_BOOKINGS, MOCK_EXPENSES, type ActivityType } from '../../data/mock'
import styles from './TripOverview.module.css'

const ACTIVITY_ICON: Record<ActivityType, { symbol: string; color: string }> = {
  flight:     { symbol: '✈', color: '#0891b2' },
  transit:    { symbol: '⬡', color: '#0891b2' },
  hotel:      { symbol: '⌂', color: '#475569' },
  attraction: { symbol: '★', color: '#dc2626' },
  food:       { symbol: '◉', color: '#d97706' },
  rail:       { symbol: '◷', color: '#16a34a' },
  activity:   { symbol: '◈', color: '#7c3aed' },
}

const STATUS_COLOR: Record<string, string> = {
  booked:  '#06b6d4',
  pending: '#f59e0b',
  paid:    '#06b6d4',
}

function Donut({ pct }: { pct: number }) {
  const r = 34
  const cx = 42
  const cy = 42
  const circ = 2 * Math.PI * r
  return (
    <svg width="84" height="84" viewBox="0 0 84 84">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#222" strokeWidth="8" />
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="8"
        strokeDasharray={`${circ * pct / 100} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#888">{pct}%</text>
    </svg>
  )
}

const previewDays = MOCK_ITINERARY.slice(0, 2)
const exp = MOCK_EXPENSES

export default function TripOverview() {
  return (
    <div className={styles.layout}>
      {/* ── Left: itinerary preview ───────────── */}
      <div className={styles.left}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>First two days</span>
            <Link to="itinerary" className={styles.cardLink}>Open itinerary ›</Link>
          </div>
          {previewDays.map((day, di) => (
            <div key={day.dayNum}>
              <div className={styles.dayLabel}>
                DAY {day.dayNum} · {day.label.toUpperCase()}
              </div>
              {day.activities.map(act => {
                const icon = ACTIVITY_ICON[act.type]
                return (
                  <div key={act.id} className={styles.actRow}>
                    <span className={styles.actTime}>{act.time}</span>
                    <span className={styles.actIcon} style={{ background: icon.color }}>
                      {icon.symbol}
                    </span>
                    <div className={styles.actBody}>
                      <span className={styles.actTitle}>{act.title}</span>
                      <span className={styles.actDetail}>{act.detail}</span>
                    </div>
                  </div>
                )
              })}
              {di < previewDays.length - 1 && <div className={styles.daySep} />}
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: budget + bookings ──────────── */}
      <div className={styles.right}>
        {/* Budget */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Budget</span>
            <Link to="expenses" className={styles.cardLink}>Open ›</Link>
          </div>
          <div className={styles.budgetBody}>
            <Donut pct={Math.round(exp.spent / exp.budget * 100)} />
            <div className={styles.budgetInfo}>
              <span className={styles.budgetAmount}>${exp.spent.toLocaleString()}</span>
              <span className={styles.budgetSub}>remaining of ${exp.budget.toLocaleString()}</span>
              <span className={styles.budgetSpent}>${exp.spent.toLocaleString()} spent · {Math.round(exp.spent / exp.budget * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Bookings */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>
              Bookings · {MOCK_BOOKINGS.filter(b => b.status !== 'pending').length}/{MOCK_BOOKINGS.length}
            </span>
            <Link to="bookings" className={styles.cardLink}>Open ›</Link>
          </div>
          <div className={styles.bookingList}>
            {MOCK_BOOKINGS.slice(0, 5).map(b => (
              <div key={b.id} className={styles.bookingRow}>
                <span
                  className={styles.bookingDot}
                  style={{ background: STATUS_COLOR[b.status] }}
                />
                <span className={styles.bookingTitle}>{b.title}</span>
                <span className={styles.bookingStatus}
                  style={{ color: b.status === 'pending' ? '#f59e0b' : '#888' }}>
                  {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
