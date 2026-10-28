import { Link } from 'react-router-dom'
import { FileSearch, Gauge, Scale } from 'lucide-react'
import { SNAPSHOT } from '../data/portfolio'

const TOOLS = [
  {
    title: 'Lease Abstraction Engine',
    body: 'Extract clauses, dates and commercial terms from lease PDFs.',
    to: '/upload',
    cta: 'Upload a lease →',
    icon: FileSearch,
    tile: 'icon-violet',
  },
  {
    title: 'Portfolio Manager',
    body: 'Track outflow, occupancy and city mix across the book.',
    to: '/dashboard',
    cta: 'Open dashboard →',
    icon: Gauge,
    tile: 'icon-teal',
  },
  {
    title: 'Benchmark',
    body: 'Compare cost, WALE and vacancy against your own assets.',
    to: '/benchmark',
    cta: 'View benchmarks →',
    icon: Scale,
    tile: 'icon-amber',
  },
]

export default function Workspace() {
  return (
    <>
      <h1 className="page-title">Welcome back, Mahipal 👋</h1>
      <p className="page-sub">Real-estate lease intelligence for your portfolio.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {TOOLS.map((tool, i) => {
          const Icon = tool.icon
          return (
            <article key={tool.title} className="card tool-card" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className={`icon-tile ${tool.tile}`}>
                <Icon size={22} aria-hidden="true" />
              </div>
              <h2 className="m-0 text-lg font-bold">{tool.title}</h2>
              <p className="m-0 flex-1 text-sm text-muted">{tool.body}</p>
              <Link className="ghost-btn self-start" to={tool.to}>
                {tool.cta}
              </Link>
            </article>
          )
        })}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <article className="card card-pad" style={{ animationDelay: '0.24s' }}>
          <h2 className="mt-0 mb-4 text-base font-semibold">Portfolio snapshot</h2>
          <div className="grid grid-cols-3 gap-3">
            {SNAPSHOT.map((item) => (
              <div key={item.label}>
                <div className="kpi-label">{item.label}</div>
                <div className="text-xl font-bold">{item.value}</div>
              </div>
            ))}
          </div>
        </article>

        <article className="card card-pad" style={{ animationDelay: '0.32s' }}>
          <h2 className="mt-0 mb-2 text-base font-semibold">Needs review</h2>
          <p className="mt-0 mb-4 text-sm text-muted">2 uploads have no property or dates</p>
          <Link className="primary-btn self-start" to="/leases?filter=review">
            Open Lease Data
          </Link>
        </article>
      </div>
    </>
  )
}
