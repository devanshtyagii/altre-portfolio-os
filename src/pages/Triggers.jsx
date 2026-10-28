import KpiCard from '../components/KpiCard'
import { TRIGGER_COUNTS, UPCOMING } from '../data/portfolio'

const LABEL_TONE = {
  error: 'text-[var(--error)]',
  warning: 'text-[var(--warning)]',
  neutral: 'text-muted',
}

export default function Triggers() {
  return (
    <>
      <h1 className="page-title">Triggers</h1>
      <p className="page-sub">Expiry and action windows across the book.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {TRIGGER_COUNTS.map((item, i) => (
          <KpiCard
            key={item.id}
            label={<span className={LABEL_TONE[item.tone]}>{item.label}</span>}
            value={item.value}
            hint={item.hint}
            delay={i * 0.08}
          />
        ))}
      </div>

      <section className="card card-pad mt-4" style={{ animationDelay: '0.28s' }}>
        <h2 className="mt-0 mb-4 text-base font-semibold">Coming up</h2>
        <div className="timeline">
          {UPCOMING.map((item) => (
            <div key={item.property} className="tl-item">
              <div className="text-sm font-bold text-primary">{item.date}</div>
              <div className="font-semibold">{item.property}</div>
              <div className="text-sm text-muted">{item.detail}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
