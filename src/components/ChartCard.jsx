export default function ChartCard({ title, delay = 0, legend, children, className = '' }) {
  return (
    <section className={`card card-pad ${className}`} style={{ animationDelay: `${delay}s` }}>
      {title ? <h2 className="mb-4 text-base font-semibold">{title}</h2> : null}
      {children}
      {legend?.length ? (
        <div className="legend-row" aria-hidden="true">
          {legend.map((item) => (
            <span key={item.label} className="legend-item">
              <span className="swatch" style={{ background: item.color }} />
              {item.label}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  )
}
