import { useEffect, useState } from 'react'
import { formatEnIn } from '../lib/format'

export default function AnimatedNumber({
  value = 0,
  duration = 1000,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
}) {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setShown(value)
      return undefined
    }

    let frame
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) ** 3
      setShown(value * eased)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, duration])

  return (
    <span className={className}>
      {prefix}
      {formatEnIn(shown, decimals)}
      {suffix}
    </span>
  )
}
