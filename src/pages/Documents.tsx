import { useState } from 'react'
import { MOCK_USER_DOCS } from '../data/mock'
import styles from './Documents.module.css'

type Filter = 'All' | 'ID' | 'Health' | 'Reference'
const FILTERS: Filter[] = ['All', 'ID', 'Health', 'Reference']

const counts: Record<Filter, number> = {
  All: MOCK_USER_DOCS.length,
  ID: MOCK_USER_DOCS.filter(d => d.category === 'ID').length,
  Health: MOCK_USER_DOCS.filter(d => d.category === 'Health').length,
  Reference: MOCK_USER_DOCS.filter(d => d.category === 'Reference').length,
}

export default function Documents() {
  const [filter, setFilter] = useState<Filter>('All')
  const docs = filter === 'All' ? MOCK_USER_DOCS : MOCK_USER_DOCS.filter(d => d.category === filter)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Documents</h2>
          <p className={styles.subtitle}>Personal documents that travel with you across every trip.</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.themeBtn} aria-label="Toggle theme">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <circle cx="7.5" cy="7.5" r="3" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M3.1 3.1l1.06 1.06M10.84 10.84l1.06 1.06M10.84 4.16l1.06-1.06M3.1 11.9l1.06-1.06" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </button>
          <button className={styles.uploadBtn}>↑ Upload</button>
        </div>
      </div>

      <div className={styles.filterRow}>
        <div className={styles.filters}>
          {FILTERS.map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
              onClick={() => setFilter(f)}
            >
              {f} <span className={styles.filterCount}>{counts[f]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.dropZone}>
        <div className={styles.uploadIcon} aria-hidden="true">↑</div>
        <div className={styles.uploadText}>
          <span className={styles.uploadPrimary}>Drop files here or click to upload</span>
          <span className={styles.uploadSub}>PDF, PNG, JPG · up to 25 MB per file</span>
        </div>
        <button className={styles.browseBtn}>Browse files</button>
      </div>

      <div className={styles.grid}>
        {docs.map(doc => (
          <div key={doc.id} className={styles.docCard}>
            <div className={styles.docCategoryBadge}>{doc.category}</div>
            <div className={styles.docIconWrap}>
              <div className={styles.docIcon} style={{ background: doc.color }}>
                {doc.format === 'PNG' || doc.format === 'JPG' ? (
                  <svg width="22" height="20" viewBox="0 0 22 20" fill="none" aria-hidden="true">
                    <rect x="1" y="3" width="20" height="16" rx="2" stroke="#fff" strokeWidth="1.5"/>
                    <circle cx="7" cy="8" r="2" stroke="#fff" strokeWidth="1.5"/>
                    <path d="M1 14l5-5 4 4 3-3 5 5" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="20" height="22" viewBox="0 0 20 22" fill="none" aria-hidden="true">
                    <path d="M12 1H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7l-6-6z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M12 1v6h6" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
            <div className={styles.docInfo}>
              <span className={styles.docName}>{doc.name}</span>
              <span className={styles.docMeta}>{doc.format} · {doc.size}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
