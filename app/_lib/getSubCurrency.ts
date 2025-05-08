export function getSubCurrency(amount: number, factor: number = 100): number {
  return Math.round(amount * factor);
}
