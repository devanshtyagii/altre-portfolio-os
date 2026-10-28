import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function Layout() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Sidebar />
      <div className="main-col">
        <TopBar />
        <main id="main" className="page">
          <div className="page-inner">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
