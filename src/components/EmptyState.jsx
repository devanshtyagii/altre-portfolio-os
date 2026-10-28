export default function EmptyState({ title, body }) {
  return (
    <div className="empty" role="status">
      <p className="m-0 text-base font-semibold text-ink">{title}</p>
      {body ? <p className="mt-2 mb-0">{body}</p> : null}
    </div>
  )
}
