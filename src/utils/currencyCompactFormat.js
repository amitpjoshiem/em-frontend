export function currencyCompact(value) {
  return Intl.NumberFormat('us-EN', { notation: 'compact' }).format(value)
}
