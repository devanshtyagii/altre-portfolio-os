import AnimatedNumber from './AnimatedNumber'

export default function KpiCard({
  label,
  value,
  decimals = 0,
  prefix,
  suffix,
  hint,
  icon,
  delay = 0,
  children,
}) {
  return (
    <article className="card card-pad" style={{ animationDelay: `${delay}s` }}>
      {icon}
      <div className="kpi-label">{label}</div>
      {value != null ? (
        <AnimatedNumber
          className="kpi-value"
          value={value}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
        />
      ) : (
        <div className="kpi-value">{children}</div>
      )}
      {hint ? <div className="kpi-hint">{hint}</div> : null}
    </article>
  )
}
