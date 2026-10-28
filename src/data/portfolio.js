export const DASHBOARD_KPIS = [
  {
    id: 'leases',
    label: 'Leases',
    value: 9,
    decimals: 0,
    hint: '9 conventional · 0 flex',
  },
  {
    id: 'area',
    label: 'Area',
    value: 0.89,
    decimals: 2,
    suffix: ' Mn sq ft',
    hint: '8,85,872 sq ft',
  },
  {
    id: 'outflow',
    label: 'Annual outflow',
    value: 111.02,
    decimals: 2,
    prefix: '₹',
    suffix: ' Cr',
    hint: 'Deposit ₹19.93 Cr',
  },
  {
    id: 'employees',
    label: 'Employees',
    value: 3045,
    decimals: 0,
    hint: 'Across 3 cities',
  },
]

export const AREA_BY_CITY = [
  { city: 'Bangalore', value: 50.8, sqftMn: 0.45, color: '#7c3aed' },
  { city: 'Chennai', value: 26.4, sqftMn: 0.233, color: '#14b8a6' },
  { city: 'Gurugram', value: 22.8, sqftMn: 0.202, color: '#f59e0b' },
]

export const CITY_OUTFLOW = [
  { city: 'Bangalore', value: 65 },
  { city: 'Gurugram', value: 26.89 },
  { city: 'Chennai', value: 19 },
]

export const CITY_PRESENCE = [
  { city: 'Bangalore', value: 0.45 },
  { city: 'Chennai', value: 0.233 },
  { city: 'Gurugram', value: 0.202 },
]

export const SNAPSHOT = [
  { label: 'Leases', value: '9' },
  { label: 'Annual outflow', value: '₹111 Cr' },
  { label: 'Avg WALE', value: '5.1 yrs' },
]

export const DASHBOARD_INSIGHTS = [
  {
    tone: 'red',
    title: 'Bangalore is ~59% of outflow',
    body: 'Concentration is high in a single city.',
  },
  {
    tone: 'amber',
    title: 'Vacancy at 25% in Bangalore and Chennai',
    body: 'Idle space is dragging occupancy.',
  },
  {
    tone: 'green',
    title: 'No expiries in the next 180 days',
    body: 'Near-term renewal pressure is low.',
  },
]

export const TRIGGER_COUNTS = [
  { id: 'critical', label: 'Critical', value: 0, tone: 'error', hint: 'Immediate action' },
  { id: 'high', label: 'High', value: 0, tone: 'warning', hint: 'Next 90–180 days' },
  { id: 'medium', label: 'Medium', value: 0, tone: 'neutral', hint: 'Planning window' },
]

export const UPCOMING = [
  { date: 'Aug 2029', property: 'Platina Tower', detail: 'ends 30 Aug 2029' },
  { date: 'Sep 2029', property: 'Embassy Splendid Tech Zone', detail: 'ends 29 Sep 2029' },
  { date: 'Aug 2031', property: 'Downtown, MPD Tower', detail: 'end 30 Aug 2031' },
]
