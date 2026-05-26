import { useState } from 'react'
import { MOCK_ITINERARY, type ActivityType } from '../../data/mock'
import styles from './TripItinerary.module.css'

const ACTIVITY_ICON: Record<ActivityType, { symbol: string; bg: string }> = {
  flight:     { symbol: '✈', bg: '#0891b2' },
  transit:    { symbol: '⬡', bg: '#0891b2' },
  hotel:      { symbol: '⌂', bg: '#475569' },
  attraction: { symbol: '★', bg: '#dc2626' },
  food:       { symbol: '◉', bg: '#d97706' },
  rail:       { symbol: '◷', bg: '#16a34a' },
  activity:   { symbol: '◈', bg: '#7c3aed' },
}

const aiDraftCount = MOCK_ITINERARY
  .flatMap(d => d.activities)
  .filter(a => a.aiDrafted).length

const totalActivities = MOCK_ITINERARY.flatMap(d => d.activities).length

export default function TripItinerary() {
  const [bannerDismissed, setBannerDismissed] = useState(false)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Itinerary</h2>
          <p className={styles.subtitle}>
            {totalActivities} activities across {MOCK_ITINERARY.length} days · {aiDraftCount} drafted with AI, ready for review
          </p>
        </div>
        <div className={styles.actions}>
          <button className={styles.aiBtn}>✦ Draft more with AI</button>
          <button className={styles.addBtn}>+ Add activity</button>
        </div>
      </div>

      {!bannerDismissed && (
        <div className={styles.aiBanner}>
          <span className={styles.aiBannerDot} />
          <div className={styles.aiBannerBody}>
            <span className={styles.aiBannerTitle}>AI drafted {aiDraftCount} suggestions for Tokyo</span>
            <span className={styles.aiBannerSub}>
              Review each card — edit, accept, or remove. The "AI-drafted" tag clears when you make a change.
            </span>
          </div>
          <button className={styles.reviewAllBtn} onClick={() => setBannerDismissed(true)}>
            Review all
          </button>
        </div>
      )}

      {MOCK_ITINERARY.map(day => (
        <div key={day.dayNum} className={styles.daySection}>
          <div className={styles.dayHeader}>
            <span className={styles.dayCircle}>{day.dayNum}</span>
            <div className={styles.dayInfo}>
              <span className={styles.dayLabel}>Day {day.dayNum}</span>
              <span className={styles.dayDate}>{day.label}</span>
            </div>
            <span className={styles.actCount}>{day.activities.length} activities</span>
          </div>

          <div className={styles.actList}>
            {day.activities.map(act => {
              const icon = ACTIVITY_ICON[act.type]
              return (
                <div key={act.id} className={styles.actCard}>
                  <span className={styles.actTime}>{act.time}</span>
                  <span className={styles.actIcon} style={{ background: icon.bg }}>
                    {icon.symbol}
                  </span>
                  <div className={styles.actBody}>
                    <div className={styles.actTop}>
                      <span className={styles.actTitle}>{act.title}</span>
                      {act.aiDrafted && (
                        <span className={styles.aiTag}>✦ AI-drafted</span>
                      )}
                    </div>
                    <span className={styles.actDetail}>{act.detail}</span>
                    {(act.location || act.doc) && (
                      <div className={styles.actChips}>
                        {act.location && (
                          <span className={styles.chip}>○ {act.location}</span>
                        )}
                        {act.doc && (
                          <span className={styles.chip}>✏ {act.doc}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
