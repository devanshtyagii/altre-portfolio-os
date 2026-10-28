export default function SectionHeading({ letter, children }) {
  return (
    <div className="section-heading">
      {letter ? <span className="letter-badge">{letter}</span> : null}
      <h2 className="m-0 text-[18px] font-bold">{children}</h2>
    </div>
  )
}
