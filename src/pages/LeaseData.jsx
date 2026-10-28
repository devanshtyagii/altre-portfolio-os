import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Download, Pencil, Search, Upload, Eye } from 'lucide-react'
import StatusPill from '../components/StatusPill'
import EmptyState from '../components/EmptyState'
import LoadingBlock from '../components/LoadingBlock'
import { LEASES, LEASE_SUMMARY } from '../data/leases'

function LeaseDialog({ row, mode, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!row) return null
  return (
    <div className="dialog-backdrop" role="presentation" onClick={onClose}>
      <div
        className="dialog-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lease-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="lease-dialog-title" className="mt-0 mb-2 text-lg font-bold">
          {mode === 'edit' ? 'Edit lease' : 'Lease details'}
        </h2>
        <p className="mt-0 mb-4 text-sm text-muted">
          {mode === 'edit'
            ? 'Sample data is read-only. Connect a backend to persist edits.'
            : 'Extracted from the uploaded pack.'}
        </p>
        <dl className="m-0 grid gap-2 text-sm">
          <div>
            <dt className="text-muted">Property</dt>
            <dd className="ml-0 font-semibold">{row.property}</dd>
          </div>
          <div>
            <dt className="text-muted">File</dt>
            <dd className="ml-0">{row.file}</dd>
          </div>
          <div>
            <dt className="text-muted">Term</dt>
            <dd className="ml-0">{row.term}</dd>
          </div>
          <div>
            <dt className="text-muted">Status</dt>
            <dd className="ml-0">
              {row.status === 'processed' ? 'Processed' : 'Needs review'}
            </dd>
          </div>
        </dl>
        <button type="button" className="primary-btn mt-5" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

function downloadLease(row) {
  const blob = new Blob(
    [`${row.property}\n${row.file}\n${row.term}\n${row.status}\n`],
    { type: 'text/plain' },
  )
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = row.file
  a.click()
  URL.revokeObjectURL(url)
}

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'processed', label: 'Processed' },
  { id: 'review', label: 'Needs review' },
]

export default function LeaseData() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [loading, setLoading] = useState(true)
  const [dialog, setDialog] = useState(null)
  const filter = params.get('filter') || 'all'

  useEffect(() => {
    setQuery(params.get('q') || '')
  }, [params])

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 280)
    return () => clearTimeout(t)
  }, [filter, query])

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return LEASES.filter((row) => {
      const matchFilter =
        filter === 'all' ||
        (filter === 'processed' && row.status === 'processed') ||
        (filter === 'review' && row.status === 'review')
      const hay = `${row.property} ${row.file} ${row.term} ${row.city}`.toLowerCase()
      return matchFilter && (!q || hay.includes(q))
    })
  }, [query, filter])

  const setFilter = (id) => {
    const next = new URLSearchParams(params)
    if (id === 'all') next.delete('filter')
    else next.set('filter', id)
    setParams(next)
  }

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="page-title">Lease Data</h1>
          <p className="page-sub">
            {LEASE_SUMMARY.documents} documents · {LEASE_SUMMARY.processed} processed · {LEASE_SUMMARY.review} need
            review
          </p>
        </div>
        <Link className="primary-btn" to="/upload">
          <Upload size={16} aria-hidden="true" />
          Upload lease
        </Link>
      </div>

      <section className="card card-pad mt-6" style={{ animationDelay: '0.08s' }}>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="search-wrap">
            <Search size={16} aria-hidden="true" />
            <input
              className="search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search property or file"
              aria-label="Search property or file"
            />
          </div>
          <div className="pills" role="tablist" aria-label="Lease status">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={filter === item.id}
                className={`seg-pill${filter === item.id ? ' active' : ''}`}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <LoadingBlock rows={5} label="Loading lease table" />
        ) : rows.length === 0 ? (
          <EmptyState title="No leases match" body="Try another search or clear the status filter." />
        ) : (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>File</th>
                  <th>Term</th>
                  <th>Status</th>
                  <th>Uploaded</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td className="font-bold">{row.property}</td>
                    <td className="file-muted">{row.file}</td>
                    <td>{row.term}</td>
                    <td>
                      {row.status === 'processed' ? (
                        <StatusPill tone="processed">Processed</StatusPill>
                      ) : (
                        <StatusPill tone="review">Needs review</StatusPill>
                      )}
                    </td>
                    <td>{row.uploaded}</td>
                    <td>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          className="outline-btn"
                          aria-label={`View ${row.file}`}
                          onClick={() => setDialog({ row, mode: 'view' })}
                        >
                          <Eye size={14} aria-hidden="true" />
                          View
                        </button>
                        <button
                          type="button"
                          className="outline-btn"
                          aria-label={`Edit ${row.file}`}
                          onClick={() => setDialog({ row, mode: 'edit' })}
                        >
                          <Pencil size={14} aria-hidden="true" />
                          Edit
                        </button>
                        <button
                          type="button"
                          className="outline-btn"
                          aria-label={`Download ${row.file}`}
                          onClick={() => downloadLease(row)}
                        >
                          <Download size={14} aria-hidden="true" />
                          Download
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      {dialog ? (
        <LeaseDialog row={dialog.row} mode={dialog.mode} onClose={() => setDialog(null)} />
      ) : null}
    </>
  )
}
