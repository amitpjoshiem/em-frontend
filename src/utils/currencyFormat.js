export function currencyFormat(value, min = 2, max = 2) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  }).format(value)
}
