import { NavLink } from 'react-router-dom'
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  LayoutGrid,
  Upload,
  Zap,
} from 'lucide-react'
import { NAV_ITEMS, USER } from '../data/nav'

const ICONS = {
  LayoutGrid,
  LayoutDashboard,
  Upload,
  FileText,
  Zap,
  BarChart3,
}

export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Primary">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true">
          A
        </div>
        <div className="brand-text">
          <div className="brand-title">Altre Portfolio OS</div>
          <div className="brand-sub">Real Estate Intelligence</div>
        </div>
      </div>

      <nav className="nav-list">
        {NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.icon]
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
              aria-label={item.label}
            >
              <Icon size={18} aria-hidden="true" />
              <span className="nav-label">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="user-block">
        <div className="avatar" aria-hidden="true">
          {USER.initial}
        </div>
        <div className="user-meta">
          <div className="user-name">{USER.name}</div>
          <div className="user-email">{USER.email}</div>
        </div>
      </div>
    </aside>
  )
}
