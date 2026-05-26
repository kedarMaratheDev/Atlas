import { MOCK_TRIP_DOCS } from '../../data/mock'
import styles from './TripDocuments.module.css'

export default function TripDocuments() {
  return (
    <div className={styles.page}>
      <div>
        <h2 className={styles.title}>Trip documents</h2>
        <p className={styles.subtitle}>Vouchers, tickets and confirmations for Tokyo.</p>
      </div>

      {/* Upload zone */}
      <div className={styles.dropZone}>
        <div className={styles.uploadIcon} aria-hidden="true">↑</div>
        <div className={styles.uploadText}>
          <span className={styles.uploadPrimary}>Drop files here or click to upload</span>
          <span className={styles.uploadSub}>PDF, PNG, JPG · up to 25 MB per file</span>
        </div>
        <button className={styles.browseBtn}>Browse files</button>
      </div>

      {/* Document grid */}
      <div className={styles.grid}>
        {MOCK_TRIP_DOCS.map(doc => (
          <div key={doc.id} className={styles.docCard}>
            <div className={styles.docCategoryBadge}>{doc.category}</div>
            <div className={styles.docIconWrap}>
              <div className={styles.docIcon} style={{ background: doc.color }}>
                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" aria-hidden="true">
                  <path d="M12 1H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7l-6-6z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M12 1v6h6" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
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
