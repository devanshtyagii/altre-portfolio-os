import { useMemo, useState } from 'react'
import { Clock3, IndianRupee, TrendingUp, Users } from 'lucide-react'
import KpiCard from '../components/KpiCard'
import ChartCard from '../components/ChartCard'
import InsightTile from '../components/InsightTile'
import SectionHeading from '../components/SectionHeading'
import StatusPill from '../components/StatusPill'
import EmptyState from '../components/EmptyState'
import CityBarChart, { crFormat, pctFormat, yearsFormat } from '../components/CityBarChart'
import {
  BENCH_KPIS,
  CITIES,
  COST_INSIGHTS,
  MARKET_ROWS,
  OUTFLOW_LEGEND,
  VACANCY_BY_CITY,
  VACANCY_INSIGHTS,
  VACANCY_LEGEND,
  VACANCY_PROPERTIES,
  WALE_BY_CITY,
  WALE_LEGEND,
} from '../data/benchmark'
import { CITY_OUTFLOW } from '../data/portfolio'
import { filterByCity } from '../lib/format'

const KPI_ICONS = [Clock3, IndianRupee, Users, TrendingUp]
const KPI_TILES = ['icon-violet', 'icon-teal', 'icon-amber', 'icon-red']

function vacancyTone(value) {
  if (value == null) return 'neutral'
  if (value < 10) return 'success'
  if (value < 20) return 'warning'
  return 'error'
}

function VacancyPill({ value }) {
  if (value == null) {
    return (
      <div>
        <StatusPill tone="neutral">NA</StatusPill>
      </div>
    )
  }
  const tone = vacancyTone(value)
  const color = tone === 'success' ? 'var(--success)' : tone === 'warning' ? 'var(--warning)' : 'var(--error)'
  return (
    <div>
      <StatusPill tone={tone}>{value}%</StatusPill>
      <div className="meter" aria-hidden="true">
        <span style={{ width: `${Math.min(100, value)}%`, background: color }} />
      </div>
    </div>
  )
}

export default function Benchmarking() {
  const [tab, setTab] = useState('portfolio')
  const [city, setCity] = useState('All Cities')

  const kpis = BENCH_KPIS[city]
  const outflow = useMemo(
    () => filterByCity(CITY_OUTFLOW, city).map((row) => ({ ...row, color: '#ef4444' })),
    [city],
  )
  const wale = useMemo(() => filterByCity(WALE_BY_CITY, city), [city])
  const vacancy = useMemo(() => filterByCity(VACANCY_BY_CITY, city), [city])
  const properties = useMemo(
    () => VACANCY_PROPERTIES.filter((row) => city === 'All Cities' || row.city === city),
    [city],
  )
  const costInsights = COST_INSIGHTS.filter((item) => item.cities.includes(city))
  const vacInsights = VACANCY_INSIGHTS.filter((item) => item.cities.includes(city))
  const market = MARKET_ROWS.filter((row) => city === 'All Cities' || row.city === city)

  return (
    <>
      <section className="hero-banner">
        <h1 className="page-title text-white">Benchmarking</h1>
        <p className="mt-2 mb-5 max-w-xl text-sm text-violet-100">
          Cost, lease expiry and vacancy across your portfolio
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="hero-tabs" role="tablist" aria-label="Benchmark views">
            <button type="button" role="tab" aria-selected={tab === 'portfolio'} onClick={() => setTab('portfolio')}>
              Portfolio Assessment
            </button>
            <button type="button" role="tab" aria-selected={tab === 'market'} onClick={() => setTab('market')}>
              Market Insights
            </button>
          </div>
          <label className="text-sm">
            <span className="sr-only">Filter by city</span>
            <select
              className="hero-select"
              value={city}
              aria-label="Filter by city"
              onChange={(e) => setCity(e.target.value)}
            >
              {CITIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {tab === 'market' ? (
        <section className="card card-pad mt-5" style={{ animationDelay: '0.08s' }}>
          <h2 className="mt-0 mb-3 text-base font-semibold">Market Insights</h2>
          {market.length === 0 ? (
            <EmptyState title="No market comps" body="Choose another city or connect a listing feed." />
          ) : (
            <div className="table-wrap">
              <table className="data">
                <thead>
                  <tr>
                    <th>City</th>
                    <th>Metric</th>
                    <th>Range</th>
                  </tr>
                </thead>
                <tbody>
                  {market.map((row) => (
                    <tr key={row.city}>
                      <td className="font-bold">{row.city}</td>
                      <td>{row.metric}</td>
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ) : (
        <>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((kpi, i) => {
              const Icon = KPI_ICONS[i]
              return (
                <KpiCard
                  key={kpi.id}
                  delay={i * 0.08}
                  icon={
                    <div className={`icon-tile ${KPI_TILES[i]} mb-3`}>
                      <Icon size={20} aria-hidden="true" />
                    </div>
                  }
                  {...kpi}
                />
              )
            })}
          </div>

          <SectionHeading letter="A">Cost Analysis</SectionHeading>
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard title="Total outflow by city" delay={0.08} legend={OUTFLOW_LEGEND}>
              <CityBarChart
                data={outflow}
                color="#ef4444"
                yDomain={[0, 80]}
                yTicks={[0, 20, 40, 60, 80]}
                yFormatter={(v) => `${v}`}
                formatValue={(v) => `Total Outflow: ${crFormat(v)}`}
              />
            </ChartCard>
            <ChartCard title="WALE by city (years)" delay={0.16} legend={WALE_LEGEND}>
              <CityBarChart
                data={wale}
                yDomain={[0, 8]}
                yTicks={[0, 2, 4, 6, 8]}
                formatValue={(v) => `WALE: ${yearsFormat(v)}`}
              />
            </ChartCard>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {costInsights.map((item, i) => (
              <InsightTile key={item.text} tone={item.tone} delay={0.08 * i}>
                {item.text}
              </InsightTile>
            ))}
          </div>

          <SectionHeading letter="B">Vacancy Analysis</SectionHeading>
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard title="Vacancy by city" delay={0.08} legend={VACANCY_LEGEND}>
              <CityBarChart
                data={vacancy}
                yDomain={[0, 28]}
                yTicks={[0, 7, 14, 21, 28]}
                yFormatter={(v) => `${v}%`}
                formatValue={(v) => `Avg Vacancy: ${pctFormat(v)}`}
              />
            </ChartCard>
            <ChartCard title="Vacancy by property" delay={0.16}>
              {properties.length === 0 ? (
                <EmptyState title="No properties" body="Nothing listed for this city." />
              ) : (
                <div className="table-wrap">
                  <table className="data">
                    <thead>
                      <tr>
                        <th>City</th>
                        <th>Property / Campus</th>
                        <th>Avg vacancy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map((row, i) => (
                        <tr key={`${row.city}-${row.property}-${i}`}>
                          <td>{row.city}</td>
                          <td className="font-bold">{row.property}</td>
                          <td>
                            <VacancyPill value={row.vacancy} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </ChartCard>
          </div>
          <div className="mt-4 grid gap-3">
            {vacInsights.map((item, i) => (
              <InsightTile key={item.text} tone={item.tone} delay={0.08 * i}>
                {item.text}
              </InsightTile>
            ))}
          </div>
        </>
      )}
    </>
  )
}
