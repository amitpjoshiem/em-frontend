export function percentFormat(value, min = 0, max = 0) {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  }).format(value)
}
