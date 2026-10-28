import { AlertTriangle, CheckCircle2, Info } from 'lucide-react'

/**
 * Colour-coded callout for concentration, vacancy, and expiry notes.
 * `tone` is red | amber | green (background, text, and icon).
 * Props: tone, children, delay (stagger, seconds).
 */

const ICONS = {
  red: AlertTriangle,
  amber: Info,
  green: CheckCircle2,
}

export default function InsightTile({ tone = 'amber', children, delay = 0 }) {
  const Icon = ICONS[tone] || Info
  return (
    <div className={`insight insight-${tone}`} style={{ animationDelay: `${delay}s` }}>
      <Icon size={18} aria-hidden="true" />
      <p className="m-0">{children}</p>
    </div>
  )
}
