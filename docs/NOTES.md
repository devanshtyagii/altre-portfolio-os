# Implementation notes

**KpiCard** is the standard metric tile: a labelled figure, optional icon, and a muted hint line. Pages pass a numeric `value` (plus `prefix` / `suffix` / `decimals`) so **AnimatedNumber** can count up, or they pass `children` when the headline is not a number. `delay` staggers the card’s fade-up.

**ChartCard** wraps any plot or table in the same 16px card as the rest of the OS. It owns the title, fade-up `delay`, and the square colour legend along the bottom-right. The actual Recharts markup (or the vacancy table) is passed as `children`.

**StatusPill** is a small rounded chip for Processed / Needs review, upload progress, and vacancy percentages. `tone` selects the success, warning, error, or neutral colours from the design tokens (`processed` and `review` are aliases).

**InsightTile** is a full-width callout used under charts. `tone` (`red` | `amber` | `green`) sets background, text colour, and the Lucide icon so concentration risk, savings, and expiry notes stay visually distinct.

**AnimatedNumber** interpolates from 0 to `value` over 1s (ease-out cubic) and prints the result with `en-IN` grouping. Prefix and suffix strings (₹, Cr, years, %) stay outside the number. If the user prefers reduced motion, it jumps to the final value.

## Sample data (`src/data/`)

Nothing is fetched. `leases.js` holds the nine document rows (`property`, `file`, `term`, `status`, `uploaded`, `city`) plus document-type pills. `portfolio.js` holds dashboard KPIs, city mix for the donut, outflow and presence series, trigger counts, and the expiry timeline. `benchmark.js` is keyed by city: KPI sets, WALE and vacancy series, the nine-row vacancy table, insight copy (each with a `cities` allow-list), and chart legends. `nav.js` is sidebar routes and the signed-in user. Helpers in `src/lib/format.js` format rupees and filter series when the Benchmarking city select changes.

## Chart tooltips and animations

City bar charts use a custom Recharts tooltip: a white card, **city name in bold**, metric line in `#2563eb` (for example `Total Outflow: ₹26.89 Cr`). Hover also draws a light-blue band (`rgba(99,130,255,.14)`) behind the 44px square bar; there are no value labels on the columns. Bars scale up from the baseline (`grow-bar`, 1s, 0.12s stagger). Cards and insight tiles fade up 0.6s with an 0.08s stagger and lift 3px on hover. The area donut rotates in; icon tiles float (3.5s); the Benchmarking banner gradient drifts (8s). `prefers-reduced-motion` turns those CSS animations and the KPI count-up off.
