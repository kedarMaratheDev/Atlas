import { useState } from 'react'
import { MOCK_USER } from '../data/mock'
import styles from './Settings.module.css'

type Theme = 'System' | 'Light' | 'Dark'

export default function Settings() {
  const [theme, setTheme] = useState<Theme>('Dark')

  return (
    <div className={styles.page}>
      <div>
        <h2 className={styles.title}>Settings</h2>
        <p className={styles.subtitle}>Account, preferences, and a quick way out.</p>
      </div>

      <div className={styles.cards}>
        {/* Profile */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Profile</h3>
          <div className={styles.profileRow}>
            <div className={styles.avatar}>{MOCK_USER.initials}</div>
            <div className={styles.profileInfo}>
              <span className={styles.profileName}>{MOCK_USER.name}</span>
              <span className={styles.profileEmail}>{MOCK_USER.email}</span>
            </div>
            <div className={styles.googleBadge}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-label="Google">
                <path d="M13.5 7.16c0-.47-.04-.92-.12-1.35H7v2.55h3.65a3.1 3.1 0 0 1-1.35 2.04v1.7h2.18c1.28-1.18 2.02-2.91 2.02-4.94z" fill="#4285F4"/>
                <path d="M7 14c1.84 0 3.38-.61 4.5-1.65l-2.18-1.7c-.61.41-1.38.65-2.32.65-1.78 0-3.29-1.2-3.83-2.82H.93v1.76A7 7 0 0 0 7 14z" fill="#34A853"/>
                <path d="M3.17 8.48A4.2 4.2 0 0 1 2.95 7c0-.51.09-1 .22-1.48V3.76H.93A7 7 0 0 0 0 7c0 1.13.27 2.2.93 3.24l2.24-1.76z" fill="#FBBC05"/>
                <path d="M7 2.79c1 0 1.9.35 2.6 1.02l1.95-1.95A7 7 0 0 0 7 0 7 7 0 0 0 .93 3.76L3.17 5.52C3.71 3.9 5.22 2.79 7 2.79z" fill="#EA4335"/>
              </svg>
              Google
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Preferences</h3>
          <div className={styles.prefList}>
            <div className={styles.prefRow}>
              <span className={styles.prefLabel}>Default currency</span>
              <select className={styles.select}>
                <option>USD – US Dollar</option>
                <option>EUR – Euro</option>
                <option>GBP – British Pound</option>
                <option>JPY – Japanese Yen</option>
              </select>
            </div>
            <div className={styles.prefDivider} />
            <div className={styles.prefRow}>
              <span className={styles.prefLabel}>Theme</span>
              <div className={styles.segmented}>
                {(['System', 'Light', 'Dark'] as Theme[]).map(t => (
                  <button
                    key={t}
                    className={`${styles.segBtn} ${theme === t ? styles.segActive : ''}`}
                    onClick={() => setTheme(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.prefDivider} />
            <div className={styles.prefRow}>
              <span className={styles.prefLabel}>Date format</span>
              <select className={styles.select}>
                <option>Month D, YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Session */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Session</h3>
          <div className={styles.sessionRow}>
            <div className={styles.sessionInfo}>
              <span className={styles.sessionLabel}>Signed in as {MOCK_USER.email}</span>
              <span className={styles.sessionSub}>Via Google OAuth</span>
            </div>
            <button className={styles.signOutBtn}>Sign out</button>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <span>About Atlas</span>
        <span className={styles.footerDot}>·</span>
        <a href="#" className={styles.footerLink}>GitHub repo</a>
        <span className={styles.footerDot}>·</span>
        <span>v1.0</span>
      </footer>
    </div>
  )
}
