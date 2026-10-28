import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Workspace from './pages/Workspace'
import Upload from './pages/Upload'
import Dashboard from './pages/Dashboard'
import LeaseData from './pages/LeaseData'
import Triggers from './pages/Triggers'
import Benchmarking from './pages/Benchmarking'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Workspace />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leases" element={<LeaseData />} />
          <Route path="/triggers" element={<Triggers />} />
          <Route path="/benchmark" element={<Benchmarking />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
