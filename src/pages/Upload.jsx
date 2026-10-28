import { useRef, useState } from 'react'
import { FileUp, ShieldCheck } from 'lucide-react'
import StatusPill from '../components/StatusPill'
import { DOC_TYPES } from '../data/leases'
import { formatBytes } from '../lib/format'

const ACCEPT = '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
const MAX_BYTES = 25 * 1024 * 1024

function simulate(file, onUpdate) {
  const id = `${file.name}-${file.size}-${Date.now()}`
  if (file.size > MAX_BYTES) {
    onUpdate({
      id,
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'error',
    })
    return
  }
  let progress = 0
  onUpdate({
    id,
    name: file.name,
    size: file.size,
    progress: 0,
    status: 'uploading',
  })
  const timer = setInterval(() => {
    progress += 8 + Math.round(Math.random() * 12)
    if (progress >= 100) {
      progress = 100
      clearInterval(timer)
      onUpdate({ id, name: file.name, size: file.size, progress: 100, status: 'done' })
    } else {
      onUpdate({ id, name: file.name, size: file.size, progress, status: 'uploading' })
    }
  }, 180)
}

export default function Upload() {
  const inputRef = useRef(null)
  const [docType, setDocType] = useState(DOC_TYPES[0])
  const [hover, setHover] = useState(false)
  const [queue, setQueue] = useState([
    { id: 'sample-done', name: 'Lease_Gurugram.docx', size: 1240000, progress: 100, status: 'done' },
    { id: 'sample-prog', name: 'CAM_schedule.pdf', size: 840000, progress: 64, status: 'uploading' },
  ])

  const addFiles = (files) => {
    ;[...files].forEach((file) => {
      simulate(file, (entry) => {
        setQueue((prev) => {
          const idx = prev.findIndex((item) => item.id === entry.id)
          if (idx === -1) return [...prev, entry]
          const next = [...prev]
          next[idx] = entry
          return next
        })
      })
    })
  }

  return (
    <>
      <h1 className="page-title">Upload</h1>
      <p className="page-sub">Add lease packs for abstraction. Sample processing only — files stay in the browser.</p>

      <section className="card card-pad mt-6" style={{ animationDelay: '0.08s' }}>
        <h2 className="mt-0 mb-3 text-sm font-semibold">Step 1 · Document type</h2>
        <div className="pills" role="group" aria-label="Document type">
          {DOC_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              className="seg-pill"
              aria-pressed={docType === type}
              onClick={() => setDocType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <h2 className="mt-6 mb-3 text-sm font-semibold">Step 2 · Files</h2>
        <div
          className={`dropzone${hover ? ' active' : ''}`}
          role="button"
          tabIndex={0}
          aria-label="Drop files here or choose files"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              inputRef.current?.click()
            }
          }}
          onDragOver={(e) => {
            e.preventDefault()
            setHover(true)
          }}
          onDragLeave={() => setHover(false)}
          onDrop={(e) => {
            e.preventDefault()
            setHover(false)
            addFiles(e.dataTransfer.files)
          }}
        >
          <div className="icon-tile icon-violet mx-auto">
            <FileUp size={22} aria-hidden="true" />
          </div>
          <p className="mt-4 mb-1 font-semibold">Drag and drop files here</p>
          <p className="mt-0 mb-4 text-sm text-muted">
            PDF, DOC or DOCX · up to 25 MB each · batch upload supported
          </p>
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            accept={ACCEPT}
            multiple
            aria-label="Choose files to upload"
            onChange={(e) => {
              addFiles(e.target.files)
              e.target.value = ''
            }}
          />
          <button
            type="button"
            className="primary-btn"
            onClick={(e) => {
              e.stopPropagation()
              inputRef.current?.click()
            }}
          >
            Choose files
          </button>
        </div>

        {queue.length ? (
          <ul className="mt-5 m-0 grid list-none gap-3 p-0">
            {queue.map((item) => (
              <li key={item.id} className="rounded-xl border border-border px-3 py-3">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-muted">{formatBytes(item.size)}</div>
                  </div>
                  {item.status === 'done' ? (
                    <StatusPill tone="success">Done</StatusPill>
                  ) : item.status === 'error' ? (
                    <StatusPill tone="error">Over 25 MB</StatusPill>
                  ) : (
                    <StatusPill tone="warning">{item.progress}%</StatusPill>
                  )}
                </div>
                <div className="progress" aria-label={`${item.name} upload progress ${item.progress}%`}>
                  <span style={{ width: `${item.progress}%` }} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-0 mt-4 text-sm text-muted" role="status">
            No files in the queue yet.
          </p>
        )}

        <p className="mb-0 mt-5 flex items-center gap-2 text-xs text-muted">
          <ShieldCheck size={14} aria-hidden="true" />
          Encrypted in transit · virus-scanned · format detected automatically
        </p>
      </section>
    </>
  )
}
