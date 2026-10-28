const TONE = {
  success: 'status-success',
  warning: 'status-warning',
  error: 'status-error',
  neutral: 'status-neutral',
  processed: 'status-success',
  review: 'status-warning',
}

/**
 * Compact status chip for lease rows, vacancy %, and upload queue.
 * `tone` maps to success / warning / error / neutral (aliases: processed, review).
 * Props: tone, children (label text).
 */
export default function StatusPill({ tone = 'neutral', children }) {
  return <span className={`status-pill ${TONE[tone] || TONE.neutral}`}>{children}</span>
}
