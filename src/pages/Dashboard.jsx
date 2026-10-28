import { Link } from 'react-router-dom'
import { Upload } from 'lucide-react'
import KpiCard from '../components/KpiCard'
import ChartCard from '../components/ChartCard'
import InsightTile from '../components/InsightTile'
import AreaDonut from '../components/AreaDonut'
import CityBarChart, { crFormat, mnFormat } from '../components/CityBarChart'
import {
  AREA_BY_CITY,
  CITY_OUTFLOW,
  CITY_PRESENCE,
  DASHBOARD_INSIGHTS,
  DASHBOARD_KPIS,
} from '../data/portfolio'

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-sub">Portfolio mix, outflow and occupancy at a glance.</p>
        </div>
        <Link className="primary-btn" to="/upload">
          <Upload size={16} aria-hidden="true" />
          Upload lease
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {DASHBOARD_KPIS.map((kpi, i) => (
          <KpiCard key={kpi.id} delay={i * 0.08} {...kpi} />
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <ChartCard
          title="Area by city"
          delay={0.32}
          legend={AREA_BY_CITY.map((c) => ({ label: `${c.city} ${c.value}%`, color: c.color }))}
        >
          <AreaDonut />
        </ChartCard>

        <ChartCard title="Needs attention" delay={0.4}>
          <div className="grid gap-3">
            {DASHBOARD_INSIGHTS.map((item, i) => (
              <InsightTile key={item.title} tone={item.tone} delay={0.08 * i}>
                {item.title}
              </InsightTile>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <ChartCard title="Citywise outflow (annual, ₹ Cr)" delay={0.48}>
          <CityBarChart
            data={CITY_OUTFLOW}
            color="#8ba7cb"
            yDomain={[0, 80]}
            yTicks={[0, 20, 40, 60, 80]}
            yFormatter={(v) => `${v}`}
            formatValue={(v) => `Annual Outflow: ${crFormat(v)}`}
          />
        </ChartCard>
        <ChartCard title="Citywise presence (Mn sq ft)" delay={0.56}>
          <CityBarChart
            data={CITY_PRESENCE}
            color="#5ba596"
            yDomain={[0, 0.6]}
            yTicks={[0, 0.15, 0.3, 0.45, 0.6]}
            formatValue={(v) => `Portfolio: ${mnFormat(v)}`}
          />
        </ChartCard>
      </div>
    </>
  )
}
