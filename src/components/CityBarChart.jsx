import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatEnIn } from '../lib/format'

function TooltipCard({ active, payload, label, formatValue }) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <strong>{label}</strong>
      <div className="metric">{formatValue(payload[0].value, label)}</div>
    </div>
  )
}

function BarShape(props) {
  const { x, y, width, height, fill, index, background, activeIndex } = props
  const bandW = Math.max(width + 18, 58)
  const bandX = x - (bandW - width) / 2
  const showBand = Number(activeIndex) === Number(index)
  const bandY = background?.y ?? 8
  const bandH = background?.height ?? Math.max(0, height) + 8
  return (
    <g>
      {showBand ? (
        <rect x={bandX} y={bandY} width={bandW} height={bandH} fill="rgba(99,130,255,.14)" />
      ) : null}
      <rect
        className="chart-bar"
        x={x}
        y={y}
        width={width}
        height={Math.max(0, height)}
        fill={fill}
        rx={0}
        style={{ animationDelay: `${index * 0.12}s` }}
      />
    </g>
  )
}

export default function CityBarChart({
  data,
  color = '#8ba7cb',
  yDomain,
  yTicks,
  yFormatter,
  formatValue,
  height = 280,
}) {
  const [activeIndex, setActiveIndex] = useState(null)
  const axis = 'var(--chart-axis)'

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 28 }}
          barSize={44}
          onMouseMove={(state) => {
            if (state?.isTooltipActive) setActiveIndex(state.activeTooltipIndex)
            else setActiveIndex(null)
          }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke={axis} />
          <XAxis
            dataKey="city"
            interval={0}
            angle={-45}
            textAnchor="end"
            height={64}
            tick={{ fill: 'var(--muted)', fontSize: 12 }}
            axisLine={{ stroke: axis }}
            tickLine={{ stroke: axis }}
          />
          <YAxis
            domain={yDomain}
            ticks={yTicks}
            tickFormatter={yFormatter}
            tick={{ fill: 'var(--muted)', fontSize: 12 }}
            axisLine={{ stroke: axis }}
            tickLine={{ stroke: axis }}
            width={46}
          />
          <Tooltip
            cursor={false}
            content={<TooltipCard formatValue={formatValue} />}
          />
          <Bar
            dataKey="value"
            isAnimationActive={false}
            background={{ fill: 'transparent' }}
            shape={(props) => <BarShape {...props} activeIndex={activeIndex} />}
          >
            {data.map((entry) => (
              <Cell key={entry.city} fill={entry.color || color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function crFormat(value) {
  return `₹${formatEnIn(value, value % 1 === 0 ? 0 : 2)} Cr`
}

export function yearsFormat(value) {
  return `${formatEnIn(value, value % 1 === 0 ? 0 : 1)} years`
}

export function pctFormat(value) {
  return `${formatEnIn(value, 0)}%`
}

export function mnFormat(value) {
  const decimals = Number.isInteger(value * 100) ? 2 : 3
  return `${formatEnIn(value, decimals)} Mn sq ft`
}
