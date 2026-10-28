export const CITIES = ['All Cities', 'Bangalore', 'Chennai', 'Gurugram']

export const BENCH_KPIS = {
  'All Cities': [
    { id: 'wale', label: 'WALE', value: 5.06, decimals: 2, suffix: ' years', hint: 'Weighted average lease expiry' },
    { id: 'rent', label: 'Avg rent', value: 109.04, decimals: 2, prefix: '₹', hint: 'Average monthly rent' },
    { id: 'cost', label: 'Cost / employee', value: 34870, decimals: 0, prefix: '₹', hint: 'Average cost per employee' },
    { id: 'esc', label: 'Avg rent escalation', value: 9.34, decimals: 2, suffix: '%', hint: 'Average monthly rent escalation' },
  ],
  Bangalore: [
    { id: 'wale', label: 'WALE', value: 6, decimals: 1, suffix: ' years', hint: 'Weighted average lease expiry' },
    { id: 'rent', label: 'Avg rent', value: 118.4, decimals: 2, prefix: '₹', hint: 'Average monthly rent' },
    { id: 'cost', label: 'Cost / employee', value: 36210, decimals: 0, prefix: '₹', hint: 'Average cost per employee' },
    { id: 'esc', label: 'Avg rent escalation', value: 10.1, decimals: 2, suffix: '%', hint: 'Average monthly rent escalation' },
  ],
  Chennai: [
    { id: 'wale', label: 'WALE', value: 2.9, decimals: 1, suffix: ' years', hint: 'Weighted average lease expiry' },
    { id: 'rent', label: 'Avg rent', value: 92.5, decimals: 2, prefix: '₹', hint: 'Average monthly rent' },
    { id: 'cost', label: 'Cost / employee', value: 30120, decimals: 0, prefix: '₹', hint: 'Average cost per employee' },
    { id: 'esc', label: 'Avg rent escalation', value: 8.2, decimals: 2, suffix: '%', hint: 'Average monthly rent escalation' },
  ],
  Gurugram: [
    { id: 'wale', label: 'WALE', value: 4.3, decimals: 1, suffix: ' years', hint: 'Weighted average lease expiry' },
    { id: 'rent', label: 'Avg rent', value: 104.8, decimals: 2, prefix: '₹', hint: 'Average monthly rent' },
    { id: 'cost', label: 'Cost / employee', value: 33450, decimals: 0, prefix: '₹', hint: 'Average cost per employee' },
    { id: 'esc', label: 'Avg rent escalation', value: 8.9, decimals: 2, suffix: '%', hint: 'Average monthly rent escalation' },
  ],
}

export const WALE_BY_CITY = [
  { city: 'Bangalore', value: 6, color: '#22c55e' },
  { city: 'Gurugram', value: 4.3, color: '#22c55e' },
  { city: 'Chennai', value: 2.9, color: '#3b82f6' },
]

export const VACANCY_BY_CITY = [
  { city: 'Bangalore', value: 25, color: '#ef4444' },
  { city: 'Chennai', value: 25, color: '#ef4444' },
  { city: 'Gurugram', value: 7, color: '#22c55e' },
]

export const VACANCY_PROPERTIES = [
  { city: 'Gurugram', property: 'MPD Tower', vacancy: 0 },
  { city: 'Gurugram', property: 'Downtown', vacancy: null },
  { city: 'Gurugram', property: 'DownTown', vacancy: null },
  { city: 'NA', property: 'NA', vacancy: null },
  { city: 'NA', property: 'NA', vacancy: null },
  { city: 'Gurugram', property: 'Platinum Arc Tower', vacancy: 2 },
  { city: 'Gurugram', property: 'Platina Tower', vacancy: 20 },
  { city: 'Bangalore', property: 'Orion Tech Park', vacancy: 25 },
  { city: 'Chennai', property: 'Embassy Splendid Tech Zone', vacancy: 25 },
]

export const COST_INSIGHTS = [
  {
    tone: 'red',
    cities: ['All Cities', 'Bangalore'],
    text: 'Concentration risk: Bangalore is ~59% of total outflow',
  },
  {
    tone: 'green',
    cities: ['All Cities', 'Bangalore', 'Chennai', 'Gurugram'],
    text: 'Potential saving: 70% of portfolio is out of lock-in, with potential saving of INR 15 Cr over the next 3 years',
  },
  {
    tone: 'amber',
    cities: ['All Cities', 'Bangalore', 'Chennai', 'Gurugram'],
    text: 'Rental escalation: over the next 2 years rent outflow rises 20% to INR 50 Cr',
  },
  {
    tone: 'amber',
    cities: ['All Cities', 'Chennai'],
    text: 'Lease expiry: Chennai has the shortest WALE (~2.9 yrs), so renewals may cluster soon',
  },
]

export const VACANCY_INSIGHTS = [
  {
    tone: 'red',
    cities: ['All Cities', 'Bangalore', 'Chennai', 'Gurugram'],
    text: 'Highest vacancy: Bangalore and Chennai at 25%; Gurugram is lowest. Portfolio average 23.8%',
  },
  {
    tone: 'green',
    cities: ['All Cities', 'Bangalore', 'Chennai', 'Gurugram'],
    text: 'Potential saving: 23.8% of portfolio is vacant, with potential saving of INR 15 Cr over 3 years',
  },
  {
    tone: 'amber',
    cities: ['All Cities', 'Gurugram'],
    text: 'Top project saving: Platina Tower has the highest potential saving: INR 8 Cr over 3 years',
  },
]

export const OUTFLOW_LEGEND = [
  { label: '<1 Cr', color: '#22c55e' },
  { label: '1–2 Cr', color: '#3b82f6' },
  { label: '2–5 Cr', color: '#f97316' },
  { label: '>5 Cr', color: '#ef4444' },
]

export const WALE_LEGEND = [
  { label: '<1 year', color: '#ef4444' },
  { label: '1–2', color: '#f97316' },
  { label: '2–3', color: '#3b82f6' },
  { label: '>3', color: '#22c55e' },
]

export const VACANCY_LEGEND = [
  { label: '<10%', color: '#22c55e' },
  { label: '10–15%', color: '#3b82f6' },
  { label: '15–20%', color: '#f97316' },
  { label: '>20%', color: '#ef4444' },
]

export const MARKET_ROWS = [
  { city: 'Bangalore', metric: 'Prime IT rent', value: '₹92–118 / sq ft' },
  { city: 'Gurugram', metric: 'Prime IT rent', value: '₹88–110 / sq ft' },
  { city: 'Chennai', metric: 'Prime IT rent', value: '₹68–95 / sq ft' },
]
