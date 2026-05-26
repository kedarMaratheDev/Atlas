import { Link } from 'react-router-dom'
import styles from './Landing.module.css'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="2" x2="12" y2="6"/>
      <line x1="12" y1="18" x2="12" y2="22"/>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
      <line x1="2" y1="12" x2="6" y2="12"/>
      <line x1="18" y1="12" x2="22" y2="12"/>
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
    </svg>
  )
}

export default function Landing() {
  return (
    <div className={styles.page}>
      <header className={styles.nav}>
        <div className={styles.navLogo}>
          <span className={styles.navLogoIcon} aria-hidden="true" />
          <span className={styles.navLogoText}>Atlas</span>
        </div>
        <button className={styles.themeToggle} aria-label="Toggle theme">
          <SunIcon />
        </button>
      </header>

      <main className={styles.hero}>
        {/* Floating preview card — top left */}
        <div className={`${styles.previewCard} ${styles.cardLeft}`}>
          <div className={styles.cardMeta}>
            <span className={styles.cardIcon} data-type="transit" aria-hidden="true">↑</span>
            <span>Day 1 · 14:35</span>
          </div>
          <div className={styles.cardTitle}>Haneda → city centre</div>
          <div className={styles.cardSub}>Limousine bus · 90 min</div>
        </div>

        {/* Floating preview card — bottom right */}
        <div className={`${styles.previewCard} ${styles.cardRight}`}>
          <div className={styles.cardMeta}>
            <span className={styles.cardIcon} data-type="hotel" aria-hidden="true">⌂</span>
            <span>Day 1 · 18:00</span>
          </div>
          <div className={styles.cardTitle}>Hotel Niwa Tokyo</div>
          <div className={styles.cardSub}>Booked · 7 nights · ¥164,300</div>
        </div>

        {/* Center content */}
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            Solo travel, organised
          </div>

          <h1 className={styles.headline}>
            Your trip. <span className={styles.accent}>All</span>
            <br />
            <span className={styles.accent}>in one place.</span>
          </h1>

          <p className={styles.subtext}>
            Atlas keeps your itinerary, bookings, expenses and travel
            <br />
            documents together — calm, private, and built for travelling alone.
          </p>

          <Link to="/dashboard" className={styles.googleBtn}>
            <GoogleIcon />
            Continue with Google
          </Link>

          <p className={styles.legal}>
            By continuing you agree to the{' '}
            <a href="#" className={styles.legalLink}>Terms</a>
            {' '}and{' '}
            <a href="#" className={styles.legalLink}>Privacy</a>.
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        <span>Made by Sarah Chen · Open source.</span>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>GitHub</a>
          <a href="#" className={styles.footerLink}>Changelog</a>
        </div>
      </footer>
    </div>
  )
}
