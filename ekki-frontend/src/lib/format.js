/**
 * Formats a number as currency with thousands and decimal separators.
 * @param {number} valueInCents The amount, in cents
 * @returns {string} The resulting string
 */
export function formatCurrency(valueInCents) {
  const [integer, fraction] = (valueInCents / 100).toFixed(2).split('.')
  const modulo = integer.length % 3
  const thousands = modulo ? [integer.slice(0, modulo)] : []
  for (let i = modulo; i < integer.length; i += 3) {
    thousands.push(integer.slice(i, i + 3))
  }
  return thousands.join(',') + '.' + fraction
}
