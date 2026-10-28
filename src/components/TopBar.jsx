import { Search } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PORTFOLIO_META } from '../data/nav'

export default function TopBar() {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const onSubmit = (event) => {
    event.preventDefault()
    const q = new FormData(event.currentTarget).get('q')
    navigate(`/leases?q=${encodeURIComponent(q || '')}`)
  }

  return (
    <header className="topbar">
      <form className="search-wrap" onSubmit={onSubmit} role="search">
        <Search size={16} aria-hidden="true" />
        <input
          className="search-input"
          type="search"
          name="q"
          defaultValue={params.get('q') || ''}
          placeholder="Search leases, properties, cities…"
          aria-label="Search leases, properties, cities"
        />
      </form>
      <p className="top-meta m-0">
        {PORTFOLIO_META.leaseCount} leases · {PORTFOLIO_META.updatedLabel}
      </p>
    </header>
  )
}
