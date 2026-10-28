export function formatEnIn(value, decimals = 0) {
  return Number(value).toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function filterByCity(rows, city, key = 'city') {
  if (!city || city === 'All Cities') return rows
  return rows.filter((row) => row[key] === city)
}
