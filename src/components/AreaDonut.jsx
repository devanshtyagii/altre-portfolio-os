import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { AREA_BY_CITY } from '../data/portfolio'

function DonutTip({ active, payload }) {
  if (!active || !payload?.length) return null
  const item = payload[0].payload
  return (
    <div className="chart-tooltip">
      <strong>{item.city}</strong>
      <div className="metric">
        {item.value}% · {item.sqftMn} Mn sq ft
      </div>
    </div>
  )
}

export default function AreaDonut() {
  return (
    <div className="relative mx-auto h-[260px] w-[260px]">
      <div className="donut-spin h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={AREA_BY_CITY}
              dataKey="value"
              nameKey="city"
              innerRadius={78}
              outerRadius={110}
              paddingAngle={2}
              stroke="none"
            >
              {AREA_BY_CITY.map((entry) => (
                <Cell key={entry.city} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<DonutTip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-lg font-bold">0.89 Mn sq ft</div>
          <div className="text-xs text-muted">Portfolio</div>
        </div>
      </div>
    </div>
  )
}
