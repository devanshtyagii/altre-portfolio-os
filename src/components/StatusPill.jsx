const TONE = {
  success: 'status-success',
  warning: 'status-warning',
  error: 'status-error',
  neutral: 'status-neutral',
  processed: 'status-success',
  review: 'status-warning',
}

export default function StatusPill({ tone = 'neutral', children }) {
  return <span className={`status-pill ${TONE[tone] || TONE.neutral}`}>{children}</span>
}
