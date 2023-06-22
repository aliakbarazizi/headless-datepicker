/**
 * Fix js mod for negative numbers
 * @param n
 * @param m
 * @returns
 */
export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}
