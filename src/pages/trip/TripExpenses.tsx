import { MOCK_EXPENSES } from '../../data/mock'
import styles from './TripExpenses.module.css'

const exp = MOCK_EXPENSES
const spentPct = Math.round(exp.spent / exp.budget * 100)
const remainingPct = 100 - spentPct
const avgPct = Math.round(exp.avgPerDay / exp.budgetPerDay * 100)
const maxDay = Math.max(...exp.daily.map(d => d.amount))

function DonutChart() {
  const r = 54
  const cx = 68
  const cy = 68
  const circ = 2 * Math.PI * r
  let offset = 0
  return (
    <svg width="136" height="136" viewBox="0 0 136 136">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1e1e1e" strokeWidth="12" />
      {exp.categories.map(cat => {
        const pct = cat.amount / exp.spent
        const dash = circ * pct
        const segment = (
          <circle
            key={cat.name}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={cat.color}
            strokeWidth="12"
            strokeDasharray={`${dash} ${circ}`}
            strokeDashoffset={-(circ * offset)}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        )
        offset += pct
        return segment
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fill="#666">spent</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">
        ${exp.spent.toLocaleString()}
      </text>
    </svg>
  )
}

export default function TripExpenses() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Expenses</h2>
          <p className={styles.subtitle}>
            {exp.transactionCount} transactions · tracking ${exp.spent.toLocaleString()} of ${exp.budget.toLocaleString()} budget
          </p>
        </div>
        <div className={styles.actions}>
          <button className={styles.exportBtn}>↓ Export</button>
          <button className={styles.addBtn}>+ Add expense</button>
        </div>
      </div>

      {/* KPI cards */}
      <div className={styles.kpiRow}>
        <div className={styles.kpi}>
          <span className={styles.kpiLabel}>TOTAL SPEND</span>
          <span className={styles.kpiValue}><sup className={styles.kpiCur}>$</sup>{exp.spent.toLocaleString()}</span>
          <span className={styles.kpiSub}>{exp.daysWithActivity} days with activity</span>
          <div className={styles.kpiBar}>
            <div className={styles.kpiBarFill} style={{ width: `${spentPct}%`, background: 'var(--accent)' }} />
          </div>
        </div>
        <div className={styles.kpi}>
          <span className={styles.kpiLabel}>BUDGET REMAINING</span>
          <span className={styles.kpiValue}><sup className={styles.kpiCur}>$</sup>{(exp.budget - exp.spent).toLocaleString()}</span>
          <span className={styles.kpiSub} style={{ color: '#22c55e' }}>↓ {remainingPct}% of ${exp.budget.toLocaleString()} budget left</span>
          <div className={styles.kpiBar}>
            <div className={styles.kpiBarFill} style={{ width: `${remainingPct}%`, background: '#22c55e' }} />
          </div>
        </div>
        <div className={styles.kpi}>
          <span className={styles.kpiLabel}>AVG / DAY</span>
          <span className={styles.kpiValue}><sup className={styles.kpiCur}>$</sup>{exp.avgPerDay}</span>
          <span className={styles.kpiSub}>${exp.budgetPerDay} budget per day</span>
          <div className={styles.kpiBar}>
            <div className={styles.kpiBarFill} style={{ width: `${Math.min(avgPct, 100)}%`, background: 'var(--accent)' }} />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className={styles.chartsRow}>
        {/* By category */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <span className={styles.chartTitle}>By category</span>
            <span className={styles.chartTotal}>${exp.spent.toLocaleString()}</span>
          </div>
          <div className={styles.categoryBody}>
            <DonutChart />
            <div className={styles.legend}>
              {exp.categories.map(cat => (
                <div key={cat.name} className={styles.legendRow}>
                  <span className={styles.legendDot} style={{ background: cat.color }} />
                  <span className={styles.legendName}>{cat.name}</span>
                  <span className={styles.legendAmt}>${cat.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Daily spending */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <span className={styles.chartTitle}>Daily spending</span>
            <span className={styles.chartTotal}>Jul 14–22 · ${maxDay.toLocaleString()} max day</span>
          </div>
          <div className={styles.barChart}>
            {exp.daily.map(d => (
              <div key={d.label} className={styles.barCol}>
                <div className={styles.barWrap}>
                  <div
                    className={styles.bar}
                    style={{ height: `${maxDay > 0 ? (d.amount / maxDay) * 100 : 0}%` }}
                  />
                </div>
                <span className={styles.barLabel}>{d.label.replace('Jul ', '')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
