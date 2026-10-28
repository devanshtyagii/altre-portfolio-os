export default function LoadingBlock({ rows = 4, label = 'Loading' }) {
  return (
    <div role="status" aria-live="polite" aria-label={label} className="grid gap-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton" style={{ height: 48 }} />
      ))}
    </div>
  )
}
